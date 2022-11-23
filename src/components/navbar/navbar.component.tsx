import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu as MenuIcon } from 'react-feather'
import { CssBaseline, IconButton } from '@mui/material'
import styles from './navbar.component.css'
import { useUser } from '../../context/user-context'
import { useAuth } from '../../context/auth-context'
import SearchInput from '../search/search.component'
import Icon from '../utils/icon/icon.component'
import analytics from '../../helpers/segment'
import TaskMenu from './task-menu/task-menu.component'
import Tooltip from '../utils/tooltip/tooltip.component'
import useClickOutside from '../../hooks/click-outside-hook'
import FlatLogo from '../../assets/img/logo/Antara Logo@1x.png'
import FloatingMenu from './menu.component'

function UserMenu() {
  const user = useUser()
  const auth = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    auth.logout()
    analytics.track('User LoggedOut')
    navigate('/login')
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

function NavBar() {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false)
  const [showTasksMenu, setShowTasksMenu] = useState<boolean>(false)
  const nodeRefCal = useRef<HTMLDivElement>(null)
  const nodeRefUser = useRef<HTMLDivElement>(null)
  useClickOutside(nodeRefCal, () => setShowTasksMenu(false))
  useClickOutside(nodeRefUser, () => setShowUserMenu(false))

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={styles.navWrapper} data-testid="container-calender-btn">
      <CssBaseline />
      <div className={styles.navbar}>
        <div className={styles.menuWrapper}>
          <IconButton className={styles.logoMain} onClick={handleClick}>
            <MenuIcon />
          </IconButton>

          <img
            src={FlatLogo}
            width="32px"
            height="32px"
            alt="antara small logo"
          />
          <h5 className={styles.logoText}>Antara health</h5>
        </div>
        <FloatingMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
        />
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
