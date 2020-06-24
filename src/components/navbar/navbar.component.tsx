import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import MenuDotsIcon from '../../assets/img/icons/menu_dots.svg'
import styles from './navbar.component.css'

const NavBar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logoContainer}>
          <span className="logo">antara</span>
          <span className="hnos">HNOS</span>
        </div>
        <div>
          <IconButton>
            <SvgIcon style={{ color: 'white' }}>
              <MenuDotsIcon />
            </SvgIcon>
          </IconButton>
          <IconButton>
            <AccountCircleOutlinedIcon fill="white" />
          </IconButton>
        </div>
      </div>
    </>
  )
}

export default NavBar
