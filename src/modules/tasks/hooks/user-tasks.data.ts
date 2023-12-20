import { useUserTasksAPI } from 'src/modules/tasks/services/user-tasks.service'
import { Filters, TasksAndOverview } from 'src/modules/tasks/types'
import { User } from 'src/types/user'
import { transformRawTasksToUserTasks } from 'src/modules/tasks/utils/transform'
import dayjs from 'dayjs'
import { getCompleteTasksCount, getHighPriorityTasks } from '../utils'

export const useUserTasksData = (user: User) => {
  const {
    getUserOverdueTasks,
    getTasksBefore,
    getUserDueTasks,
    getUserDueAndOverdueTasks,
  } = useUserTasksAPI()

  const getOverdueTasks = async () => {
    if (user?.userAirtableId) {
      const tasks = await getUserOverdueTasks(user.userAirtableId)
      return transformRawTasksToUserTasks(tasks)
    }
    return []
  }

  const getTasksAndStats = async (rawTasks: any[]) => {
    const tasks = transformRawTasksToUserTasks(rawTasks)
    // parse the overview options here
    const completeTasksCount = getCompleteTasksCount(tasks)
    const p0Tasks = getHighPriorityTasks(tasks)
    const p0CompleteCount = getCompleteTasksCount(p0Tasks)

    return {
      tasks,
      overview: {
        all: {
          target: tasks.length,
          complete: completeTasksCount,
        },
        p0: {
          target: p0Tasks.length,
          complete: p0CompleteCount,
        },
      },
    }
  }

  const getAllTasks = async (): Promise<TasksAndOverview> => {
    if (user?.userAirtableId) {
      const response = await getUserDueAndOverdueTasks(user.userAirtableId)
      return getTasksAndStats(response)
    }

    return {
      tasks: [],
      overview: {
        all: {
          target: 0,
          complete: 0,
        },
        p0: {
          target: 0,
          complete: 0,
        },
      },
    }
  }

  const filterTasks = async (filter: Filters) => {
    if (user?.userAirtableId) {
      switch (filter) {
        case Filters.THIS_WEEK: {
          const end = dayjs().endOf('week').add(1, 'day').format('YYYY/MM/DD')
          const tasks = await getTasksBefore(user.userAirtableId, end)
          return getTasksAndStats(tasks)
        }
        case Filters.THIS_MONTH: {
          const end = dayjs().endOf('month').add(1, 'day').format('YYYY/MM/DD')
          const tasks = await getTasksBefore(user.userAirtableId, end)
          return getTasksAndStats(tasks)
        }
        default: {
          const tasks = await getUserDueTasks(user.userAirtableId)
          return getTasksAndStats(tasks)
        }
      }
    } else {
      return getTasksAndStats([]) // return empty tasks
    }
  }

  return {
    filterTasks,
    getOverdueTasks,
    getAllTasks,
  }
}
