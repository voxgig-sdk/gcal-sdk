
const { inspect } = require('node:util')

const { GcalEntityBase } = require('../GcalEntityBase')


// TODO: needs Entity superclass
class QuickAddEntity extends GcalEntityBase {

  constructor(client, entopts) {
    super(client, entopts)
    this.name = 'quick_add'
    this.name_ = 'quick_add'
    this.Name = 'QuickAdd'
  }


  make() {
    return new QuickAddEntity(this._client, this.entopts())
  }







}


module.exports = {
  QuickAddEntity
}
