import dayjs from 'dayjs'
import type {
  RawCondition,
  Condition,
  Stage,
  Status,
  ConditionDefinition,
  RawConditionDefinition,
  NewConditionValues,
} from 'src/modules/conditions/types'

const transformStatus = (status: any, idFieldName: string = 'id'): Status => {
  return {
    value: status?.[idFieldName] || 'Unknown',
    label: status?.name || 'Pending',
  }
}

export const formatDate = (date: string): string => {
  return dayjs(date).format('YYYY-MM-DD')
}
export const formatDateTime = (date: string): string => {
  return dayjs(date).utcOffset(3).format('YYYY-MM-DD HH:mm')
}

const transformStage = (
  stage: any,
  rawAchievement: any,
  rawObservations: any
): Stage => {
  return {
    id: stage?.id || null,
    name: stage?.name || '',
    target: transformStatus(stage?.target, 'targetId'),
    achievement: transformStatus(rawAchievement, 'targetAchievementStatusId'),
    observations: rawObservations?.displayItems || [],
    date: stage?.createdAt,
    conditionStageId: stage?.conditionStageId || null,
  }
}

const transformRawConditionToDefinition = (
  rawCondition: RawConditionDefinition
): ConditionDefinition => {
  return {
    id: rawCondition.id,
    name: rawCondition.name,
    createdAt: formatDate(rawCondition.createdAt),
    createdBy: rawCondition.createdBy,
    isChronic: rawCondition.isChronic,
    conditionDefinitionId: rawCondition.conditionDefinitionId,
    possibleStages: rawCondition.possibleStages.map((p) => transformStatus(p)),
    possibleTargets: rawCondition.possibleTargets.map((p) =>
      transformStatus(p)
    ),
    icd11Code: rawCondition.icd11Code || null,
    label: rawCondition.name,
    value: rawCondition.conditionDefinitionId,
  }
}

export const transformRawConditionDefinitions = (
  rawConditions: RawConditionDefinition[]
): ConditionDefinition[] => rawConditions.map(transformRawConditionToDefinition)

export const transformRawCondition = (
  rawCondition: RawCondition
): Condition => {
  return {
    id: rawCondition.id,
    name: rawCondition?.conditionDefinition.name,
    conditionDefinitionId:
      rawCondition?.conditionDefinition.conditionDefinitionId,
    currentStage: transformStage(
      rawCondition.stage,
      rawCondition.targetAchievementStatus,
      rawCondition.currentObservation
    ),
    initialStage: transformStage(
      rawCondition.startingStage,
      rawCondition.targetAchievementStatus,
      rawCondition.startingObservation
    ),
    isChronic: rawCondition.isChronic,
    shouldSystemAutoUpdate: !!rawCondition.shouldSystemAutoUpdate,
    clinicalStatus: transformStatus(
      rawCondition.clinicalStatus,
      'conditionClinicalStatusId'
    ),
    verificationStatus: transformStatus(
      rawCondition.verificationStatus,
      'conditionVerificationStatusId'
    ),
    achievementStatus: transformStatus(
      rawCondition.targetAchievementStatus,
      'targetAchievementStatusId'
    ),
    createdAt: rawCondition.createdAt,
    createdBy: rawCondition.createdBy,
    diagnosisDate: rawCondition.diagnosisDate
      ? formatDate(rawCondition.diagnosisDate)
      : null,
    icd11Code: rawCondition.icd11Code,
    atRiskFrom: rawCondition.atRiskFrom?.map((risk) => risk.name) || [],
    notes: rawCondition.note || '',
    lastModified: formatDateTime(rawCondition.modifiedAt),
    modifiedBy: rawCondition.modifiedBy,
    onsetDate: rawCondition.onsetDate,
    possibleTargets:
      rawCondition?.conditionDefinition?.possibleTargets?.map((p) =>
        transformStatus(p)
      ) || [],
    possibleStages:
      rawCondition?.conditionDefinition?.possibleStages?.map((p) =>
        transformStatus(p)
      ) || [],
    isNewlyDiagnosed: !!rawCondition.isNewlyDiagnosed,
    reasonForClinicalStatusChange: rawCondition.reasonForClinicalStatusChange,
  }
}

export const transformRawConditions = (
  rawConditions: RawCondition[]
): Condition[] => rawConditions.map(transformRawCondition)

export const getInitialValues = (condition: Condition) => {
  return {
    conditionName: condition.name,
    id: condition.id,
    currentStage: {
      label: condition.currentStage.name || 'Pending',
      value: condition.currentStage.conditionStageId,
    },
    currentTarget: condition.currentStage.target,
    currentStageAchievement: condition.currentStage.achievement?.label,
    diagnosisDate: condition.diagnosisDate
      ? formatDate(condition.diagnosisDate)
      : null,
    isNewlyDiagnosed: condition.isNewlyDiagnosed ? 'yes' : 'no',
    icd11Code: condition.icd11Code,
    onsetDate: condition.onsetDate,
    notes: condition.notes,
    initialStageName: condition.initialStage.name,
    initialStageObservations: condition.initialStage.observations,
    currentStageObservations: condition.currentStage.observations,
    createdBy: condition.createdBy,
    atRiskFrom: condition.atRiskFrom.join(' | '),
    lastModified: formatDateTime(condition.lastModified),
    modifiedBy: condition.modifiedBy,
    creationDate: formatDate(condition.createdAt),
    clinicalStatus: condition.clinicalStatus,
    verificationStatus: condition.verificationStatus,
    achievementStatus: condition.achievementStatus,
    possibleTargets: condition.possibleTargets,
    conditionDefinitionId: condition.conditionDefinitionId,
    shouldSystemAutoUpdate: condition.shouldSystemAutoUpdate,
    isChronic: condition.isChronic,
  }
}

export const mapCreateConditionFormValues = (
  values: any
): Partial<NewConditionValues> => {
  const { condition } = values

  if (!condition) throw new Error('Condition definition is required')

  return {
    conditionDefinitionId: condition?.conditionDefinitionId,
    isChronic: values?.acuteVsChronic === 'chronic' || !!condition?.isChronic,
    clinicalStatusId: values?.clinicalStatus,
    verificationStatusId: values?.verificationStatus,
    icd11Code: condition?.icd11Code || values?.icd11Code,
    isNewlyDiagnosed: values?.newlyDiagnosed === 'yes',
    note: values?.note || '',
    targetId: values?.targetId || undefined,
    startingStageId: values?.startingStageId || undefined,
    diagnosisDate: values?.diagnosisDate
      ? formatDate(values?.diagnosisDate)
      : undefined,
    onsetDate: values?.onsetDate ? formatDate(values?.onsetDate) : undefined,
    atRiskFromIds: values?.atRiskFromIds || [],
    dataSource: 'Scribe new condition form',
  }
}

export const addNoneToKey = (options: any[], value: number = -1) => {
  return options.length > 0 ? options : [{ label: 'None', value }]
}
