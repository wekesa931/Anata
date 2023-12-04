import { UserTask, RawUserTask, convertPriority } from 'src/modules/tasks/types'

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
