import { Filters } from 'src/modules/tasks/types'
import React from 'react'

type Props = {
  filter: Filters
  setFilter: (filter: Filters) => void
}
function TaskFilterComponent({ filter, setFilter }: Props) {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = e.target.value as Filters
    setFilter(selectedFilter)
  }

  return (
    <div className="min-w-[150px]">
      <label
        htmlFor="group-by-column"
        className="block text-xs font-medium text-[#747474] "
      >
        Filter
      </label>
      <select
        id="group-by-column"
        className="bg-gray-50 border-[#8A8A8A] border-[0.5px] text-sm rounded-md w-full text-[#545454]"
        onChange={handleFilterChange}
        value={filter}
      >
        <option value={Filters.TODAYS}>Today&apos;s tasks</option>
        <option value={Filters.THIS_WEEK}>This week&apos; tasks</option>
        <option value={Filters.THIS_MONTH}>This month&apos;s tasks</option>
      </select>
    </div>
  )
}

export default TaskFilterComponent
