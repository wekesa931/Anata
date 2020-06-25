import React from 'react'
import { always, toggle } from 'kremling'
import styles from './sidebar.component.css'
import FlatLogo from '../../assets/img/logo/flat-logo-48.svg'
import SidebarMenuItems from './sidebar.menu'
import { Link, useRouteMatch } from 'react-router-dom'

const Sidebar = () => {
  const { path } = useRouteMatch()
  const isActive = (rootUrl: string) => path === rootUrl
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <FlatLogo />
      </div>
      {SidebarMenuItems.map((item) => (
        <div key={item.name}>
          <div
            className={always(styles.menuItem).maybe(
              styles.active,
              isActive(item.rootUrl)
            )}
          >
            {isActive(item.rootUrl) && <div className={styles.borderItemTop} />}
            <Link to={item.rootUrl}>
              <button className={`btn ${styles.menuLink}`}>
                <div style={{ marginBottom: '.5rem' }}>{item.icon}</div>
                <h5
                  className={toggle(
                    'text-blue-light',
                    'text-blue-dark',
                    !isActive(item.rootUrl)
                  )}
                >
                  {item.name}
                </h5>
              </button>
            </Link>
            {isActive(item.rootUrl) && (
              <div className={styles.borderItemBottom} />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
