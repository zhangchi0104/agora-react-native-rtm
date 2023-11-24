import {
  GetOnlineUsersOptions,
  PresenceOptions,
  RTM_CHANNEL_TYPE,
  StateItem,
} from './AgoraRtmBase';

/// Generated by terra, DO NOT MODIFY BY HAND.

/**
 * The IRtmPresence class.
 *
 * This class provides the rtm presence methods that can be invoked by your app.
 */
export abstract class IRtmPresence {
  /**
   * To query who joined this channel
   *
   * @param [in] channelName The name of the channel.
   * @param [in] channelType The type of the channel.
   * @param [in] options The query option.
   * @param [out] requestId The related request id of this operation.
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract whoNow(
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    options: PresenceOptions,
    requestId?: number
  ): number;
  /**
   * To query which channels the user joined
   *
   * @param [in] userId The id of the user.
   * @param [out] requestId The related request id of this operation.
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract whereNow(userId: string, requestId?: number): number;
  /**
   * Set user state
   *
   * @param [in] channelName The name of the channel.
   * @param [in] channelType The type of the channel.
   * @param [in] items The states item of user.
   * @param [in] count The count of states item.
   * @param [out] requestId The related request id of this operation.
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract setState(
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    items: StateItem[],
    count: number,
    requestId?: number
  ): number;
  /**
   * Delete user state
   *
   * @param [in] channelName The name of the channel.
   * @param [in] channelType The type of the channel.
   * @param [in] keys The keys of state item.
   * @param [in] count The count of keys.
   * @param [out] requestId The related request id of this operation.
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract removeState(
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    keys: string[],
    count: number,
    requestId?: number
  ): number;
  /**
   * Get user state
   *
   * @param [in] channelName The name of the channel.
   * @param [in] channelType The type of the channel.
   * @param [in] userId The id of the user.
   * @param [out] requestId The related request id of this operation.
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract getState(
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    userId: string,
    requestId?: number
  ): number;
  /**
   * To query who joined this channel
   *
   * @param [in] channelName The name of the channel.
   * @param [in] channelType The type of the channel.
   * @param [in] options The query option.
   * @param [out] requestId The related request id of this operation.
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract getOnlineUsers(
    channelName: string,
    channelType: RTM_CHANNEL_TYPE,
    options: GetOnlineUsersOptions,
    requestId?: number
  ): number;
  /**
   * To query which channels the user joined
   *
   * @param [in] userId The id of the user.
   * @param [out] requestId The related request id of this operation.
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  abstract getUserChannels(userId: string, requestId?: number): number;
}
