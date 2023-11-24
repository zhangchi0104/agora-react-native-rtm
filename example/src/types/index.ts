import { IMessage } from 'react-native-gifted-chat';

export interface AgoraMessage extends IMessage {
  requestId?: number;
}
