
import { inspect } from 'node:util'

import { GcalEntityBase } from '../GcalEntityBase'

import type {
  GcalSDK,
} from '../GcalSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'

import type {
  Watch,
} from '../GcalTypes'

// TODO: needs Entity superclass
class WatchEntity extends GcalEntityBase<Watch> {

  constructor(client: GcalSDK, entopts: any) {
    super(client, entopts)
    this.name = 'watch'
    this.name_ = 'watch'
    this.Name = 'Watch'
  }


  make(this: WatchEntity) {
    return new WatchEntity(this._client, this.entopts())
  }







}


export {
  WatchEntity
}
