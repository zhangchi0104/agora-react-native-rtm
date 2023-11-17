import { RTM_ERROR_CODE } from 'agora-react-native-rtm';
import React, { useCallback, useEffect, useState } from 'react';

import { KeyboardAvoidingView, Platform } from 'react-native';

import Client from '../../components/Client';
import {
  AgoraButton,
  AgoraStyle,
  AgoraText,
  AgoraTextInput,
  AgoraView,
} from '../../components/ui';
import Config from '../../config/agora.config';
import { useRtmClient } from '../../hooks/useRtmClient';
import * as log from '../../utils/log';

export default function Login() {
  const [uid, setUid] = useState(Config.uid);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const onLoginResult = useCallback((errorCode: RTM_ERROR_CODE) => {
    log.log('onLoginResult', errorCode);
    setLoginSuccess(errorCode === RTM_ERROR_CODE.RTM_ERROR_OK);
  }, []);

  /**
   * Step 1: getRtmClient
   */
  const client = useRtmClient();

  /**
   * Step 2: initialize rtm client
   */
  useEffect(() => {
    client.initialize({
      userId: uid,
      appId: Config.appId,
      eventHandler: {
        onLoginResult: () => {
          console.log('onLoginResult');
        },
      },
    });
    return () => {
      client.release();
    };
  }, [client, onLoginResult, uid]);

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
    client.logout();
    setLoginSuccess(false);
  };

  const onUidChange = (value: string) => {
    setUid(value);
  };

  useEffect(() => {
    client?.addEventListener('onLoginResult', onLoginResult);

    return () => {
      client?.removeEventListener('onLoginResult', onLoginResult);
    };
  }, [client, onLoginResult]);

  return (
    <Client>
      <KeyboardAvoidingView
        style={AgoraStyle.fullSize}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <AgoraView style={AgoraStyle.fullWidth}>
          {loginSuccess ? (
            <AgoraText>{`current login userId:\n${uid}`}</AgoraText>
          ) : (
            <AgoraTextInput
              onChangeText={(text) => {
                onUidChange(text);
              }}
              label="userId"
              value={uid}
            />
          )}
          <AgoraButton
            title={`${loginSuccess ? 'logout' : 'login'}`}
            onPress={() => {
              loginSuccess ? logout() : login();
            }}
          />
        </AgoraView>
      </KeyboardAvoidingView>
    </Client>
  );
}
