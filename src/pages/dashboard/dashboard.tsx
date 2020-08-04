import React from 'react'
import { always } from 'kremling'
import styles from './dashboard.component.css'
import CircleChevronRight from '../../assets/img/icons/ circle-chevron-right.svg'
import AirtableIframe from '../../components/airtableIframe/airtableIframe.component'
import { useUser } from '../../context/user-context'
import HNCalendarViews from './hntasks-views'
import config from '../../config/config'

const HNDashboard = () => {
  const user = useUser()
  const { iframes } = config

  const getTasksView = () => {
    if (user && HNCalendarViews[user.profileObj.email]) {
      return HNCalendarViews[user.profileObj.email].hntasks
    }
    return `https://airtable.com/embed/shr9X5XXxg3sVTdpp?viewControls=on`
  }

  const views = [
    {
      name: 'Members',
      description: 'View all member details.',
      airtableUrl: `https://airtable.com/embed/${iframes.members}?viewControls=on`,
    },
    {
      name: 'HN Tasks',
      description: 'Your view of HN tasks',
      airtableUrl: getTasksView(),
    },
    {
      name: 'Vitals',
      description: 'View all member vitals.',
      airtableUrl:
        'https://airtable.com/embed/shr1Vt8OfiwYt87mT?viewControls=on',
    },
  ]

  const [activeView, setActiveView] = React.useState(0)

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardLinks}>
        <h5 className={styles.heading}>All table links</h5>
        <p className="text-heading-2">Choose an Airtable View</p>
        <div className="margin-top-24">
          {views.map((view, index) => {
            return (
              <button
                className="btn-unstyled btn-list"
                onClick={() => setActiveView(index)}
                key={view.airtableUrl}
              >
                <div
                  className={always('list-item-heading').maybe(
                    'list-item-active',
                    index === activeView
                  )}
                >
                  {view.name}
                  <p>
                    <CircleChevronRight
                      fill={
                        index === activeView
                          ? 'var(--orange-base)'
                          : 'var(--blue-base)'
                      }
                    />
                  </p>
                </div>
                <p className="list-item-description">{view.description}</p>
                <div className="divider" />
              </button>
            )
          })}
        </div>
      </div>
      <div className={styles.dashboardView}>
        <p className="text-heading-2 margin-bottom-16">
          {views[activeView].name}
        </p>
        <AirtableIframe src={views[activeView].airtableUrl} />
      </div>
    </div>
  )
}

export default HNDashboard
