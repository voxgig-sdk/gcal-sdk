import { GcalEntityBase } from '../GcalEntityBase';
import type { GcalSDK } from '../GcalSDK';
import type { QuickAdd } from '../GcalTypes';
declare class QuickAddEntity extends GcalEntityBase<QuickAdd> {
    constructor(client: GcalSDK, entopts: any);
    make(this: QuickAddEntity): QuickAddEntity;
}
export { QuickAddEntity };
