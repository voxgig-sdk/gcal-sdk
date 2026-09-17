"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchEntity = void 0;
const GcalEntityBase_1 = require("../GcalEntityBase");
// TODO: needs Entity superclass
class WatchEntity extends GcalEntityBase_1.GcalEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'watch';
        this.name_ = 'watch';
        this.Name = 'Watch';
    }
    make() {
        return new WatchEntity(this._client, this.entopts());
    }
}
exports.WatchEntity = WatchEntity;
//# sourceMappingURL=WatchEntity.js.map