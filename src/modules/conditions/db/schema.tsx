import { tableSchema, ColumnSchema } from '@nozbe/watermelondb'
import { CollectionType } from 'src/storage/types'

export const conditionColumns: ColumnSchema[] = [
  { name: 'acute_vs_chronic', type: 'string' },
  { name: 'date_of_diagnosis', type: 'string' },
  { name: 'condition_status', type: 'string' },
  { name: 'condition', type: 'string' },
  { name: 'antaraId', type: 'string' },
  { name: 'icd10_code', type: 'string' },
  { name: 'key_goal', type: 'string' },
  { name: 'diagnosis_stage', type: 'string' },
  { name: 'starting_stage', type: 'string' },
  { name: 'starting_clinical_status', type: 'string' },
  { name: 'engagement_level', type: 'string' },
  { name: 'current_stage', type: 'string' },
  { name: 'current_clinical_status', type: 'string' },
  { name: 'medication', type: 'string' },
  { name: 'health_status', type: 'string' },
  { name: 'asthma_starting_score', type: 'string' },
  { name: 'lower_back_pain_score', type: 'string' },
  { name: 'lower_back_pain_starting_score', type: 'string' },
  { name: 'osteoarthritis_starting_score', type: 'string' },
]

export const ConditionsSchema = tableSchema({
  name: CollectionType.CONDITIONS,
  columns: conditionColumns,
})

export default [ConditionsSchema]
