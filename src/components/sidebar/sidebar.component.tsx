import React, { useState } from 'react'
import { always, toggle } from 'kremling'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import { ArrowRight, ArrowDown } from 'react-feather'
import styles from './sidebar.component.css'
import FlatLogo from '../../assets/img/logo/Antara Logo@1x.png'
import SidebarMenuItems from './sidebar.menu'
import { useUser } from '../../context/user-context'
import { useSidebar } from '../../context/sidebar-context'
import analytics from '../../helpers/segment'
import config from '../../config/config'

const Sidebar = () => {
  const history = useHistory()
  const user = useUser()
  const { iframes } = config
  const { handleOnClick, activeView, handleSublistClick } = useSidebar()
  const { path } = useRouteMatch()
  const [showDropDownTodo, setDropDownTodo] = useState(false)
  const [showDropDownPopulation, setDropDownPopulation] = useState(false)
  const [subItem, setSublist] = useState('')

  const getMeetingsView = () => {
    if (user && iframes[user.email]) {
      return iframes[user.email].meetings
    }
    return iframes.default.meetings
  }
  let items: any = []
  if (path === '/') {
    items = SidebarMenuItems.slice(0, 8)
    items[3].rootUrl = `https://airtable.com/embed/${getMeetingsView()}?viewControls=on`
  } else if (path.includes('member')) {
    items = SidebarMenuItems.slice(0, 8)
  }
  const handleDropDownMenu = (e: EventTarget) => {
    if (e.innerText === 'Tasks') {
      setDropDownTodo(!showDropDownTodo)
    }
    if (e.innerText === 'Population') {
      setDropDownPopulation(!showDropDownPopulation)
    }
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
        handleSublistClick(index)
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
  ) => (
    <li
      className={`${styles.list} ${styles.menuLink}`}
      onClick={(event) => {
        analytics.page({
          title: `Main Dashboard: ${item.name}`,
        })
        setDropDownTodo(false)
        setDropDownPopulation(false)
        handleOnClick(index)
        handleDropDownMenu(event.target)
        // eslint-disable-next-line no-unused-expressions
        path.includes('member') && history.push('/')
      }}
      onKeyDown={() => handleOnClick(index)}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      tabIndex={index}
      key={item.name}
      data-testid={`item-${item.name}`}
    >
      {item.subItems && !showDropDownTodo && item.name === 'Tasks' && (
        <ArrowRight className={styles.arrowRight} />
      )}
      {item.subItems && showDropDownTodo && item.name === 'Tasks' && (
        <ArrowDown className={styles.arrowRight} />
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
          activeView.name === item.name
        )}
      >
        {item.icon}
      </span>
      <h5
        className={toggle(
          'text-orange',
          'text-grey',
          activeView.name === item.name
        )}
      >
        {item.name === 'Tasks' ? <b>{item.name}</b> : item.name}
      </h5>
    </li>
  )
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img
            src={FlatLogo}
            width="32px"
            height="32px"
            alt="antara small logo"
          />
        </Link>
      </div>
      <div className="sidebar" data-testid="sidebar-links">
        {items.map((item: any, index: any) => {
          const { subItems } = item
          return (
            <div
              className={always(styles.menuItem).maybe(
                styles.active,
                activeView.name === item.name
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
      </div>
    </div>
  )
}

export default Sidebar
