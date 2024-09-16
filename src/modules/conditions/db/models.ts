import { Model } from '@nozbe/watermelondb'
import { text } from '@nozbe/watermelondb/decorators'
import { CollectionType } from 'src/storage/types'
import { LookupTypeKey } from 'src/modules/conditions/types'

export class LookupModel extends Model {
  static table = CollectionType.LOOKUPS

  @text('lookup_id') lookupId!: string

  @text('name') name!: string

  @text('lookup_type') lookupType!: LookupTypeKey
}

export default [LookupModel]
