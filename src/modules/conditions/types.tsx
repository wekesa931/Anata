export type Condition = {
  acuteVsChronic?: string
  dateOfDiagnosis?: string
  conditionStatus?: string
  condition?: string
  id: string
  antaraId: string
  icd10Code: string
  keyGoal?: string
  diagnosisStage?: string
  startingStage?: string
  startingClinicalStatus?: string
  engagementLevel?: string
  currentStage?: string
  currentClinicalStatus?: string
  medication?: string[]
  interventions?: string[]
  healthStatus?: string
}

export enum ConditionStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  ALL = 'ALL',
}

export enum AcuteVsChronic {
  ACUTE = 'Acute',
  CHRONIC = 'Chronic',
  ALL = 'ALL',
}

export type Filter = {
  acuteVsChronic: AcuteVsChronic
  conditionStatus: ConditionStatus
}

export enum CurrentClinicalStatus {
  CONTROLLED = 'Controlled',
  UNCONTROLLED = 'Uncontrolled',
}
