import React from 'react'
import { always, toggle } from 'kremling'
import styles from './sidebar.component.css'
import FlatLogo from '../../assets/img/logo/flat-logo-48.svg'
import SidebarMenuItems from './sidebar.menu'

const Sidebar = () => {
  const isActive = (index: number) => index === 0
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <FlatLogo />
      </div>
      {SidebarMenuItems.map((item, index) => (
        <>
          <div
            className={always(styles.menuItem).maybe(
              styles.active,
              isActive(index)
            )}
          >
            {isActive(index) && <div className={styles.borderItemTop} />}
            <div className={styles.menuLink}>
              <div style={{ marginBottom: '.5rem' }}>{item.icon}</div>
              <h5
                className={toggle(
                  'text-blue-light',
                  'text-blue-dark',
                  !isActive(index)
                )}
              >
                {item.name}
              </h5>
            </div>
            {isActive(index) && <div className={styles.borderItemBottom} />}
          </div>
        </>
      ))}
    </div>
  )
}

export default Sidebar
