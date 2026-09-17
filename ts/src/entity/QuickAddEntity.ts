
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
  QuickAdd,
} from '../GcalTypes'

// TODO: needs Entity superclass
class QuickAddEntity extends GcalEntityBase<QuickAdd> {

  constructor(client: GcalSDK, entopts: any) {
    super(client, entopts)
    this.name = 'quick_add'
    this.name_ = 'quick_add'
    this.Name = 'QuickAdd'
  }


  make(this: QuickAddEntity) {
    return new QuickAddEntity(this._client, this.entopts())
  }







}


export {
  QuickAddEntity
}
