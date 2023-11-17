import {
  IStreamChannel,
  RTM_ERROR_CODE,
  TopicEvent,
} from 'agora-react-native-rtm';
import React, { useCallback, useEffect, useState } from 'react';

import {
  AgoraButton,
  AgoraStyle,
  AgoraText,
  AgoraView,
} from '../../components/ui';
import Config from '../../config/agora.config';
import { useRtmClient } from '../../hooks/useRtmClient';
import * as log from '../../utils/log';

export default function JoinStreamChannel() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [streamChannel, setStreamChannel] = useState<IStreamChannel>();
  const [cName, setCName] = useState<string>('');

  const onLoginResult = useCallback((errorCode: RTM_ERROR_CODE) => {
    log.info('onLoginResult', 'errorCode', errorCode);
    setLoginSuccess(errorCode === RTM_ERROR_CODE.RTM_ERROR_OK);
  }, []);

  const onJoinResult = useCallback(
    (
      requestId: number,
      channelName: string,
      userId: string,
      errorCode: RTM_ERROR_CODE
    ) => {
      log.info(
        'onJoinResult',
        'requestId',
        requestId,
        'channelName',
        channelName,
        'userId',
        userId,
        'errorCode',
        errorCode
      );
      setCName(channelName);
      setJoinSuccess(errorCode === RTM_ERROR_CODE.RTM_ERROR_OK);
    },
    []
  );

  const onLeaveResult = useCallback(
    (
      requestId: number,
      channelName: string,
      userId: string,
      errorCode: RTM_ERROR_CODE
    ) => {
      log.info(
        'onLeaveResult',
        'requestId',
        requestId,
        'channelName',
        channelName,
        'userId',
        userId,
        'errorCode',
        errorCode
      );
      setJoinSuccess(errorCode !== RTM_ERROR_CODE.RTM_ERROR_OK);
    },
    []
  );

  const onTopicEvent = useCallback((event: TopicEvent) => {
    log.info('onTopicEvent', 'event', event);
  }, []);

  /**
   * Step 1: getRtmClient
   */
  const client = useRtmClient();

  /**
   * Step 2: initialize rtm client and login
   */
  useEffect(() => {
    client.initialize({
      userId: Config.uid,
      appId: Config.appId,
    });

    client.login(Config.token);

    return () => {
      client.logout();
      client.release();
    };
  }, [client]);

  /**
   * Step 3 : createStreamChannel
   */
  const createStreamChannel = () => {
    if (joinSuccess) {
      log.error('already joined channel');
      return;
    }
    let result = client.createStreamChannel(Config.channelName);
    setStreamChannel(result);
  };

  /**
   * Step 4 : join
   */
  const join = () => {
    if (!streamChannel) {
      log.error('please create streamChannel first');
      return;
    }
    streamChannel.join(
      {
        token: Config.appId,
        withMetadata: true,
        withPresence: true,
      },
      1
    );
  };

  /**
   * Step 5 : leave
   */
  const leave = () => {
    if (streamChannel) {
      streamChannel.leave(0);
    }
  };

  /**
   * Step 6 : destroyStreamChannel
   */
  const destroyStreamChannel = () => {
    if (!streamChannel) {
      log.error('no streamChannel');
      return;
    }
    streamChannel.release();
    setStreamChannel(undefined);
  };

  useEffect(() => {
    setCName(streamChannel?.getChannelName() || '');
    return () => {
      setCName(streamChannel?.getChannelName() || '');
    };
  }, [streamChannel]);

  useEffect(() => {
    client.addEventListener('onLoginResult', onLoginResult);
    client.addEventListener('onJoinResult', onJoinResult);
    client.addEventListener('onLeaveResult', onLeaveResult);
    client.addEventListener('onTopicEvent', onTopicEvent);

    return () => {
      client.removeEventListener('onLoginResult', onLoginResult);
      client.removeEventListener('onJoinResult', onJoinResult);
      client.removeEventListener('onLeaveResult', onLeaveResult);
      client.removeEventListener('onTopicEvent', onTopicEvent);
    };
  }, [client, onLoginResult, onJoinResult, onLeaveResult, onTopicEvent]);

  return (
    <AgoraView style={AgoraStyle.fullWidth}>
      <AgoraText>{`current login userId:\n${Config.uid}`}</AgoraText>
      <AgoraText>{`current streamChannelName:\n${cName}`}</AgoraText>
      <AgoraButton
        disabled={!loginSuccess}
        title={`createStreamChannel`}
        onPress={() => {
          createStreamChannel();
        }}
      />
      <AgoraButton
        disabled={!loginSuccess}
        title={`${joinSuccess ? 'leave' : 'join'}`}
        onPress={() => {
          joinSuccess ? leave() : join();
        }}
      />
      <AgoraButton
        title={`destroyStreamChannel`}
        onPress={() => {
          destroyStreamChannel();
        }}
      />
    </AgoraView>
  );
}
