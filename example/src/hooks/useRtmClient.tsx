import {
  IRtmClient,
  RtmConfig,
  createAgoraRtmClient,
  //   ChannelProfileType,
  //   ErrorCodeType,
  //   IRtcEngineEx,
  //   RtcConnection,
  //   RtcStats,
  //   UserOfflineReasonType,
} from 'agora-react-native-rtm';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { AgoraRTMContext } from '../components/RtmProvider';
import Config from '../config/agora.config';

// const useRtmClient = (rtmConfig: RtmConfig) => {
//   const [appId] = useState(Config.appId);
//   //   const [token] = useState(Config.token);
//   const [client, setClient] = useState<IRtmClient>();
//   //   const [joinChannelSuccess, setJoinChannelSuccess] = useState(false);
//   //   const [remoteUsers, setRemoteUsers] = useState<number[]>([]);
//   //   const [startPreview, setStartPreview] = useState(false);
//   // const client = useRef<IRtmClient>(createAgoraRtmClient());
//   // const initRtmClient = useCallback(async () => {
//   // client.initialize(rtmConfig);
//   // // }, [rtmConfig]);
//   // useEffect(() => {
//   //   (async () => {
//   //     await initRtmClient();
//   //   })();
//   //   const clientCopy = client.current;
//   //   return () => {
//   //     clientCopy.release();
//   //   };
//   // }, [client, initRtmClient]);
//   return {
//     client,
//   };
// };

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
