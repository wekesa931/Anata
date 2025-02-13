import { tableSchema, ColumnSchema } from '@nozbe/watermelondb'
import { CollectionType } from 'src/storage/types'

export const interventionColumns: ColumnSchema[] = [
  { name: 'intervention_type', type: 'string' },
  { name: 'intervention_status', type: 'string' },
  { name: 'attainment', type: 'string' },
  { name: 'antaraId', type: 'string' },
  { name: 'starting_measurement', type: 'string' },
  { name: 'current_measurement', type: 'string' },
  { name: 'starting_level', type: 'string' },
  { name: 'current_level', type: 'string' },
  { name: 'target', type: 'string' },
  { name: 'result', type: 'string' },
  { name: 'persona', type: 'string' },
  { name: 'notes', type: 'string' },
  { name: 'condition', type: 'string' },
]

export const InterventionsSchema = tableSchema({
  name: CollectionType.INTERVENTIONS,
  columns: interventionColumns,
})

export default [InterventionsSchema]
