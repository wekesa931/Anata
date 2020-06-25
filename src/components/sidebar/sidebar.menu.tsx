import React from 'react'
import ClipboardPlusIcon from '../../assets/img/icons/ clipboard-plus.svg'
import PopulationIcon from '../../assets/img/icons/ items.svg'
import TasksIcon from '../../assets/img/icons/ calendar-checked.svg'

const SidebarMenuItems = [
  {
    name: 'Members Table',
    icon: <PopulationIcon />,
    rootUrl: '/members',
  },
  {
    name: 'Navigator Dashboard',
    icon: <ClipboardPlusIcon />,
    rootUrl: '/dashboard',
  },
  {
    name: 'HN Tasks Summary',
    icon: <TasksIcon />,
    rootUrl: '/tasks',
  },
  {
    name: 'Populations & Cohorts',
    icon: <PopulationIcon />,
    rootUrl: '/population',
  },
  {
    name: 'Forms',
    icon: <PopulationIcon />,
    rootUrl: '/forms',
  },
]

export default SidebarMenuItems
