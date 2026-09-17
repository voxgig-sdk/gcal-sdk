
const { inspect } = require('node:util')

const { GcalEntityBase } = require('../GcalEntityBase')


// TODO: needs Entity superclass
class ImportEntity extends GcalEntityBase {

  constructor(client, entopts) {
    super(client, entopts)
    this.name = 'import'
    this.name_ = 'import'
    this.Name = 'Import'
  }


  make() {
    return new ImportEntity(this._client, this.entopts())
  }







}


module.exports = {
  ImportEntity
}
