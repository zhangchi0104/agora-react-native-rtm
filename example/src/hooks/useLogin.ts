import { IRtmClient } from 'agora-react-native-rtm';

import { useEffect } from 'react';

import Config from '../config/agora.config';

export function useLogin(client: IRtmClient) {
  useEffect(() => {
    client.login(Config.token);
    return () => {
      client?.logout();
    };
  }, [client]);
}
