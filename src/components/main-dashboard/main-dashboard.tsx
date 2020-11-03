import React from 'react'
import { always } from 'kremling'
import styles from './main-dashboard.component.css'
import CircleChevronRight from '../../assets/img/icons/ circle-chevron-right.svg'
import AirtableIframe from '../utils/airtableIframe/airtableIframe.component'
import { useUser } from '../../context/user-context'
import config from '../../config/config'
import Tabs from '../utils/tabs/tabs.component'
import analytics from '../../helpers/segment'

const HNDashboard = () => {
  const user = useUser()
  const { iframes } = config

  const getTasksView = () => {
    if (user && iframes[user.profileObj.email]) {
      return iframes[user.profileObj.email].hntasks
    }
    return iframes.default.hntasks
  }

  const views = [
    {
      name: 'Members',
      description: 'View all member details.',
      airtableUrl: `https://airtable.com/embed/${iframes.default.members}?viewControls=on`,
    },
    {
      name: 'HN Tasks',
      description: 'Your view of HN tasks',
      hasCalendar: true,
    },
  ]

  const [activeView, setActiveView] = React.useState(0)

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardLinks}>
        <h5 className={styles.heading}>All table links</h5>
        <p className="text-heading-2">Choose a view</p>
        <div className="margin-top-24">
          {views.map((view, index) => {
            return (
              <button
                className="btn-unstyled btn-list"
                onClick={() => {
                  analytics.page({
                    title: `Main Dashboard: ${view.name}`,
                  })
                  setActiveView(index)
                }}
                key={view.name}
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
        {!views[activeView].hasCalendar ? (
          <AirtableIframe src={views[activeView].airtableUrl} />
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
        )}
      </div>
    </div>
  )
}

export default HNDashboard
