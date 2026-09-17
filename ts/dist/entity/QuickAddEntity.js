"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickAddEntity = void 0;
const GcalEntityBase_1 = require("../GcalEntityBase");
// TODO: needs Entity superclass
class QuickAddEntity extends GcalEntityBase_1.GcalEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'quick_add';
        this.name_ = 'quick_add';
        this.Name = 'QuickAdd';
    }
    make() {
        return new QuickAddEntity(this._client, this.entopts());
    }
}
exports.QuickAddEntity = QuickAddEntity;
//# sourceMappingURL=QuickAddEntity.js.map