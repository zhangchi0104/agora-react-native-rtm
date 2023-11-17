import {
  IStreamChannel,
  MessageEvent,
  PresenceEvent,
  RTM_ERROR_CODE,
  RTM_MESSAGE_TYPE,
  StorageEvent,
  TopicEvent,
} from 'agora-react-native-rtm';
import React, { useCallback, useEffect, useState } from 'react';

import {
  AgoraButton,
  AgoraCard,
  AgoraDivider,
  AgoraStyle,
  AgoraText,
  AgoraTextInput,
  AgoraView,
} from '../../components/ui';
import Config from '../../config/agora.config';
import { useRtmClient } from '../../hooks/useRtmClient';
import * as log from '../../utils/log';

export default function PublishMessage() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [cName, setCName] = useState<string>(Config.channelName);
  const [uid, setUid] = useState<string>(Config.uid);
  const [message, setMessage] = useState<string>('');
  const [publishRequestId, setPublishRequestId] = useState<number>(1);
  const [subscribeRequestId, setSubscribeRequestId] = useState<number>(2);

  const onLoginResult = useCallback((errorCode: RTM_ERROR_CODE) => {
    log.log('onLoginResult', 'errorCode', errorCode);
    setLoginSuccess(errorCode === RTM_ERROR_CODE.RTM_ERROR_OK);
  }, []);

  const onStorageEvent = useCallback((event: StorageEvent) => {
    log.log('onStorageEvent', 'event', event);
  }, []);

  const onSubscribeResult = useCallback(
    (requestId: number, channelName: string, errorCode: RTM_ERROR_CODE) => {
      log.log(
        'onStorageEvent',
        'requestId',
        requestId,
        'channelName',
        channelName,
        'errorCode',
        errorCode
      );
      setSubscribeSuccess(errorCode === RTM_ERROR_CODE.RTM_ERROR_OK);
    },
    []
  );

  const onPresenceEvent = useCallback((event: PresenceEvent) => {
    log.log('onStoragonPresenceEventeEvent', 'event', event);
  }, []);

  const onMessageEvent = useCallback((event: MessageEvent) => {
    log.log('onMessageEvent', 'event', event);
  }, []);

  /**
   * Step 1: getRtmClient
   */
  const client = useRtmClient();

  /**
   * Step 2: initialize rtm client and login
   */
  useEffect(() => {
    if (!uid || uid.length === 0) {
      return;
    }
    client.initialize({
      userId: uid,
      appId: Config.appId,
    });

    return () => {
      setLoginSuccess(false);
      client.release();
    };
  }, [client, uid]);

  /**
   * Step 3 : publish message to message channel
   */
  const publish = () => {
    let result = client.publish(
      Config.channelName,
      message,
      message.length,
      {
        type: RTM_MESSAGE_TYPE.RTM_MESSAGE_TYPE_STRING,
      },
      publishRequestId
    );
    if (result !== RTM_ERROR_CODE.RTM_ERROR_OK) {
      log.error('CHANNEL_INVALID_MESSAGE', result);
    }
  };

  /**
   * Step 4 : subscribe message channel
   */
  const subscribe = () => {
    client.subscribe(
      Config.channelName,
      {
        withMessage: true,
        withMetadata: true,
        withPresence: true,
      },
      subscribeRequestId
    );
  };

  /**
   * Step 5 : unsubscribe message channel
   */
  const unsubscribe = () => {
    client.unsubscribe(Config.channelName);
    setSubscribeSuccess(false);
  };

  useEffect(() => {
    client.addEventListener('onLoginResult', onLoginResult);
    client.addEventListener('onStorageEvent', onStorageEvent);
    client.addEventListener('onSubscribeResult', onSubscribeResult);
    client.addEventListener('onPresenceEvent', onPresenceEvent);
    client.addEventListener('onMessageEvent', onMessageEvent);

    return () => {
      client.removeEventListener('onLoginResult', onLoginResult);
      client.removeEventListener('onStorageEvent', onStorageEvent);
      client.removeEventListener('onSubscribeResult', onSubscribeResult);
      client.removeEventListener('onPresenceEvent', onPresenceEvent);
      client.removeEventListener('onMessageEvent', onMessageEvent);
    };
  }, [
    client,
    uid,
    onLoginResult,
    onStorageEvent,
    onSubscribeResult,
    onPresenceEvent,
    onMessageEvent,
  ]);

  /**
   * Step 3: login to rtm
   */
  const login = () => {
    client.login(Config.token);
  };

  /**
   * Step 4 (Optional): logout
   */
  const logout = () => {
    unsubscribe();
    client.logout();
    setLoginSuccess(false);
  };

  return (
    <AgoraView style={AgoraStyle.fullWidth}>
      <AgoraTextInput
        onChangeText={(text) => {
          setUid(text);
        }}
        placeholder="please input userId"
        label="userId"
        value={uid}
      />
      <AgoraButton
        title={`${loginSuccess ? 'logout' : 'login'}`}
        onPress={() => {
          loginSuccess ? logout() : login();
        }}
      />
      <AgoraTextInput
        onChangeText={(text) => {
          setMessage(text);
        }}
        placeholder="please input message"
        value={message}
      />
      <AgoraButton
        disabled={!loginSuccess}
        title={`publish message`}
        onPress={() => {
          publish();
        }}
      />
      <AgoraTextInput
        onChangeText={(text) => {
          setCName(text);
        }}
        placeholder="please input channelName"
        value={cName}
      />
      <AgoraButton
        disabled={!loginSuccess}
        title={`${subscribeSuccess ? 'unsubscribe' : 'subscribe'}`}
        onPress={() => {
          subscribeSuccess ? unsubscribe() : subscribe();
        }}
      />
    </AgoraView>
  );
}
