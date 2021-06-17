import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import MenuDotsIcon from '../../assets/img/icons/menu_dots.svg'
import styles from './navbar.component.css'
import { useUser } from '../../context/user-context'
import { useAuth } from '../../context/auth-context'
import SearchInput from '../search/search.component'
import Icon from '../utils/icon/icon.component'
import analytics from '../../helpers/segment'
import TaskMenu from './task-menu/task-menu.component'

const UserMenu = () => {
  const user = useUser()
  const auth = useAuth()
  const history = useHistory()

  const logout = () => {
    auth.logout()
    analytics.track('User LoggedOut')
    history.push('/login')
  }

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
            <h4>{`${user.given_name} ${user.family_name}`}</h4>
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

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navbar}>
        <SearchInput />

        <div className="d-flex flex-align-center flex-justify-end flex-one">
          <button
            className="btn-icon"
            onClick={() => setShowTasksMenu(!showTasksMenu)}
          >
            <Icon name="calendar-dates" fill="var(--greyscale-6)" />
          </button>
          <button className="btn-icon">
            <MenuDotsIcon className="icon-white" />
          </button>

          <button
            className="btn-icon"
            onClick={() => setShowUserMenu(!showUserMenu)}
            data-testid="user-menu-btn"
          >
            <Icon name="user" fill="var(--greyscale-6)" />
          </button>
        </div>
      </div>
      {showUserMenu && <UserMenu />}
      {showTasksMenu && <TaskMenu />}
    </div>
  )
}

export default NavBar
