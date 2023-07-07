import { tableSchema, ColumnSchema } from '@nozbe/watermelondb'
import { CollectionType } from 'src/storage/types'

export const conditionsInterventionsColumn: ColumnSchema[] = [
  { name: 'condition_id', type: 'string' },
  { name: 'intervention_id', type: 'string' },
]

export const ConditionsInterventions = tableSchema({
  name: CollectionType.CONDITIONS_INTERVENTIONS,
  columns: conditionsInterventionsColumn,
})

export default [ConditionsInterventions]
