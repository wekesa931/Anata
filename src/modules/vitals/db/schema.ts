import { tableSchema, ColumnSchema } from '@nozbe/watermelondb'
import { CollectionType } from 'src/storage/types'

export const vitalsTableColumns: ColumnSchema[] = [
  { name: 'antaraId', type: 'string' },
  { name: 'weight', type: 'number' },
  { name: 'height', type: 'number' },
  { name: 'bmi', type: 'number' },
  { name: 'six_lead_ecg_findings', type: 'string' },
  { name: 'respiratory_rate', type: 'number' },
  { name: 'oxygen_saturation', type: 'number' },
  { name: 'temperature', type: 'number' },
  { name: 'water_content', type: 'number' },
  { name: 'mid_upper_arm_circumference', type: 'number' },
  { name: 'waist_circumference', type: 'number' },
  { name: 'waisthip_ratio', type: 'number' },
  { name: 'bone_density', type: 'number' },
  { name: 'body_fat', type: 'number' },
  { name: 'visceral_fat', type: 'number' },
  { name: 'muscle_mass', type: 'number' },
  { name: 'muscle_mass_weight_ratio', type: 'number' },
  { name: 'timestamp', type: 'string' },
  { name: 'measurer', type: 'string' },
]

export const vitalsSchema = tableSchema({
  name: CollectionType.VITALS,
  columns: vitalsTableColumns,
})

export default [vitalsSchema]
