import { Condition as TCondition } from 'src/modules/conditions/types'
import { Condition } from 'src/modules/conditions/db/models'

export const buildCondition = (condition: Condition, data: TCondition) => {
  condition.antaraId = data.antaraId
  condition.condition = data?.condition
  condition.dateOfDiagnosis = data?.dateOfDiagnosis
  condition.acuteVsChronic = data?.acuteVsChronic
  condition.conditionStatus = data?.conditionStatus
  condition.icd10Code = data?.icd10Code
  condition.keyGoal = data?.keyGoal
  condition.diagnosisStage = data?.diagnosisStage
  condition.startingStage = data?.startingStage
  condition.startingClinicalStatus = data?.startingClinicalStatus
  condition.engagementLevel = data?.engagementLevel
  condition.currentStage = data?.currentStage
  condition.currentClinicalStatus = data?.currentClinicalStatus
  condition.medication = data?.medication
  // eslint-disable-next-line no-underscore-dangle
  condition._raw.id = data?.id
  condition.asthmaStartingScore = data?.asthmaStartingScore
  condition.lowerBackPainScore = data?.lowerBackPainScore
  condition.lowerBackPainStartingScore = data?.lowerBackPainStartingScore
  condition.osteoarthritisStartingScore = data?.osteoarthritisStartingScore
}
