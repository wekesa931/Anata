import React from 'react'
import ClipboardCrossPlusIcon from '../../assets/img/icons/cross-clipboard.svg'
import TasksIcon from '../../assets/img/icons/ calendar-checked.svg'
import PresentationIcon from '../../assets/img/icons/ presentation.svg'
import ClipboardTextIcon from '../../assets/img/icons/ clipboard-text.svg'

const SidebarMenuItems = [
  {
    name: 'Beneficiary Dashboard',
    icon: <ClipboardCrossPlusIcon />,
    rootUrl: '/',
  },
  {
    name: 'HN Tasks Summary',
    icon: <TasksIcon />,
    rootUrl: '/tasks',
  },
  {
    name: 'Populations & Cohorts',
    icon: <PresentationIcon />,
    rootUrl: '/population',
  },
  {
    name: 'Forms We Love',
    icon: <ClipboardTextIcon />,
    rootUrl: '/forms',
  },
]

export default SidebarMenuItems
