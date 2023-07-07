import { tableSchema, ColumnSchema } from '@nozbe/watermelondb'
import { CollectionType } from 'src/storage/types'

export const hmpColumns: ColumnSchema[] = [
  { name: 'hmp_send_date', type: 'string' },
  { name: 'hmp_number', type: 'string' },
  { name: 'hmp_day', type: 'string' },
  { name: 'hmp_link', type: 'string' },
  { name: 'hmp_state', type: 'string' },
  { name: 'hmp_last_review_date', type: 'string' },
  { name: 'antaraId', type: 'string' },
]

export const HmpsSchema = tableSchema({
  name: CollectionType.HMPS,
  columns: hmpColumns,
})

export default [HmpsSchema]
