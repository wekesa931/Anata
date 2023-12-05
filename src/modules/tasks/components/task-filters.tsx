import { Filters } from 'src/modules/tasks/types'
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

import React from 'react'

type Props = {
  filter: Filters
  setFilter: (filter: Filters) => void
}
function TaskFilterComponent({ filter, setFilter }: Props) {
  const handleFilterChange = (event: SelectChangeEvent) => {
    const selectedFilter = event.target.value as Filters
    setFilter(selectedFilter)
  }

  return (
    <div className="min-w-[150px]">
      <span className="text-sm text-gray-400">Filter</span>

      <FormControl fullWidth>
        <Select
          labelId="filter-select-label"
          id="filter-select"
          className="h-8"
          value={filter}
          onChange={handleFilterChange}
          displayEmpty
          renderValue={(value) => {
            return (
              <div className="flex gap-3 items-center text-[#989898]">
                <CalendarMonthIcon />
                {value}
              </div>
            )
          }}
        >
          <MenuItem value={Filters.TODAYS}>Today&apos;s tasks</MenuItem>
          <MenuItem value={Filters.THIS_WEEK}>This week&apos; tasks</MenuItem>
          <MenuItem value={Filters.THIS_MONTH}>
            This month&apos;s tasks
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default TaskFilterComponent
