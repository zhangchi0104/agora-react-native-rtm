import React, { ReactElement, memo } from 'react';

import { AgoraCard, AgoraList, AgoraStyle } from './ui';

export interface BaseRenderUsersProps {
  enableVideo: boolean;
  startPreview?: boolean;
  joinChannelSuccess: boolean;
  remoteUsers: number[];
  // renderUser?: (user: VideoCanvas) => ReactElement | undefined;
  // renderVideo?: (user: VideoCanvas) => ReactElement | undefined;
}

function BaseRenderUsers({}: BaseRenderUsersProps) {
  return <></>;
}

export default memo(BaseRenderUsers);
