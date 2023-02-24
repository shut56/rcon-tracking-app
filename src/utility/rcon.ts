import { Rcon } from "rcon-client";

import { LogEntry } from "../types";

interface RconClientOptions {
    host: string;
    port: number;
    password: string;
}

export class RconClient {
    private rcon?: Rcon;

    async connect(options: RconClientOptions): Promise<void> {
        this.rcon = await Rcon.connect(options);
    }

    async getLogs(): Promise<LogEntry[]> {
        if (!this.rcon) {
            throw new Error("RCON client is not connected");
        }

        const response = await this.rcon.send("getgamelog");

        return response
            .split("\n")
            .map((log) => {
                const [id, timestamp, type, message] = log.split(" ");

                return {
                    id: Number(id),
                    timestamp,
                    type,
                    message,
                };
            })
            .reverse();
    }

    async disconnect(): Promise<void> {
        if (!this.rcon) {
            throw new Error("RCON client is not connected");
        }

        await this.rcon.end();
        this.rcon = undefined;
    }
}
