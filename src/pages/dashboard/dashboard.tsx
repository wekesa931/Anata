import React from 'react'
import styles from './dashboard.component.css'
import AirtableIframe from '../../components/airtableIframe/airtableIframe.component'

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardLinks}>
        <h5 className={styles.heading}>All table links</h5>
        <p className="text-heading-2">Choose an Airtable View</p>
      </div>
      <div className="dashboardView"></div>
    </div>
  )
}

export default Dashboard
