export type UserTask = {
  type: string
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
  Type: string
  'Due Date': string
  'Task Notes': string
  Status: string
  'Task Priority': string
  Assignee: string
  AssigneeName?: string[]
  status_last_modified_at: string
  recordid: string
  'Member Name Lookup'?: string[]
  'Antara ID'?: string[]
}

export enum Filters {
  TODAYS = 'TODAYS',
  THIS_WEEK = 'THIS_WEEK',
  THIS_MONTH = 'THIS_MONTH',
}

export const convertPriority = (priority: string): Priority => {
  switch (priority.toLowerCase()) {
    case 'high':
      return Priority.P0
    case 'medium':
      return Priority.P1
    case 'low':
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
