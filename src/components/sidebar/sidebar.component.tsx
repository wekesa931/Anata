import React from 'react'
import { always, toggle } from 'kremling'
import { Link, useRouteMatch } from 'react-router-dom'
import styles from './sidebar.component.css'
import FlatLogo from '../../assets/img/logo/Antara Logo@1x.png'
import SidebarMenuItems from './sidebar.menu'

const Sidebar = () => {
  const { path } = useRouteMatch()
  const isActive = (rootUrl: string) => path === rootUrl
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={FlatLogo} width="40px" height="40px" />
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
              <button className={`btn-unstyled ${styles.menuLink}`}>
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
