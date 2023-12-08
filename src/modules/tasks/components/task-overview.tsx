import React from 'react'

import ProgressBar from 'src/modules/tasks/components/progress-bar'

type TasksOverviewProps = {
  isHighPriority: boolean
  target: number
  completed: number
}

function TasksOverview({
  isHighPriority,
  target,
  completed,
}: TasksOverviewProps) {
  return (
    <div
      className={`border relative ${
        isHighPriority ? 'border-orange-50' : 'border-[#26187b80]'
      } rounded-lg flex flex-col items-center justify-center flex-grow text-center p-4`}
    >
      <p
        className="text-[#444] text-[40px] font-medium"
        data-testid={isHighPriority ? 'highPriorityTasks' : 'dueTasks'}
      >
        {target}
      </p>
      <p className="text-[#444] text-base">
        {isHighPriority ? 'High priority tasks' : 'Total tasks due today'}
      </p>
      <p className="text-[#5A5A5A] text-sm">
        {completed} out of {target} completed
      </p>
      <ProgressBar value={completed} target={target} />
    </div>
  )
}

export default TasksOverview
