import React from 'react'
import styles from './sidebar.component.css'
import FlatLogo from '../../assets/img/logo/flat-logo-48.svg'
import SidebarMenuItems from './sidebar.menu'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <FlatLogo />
      </div>
      {SidebarMenuItems.map((item) => (
        <div className={styles.menuItem}>
          <div className={styles.borderItemTop} />
          <div style={{ marginBottom: '.5rem' }}>{item.icon}</div>
          <h5>{item.name}</h5>
          <div className={styles.borderItemBottom} />
        </div>
      ))}
    </div>
  )
}

export default Sidebar
