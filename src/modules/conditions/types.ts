export type Lookup = {
  name: string
  lookup_id: string | number
}

export enum LookupType {
  ConditionStatus,
  VerificationStatus,
  AchievementStatus,
  MemberAcceptance,
  ConditionStage,
  KeyGoal,
}

export type LookupTypeKey = keyof typeof LookupType

export type Lookups = Partial<Record<LookupTypeKey, Lookup[]>>

export type Stage = {
  date: string
  name: string
  id: string | null
  target: Status
  achievement: Status
  observations: string[]
  conditionStageId: number
}

export type Status = {
  label: string
  value: string
  icd11Code?: string
}

export type ConditionDefinition = {
  name: string
  isChronic: boolean | null
  possibleStages: Status[]
  possibleTargets: Status[]
  icd11Code: string | null
  id: string
  createdAt: string
  createdBy: string
  conditionDefinitionId: number
  label: string
  value: string
}

export type Condition = Omit<ConditionDefinition, 'label' | 'value'> & {
  initialStage: Stage
  currentStage: Stage
  isNewlyDiagnosed: boolean
  clinicalStatus: Status
  verificationStatus: Status
  achievementStatus: Status
  diagnosisDate: string | null
  atRiskFrom: string[]
  notes: string
  lastModified: string
  modifiedBy: string
  onsetDate: string | null
  shouldSystemAutoUpdate: boolean
  reasonForClinicalStatusChange: string | null
}

export enum Filters {
  ALL = 'All',
  ACTIVE = 'Active',
  CHRONIC = 'Chronic',
  ACUTE = 'Acute',
}

export type RawConditionDefinition = {
  name: string
  conditionDefinitionId: number
  possibleTargets: { id: string; name: string }[]
  possibleStages: { id: string; name: string; icd11Code?: string }[]
  icd11Code: string | null
  createdAt: string
  createdBy: string
  id: string
  isChronic: boolean
}

export type RawCondition = {
  atRiskFrom: { name: string; atRiskFromId: number }[]
  clinicalStatus: { name: string; conditionClinicalStatusId: number }
  conditionDefinition: {
    name: string
    conditionDefinitionId: number
    possibleTargets: { id: string; name: string }[]
    possibleStages: { id: string; name: string; icd11Code?: string }[]
  }
  createdAt: string
  createdBy: string
  currentObservation: { displayItems: string[] }
  diagnosisDate: string | null
  icd11Code: string | null
  isChronic: boolean | null
  isNewlyDiagnosed: boolean | null
  modifiedAt: string
  modifiedBy: string
  note: string | null
  onsetDate: string | null
  shouldSystemAutoUpdate: boolean | null
  stage: {
    name: string
    target: { targetId: number; name: string }
    createdAt: string
  }
  startingObservation: { displayItems: string[] }
  startingStage: {
    name: string
    target: { targetId: number; name: string }
    createdAt: string
  }
  targetAchievementStatus: { name: string; targetAchievementStatusId: number }
  verificationStatus: { name: string; conditionVerificationStatusId: number }
  id: string
  reasonForClinicalStatusChange: string | null
  target: {
    targetId: number
    name: string
  }
}

export type NewConditionValues = {
  antaraId: string
  conditionDefinitionId: number
  clinicalStatusId: number
  verificationStatusId: number
  targetId?: number | string
  targetAchievementStatusId?: number
  atRiskFromIds?: number[]
  onsetDate: string
  diagnosisDate?: string
  abatementDate?: string
  note?: string
  medicalPriority?: number
  isNewlyDiagnosed?: boolean
  dataSource: string
  icd11Code?: string
  isChronic?: boolean
  stageId?: number
  startingStageId?: number | string
}
