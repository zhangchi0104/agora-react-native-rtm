import { IRtmClient } from 'agora-react-native-rtm';
import { useContext } from 'react';

import { AgoraRTMContext } from '../components/RtmProvider';

function useOptionalRTMClient(client?: IRtmClient | null): IRtmClient | null {
  const clientFromContext = useContext(AgoraRTMContext);
  return client || clientFromContext;
}

export function useRtmClient(client?: IRtmClient | null): IRtmClient {
  const resolvedClient = useOptionalRTMClient(client);

  if (!resolvedClient) {
    throw new Error(
      'Agora RTM client not found. Should be wrapped in <AgoraRTMProvider value={client} />'
    );
  }

  return resolvedClient;
}
