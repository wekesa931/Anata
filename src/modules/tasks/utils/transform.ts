import dayjs from 'dayjs'
import { Member } from 'src/modules/member/db/models'
import {
  UserTask,
  RawUserTask,
  convertPriority,
  TaskDefinition,
  TaskDefinitionTypes,
  AssigneeTypes,
  NewTask,
} from 'src/modules/tasks/types'

const mapRawTaskToUserTask = (rawTask: RawUserTask): UserTask => {
  const extractFromArray = (array?: string[]) => {
    // return the first value in the array if it exists
    if (array && array.length > 0) {
      return array[0]
    }

    return undefined
  }
  return {
    type: rawTask.Type,
    due_date: rawTask['Due Date'],
    notes: rawTask['Task Notes'],
    status: rawTask.Status,
    priority: convertPriority(rawTask['Task Priority']),
    assignee: extractFromArray(rawTask.AssigneeName),
    recordid: rawTask.recordid,
    status_last_modified_at: rawTask.status_last_modified_at,
    member: extractFromArray(rawTask['Member Name Lookup']),
    antaraId: extractFromArray(rawTask['Antara ID']),
  }
}

export const transformRawTasksToUserTasks = (rawTasks: RawUserTask[]) => {
  return rawTasks.map(mapRawTaskToUserTask)
}

const getAssignedTeam = (defaultTeam?: string): AssigneeTypes => {
  if (defaultTeam) {
    return defaultTeam as AssigneeTypes
  }

  return AssigneeTypes.HN
}

export const mapRawTaskDefinitionToTaskDefinition = (
  rawTaskDefinition: any
): TaskDefinition => {
  return {
    recordId: rawTaskDefinition['Record ID'],
    clinicalPrefferedName: rawTaskDefinition['Clinical-Preferred-Name'],
    scribeTags: rawTaskDefinition['Scribe-tags'],
    defaultPriority: rawTaskDefinition['Default priority settings'],
    defaultPeriod: rawTaskDefinition['Default period for completion'],
    dueDate: rawTaskDefinition['Due date calculation for automation'],
    sources: rawTaskDefinition.Sources,
    sourceDetails: rawTaskDefinition['Sources details'],
    notes: rawTaskDefinition.Notes,
    defaultTeam: getAssignedTeam(rawTaskDefinition['Default team assigned']),
  }
}

export const transformRawTaskDefinitionsToTaskDefinitions = (
  rawTaskDefinitions: any[]
) => {
  return rawTaskDefinitions.reduce((acc, rawTaskDefinition) => {
    const taskDefinition =
      mapRawTaskDefinitionToTaskDefinition(rawTaskDefinition)
    const type = taskDefinition.scribeTags as TaskDefinitionTypes
    acc[type] = taskDefinition
    return acc
  }, {} as { [key in TaskDefinitionTypes]: TaskDefinition })
}

export const mapTaskDefinitionToNewask = (
  taskDefinition: TaskDefinition,
  member: Member
): NewTask => {
  const getAssignee = () => {
    switch (taskDefinition.defaultTeam) {
      case AssigneeTypes.ME:
        return member?.assignedMe?.atRecordId
      default:
        return member?.assignedHn?.atRecordId
    }
  }
  const assignee = getAssignee()

  const getDueDate = () => {
    if (taskDefinition.dueDate) {
      return taskDefinition.dueDate
    }

    return dayjs()
      .add(parseInt(taskDefinition.defaultPeriod) || 5, 'day')
      .format('YYYY-MM-DD')
  }

  return {
    Member: member?.airtableRecordId ? [member?.airtableRecordId] : [],
    Assignee: assignee ? [assignee] : [],
    'Task definition': [taskDefinition.recordId],
    Type: taskDefinition.clinicalPrefferedName || taskDefinition.scribeTags,
    'Due Date': getDueDate(),
    'Task Priority': taskDefinition.defaultPriority,
    Status: 'Not Started',
    'Task Notes': taskDefinition.notes,
    Source: 'UDM',
    'Data Source': 'UDM',
  }
}
