import { Model } from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import { immutableRelation } from '@nozbe/watermelondb/decorators'
import { CollectionType } from 'src/storage/types'

// conditions and interventions relationship
export class ConditionInterventions extends Model {
  static table = CollectionType.CONDITIONS_INTERVENTIONS

  static associations: Associations = {
    condition: { type: 'belongs_to', key: 'condition_id' },
    intervention: { type: 'belongs_to', key: 'intervention_id' },
  }

  @immutableRelation('conditions', 'condition_id') condition!: any

  @immutableRelation('interventions', 'intervention_id') intervention!: any
}

export default [ConditionInterventions]
