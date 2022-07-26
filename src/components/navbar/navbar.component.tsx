import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './navbar.component.css'
import { useUser } from '../../context/user-context'
import { useAuth } from '../../context/auth-context'
import SearchInput from '../search/search.component'
import Icon from '../utils/icon/icon.component'
import analytics from '../../helpers/segment'
import TaskMenu from './task-menu/task-menu.component'
import Tooltip from '../utils/tooltip/tooltip.component'
import useClickOutside from '../../hooks/click-outside-hook'

const UserMenu = () => {
  const user = useUser()
  const auth = useAuth()
  const history = useHistory()

  const logout = () => {
    auth.logout()
    analytics.track('User LoggedOut')
    history.push('/login')
  }

  const hasName = (userDetails: { given_name: string; family_name: string }) =>
    !!userDetails.given_name && !!userDetails.family_name

  return (
    user && (
      <div className={styles.userMenuContainer}>
        <div className={`card ${styles.userMenu}`}>
          <div className={styles.userProfile}>
            <img
              src={user.picture || ''}
              className={styles.userImage}
              alt="user"
            />
            {hasName(user) && (
              <h4>{`${user.given_name} ${user.family_name}`}</h4>
            )}
            <h5 className={styles.userEmail}>{`${user.email}`}</h5>
          </div>
          <button className="btn btn-secondary" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
    )
  )
}

const NavBar = () => {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false)
  const [showTasksMenu, setShowTasksMenu] = useState<boolean>(false)
  const nodeRefCal = useRef<HTMLDivElement>(null)
  const nodeRefUser = useRef<HTMLDivElement>(null)
  useClickOutside(nodeRefCal, () => setShowTasksMenu(false))
  useClickOutside(nodeRefUser, () => setShowUserMenu(false))
  return (
    <div className={styles.navWrapper} data-testid="container-calender-btn">
      <div className={styles.navbar}>
        <SearchInput />

        <div className="d-flex flex-align-center flex-justify-end flex-one">
          <Tooltip title="Tasks">
            <button
              className="btn-icon"
              onClick={() => setShowTasksMenu(!showTasksMenu)}
              data-testid="calender-btn"
            >
              <Icon name="calendar-dates" fill="var(--greyscale-6)" />
            </button>
          </Tooltip>
          <Tooltip title="Profile">
            <button
              className="btn-icon"
              onClick={() => setShowUserMenu(!showUserMenu)}
              data-testid="user-menu-btn"
            >
              <Icon name="user" fill="var(--greyscale-6)" />
            </button>
          </Tooltip>
        </div>
      </div>
      {showUserMenu && (
        <div ref={nodeRefUser}>
          <UserMenu />
        </div>
      )}
      {showTasksMenu && (
        <div ref={nodeRefCal}>
          <TaskMenu />
        </div>
      )}
    </div>
  )
}

export default NavBar
