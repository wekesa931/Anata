import type { User } from 'src/types/user'
import React, { useEffect, useState } from 'react'
import { useUserTasksData } from 'src/modules/tasks/hooks/user-tasks.data'
import TasksOverview from 'src/modules/tasks/components/task-overview'
import DataTable, { Column } from 'src/components/table/data-table'
import {
  TaskPriorityComponent,
  StatusComponent,
  ActionComponent,
} from 'src/modules/tasks/components/table-cell-elements'
import {
  UserTask,
  Filters,
  Overview,
  TasksAndOverview,
} from 'src/modules/tasks/types'
import TaskFilterComponent from 'src/modules/tasks/components/task-filters'
import { useModuleAnalytics } from 'src/modules/analytics'
import ErrorRetry from 'src/components/feedbacks/error-retry'
import {
  sortByPriorityAndKey,
  sortGroupedDataByColumn,
  getIncompleteTasks,
} from 'src/modules/tasks/utils'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Loader from 'src/modules/workflows/components/loaders'

dayjs.extend(advancedFormat)

type Props = {
  user: User
}

const COLUMNS: Column[] = [
  {
    id: 'priority',
    label: 'Priority',
    valueComponent: TaskPriorityComponent,
  },
  {
    id: 'member',
    label: 'Member',
    sortable: true,
  },
  {
    id: 'notes',
    label: 'Task Notes',
  },
  {
    id: 'due_date',
    label: 'Due Date',
    type: 'date',
    sortable: true,
    format: (value: string) => dayjs(value).format('Do MMM YYYY'),
  },
  {
    id: 'type',
    label: 'Task type',
    sortable: true,
  },
  {
    id: 'status',
    label: 'Status',
    sortable: true,
    valueComponent: StatusComponent,
  },
  {
    id: 'actions',
    label: 'Actions',
    valueComponent: ActionComponent,
  },
]

function HnTasksView({ user }: Props) {
  const cachedFilter =
    (localStorage.getItem('selectedFilter') as Filters) || Filters.TODAYS
  const { filterTasks, getAllTasks } = useUserTasksData(user)
  const [loadingTasks, setLoadingTasks] = useState(false)
  const [currentFilter, setCurrentFilter] = useState<Filters>(cachedFilter)
  const { trackTasksFiltered } = useModuleAnalytics()
  const [allTasks, setAllTasks] = useState<UserTask[]>([])
  const [error, setError] = useState<any>()

  const [overview, setOverview] = useState<Overview>({
    all: { target: 0, complete: 0 },
    p0: { target: 0, complete: 0 },
  })

  const setTasksAndStats = (tasksAndStats: TasksAndOverview) => {
    setAllTasks(getIncompleteTasks(tasksAndStats.tasks))
    setOverview(tasksAndStats.overview)
  }

  const loadTasks = async () => {
    if (currentFilter !== Filters.TODAYS) {
      setLoadingTasks(true)
      setError(null)
      try {
        const tasks = await filterTasks(currentFilter)
        trackTasksFiltered('Active tasks', getTableTitle())
        setTasksAndStats(tasks)
      } catch (e: any) {
        setError(e)
      } finally {
        setLoadingTasks(false)
      }
    }
  }

  const loadAllTasks = async () => {
    if (currentFilter === Filters.TODAYS) {
      setLoadingTasks(true)
      try {
        const tasksAndOverview = await getAllTasks()
        setTasksAndStats(tasksAndOverview)
      } catch (e: any) {
        setError(e)
      } finally {
        setLoadingTasks(false)
      }
    } else {
      loadTasks()
    }
  }

  // load overdue tasks
  useEffect(() => {
    loadAllTasks()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentFilter])

  const getTableTitle = () => {
    switch (currentFilter) {
      case Filters.TODAYS:
        return "Today's Tasks"
      case Filters.THIS_WEEK:
        return "This Week's Tasks"
      case Filters.THIS_MONTH:
        return "This Month's Tasks"
      default:
        return 'Tasks'
    }
  }

  return (
    <>
      {loadingTasks ? (
        <div className="h-full flex justify-center items-center">
          <Loader message="Loading tasks..." />
        </div>
      ) : (
        <div className="h-full ">
          <div className="font-rubik flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl text-dark-blue-100">
                Hello, <strong>{user?.fullName || user?.name} 👋🏾 </strong>
              </h1>
              <h2 className="text-sm text-dark-blue-100">
                Here is what your day looks like
              </h2>
              <div className="w-full flex justify-between gap-10">
                <TasksOverview
                  isHighPriority={false}
                  target={overview.all.target}
                  completed={overview.all.complete}
                />
                <TasksOverview
                  isHighPriority
                  target={overview.p0.target}
                  completed={overview.p0.complete}
                />
              </div>
            </div>
            <>
              {error ? (
                <ErrorRetry retry={loadAllTasks} />
              ) : (
                <DataTable
                  data={allTasks}
                  title={getTableTitle()}
                  titleComponent={
                    <div className="flex items-center gap-2 font-rubik">
                      <p className="text-2xl color text-[#444] font-medium">
                        {getTableTitle()}
                      </p>
                    </div>
                  }
                  columns={COLUMNS}
                  defaultGroupColumn="priority"
                  groupColumns={[
                    { label: 'Task type', value: 'type' },
                    { label: 'Task status', value: 'status' },
                    { label: 'Priority', value: 'priority' },
                    { label: 'Member name', value: 'member' },
                  ]}
                  loading={loadingTasks}
                  defaultSortColumn="due_date"
                  filterControl={
                    <TaskFilterComponent
                      filter={currentFilter}
                      setFilter={setCurrentFilter}
                    />
                  }
                  dataSortFunction={sortByPriorityAndKey}
                  groupSortFunction={sortGroupedDataByColumn}
                />
              )}
            </>
          </div>
        </div>
      )}
    </>
  )
}

export default HnTasksView
