import {
  ChannelInfo,
  LockDetail,
  PublishOptions,
  RTM_AREA_CODE,
  RTM_CHANNEL_TYPE,
  RTM_CONNECTION_CHANGE_REASON,
  RTM_CONNECTION_STATE,
  RTM_ERROR_CODE,
  RTM_LOCK_EVENT_TYPE,
  RTM_MESSAGE_TYPE,
  RTM_PRESENCE_EVENT_TYPE,
  RTM_STORAGE_EVENT_TYPE,
  RTM_STORAGE_TYPE,
  RTM_TOPIC_EVENT_TYPE,
  RtmEncryptionConfig,
  RtmLogConfig,
  RtmProxyConfig,
  StateItem,
  SubscribeOptions,
  TopicInfo,
  UserList,
  UserState,
} from './AgoraRtmBase';
import { IRtmLock } from './IAgoraRtmLock';
import { IRtmPresence } from './IAgoraRtmPresence';
import { IMetadata, IRtmStorage } from './IAgoraRtmStorage';
import { IStreamChannel } from './IAgoraStreamChannel';

/// Generated by terra, DO NOT MODIFY BY HAND.

/**
 *  Configurations for RTM Client.
 */
export class RtmConfig {
  appId?: string;
  userId?: string;
  areaCode?: RTM_AREA_CODE = RTM_AREA_CODE.RTM_AREA_CODE_GLOB;
  presenceTimeout?: number = 300;
  context?: void[];
  useStringUserId?: boolean = true;
  eventHandler?: IRtmEventHandler;
  logConfig?: RtmLogConfig;
  proxyConfig?: RtmProxyConfig;
  encryptionConfig?: RtmEncryptionConfig;
  constructor(
    props?: Partial<{
      appId?: string;
      userId?: string;
      areaCode?: RTM_AREA_CODE;
      presenceTimeout?: number;
      context?: void[];
      useStringUserId?: boolean;
      eventHandler?: IRtmEventHandler;
      logConfig?: RtmLogConfig;
      proxyConfig?: RtmProxyConfig;
      encryptionConfig?: RtmEncryptionConfig;
    }>
  ) {
    Object.assign(this, props);
  }
}

export class MessageEvent {
  channelType?: RTM_CHANNEL_TYPE;
  messageType?: RTM_MESSAGE_TYPE;
  channelName?: string;
  channelTopic?: string;
  message?: string;
  messageLength?: number;
  publisher?: string;
  customType?: string;
  constructor(
    props?: Partial<{
      channelType?: RTM_CHANNEL_TYPE;
      messageType?: RTM_MESSAGE_TYPE;
      channelName?: string;
      channelTopic?: string;
      message?: string;
      messageLength?: number;
      publisher?: string;
      customType?: string;
    }>
  ) {
    Object.assign(this, props);
  }
}

export class IntervalInfo {
  joinUserList?: UserList;
  leaveUserList?: UserList;
  timeoutUserList?: UserList;
  userStateList?: UserState[];
  userStateCount?: number;
  constructor(
    props?: Partial<{
      joinUserList?: UserList;
      leaveUserList?: UserList;
      timeoutUserList?: UserList;
      userStateList?: UserState[];
      userStateCount?: number;
    }>
  ) {
    Object.assign(this, props);
  }
}

export class TopicEvent {
  type?: RTM_TOPIC_EVENT_TYPE;
  channelName?: string;
  publisher?: string;
  topicInfos?: TopicInfo[];
  topicInfoCount?: number;
  constructor(
    props?: Partial<{
      type?: RTM_TOPIC_EVENT_TYPE;
      channelName?: string;
      publisher?: string;
      topicInfos?: TopicInfo[];
      topicInfoCount?: number;
    }>
  ) {
    Object.assign(this, props);
  }
}

export class SnapshotInfo {
  userStateList?: UserState[];
  userCount?: number;
  constructor(
    props?: Partial<{
      userStateList?: UserState[];
      userCount?: number;
    }>
  ) {
    Object.assign(this, props);
  }
}

export class PresenceEvent {
  type?: RTM_PRESENCE_EVENT_TYPE;
  channelType?: RTM_CHANNEL_TYPE;
  channelName?: string;
  publisher?: string;
  stateItems?: StateItem[];
  stateItemCount?: number;
  interval?: IntervalInfo;
  snapshot?: SnapshotInfo;
  constructor(
    props?: Partial<{
      type?: RTM_PRESENCE_EVENT_TYPE;
      channelType?: RTM_CHANNEL_TYPE;
      channelName?: string;
      publisher?: string;
      stateItems?: StateItem[];
      stateItemCount?: number;
      interval?: IntervalInfo;
      snapshot?: SnapshotInfo;
    }>
  ) {
    Object.assign(this, props);
  }
}

export class LockEvent {
  channelType?: RTM_CHANNEL_TYPE;
  eventType?: RTM_LOCK_EVENT_TYPE;
  channelName?: string;
  lockDetailList?: LockDetail[];
  count?: number;
  constructor(
    props?: Partial<{
      channelType?: RTM_CHANNEL_TYPE;
      eventType?: RTM_LOCK_EVENT_TYPE;
      channelName?: string;
      lockDetailList?: LockDetail[];
      count?: number;
    }>
  ) {
    Object.assign(this, props);
  }
}

export class StorageEvent {
  channelType?: RTM_CHANNEL_TYPE;
  storageType?: RTM_STORAGE_TYPE;
  eventType?: RTM_STORAGE_EVENT_TYPE;
  target?: string;
  data?: IMetadata[];
  constructor(
    props?: Partial<{
      channelType?: RTM_CHANNEL_TYPE;
      storageType?: RTM_STORAGE_TYPE;
      eventType?: RTM_STORAGE_EVENT_TYPE;
      target?: string;
      data?: IMetadata[];
    }>
  ) {
    Object.assign(this, props);
  }
}

/**
 * The IRtmEventHandler class.
 *
 * The SDK uses this class to send callback event notifications to the app, and the app inherits
 * the methods in this class to retrieve these event notifications.
 *
 * All methods in this class have their default (empty)  implementations, and the app can inherit
 * only some of the required events instead of all. In the callback methods, the app should avoid
 * time-consuming tasks or calling blocking APIs, otherwise the SDK may not work properly.
 */
export interface IRtmEventHandler {
  onMessageEvent?(event: MessageEvent): void;
  onPresenceEvent?(event: PresenceEvent): void;
  onTopicEvent?(event: TopicEvent): void;
  onLockEvent?(event: LockEvent): void;
  onStorageEvent?(event: StorageEvent): void;
  onJoinResult?(
    requestId: number,
    channelName: string,
    userId: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onLeaveResult?(
    requestId: number,
    channelName: string,
    userId: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onJoinTopicResult?(
    requestId: number,
    channelName: string,
    userId: string,
    topic: string,
    meta: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onLeaveTopicResult?(
    requestId: number,
    channelName: string,
    userId: string,
    topic: string,
    meta: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onSubscribeTopicResult?(
    requestId: number,
    channelName: string,
    userId: string,
    topic: string,
    succeedUsers: UserList,
    failedUsers: UserList,
    errorCode: RTM_ERROR_CODE
  ): void;
  onConnectionStateChanged?(
    channelName: string,
    state: RTM_CONNECTION_STATE,
    reason: RTM_CONNECTION_CHANGE_REASON
  ): void;
  onTokenPrivilegeWillExpire?(channelName: string): void;
  onSubscribeResult?(
    requestId: number,
    channelName: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onPublishResult?(requestId: number, errorCode: RTM_ERROR_CODE): void;
  onLoginResult?(errorCode: RTM_ERROR_CODE): void;
  onSetChannelMetadataResult?(
    requestId: number,
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    errorCode: RTM_ERROR_CODE
  ): void;
  onUpdateChannelMetadataResult?(
    requestId: number,
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    errorCode: RTM_ERROR_CODE
  ): void;
  onRemoveChannelMetadataResult?(
    requestId: number,
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    errorCode: RTM_ERROR_CODE
  ): void;
  onGetChannelMetadataResult?(
    requestId: number,
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    data: IMetadata,
    errorCode: RTM_ERROR_CODE
  ): void;
  onSetUserMetadataResult?(
    requestId: number,
    userId: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onUpdateUserMetadataResult?(
    requestId: number,
    userId: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onRemoveUserMetadataResult?(
    requestId: number,
    userId: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onGetUserMetadataResult?(
    requestId: number,
    userId: string,
    data: IMetadata,
    errorCode: RTM_ERROR_CODE
  ): void;
  onSubscribeUserMetadataResult?(
    requestId: number,
    userId: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onSetLockResult?(
    requestId: number,
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    lockName: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onRemoveLockResult?(
    requestId: number,
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    lockName: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onReleaseLockResult?(
    requestId: number,
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    lockName: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onAcquireLockResult?(
    requestId: number,
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    lockName: string,
    errorCode: RTM_ERROR_CODE,
    errorDetails: string
  ): void;
  onRevokeLockResult?(
    requestId: number,
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    lockName: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onGetLocksResult?(
    requestId: number,
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    lockDetailList: LockDetail[],
    count: number,
    errorCode: RTM_ERROR_CODE
  ): void;
  onWhoNowResult?(
    requestId: number,
    userStateList: UserState[],
    count: number,
    nextPage: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onGetOnlineUsersResult?(
    requestId: number,
    userStateList: UserState[],
    count: number,
    nextPage: string,
    errorCode: RTM_ERROR_CODE
  ): void;
  onWhereNowResult?(
    requestId: number,
    channels: ChannelInfo[],
    count: number,
    errorCode: RTM_ERROR_CODE
  ): void;
  onGetUserChannelsResult?(
    requestId: number,
    channels: ChannelInfo[],
    count: number,
    errorCode: RTM_ERROR_CODE
  ): void;
  onPresenceSetStateResult?(requestId: number, errorCode: RTM_ERROR_CODE): void;
  onPresenceRemoveStateResult?(
    requestId: number,
    errorCode: RTM_ERROR_CODE
  ): void;
  onPresenceGetStateResult?(
    requestId: number,
    state: UserState,
    errorCode: RTM_ERROR_CODE
  ): void;
}

/**
 * The IRtmClient class.
 *
 * This class provides the main methods that can be invoked by your app.
 *
 * IRtmClient is the basic interface class of the Agora RTM SDK.
 * Creating an IRtmClient object and then calling the methods of
 * this object enables you to use Agora RTM SDK's functionality.
 */
export abstract class IRtmClient {
  abstract initialize(config: RtmConfig): number;
  abstract release(): number;
  abstract login(token: string): number;
  abstract logout(): number;
  abstract getStorage(): IRtmStorage[];
  abstract getLock(): IRtmLock[];
  abstract getPresence(): IRtmPresence[];
  abstract renewToken(token: string): number;
  abstract publish(
    channelName: string,
    message: string,
    length: number,
    option: PublishOptions,
    requestId?: number
  ): number;
  abstract subscribe(
    channelName: string,
    options: SubscribeOptions,
    requestId?: number
  ): number;
  abstract unsubscribe(channelName: string): number;
  abstract createStreamChannel(channelName: string): IStreamChannel;
  abstract setParameters(parameters: string): number;
  abstract publishWithBuffer(
    channelName: string,
    message: Uint8Array,
    length: number,
    option: PublishOptions,
    requestId: number
  ): number;
}
