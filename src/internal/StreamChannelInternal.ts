import { IStreamChannelImpl } from '../impl/IAgoraStreamChannelImpl';

export class StreamChannelInternal extends IStreamChannelImpl {
  private readonly _channelName: string = '';

  constructor(channelName: string) {
    super();
    this._channelName = channelName;
  }

  get channelName(): string {
    return this._channelName;
  }

  protected override getApiTypeFromPublishTopicMessageWithBuffer(): string {
    return 'StreamChannel_publishTopicMessage';
  }
}
