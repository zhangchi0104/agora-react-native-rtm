import { IStreamChannel } from '../IAgoraStreamChannel';
import { IStreamChannelImpl } from '../impl/IAgoraStreamChannelImpl';

export class StreamChannelInternal extends IStreamChannelImpl {
  private readonly _streamChannel: IStreamChannel;

  constructor(streamChannel: IStreamChannel) {
    super();
    this._streamChannel = streamChannel;
  }

  protected override getApiTypeFromPublishTopicMessageWithBuffer(): string {
    return 'StreamChannel_publishTopicMessage';
  }
}
