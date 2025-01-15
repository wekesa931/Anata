export type UserTask = {
  task_definition?: string
  due_date: string
  notes: string
  status: string
  priority?: Priority
  assignee?: string
  recordid: string
  status_last_modified_at: string
  member?: string
  antaraId?: string
}

export type RawUserTask = {
  Type?: string
  'Due Date': string
  'Task Notes': string
  Status: string
  'Task Priority': string
  Assignee: string
  AssigneeName?: string[]
  status_last_modified_at: string
  recordid: string
  'Member Name Lookup'?: string
  'Antara ID'?: string
}

export enum Filters {
  TODAYS = "Today's tasks",
  THIS_WEEK = "This week's tasks",
  THIS_MONTH = "This month's tasks",
}

export const convertPriority = (priority?: string): Priority => {
  switch (priority?.toLowerCase()) {
    case 'high':
    case 'p0':
    case 'p1':
      return Priority.P0
    case 'medium':
    case 'p2':
    case 'p3':
      return Priority.P1
    case 'low':
    case 'p4':
      return Priority.P2
    default:
      return Priority.P3
  }
}

export enum Priority {
  P0 = 'High',
  P1 = 'Medium',
  P2 = 'Low',
  P3 = 'None',
}

export type Overview = {
  all: {
    target: number
    complete: number
  }
  p0: {
    target: number
    complete: number
  }
}

export type TasksAndOverview = {
  tasks: UserTask[]
  overview: Overview
}

export type TaskDefinition = {
  clinicalPrefferedName?: string
  scribeTags: string
  recordId: string
  notes: string
  defaultTeam: AssigneeTypes
  defaultPriority: string
  sources?: string[]
  sourceDetails?: string
  messageTemplateTitle?: string
  dueDate?: string
  defaultPeriod: string
  smsContent: string
  interactionLogContent: string
  defaultReschedulingDays: string
  memberTaskType: string
}

export enum TaskDefinitionTypes {
  LabManagement = 'Lab management',
  NewDocument = 'New Document',
}

export enum AssigneeTypes {
  ME = 'ME',
  HN = 'HN',
}

type RecordId = [string] | []

export type NewTask = {
  Member: RecordId
  'Task definition': RecordId
  'Due Date': string
  'Task Priority': string
  Assignee: RecordId
  Status: string
  'Task Notes': string
  Source: string
  'Data Source': string
}

export const LabManagementRecordId =
  process.env.PROD === 'true' ? 'recR0Rni1WNDiQpj3' : 'rec5i6q30NJAcXOsA'
export const NewDocumentRecordId =
  process.env.PROD === 'true' ? 'rec0bpNSpRx6huygq' : 'recbDbP099lD9mKw7'

export type InitialValues = {
  interactionLog: string
  sms: string
  dueDate: number
  taskAttempt: number
  reasonForApptMissed: string
  smsCheck: boolean
  interactionLogCheck: boolean
  rescheduleTaskCheck: boolean
  rescheduleApptCheck: boolean
}
