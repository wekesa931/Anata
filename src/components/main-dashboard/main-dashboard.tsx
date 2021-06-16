import React from 'react'
import styles from './main-dashboard.component.css'
import AirtableIframe from '../utils/airtableIframe/airtableIframe.component'
import { useUser } from '../../context/user-context'
import config from '../../config/config'
import Tabs from '../utils/tabs/tabs.component'
import { useSidebar } from '../../context/sidebar-context'

const HNDashboard = () => {
  const user = useUser()
  const { activeView, activeSubView } = useSidebar()
  const { iframes } = config

  const getTasksView = () => {
    if (user && iframes[user.email]) {
      return iframes[user.email].hntasks
    }
    return iframes.default.hntasks
  }

  const AirtableView = () => {
    const subListUrl = process.env.PROD ? activeSubView.rootUrl : activeSubView.url_sandbox
    const listUrl = process.env.PROD ? activeView.rootUrl : activeView.url_sandbox
    return !activeView.hasCalendar ? (
      <AirtableIframe src={activeSubView ? subListUrl : listUrl} />
    ) : (
      <Tabs>
        <div label="Calendar">
          <AirtableIframe
            src={`https://airtable.com/embed/${
              getTasksView().calendar
            }?viewControls=on`}
          />
        </div>
        <div label="Grid">
          <AirtableIframe
            src={`https://airtable.com/embed/${
              getTasksView().grid
            }?viewControls=on`}
          />
        </div>
      </Tabs>
    )
  }

  React.useEffect(() => {
    document.title = `Scribe Home: ${activeView.name}`
  }, [activeView])

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardView}>
        <p
          data-testid="hn-text-heading"
          className="text-heading-2 margin-bottom-16"
        >
          {activeSubView ? activeSubView.name : activeView.name}
        </p>
        {activeView.component || activeSubView.component ? (activeView.component || activeSubView.component) : (<AirtableView/>)}
      </div>
    </div>
  )
}

export default HNDashboard
