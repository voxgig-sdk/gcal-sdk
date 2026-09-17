"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopEntity = void 0;
const GcalEntityBase_1 = require("../GcalEntityBase");
// TODO: needs Entity superclass
class StopEntity extends GcalEntityBase_1.GcalEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'stop';
        this.name_ = 'stop';
        this.Name = 'Stop';
    }
    make() {
        return new StopEntity(this._client, this.entopts());
    }
}
exports.StopEntity = StopEntity;
//# sourceMappingURL=StopEntity.js.map