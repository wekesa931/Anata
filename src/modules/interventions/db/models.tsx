import { Model, Q } from '@nozbe/watermelondb'
import { text, lazy, json } from '@nozbe/watermelondb/decorators'
import { CollectionType } from 'src/storage/types'
import { Associations } from '@nozbe/watermelondb/Model'

const sanitizeMeasurement = (measurements: any) => {
  return Array.isArray(measurements) ? measurements.map(String) : []
}
export class Intervention extends Model {
  static table = CollectionType.INTERVENTIONS

  static associations: Associations = {
    conditions_interventions: {
      type: 'has_many',
      foreignKey: 'intervention_id',
    },
  }

  @lazy
  conditions = this.collections
    .get(CollectionType.CONDITIONS)
    .query(
      Q.on(CollectionType.CONDITIONS_INTERVENTIONS, 'intervention_id', this.id)
    )

  @text('intervention_type') interventionType?: string

  @text('intervention_status') interventionStatus?: string

  @text('attainment') attainment?: string

  @text('antaraId') antaraId?: string

  @text('starting_measurement') startingMeasurement?: string

  @json('current_measurement', sanitizeMeasurement)
  currentMeasurement?: string[]

  @text('starting_level') startingLevel?: string

  @text('current_level') currentLevel?: string

  @text('starting_milestone') startingMilestone?: string

  @json('current_milestone', sanitizeMeasurement) currentMilestone?: string[]

  @text('result') result?: string

  @text('persona') persona?: string
}

export default [Intervention]
