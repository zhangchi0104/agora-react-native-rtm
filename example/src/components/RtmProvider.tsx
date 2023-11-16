import { IRtmClient } from 'agora-react-native-rtm';
import React, { ReactNode, createContext } from 'react';

export interface AgoraRTMProviderProps {
  readonly client: IRtmClient;
  readonly children?: ReactNode;
}

export const AgoraRTMContext = /* @__PURE__ */ createContext<IRtmClient | null>(
  null
);

export function AgoraRTMProvider({ client, children }: AgoraRTMProviderProps) {
  return (
    <AgoraRTMContext.Provider value={client}>
      {children}
    </AgoraRTMContext.Provider>
  );
}
