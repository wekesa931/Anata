export type Intervention = {
  interventionType?: string
  interventionStatus?: string
  attainment?: string
  id: string
  antaraId: string
  startingMeasurement?: string
  currentMeasurement?: string[]
  startingLevel?: string
  currentLevel?: string
  startingMilestone?: string
  currentMilestone?: string[]
  result?: string
  persona?: string
}

export enum InterventionStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  ALL = 'ALL',
}

export enum Attainment {
  ONTRACK = 'On Track',
  OFFTRACK = 'Off Track',
  ALL = 'ALL',
}

export type Filter = {
  interventionStatus: InterventionStatus
  attainment: Attainment
}
