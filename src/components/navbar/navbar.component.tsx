import React from 'react'

import Drawer from '@material-ui/core/Drawer'
import makeStyles from '@material-ui/core/styles/makeStyles'
import createStyles from '@material-ui/core/styles/createStyles'

import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import MenuIcon from '@material-ui/icons/MenuRounded'
import MenuDotsIcon from '../../assets/img/icons/menu_dots.svg'
import logo from '../../assets/img/logo/antara-logo.png'
import styles from './navbar.component.css'

const NavBar = () => {
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const useStyles = makeStyles(() =>
    createStyles({
      drawerPaper: {
        width: 240,
      },
    })
  )

  const classes = useStyles()

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        className={styles.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={styles.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {/* <CloseRoundedIcon /> */}
          </IconButton>
        </div>
      </Drawer>
      <div className={styles.navbar}>
        <div className={styles.logoContainer}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} className={styles.navbarLogo} alt="Antara Logo" />
        </div>
        <div>
          <IconButton>
            <SvgIcon>
              <MenuDotsIcon />
            </SvgIcon>
          </IconButton>
          <IconButton>
            <AccountCircleOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </>
  )
}

export default NavBar
