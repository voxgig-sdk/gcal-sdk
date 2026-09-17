"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportEntity = void 0;
const GcalEntityBase_1 = require("../GcalEntityBase");
// TODO: needs Entity superclass
class ImportEntity extends GcalEntityBase_1.GcalEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'import';
        this.name_ = 'import';
        this.Name = 'Import';
    }
    make() {
        return new ImportEntity(this._client, this.entopts());
    }
}
exports.ImportEntity = ImportEntity;
//# sourceMappingURL=ImportEntity.js.map