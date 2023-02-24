import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_ADDRESS = '192.168.2.80';
const SERVER_PORT = 25575;
const PASSWORD = 'Kuro_Vito';

interface RconClient {
    connected: boolean;
    players: string[];
    sendCommand: (command: string) => void;
}

export function useRcon(): RconClient | null {
    const [connected, setConnected] = useState(false);
    const [players, setPlayers] = useState<string[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socket = io(`http://${SERVER_ADDRESS}:${SERVER_PORT}`, {
            query: { password: PASSWORD }
        });

        socket.on('connect', () => {
            setConnected(true);
        });

        socket.on('disconnect', () => {
            setConnected(false);
            setPlayers([]);
        });

        socket.on('message', (msg: string) => {
            if (msg.startsWith('Players:')) {
                setPlayers(msg.substr(8).split(', '));
            }
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendCommand = (command: string) => {
        if (socket) {
            socket.emit('send', command);
        }
    };

    if (!socket) {
        return null;
    }

    return {
        connected,
        players,
        sendCommand
    };
}
