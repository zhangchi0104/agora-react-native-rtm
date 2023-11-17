import {
  MessageEvent,
  PresenceEvent,
  RTM_CONNECTION_CHANGE_REASON,
  RTM_CONNECTION_STATE,
  RTM_ERROR_CODE,
  RTM_MESSAGE_TYPE,
  StorageEvent,
} from 'agora-react-native-rtm';
import React, { useCallback, useEffect, useState } from 'react';

import BaseComponent from '../../components/BaseComponent';
import {
  AgoraButton,
  AgoraStyle,
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
   * Step 3 : publish message to message channel
   */
  const publish = () => {
    let result = client.publish(
      cName,
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
    client.addEventListener('onStorageEvent', onStorageEvent);
    client.addEventListener('onSubscribeResult', onSubscribeResult);
    client.addEventListener('onPresenceEvent', onPresenceEvent);
    client.addEventListener('onMessageEvent', onMessageEvent);

    return () => {
      client.removeEventListener('onStorageEvent', onStorageEvent);
      client.removeEventListener('onSubscribeResult', onSubscribeResult);
      client.removeEventListener('onPresenceEvent', onPresenceEvent);
      client.removeEventListener('onMessageEvent', onMessageEvent);
    };
  }, [
    client,
    uid,
    onStorageEvent,
    onSubscribeResult,
    onPresenceEvent,
    onMessageEvent,
  ]);

  const onConnectionStateChanged = useCallback(
    (
      channelName: string,
      state: RTM_CONNECTION_STATE,
      reason: RTM_CONNECTION_CHANGE_REASON
    ) => {
      log.log(
        'onConnectionStateChanged',
        'channelName',
        channelName,
        'state',
        state,
        'reason',
        reason
      );
      switch (state) {
        case RTM_CONNECTION_STATE.RTM_CONNECTION_STATE_CONNECTED:
          setLoginSuccess(true);
          break;
        case RTM_CONNECTION_STATE.RTM_CONNECTION_STATE_DISCONNECTED:
          if (
            reason ===
            RTM_CONNECTION_CHANGE_REASON.RTM_CONNECTION_CHANGED_LOGOUT
          ) {
            setLoginSuccess(false);
          }
          setSubscribeSuccess(false);
          break;
      }
    },
    []
  );
  useEffect(() => {
    client?.addEventListener(
      'onConnectionStateChanged',
      onConnectionStateChanged
    );
    return () => {
      client?.removeEventListener(
        'onConnectionStateChanged',
        onConnectionStateChanged
      );
    };
  }, [client, uid, onConnectionStateChanged]);

  return (
    <AgoraView style={AgoraStyle.fullWidth}>
      <BaseComponent
        onChannelNameChanged={(v) => setCName(v)}
        onUidChanged={(v) => setUid(v)}
      />
      <AgoraButton
        disabled={!loginSuccess}
        title={`${subscribeSuccess ? 'unsubscribe' : 'subscribe'}`}
        onPress={() => {
          subscribeSuccess ? unsubscribe() : subscribe();
        }}
      />
      <AgoraTextInput
        onChangeText={(text) => {
          setMessage(text);
        }}
        label="message"
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
    </AgoraView>
  );
}
