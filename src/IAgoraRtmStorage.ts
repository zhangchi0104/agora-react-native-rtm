import { RTM_CHANNEL_TYPE } from './AgoraRtmBase';

/// Generated by terra, DO NOT MODIFY BY HAND.

/**
 * Metadata options.
 */
export class MetadataOptions {
  /**
   * Indicates whether or not to notify server update the modify timestamp of metadata
   */
  recordTs?: boolean = false;
  /**
   * Indicates whether or not to notify server update the modify user id of metadata
   */
  recordUserId?: boolean = false;
  constructor(
    props?: Partial<{
      recordTs?: boolean;
      recordUserId?: boolean;
    }>
  ) {
    Object.assign(this, props);
  }
}

export class MetadataItem {
  /**
   * The key of the metadata item.
   */
  key?: string;
  /**
   * The value of the metadata item.
   */
  value?: string;
  /**
   * The User ID of the user who makes the latest update to the metadata item.
   */
  authorUserId?: string;
  /**
   * The revision of the metadata item.
   */
  revision?: number = -1;
  /**
   * The Timestamp when the metadata item was last updated.
   */
  updateTs?: number = 0;
  constructor(
    props?: Partial<{
      key?: string;
      value?: string;
      authorUserId?: string;
      revision?: number;
      updateTs?: number;
    }>
  ) {
    Object.assign(this, props);
  }
}

export abstract class IRtmStorage {
  /**
  Creates the metadata object and returns the pointer.
* @return Pointer of the metadata object.
  */
  abstract createMetadata(): RtmMetadata;
  /**
   * Set the metadata of a specified channel.
   *
   * @param [in] channelName The name of the channel.
   * @param [in] channelType Which channel type, RTM_CHANNEL_TYPE_STREAM or RTM_CHANNEL_TYPE_MESSAGE.
   * @param [in] data Metadata data.
   * @param [in] options The options of operate metadata.
   * @param [in] lock lock for operate channel metadata.
   * @param [out] requestId The unique ID of this request.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract setChannelMetadata(
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    data: RtmMetadata,
    options: MetadataOptions,
    lockName: string,
    requestId?: number
  ): number;
  /**
   * Update the metadata of a specified channel.
   *
   * @param [in] channelName The channel Name of the specified channel.
   * @param [in] channelType Which channel type, RTM_CHANNEL_TYPE_STREAM or RTM_CHANNEL_TYPE_MESSAGE.
   * @param [in] data Metadata data.
   * @param [in] options The options of operate metadata.
   * @param [in] lock lock for operate channel metadata.
   * @param [out] requestId The unique ID of this request.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract updateChannelMetadata(
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    data: RtmMetadata,
    options: MetadataOptions,
    lockName: string,
    requestId?: number
  ): number;
  /**
   * Remove the metadata of a specified channel.
   *
   * @param [in] channelName The channel Name of the specified channel.
   * @param [in] channelType Which channel type, RTM_CHANNEL_TYPE_STREAM or RTM_CHANNEL_TYPE_MESSAGE.
   * @param [in] data Metadata data.
   * @param [in] options The options of operate metadata.
   * @param [in] lock lock for operate channel metadata.
   * @param [out] requestId The unique ID of this request.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract removeChannelMetadata(
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    data: RtmMetadata,
    options: MetadataOptions,
    lockName: string,
    requestId?: number
  ): number;
  /**
   * Get the metadata of a specified channel.
   *
   * @param [in] channelName The channel Name of the specified channel.
   * @param [in] channelType Which channel type, RTM_CHANNEL_TYPE_STREAM or RTM_CHANNEL_TYPE_MESSAGE.
   * @param requestId The unique ID of this request.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract getChannelMetadata(
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    requestId?: number
  ): number;
  /**
   * Set the metadata of a specified user.
   *
   * @param [in] userId The user ID of the specified user.
   * @param [in] data Metadata data.
   * @param [in] options The options of operate metadata.
   * @param [out] requestId The unique ID of this request.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract setUserMetadata(
    userId: string,
    data: RtmMetadata,
    options: MetadataOptions,
    requestId?: number
  ): number;
  /**
   * Update the metadata of a specified user.
   *
   * @param [in] userId The user ID of the specified user.
   * @param [in] data Metadata data.
   * @param [in] options The options of operate metadata.
   * @param [out] requestId The unique ID of this request.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract updateUserMetadata(
    userId: string,
    data: RtmMetadata,
    options: MetadataOptions,
    requestId?: number
  ): number;
  /**
   * Remove the metadata of a specified user.
   *
   * @param [in] userId The user ID of the specified user.
   * @param [in] data Metadata data.
   * @param [in] options The options of operate metadata.
   * @param [out] requestId The unique ID of this request.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract removeUserMetadata(
    userId: string,
    data: RtmMetadata,
    options: MetadataOptions,
    requestId?: number
  ): number;
  /**
   * Get the metadata of a specified user.
   *
   * @param [in] userId The user ID of the specified user.
   * @param [out] requestId The unique ID of this request.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract getUserMetadata(userId: string, requestId?: number): number;
  /**
   * Subscribe the metadata update event of a specified user.
   *
   * @param [in] userId The user ID of the specified user.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract subscribeUserMetadata(userId: string, requestId?: number): number;
  /**
   * unsubscribe the metadata update event of a specified user.
   *
   * @param [in] userId The user ID of the specified user.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract unsubscribeUserMetadata(userId: string): number;
}

export class RtmMetadata {
  /**
   * The key of the metadata item.
   */
  majorRevision?: number = -1;
  /**
   * The value of the metadata item.
   */
  metadataItems?: MetadataItem[];
  /**
   * The User ID of the user who makes the latest update to the metadata item.
   */
  metadataItemsSize?: number;
  constructor(
    props?: Partial<{
      majorRevision?: number;
      metadataItems?: MetadataItem[];
      metadataItemsSize?: number;
    }>
  ) {
    Object.assign(this, props);
  }
}
