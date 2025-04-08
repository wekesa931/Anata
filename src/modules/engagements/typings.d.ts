export interface Engagement {
  uuid: string
  id: string
  context: string
  action: string
  status: Status
  member: Member
  remarks: string
  assignedTo: AssignedTo
  modifiedAt: string
  modifiedBy: string
  __typename: string
}

export interface Status {
  name: string
  modifiedAt: string
  modifiedBy: string
  __typename: string
}

export interface Member {
  antaraId: string
  age: number
  fullName: string
  __typename: string
}

export interface AssignedTo {
  fullName: string
  team: any
  __typename: string
}

export interface EngagementFeedbackOptions {
  id: string
  name: string
  __typename: string
  engagementOutcomeStatus: EngagementOutcomeStatus
}

export interface EngagementOutcomeStatus {
  id: string
  __typename: string
  name: string
}

export interface UpdateEngagementPayload {
  input: UpdateEngagementInput
}

export interface UpdateEngagementInput {
  engagementRecommendationUuid: string
  status: string
  remarks?: string
}
