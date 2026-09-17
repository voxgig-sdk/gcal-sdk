import { GcalEntityBase } from '../GcalEntityBase';
import type { GcalSDK } from '../GcalSDK';
import type { Control } from '../types';
import type { Color, ColorLoadMatch } from '../GcalTypes';
declare class ColorEntity extends GcalEntityBase<Color> {
    constructor(client: GcalSDK, entopts: any);
    make(this: ColorEntity): ColorEntity;
    load(this: any, reqmatch?: ColorLoadMatch, ctrl?: Control): Promise<ColorEntity>;
}
export { ColorEntity };
