import { Model, Q } from '@nozbe/watermelondb'
import { text, json, lazy } from '@nozbe/watermelondb/decorators'
import { CollectionType } from 'src/storage/types'
import { Associations } from '@nozbe/watermelondb/Model'

const sanitizeMedication = (medications: any) => {
  return Array.isArray(medications) ? medications.map(String) : []
}
export class Condition extends Model {
  static table = CollectionType.CONDITIONS

  static associations: Associations = {
    conditions_interventions: { type: 'has_many', foreignKey: 'condition_id' },
  }

  @lazy
  interventions = this.collections
    .get(CollectionType.INTERVENTIONS)
    .query(
      Q.on(CollectionType.CONDITIONS_INTERVENTIONS, 'condition_id', this.id)
    )

  @text('acute_vs_chronic') acuteVsChronic?: string

  @text('date_of_diagnosis') dateOfDiagnosis?: string

  @text('condition_status') conditionStatus?: string

  @text('condition') condition?: string

  @text('antaraId') antaraId?: string

  @text('icd10_code') icd10Code?: string

  @text('key_goal') keyGoal?: string

  @text('diagnosis_stage') diagnosisStage?: string

  @text('starting_stage') startingStage?: string

  @text('starting_clinical_status') startingClinicalStatus?: string

  @text('engagement_level') engagementLevel?: string

  @text('current_stage') currentStage?: string

  @text('current_clinical_status') currentClinicalStatus?: string

  @json('medication', sanitizeMedication) medication?: string[]

  @text('health_status') healthStatus?: string

  @text('asthma_starting_score') asthmaStartingScore?: string

  @text('lower_back_pain_score') lowerBackPainScore?: string

  @text('lower_back_pain_starting_score') lowerBackPainStartingScore?: string

  @text('osteoarthritis_starting_score') osteoarthritisStartingScore?: string
}

export default [Condition]
