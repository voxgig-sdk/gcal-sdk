import { GcalEntityBase } from '../GcalEntityBase';
import type { GcalSDK } from '../GcalSDK';
import type { Import } from '../GcalTypes';
declare class ImportEntity extends GcalEntityBase<Import> {
    constructor(client: GcalSDK, entopts: any);
    make(this: ImportEntity): ImportEntity;
}
export { ImportEntity };
