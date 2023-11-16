import { IRtmClient } from './IAgoraRtmClient';
export * from './AgoraRtmBase';
export * from './IAgoraRtmClient';
export * from './IAgoraRtmLock';
export * from './IAgoraRtmPresence';
export * from './IAgoraRtmService';
export * from './IAgoraRtmStorage';
export * from './IAgoraStreamChannel';
export {
  isDebuggable,
  setDebuggable,
  callIrisApi,
} from './internal/IrisRtmEngine';

import { RtmClientInternal } from './internal/RtmClientInternal';

const instance = new RtmClientInternal();

/**
 * Creates one IRtmClient object.
 *
 * Currently, the Agora RTM SDK v2.x supports creating only one IRtmClient object for each app.
 *
 * @returns
 * One IRtmClient object.
 */
export function createAgoraRtmClient(): IRtmClient {
  return instance;
}

export default createAgoraRtmClient;
