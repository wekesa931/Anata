import { Model, Q } from '@nozbe/watermelondb'
import { text, lazy } from '@nozbe/watermelondb/decorators'
import { CollectionType } from 'src/storage/types'
import { Associations } from '@nozbe/watermelondb/Model'

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

  @text('current_measurement') currentMeasurement?: string

  @text('starting_level') startingLevel?: string

  @text('current_level') currentLevel?: string

  @text('starting_milestone') startingMilestone?: string

  @text('current_milestone') currentMilestone?: string

  @text('result') result?: string

  @text('persona') persona?: string
}

export default [Intervention]
