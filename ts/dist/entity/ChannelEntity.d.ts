import { GcalEntityBase } from '../GcalEntityBase';
import type { GcalSDK } from '../GcalSDK';
import type { Control } from '../types';
import type { Channel, ChannelCreateData } from '../GcalTypes';
declare class ChannelEntity extends GcalEntityBase<Channel> {
    constructor(client: GcalSDK, entopts: any);
    make(this: ChannelEntity): ChannelEntity;
    create(this: any, reqdata?: ChannelCreateData, ctrl?: Control): Promise<ChannelEntity>;
}
export { ChannelEntity };
