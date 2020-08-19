import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import MenuDotsIcon from '../../assets/img/icons/menu_dots.svg'
import UserIcon from '../../assets/img/icons/user.svg'
import styles from './navbar.component.css'
import { useUser } from '../../context/user-context'
import { useAuth } from '../../context/auth-context'

const UserMenu = () => {
  const user = useUser()
  const auth = useAuth()
  const history = useHistory()

  const logout = () => {
    auth.logout()
    history.push('/login')
  }

  return (
    user && (
      <div className={styles.userMenuContainer}>
        <div className={`card ${styles.userMenu}`}>
          <div className={styles.userProfile}>
            <img
              src={user.profileObj.imageUrl || ''}
              className={styles.userImage}
              alt="user"
            />
            <h4>
              {`${user.profileObj.givenName} ${user.profileObj.familyName}`}
            </h4>
            <h5 className={styles.userEmail}>{`${user.profileObj.email}`}</h5>
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
  return (
    <div className={styles.navWrapper}>
      <div className={styles.navbar}>
        <div className={styles.logoContainer}>
          <span className="logo">antara</span>
          <span className="hnos">health</span>
        </div>
        <div className="d-flex flex-align-center flex-justify-end flex-one">
          <button className="btn-icon">
            <MenuDotsIcon className="icon-white" />
          </button>
          <button
            className="btn-icon"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <UserIcon className="icon-white" />
          </button>
        </div>
      </div>
      {showUserMenu && <UserMenu />}
    </div>
  )
}

export default NavBar
