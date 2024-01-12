import React from 'react'

import ProgressBar from 'src/modules/tasks/components/progress-bar'
import { Filters } from '../types'

type TasksOverviewProps = {
  isHighPriority: boolean
  target: number
  completed: number
  currentFilter: Filters
}

function TasksOverview({
  isHighPriority,
  target,
  completed,
  currentFilter,
}: TasksOverviewProps) {
  const getFilterTitle = () => {
    switch (currentFilter) {
      case Filters.TODAYS:
        return 'today'
      case Filters.THIS_WEEK:
        return 'this week'
      case Filters.THIS_MONTH:
        return 'this month'
      default:
        return 'today'
    }
  }
  return (
    <div className="border border-[#EBF6FF] rounded-lg flex flex-col items-center justify-center flex-grow text-center p-4 overflow-auto">
      <p
        className="text-[#444] text-[40px] font-medium"
        data-testid={isHighPriority ? 'highPriorityTasks' : 'dueTasks'}
      >
        {target}
      </p>
      <p className="text-[#444] text-base">
        {isHighPriority
          ? 'High priority tasks'
          : `Total tasks due ${getFilterTitle()}`}
      </p>
      <p className="text-[#5A5A5A] text-sm">
        {completed} out of {target} completed
      </p>
      <ProgressBar value={completed} target={target} />
    </div>
  )
}

export default TasksOverview
