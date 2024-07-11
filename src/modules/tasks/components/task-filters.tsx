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
    // store the selected filter in local storage
    localStorage.setItem('selectedFilter', selectedFilter)
  }

  return (
    <div className="min-w-[230px]">
      <span className="text-sm text-gray-400">Filter</span>

      <FormControl fullWidth>
        <Select
          labelId="filter-select-label"
          id="filter-select"
          className="h-6 font-rubik text-sm"
          value={filter}
          onChange={handleFilterChange}
          displayEmpty
          renderValue={(value) => {
            return (
              <div className="flex gap-3 items-center text-[#545454]">
                <CalendarMonthIcon className="text-lg text-[#989898]" />
                {value}
              </div>
            )
          }}
        >
          <MenuItem value={Filters.TODAYS} className="h-8 font-rubik! text-sm">
            Today&apos;s tasks
          </MenuItem>
          <MenuItem
            value={Filters.THIS_WEEK}
            className="h-8 font-rubik text-sm"
          >
            This week&apos;s tasks
          </MenuItem>
          <MenuItem
            value={Filters.THIS_MONTH}
            className="h-8 font-rubik text-sm"
          >
            This month&apos;s tasks
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default TaskFilterComponent
