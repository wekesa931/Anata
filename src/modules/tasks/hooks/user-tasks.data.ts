import { useUserTasksAPI } from 'src/modules/tasks/services/user-tasks.service'
import { Filters, TasksAndOverview } from 'src/modules/tasks/types'
import { User } from 'src/types/user'
import { transformRawTasksToUserTasks } from 'src/modules/tasks/utils/transform'
import dayjs from 'dayjs'
import { getCompleteTasksCount, getHighPriorityTasks } from '../utils'

export const useUserTasksData = (user: User) => {
  const {
    getUserOverdueTasks,
    getTaskBetween,
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

  const getAllTasks = async (): Promise<TasksAndOverview> => {
    if (user?.userAirtableId) {
      const response = await getUserDueAndOverdueTasks(user.userAirtableId)
      const tasks = transformRawTasksToUserTasks(response)

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
      let start
      let end
      switch (filter) {
        case Filters.THIS_WEEK: {
          start = dayjs().startOf('week').format('YYYY/MM/DD')
          end = dayjs().endOf('week').add(1, 'day').format('YYYY/MM/DD')
          const tasks = await getTaskBetween(user.userAirtableId, start, end)
          return transformRawTasksToUserTasks(tasks)
        }
        case Filters.THIS_MONTH: {
          start = dayjs().startOf('month').format('YYYY/MM/DD')
          end = dayjs().endOf('month').add(1, 'day').format('YYYY/MM/DD')
          const tasks = await getTaskBetween(user.userAirtableId, start, end)
          return transformRawTasksToUserTasks(tasks)
        }
        default: {
          const tasks = await getUserDueTasks(user.userAirtableId)
          return transformRawTasksToUserTasks(tasks)
        }
      }
    } else {
      return []
    }
  }

  return {
    filterTasks,
    getOverdueTasks,
    getAllTasks,
  }
}
