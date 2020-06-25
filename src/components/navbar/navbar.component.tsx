import React from 'react'
import MenuDotsIcon from '../../assets/img/icons/menu_dots.svg'
import UserIcon from '../../assets/img/icons/ user.svg'
import styles from './navbar.component.css'

const NavBar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logoContainer}>
          <span className="logo">antara</span>
          <span className="hnos">HNOS</span>
        </div>
        <div className="d-flex flex-align-center flex-justify-end flex-one">
          <button className="btn btn-icon">
            <MenuDotsIcon className="icon-white" />
          </button>
          <button className="btn btn-icon">
            <UserIcon className="icon-white" />
          </button>
        </div>
      </div>
    </>
  )
}

export default NavBar
