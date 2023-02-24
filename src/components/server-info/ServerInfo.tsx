import { useEffect, useState } from 'react';

type ServerInfoProps = {
  serverData: any;
};

const ServerInfo = ({ serverData }: ServerInfoProps) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (serverData && serverData.players) {
      setPlayers(serverData.players);
    }
  }, [serverData]);

  return (
    <div>
      <h2>Server Info:</h2>
      <p>IP: {serverData.ip}</p>
      <p>Port: {serverData.port}</p>
      <p>Current Players:</p>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} ({player.ping}ms)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServerInfo;
