import { IRtmEventHandler } from '../IAgoraRtmClient';

export type IRtmClientEvent = IRtmEventHandler;

declare module '../IAgoraRtmClient' {
  interface IRtmClient {
    /**
     * Adds one IRtmClientEvent listener.
     * After calling this method, you can listen for the corresponding events in the IRtcEngine object and obtain data through IRtmClientEvent. Depending on your project needs, you can add multiple listeners for the same event.
     *
     * @param eventType The name of the target event to listen for. See IRtmClientEvent.
     *
     * @param listener The callback function for eventType. Take adding a listener for onTopicEvent as an example: // Create an onTopicEvent object
     * const onTopicEvent = (connection: RtcConnection, elapsed: number) => {};
     * // Add one onTopicEvent listener
     * engine.addEventListener('onTopicEvent', onTopicEvent);
     */
    addEventListener<EventType extends keyof IRtmClientEvent>(
      eventType: EventType,
      listener: IRtmClientEvent[EventType]
    ): void;

    /**
     * Removes the specified IRtmClientEvent listener.
     * For listened events, if you no longer need to receive the callback message, you can call this method to remove the corresponding listener.
     *
     * @param eventType The name of the target event to listen for. See IRtmClientEvent.
     *
     * @param listener The callback function for eventType. Must pass in the same function object in addEventListener . Take removing the listener for onTopicEvent as an example: // Create an onTopicEvent object
     * const onTopicEvent = (connection: RtcConnection, elapsed: number) => {};
     * // Add one onTopicEvent listener
     * engine.addEventListener('onTopicEvent', onTopicEvent);
     * // Remove the onTopicEvent listener
     * engine.removeEventListener('onTopicEvent', onTopicEvent);
     */
    removeEventListener<EventType extends keyof IRtmClientEvent>(
      eventType: EventType,
      listener?: IRtmClientEvent[EventType]
    ): void;

    /**
     * Removes all listeners for the specified event.
     *
     * @param eventType The name of the target event to listen for. See IRtmClientEvent.
     */
    removeAllListeners<EventType extends keyof IRtmClientEvent>(
      eventType?: EventType
    ): void;
  }
}
