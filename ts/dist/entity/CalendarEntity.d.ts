import { GcalEntityBase } from '../GcalEntityBase';
import type { GcalSDK } from '../GcalSDK';
import type { Control } from '../types';
import type { Calendar, CalendarLoadMatch, CalendarCreateData, CalendarUpdateData, CalendarRemoveMatch } from '../GcalTypes';
declare class CalendarEntity extends GcalEntityBase<Calendar> {
    constructor(client: GcalSDK, entopts: any);
    make(this: CalendarEntity): CalendarEntity;
    load(this: any, reqmatch?: CalendarLoadMatch, ctrl?: Control): Promise<CalendarEntity>;
    create(this: any, reqdata?: CalendarCreateData, ctrl?: Control): Promise<CalendarEntity>;
    update(this: any, reqdata?: CalendarUpdateData, ctrl?: Control): Promise<CalendarEntity>;
    remove(this: any, reqmatch?: CalendarRemoveMatch, ctrl?: Control): Promise<CalendarEntity>;
}
export { CalendarEntity };
