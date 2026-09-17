import { GcalEntityBase } from '../GcalEntityBase';
import type { GcalSDK } from '../GcalSDK';
import type { Stop } from '../GcalTypes';
declare class StopEntity extends GcalEntityBase<Stop> {
    constructor(client: GcalSDK, entopts: any);
    make(this: StopEntity): StopEntity;
}
export { StopEntity };
