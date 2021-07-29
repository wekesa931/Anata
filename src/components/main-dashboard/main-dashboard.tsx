import React from 'react'
import styles from './main-dashboard.component.css'
import AirtableIframe from '../utils/airtableIframe/airtableIframe.component'
import { useSidebar } from '../../context/sidebar-context'

const HNDashboard = () => {
  const { activeView, activeSubView, prev } = useSidebar()

  const AirtableView = () => {
    const subListUrl = process.env.PROD
      ? activeSubView?.rootUrl
      : activeSubView?.url_sandbox
    const listUrl = process.env.PROD
      ? activeView?.rootUrl
      : activeView?.url_sandbox
    const prevUrl = process.env.PROD ? prev?.rootUrl : prev?.url_sandbox
    const urlToShow = () => {
      if (activeView.name === 'Tasks' && !activeSubView) {
        return prevUrl
      }
      if (activeSubView) {
        return subListUrl
      }

      return listUrl
    }
    if (!prev.component) {
      return <AirtableIframe src={urlToShow()} />
    }
    if (!activeSubView && prev.component && activeView.name === 'Tasks') {
      return prev.component
    }

    return <AirtableIframe src={urlToShow()} />
  }

  React.useEffect(() => {
    document.title = `Scribe Home: ${activeView.name}`
  }, [activeView])
  const view = () => {
    if (activeSubView) {
      return activeSubView.name
    }
    if (activeView.name === 'Tasks') {
      return prev.name
    }
    return activeView.name
  }
  return (
    <div data-testid="main-dash" className={styles.dashboard}>
      <div className={styles.dashboardView}>
        <p
          data-testid="hn-text-heading"
          className="text-heading-2 margin-bottom-16"
        >
          {view()}
        </p>
        {activeView?.component && !activeSubView ? (
          activeView?.component
        ) : (
          <AirtableView />
        )}
      </div>
    </div>
  )
}

export default HNDashboard
