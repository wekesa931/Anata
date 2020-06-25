import React from 'react'
import AirtableIframe from '../../components/airtableIframe/airtableIframe.component'
import styles from './dashboard.component.css'

const Dashboard = () => {
  return (
    <AirtableIframe src="https://airtable.com/embed/shrXAgtdZNtbEQ4Z1?backgroundColor=green&viewControls=on" />
  )
}

export default Dashboard
