import dayjs from 'dayjs'
import React from 'react'
import styles from './footer.component.css'

function Footer() {
  return (
    <div className={styles.container}>
      <p>
        Build:{' '}
        {dayjs(process.env.RELEASE_DATE).local().format('DD MMM YYYY hh:mmA')}{' '}
        {process.env.VERSION}@{process.env.COMMIT?.substr(0, 6)}
      </p>
      <p>&copy; Antara Health {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer
