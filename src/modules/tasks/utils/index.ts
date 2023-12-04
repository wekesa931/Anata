import { UserTask, Priority } from 'src/modules/tasks/types'

export const getIncompleteTasks = (tasks: UserTask[]) => {
  return tasks.filter((task) => task.status !== 'Complete')
}

export const getCompleteTasksCount = (tasks: UserTask[]) => {
  return tasks.filter((task) => task.status === 'Complete').length
}

export const getHighPriorityTasks = (tasks: UserTask[]) => {
  return tasks.filter((task) => task.priority === Priority.P0)
}

const PriorityValues: Record<Priority, number> = {
  [Priority.P0]: 0,
  [Priority.P1]: 1,
  [Priority.P2]: 2,
  [Priority.P3]: 3,
}

export const priorityComparator = (a: Priority, b: Priority): number => {
  return PriorityValues[a] - PriorityValues[b]
}

type PrioritySortable = {
  priority: Priority
  [key: string]: any
}

/**
 *  Sorts an array of objects by priority, then by a secondary comparator
 * @param data  The data to sort
 * @param secondaryComparator  A comparator to use if the priorities are the same
 */

export const sortByPriorityAndKey = <T extends PrioritySortable>(
  data: T[],
  secondaryComparator: (a: T, b: T) => number
) => {
  // sort by priority first
  data.sort((a, b) => {
    const priorityComparison = priorityComparator(a.priority, b.priority)
    if (priorityComparison !== 0) {
      return priorityComparison
    }

    return secondaryComparator(a, b)
  })

  return data
}

const PriorityKey = 'priority'

type GroupedData = Record<string, any[]>

const sortGroupedDataByPriority = (data: GroupedData) => {
  const sortedKeys = Object.keys(data).sort((a, b) =>
    priorityComparator(a as Priority, b as Priority)
  )
  return sortedKeys.reduce((acc: any, key) => {
    acc[key] = data[key]
    return acc
  }, {})
}

const sortGroupedDataAlphabetically = (data: GroupedData) => {
  const sortedKeys = Object.keys(data).sort()
  return sortedKeys.reduce((acc: any, key) => {
    acc[key] = data[key]
    return acc
  }, {})
}

export const sortGroupedDataByColumn = (data: GroupedData, column?: string) => {
  if (!column) {
    return { ...data }
  }

  if (column === PriorityKey) {
    return sortGroupedDataByPriority(data)
  }

  if (!(column in data)) {
    return { ...data }
  }

  return sortGroupedDataAlphabetically(data)
}
