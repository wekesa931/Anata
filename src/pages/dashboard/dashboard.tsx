import React from 'react'
import AirtableIframe from '../../components/airtableIframe/airtableIframe.component'
import styles from './dashboard.component.css'

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <AirtableIframe src="https://airtable.com/embed/shrXAgtdZNtbEQ4Z1?backgroundColor=green&viewControls=on" />
      </div>
    </div>
  )
}

export default Dashboard
