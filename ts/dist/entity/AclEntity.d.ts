import { GcalEntityBase } from '../GcalEntityBase';
import type { GcalSDK } from '../GcalSDK';
import type { Control } from '../types';
import type { Acl, AclLoadMatch, AclListMatch, AclCreateData, AclUpdateData, AclRemoveMatch } from '../GcalTypes';
declare class AclEntity extends GcalEntityBase<Acl> {
    constructor(client: GcalSDK, entopts: any);
    make(this: AclEntity): AclEntity;
    load(this: any, reqmatch?: AclLoadMatch, ctrl?: Control): Promise<AclEntity>;
    list(this: any, reqmatch?: AclListMatch, ctrl?: Control): Promise<AclEntity[]>;
    create(this: any, reqdata?: AclCreateData, ctrl?: Control): Promise<AclEntity>;
    update(this: any, reqdata?: AclUpdateData, ctrl?: Control): Promise<AclEntity>;
    remove(this: any, reqmatch?: AclRemoveMatch, ctrl?: Control): Promise<AclEntity>;
}
export { AclEntity };
