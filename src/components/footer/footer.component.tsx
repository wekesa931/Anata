import React from 'react'
import styles from './footer.component.css'

const Footer = () => {
  console.log(process.env, 'Env Variables')
  return (
    <div className={styles.container}>
      <p>
        Build: {process.env.BUILD_DATE} {process.env.VERSION}@
        {process.env.COMMIT}
      </p>
      <p>&copy; Antara Health {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer
