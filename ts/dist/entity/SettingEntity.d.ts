import { GcalEntityBase } from '../GcalEntityBase';
import type { GcalSDK } from '../GcalSDK';
import type { Control } from '../types';
import type { Setting, SettingLoadMatch, SettingListMatch, SettingCreateData } from '../GcalTypes';
declare class SettingEntity extends GcalEntityBase<Setting> {
    constructor(client: GcalSDK, entopts: any);
    make(this: SettingEntity): SettingEntity;
    load(this: any, reqmatch?: SettingLoadMatch, ctrl?: Control): Promise<SettingEntity>;
    list(this: any, reqmatch?: SettingListMatch, ctrl?: Control): Promise<SettingEntity[]>;
    create(this: any, reqdata?: SettingCreateData, ctrl?: Control): Promise<SettingEntity>;
}
export { SettingEntity };
