
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
  Stop,
} from '../GcalTypes'

// TODO: needs Entity superclass
class StopEntity extends GcalEntityBase<Stop> {

  constructor(client: GcalSDK, entopts: any) {
    super(client, entopts)
    this.name = 'stop'
    this.name_ = 'stop'
    this.Name = 'Stop'
  }


  make(this: StopEntity) {
    return new StopEntity(this._client, this.entopts())
  }







}


export {
  StopEntity
}
