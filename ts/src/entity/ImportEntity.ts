
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
  Import,
} from '../GcalTypes'

// TODO: needs Entity superclass
class ImportEntity extends GcalEntityBase<Import> {

  constructor(client: GcalSDK, entopts: any) {
    super(client, entopts)
    this.name = 'import'
    this.name_ = 'import'
    this.Name = 'Import'
  }


  make(this: ImportEntity) {
    return new ImportEntity(this._client, this.entopts())
  }







}


export {
  ImportEntity
}
