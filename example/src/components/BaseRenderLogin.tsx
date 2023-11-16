import React, { memo } from 'react';

import { AgoraButton, AgoraTextInput } from './ui';

export interface BaseRenderLoginProps {
  uid: string;
  login: () => void;
  logout: () => void;
  joinChannelSuccess: boolean;
  onUidChange: (text: string) => void;
}

function BaseRenderLogin({
  uid,
  login,
  logout,
  joinChannelSuccess,
  onUidChange,
}: BaseRenderLoginProps) {
  return (
    <>
      <AgoraTextInput
        onChangeText={(text) => {
          onUidChange(text);
        }}
        label="uid"
        value={uid}
      />
      <AgoraButton
        title={`${joinChannelSuccess ? 'logout' : 'login'}`}
        onPress={() => {
          joinChannelSuccess ? logout() : login();
        }}
      />
    </>
  );
}

export default memo(BaseRenderLogin);
