import { AclEntity } from './entity/AclEntity';
import { CalendarEntity } from './entity/CalendarEntity';
import { CalendarListEntity } from './entity/CalendarListEntity';
import { ChannelEntity } from './entity/ChannelEntity';
import { ColorEntity } from './entity/ColorEntity';
import { EventEntity } from './entity/EventEntity';
import { FreeBusyEntity } from './entity/FreeBusyEntity';
import { ImportEntity } from './entity/ImportEntity';
import { QuickAddEntity } from './entity/QuickAddEntity';
import { SettingEntity } from './entity/SettingEntity';
import { StopEntity } from './entity/StopEntity';
import { WatchEntity } from './entity/WatchEntity';
export type * from './GcalTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { GcalEntityBase } from './GcalEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class GcalSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Acl(entopts?: Record<string, any>): AclEntity;
    Calendar(entopts?: Record<string, any>): CalendarEntity;
    CalendarList(entopts?: Record<string, any>): CalendarListEntity;
    Channel(entopts?: Record<string, any>): ChannelEntity;
    Color(entopts?: Record<string, any>): ColorEntity;
    Event(entopts?: Record<string, any>): EventEntity;
    FreeBusy(entopts?: Record<string, any>): FreeBusyEntity;
    Import(entopts?: Record<string, any>): ImportEntity;
    QuickAdd(entopts?: Record<string, any>): QuickAddEntity;
    Setting(entopts?: Record<string, any>): SettingEntity;
    Stop(entopts?: Record<string, any>): StopEntity;
    Watch(entopts?: Record<string, any>): WatchEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): GcalSDK;
    tester(testopts?: any, sdkopts?: any): GcalSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof GcalSDK;
export { stdutil, config, BaseFeature, GcalEntityBase, GcalSDK, SDK, };
