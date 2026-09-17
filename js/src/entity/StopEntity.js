
const { inspect } = require('node:util')

const { GcalEntityBase } = require('../GcalEntityBase')


// TODO: needs Entity superclass
class StopEntity extends GcalEntityBase {

  constructor(client, entopts) {
    super(client, entopts)
    this.name = 'stop'
    this.name_ = 'stop'
    this.Name = 'Stop'
  }


  make() {
    return new StopEntity(this._client, this.entopts())
  }







}


module.exports = {
  StopEntity
}
