import React, { useState, useRef } from 'react'
import { Menu as MenuIcon } from 'react-feather'
import { CssBaseline, IconButton } from '@mui/material'
import { useUser } from 'src/context/user'
import { useAuth } from 'src/context/auth'
import SearchInput from 'src/components/search'
import analytics from 'src/config/analytics'
import Tooltip from 'src/components/tooltip'
import useClickOutside from 'src/hooks/click-outside'
import FlatLogo from 'src/assets/img/logo/Antara Logo@1x.png'
import PrimaryButton from 'src/components/buttons/primary'
import { useRegistrationForm } from 'src/context/member-registration'
import CalendarIcon from 'src/assets/img/icons/calendar-dates.svg?react'
import UserIcon from 'src/assets/img/icons/user.svg?react'
import TaskMenu from './task-menu/task-menu.component'
import styles from './navbar.module.css'
import FloatingMenu from './menu.component'

function UserMenu() {
  const user = useUser()
  const auth = useAuth()

  const logout = () => {
    analytics.track('Member Dashboard - User LoggedOut')
    auth.logout()
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

  const { setIsFormOpen, isDataLoading } = useRegistrationForm()

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
          <h5 className={styles.logoText}>Antara Health</h5>
        </div>
        <FloatingMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
        />

        <SearchInput />
        <div className="ml-4 flex justify-center items-center">
          {!isDataLoading && (
            <PrimaryButton
              className="normal-case"
              onClick={() => setIsFormOpen(true)}
            >
              Register new member
            </PrimaryButton>
          )}
        </div>

        <div className="d-flex flex-align-center flex-justify-end flex-one">
          <Tooltip title="Tasks">
            <button
              className="btn-icon"
              onClick={() => setShowTasksMenu(!showTasksMenu)}
              data-testid="calender-btn"
            >
              <CalendarIcon />
            </button>
          </Tooltip>
          <Tooltip title="Profile">
            <button
              className="btn-icon"
              onClick={() => setShowUserMenu(!showUserMenu)}
              data-testid="user-menu-btn"
            >
              <UserIcon fill="var(--greyscale-6)" />
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
