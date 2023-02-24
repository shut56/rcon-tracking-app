import { useEffect, useState } from 'react';

import { useRcon } from '../hooks/useRcon';

export default function ConanExiles() {
  const rcon = useRcon();

  const connected = rcon?.connected
  const players = rcon?.players
  const sendCommand = rcon?.sendCommand

  const [serverInfo, setServerInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateServerInfo = async () => {
      if (sendCommand) {
        const response = await sendCommand('serverinfo');
        console.log({ response })
        // const serverData = response?.data
        // setServerInfo(serverData);
      }
    };

    if (connected) {
      updateServerInfo();
    }
  }, [connected]);

  return (
    <>
      <h1>Conan Exiles Server Info</h1>
      <p>Status: {connected ? 'Connected' : 'Disconnected'}</p>
      {connected && (
        <>
          <p>Players online: {players?.length}</p>
          <p>Server name: {serverInfo?.ServerName}</p>
          <p>Server IP: {serverInfo?.HostPublicAddress}</p>
        </>
      )}
    </>
  );
}
