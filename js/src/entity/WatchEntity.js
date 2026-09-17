
const { inspect } = require('node:util')

const { GcalEntityBase } = require('../GcalEntityBase')


// TODO: needs Entity superclass
class WatchEntity extends GcalEntityBase {

  constructor(client, entopts) {
    super(client, entopts)
    this.name = 'watch'
    this.name_ = 'watch'
    this.Name = 'Watch'
  }


  make() {
    return new WatchEntity(this._client, this.entopts())
  }







}


module.exports = {
  WatchEntity
}
