import { GcalEntityBase } from '../GcalEntityBase';
import type { GcalSDK } from '../GcalSDK';
import type { Control } from '../types';
import type { CalendarList, CalendarListLoadMatch, CalendarListListMatch, CalendarListCreateData, CalendarListUpdateData, CalendarListRemoveMatch } from '../GcalTypes';
declare class CalendarListEntity extends GcalEntityBase<CalendarList> {
    constructor(client: GcalSDK, entopts: any);
    make(this: CalendarListEntity): CalendarListEntity;
    load(this: any, reqmatch?: CalendarListLoadMatch, ctrl?: Control): Promise<CalendarListEntity>;
    list(this: any, reqmatch?: CalendarListListMatch, ctrl?: Control): Promise<CalendarListEntity[]>;
    create(this: any, reqdata?: CalendarListCreateData, ctrl?: Control): Promise<CalendarListEntity>;
    update(this: any, reqdata?: CalendarListUpdateData, ctrl?: Control): Promise<CalendarListEntity>;
    remove(this: any, reqmatch?: CalendarListRemoveMatch, ctrl?: Control): Promise<CalendarListEntity>;
}
export { CalendarListEntity };
