import { tableSchema, ColumnSchema } from '@nozbe/watermelondb'
import { CollectionType } from 'src/storage/types'

export const lookupColumns: ColumnSchema[] = [
  { name: 'lookup_id', type: 'string' },
  { name: 'name', type: 'string' },
  { name: 'lookup_type', type: 'string' },
]

export const LookupSchema = tableSchema({
  name: CollectionType.LOOKUPS,
  columns: lookupColumns,
})

export default [LookupSchema]
