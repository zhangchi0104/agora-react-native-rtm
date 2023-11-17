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
} from '../components/ui';
import Config from '../config/agora.config';
import { useRtmClient } from '../hooks/useRtmClient';
import * as log from '../utils/log';

export default function BaseComponent() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [cName, setCName] = useState<string>(Config.channelName);
  const [uid, setUid] = useState<string>(Config.uid);

  const onLoginResult = useCallback((errorCode: RTM_ERROR_CODE) => {
    log.log('onLoginResult', 'errorCode', errorCode);
    setLoginSuccess(errorCode === RTM_ERROR_CODE.RTM_ERROR_OK);
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
   * Step 5 : unsubscribe message channel
   */
  const unsubscribe = () => {
    client.unsubscribe(Config.channelName);
    setSubscribeSuccess(false);
  };

  useEffect(() => {
    client.addEventListener('onLoginResult', onLoginResult);

    return () => {
      client.removeEventListener('onLoginResult', onLoginResult);
    };
  }, [client, uid, onLoginResult]);

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
          setCName(text);
        }}
        placeholder="please input channelName"
        value={cName}
      />
    </AgoraView>
  );
}
