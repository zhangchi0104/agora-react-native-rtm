import { IRtmClient, createAgoraRtmClient } from 'agora-react-native-rtm';
import type { ReactNode } from 'react';
import React, { useState } from 'react';

import { AgoraRTMProvider } from './RtmProvider';

interface ClientProps {
  children: ReactNode;
}

export const Client = ({ children }: ClientProps) => {
  const [client] = useState<IRtmClient>(() => createAgoraRtmClient());
  return <AgoraRTMProvider client={client}>{children}</AgoraRTMProvider>;
};

export default Client;
