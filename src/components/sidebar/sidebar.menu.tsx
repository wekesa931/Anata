import React from 'react'
import ClipboardPlusIcon from '../../assets/img/icons/ clipboard-plus.svg'
import PopulationIcon from '../../assets/img/icons/ items.svg'
import TasksIcon from '../../assets/img/icons/ calendar-checked.svg'

const SidebarMenuItems = [
  {
    name: 'Navigator Dashboard',
    icon: <ClipboardPlusIcon />,
    rootUrl: '/dashboard',
  },
  {
    name: 'Tasks Summary',
    icon: <TasksIcon />,
    rootUrl: '/tasks',
  },
  {
    name: 'Populations & Cohorts',
    icon: <PopulationIcon />,
    rootUrl: '/population',
  },
]

export default SidebarMenuItems
