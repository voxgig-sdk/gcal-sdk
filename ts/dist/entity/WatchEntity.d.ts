import { GcalEntityBase } from '../GcalEntityBase';
import type { GcalSDK } from '../GcalSDK';
import type { Watch } from '../GcalTypes';
declare class WatchEntity extends GcalEntityBase<Watch> {
    constructor(client: GcalSDK, entopts: any);
    make(this: WatchEntity): WatchEntity;
}
export { WatchEntity };
