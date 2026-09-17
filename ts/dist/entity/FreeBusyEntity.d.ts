import { GcalEntityBase } from '../GcalEntityBase';
import type { GcalSDK } from '../GcalSDK';
import type { Control } from '../types';
import type { FreeBusy, FreeBusyCreateData } from '../GcalTypes';
declare class FreeBusyEntity extends GcalEntityBase<FreeBusy> {
    constructor(client: GcalSDK, entopts: any);
    make(this: FreeBusyEntity): FreeBusyEntity;
    create(this: any, reqdata?: FreeBusyCreateData, ctrl?: Control): Promise<FreeBusyEntity>;
}
export { FreeBusyEntity };
