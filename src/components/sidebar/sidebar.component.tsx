// import React, { useState } from 'react'
import { toggle } from 'kremling'

import { ArrowRight, ArrowDown } from 'react-feather'

import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import config from '../../config/config'
import analytics from '../../helpers/segment'
import { useSidebar } from '../../context/sidebar-context'
import { useUser } from '../../context/user-context'
import SidebarMenuItems from './sidebar.menu'
import styles from './sidebar.component.css'
import FlatLogo from '../../assets/img/logo/Antara Logo@1x.png'

const drawerWidth = 240

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const history = useHistory()
  const user = useUser()
  const { iframes } = config
  const { handleOnClick, activeView, handleSublistClick, prev, activeSubView } =
    useSidebar()
  const { path } = useRouteMatch()
  const [showDropDownTodo, setDropDownTodo] = useState(false)
  const [showDropDownPopulation, setDropDownPopulation] = useState(false)
  const [subItem, setSublist] = useState('')
  const customizedView = (name: any) => {
    if (user && iframes[user.email]) {
      return iframes[user.email][name]
    }
    return iframes.default[name]
  }
  let items: any = []
  if (path === '/') {
    items = SidebarMenuItems.slice(0, 10)
    items.map((item: any) => {
      if (item.name !== 'Tasks') {
        // eslint-disable-next-line no-param-reassign
        item.rootUrl = `https://airtable.com/embed/${customizedView(
          item.name
        )}?viewControls=on`
      } else {
        // eslint-disable-next-line no-shadow
        item.subItems.map((item: any) => {
          // eslint-disable-next-line no-param-reassign
          if (item.name !== 'Callbacks') {
            // eslint-disable-next-line no-param-reassign
            item.rootUrl = `https://airtable.com/embed/${customizedView(
              item.name
            )}?viewControls=on`
          }

          return item
        })
      }

      return item
    })
  } else if (path.includes('member')) {
    items = SidebarMenuItems.slice(0, 10)
  }

  const subList = (
    item: {
      name: string
      icon:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined
    },
    index: number
  ) => (
    <li
      className={`${styles.subList} ${styles.menuLink}`}
      onClick={() => {
        analytics.page({
          title: `Main Dashboard: ${item.name}`,
        })
        handleSublistClick(item)
        setSublist(item.name)
        // eslint-disable-next-line no-unused-expressions
        path.includes('member') && history.push('/')
      }}
      onKeyDown={() => handleOnClick(index)}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      tabIndex={index}
      key={item.name}
    >
      <span
        className={toggle('text-orange', 'text-grey', item.name === subItem)}
      >
        {item.icon}
      </span>
      <h5 className={toggle('text-orange', 'text-grey', item.name === subItem)}>
        {item.name}
      </h5>
    </li>
  )

  const lists = (
    item: {
      name: string
      subItems: any
      icon:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined
    },
    index: number
  ) => {
    const is_tasks = item.name === 'Tasks'
    const hideDropdown =
      item.subItems && !showDropDownTodo && item.name === 'Tasks'
    const showDropDown =
      item.subItems && showDropDownTodo && item.name === 'Tasks'
    const handleColorChange =
      activeView.name === item.name && item.name !== 'Tasks' && !activeSubView
    const handleSublist =
      prev.name === item.name &&
      item.name !== 'Tasks' &&
      !subItem &&
      activeView.name === 'Tasks'
    return (
      <li
        className={`${styles.list} ${styles.menuLink}`}
        onClick={() => {
          analytics.page({
            title: `Main Dashboard: ${item.name}`,
          })
          setDropDownPopulation(false)
          setSublist('')
          handleOnClick(index)
          is_tasks && setDropDownTodo(!showDropDownTodo)
          handleSublistClick('')
          path.includes('member') && history.push('/')
        }}
        onKeyDown={() => handleOnClick(index)}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        tabIndex={index}
        key={item.name}
        data-testid={`item-${item.name}`}
      >
        {hideDropdown && (
          <span>
            <ArrowRight className={styles.arrowRight} />
          </span>
        )}
        {showDropDown && (
          <span className="dropdown-button">
            <ArrowDown className={styles.arrowRight} />
          </span>
        )}
        {item.subItems &&
          !showDropDownPopulation &&
          item.name === 'Population' && (
            <ArrowRight className={styles.arrowRight} />
          )}
        {item.subItems &&
          showDropDownPopulation &&
          item.name === 'Population' && (
            <ArrowDown className={styles.arrowDown} />
          )}
        <span
          className={toggle(
            'text-orange',
            'text-grey',
            handleColorChange
          ).maybe('text-orange', handleSublist)}
        >
          {item.icon}
        </span>
        <h5
          className={toggle(
            'text-orange',
            'text-grey',
            handleColorChange
          ).maybe('text-orange', handleSublist)}
        >
          {item.name === 'Tasks' ? <b>{item.name}</b> : item.name}
        </h5>
      </li>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={toggleDrawer}
        onMouseLeave={toggleDrawer}
      >
        <DrawerHeader>
          <Link to="/">
            <img
              src={FlatLogo}
              width="32px"
              height="32px"
              alt="antara small logo"
            />
          </Link>
        </DrawerHeader>

        <Divider />

        {items.map((item: any, index: any) => {
          const { subItems } = item
          return (
            <div
              className={toggle(
                'menuItem',
                'tasks',
                item.name !== 'Tasks'
              ).maybe(
                styles.active,
                activeView.name === item.name && item.name !== 'Tasks'
              )}
              key={item.name}
            >
              <div className={item.name}>
                {lists(item, index)}
                {subItems &&
                  showDropDownTodo &&
                  item.name === 'Tasks' &&
                  subItems.map((element: any, i: any) => subList(element, i))}
                {subItems &&
                  showDropDownPopulation &&
                  item.name === 'Population' &&
                  subItems.map((element: any, i: any) => subList(element, i))}
              </div>
            </div>
          )
        })}
      </Drawer>
    </Box>
  )
}
