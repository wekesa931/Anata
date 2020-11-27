import React from 'react'
import { always } from 'kremling'
import styles from './main-dashboard.component.css'
import CircleChevronRight from '../../assets/img/icons/ circle-chevron-right.svg'
import AirtableIframe from '../utils/airtableIframe/airtableIframe.component'
import { useUser } from '../../context/user-context'
import config from '../../config/config'
import Tabs from '../utils/tabs/tabs.component'
import analytics from '../../helpers/segment'
import FlagForReview from './flag-for-review/flag-for-review.component'

const HNDashboard = () => {
  const user = useUser()
  const { iframes } = config

  const getTasksView = () => {
    if (user && iframes[user.email]) {
      return iframes[user.email].hntasks
    }
    return iframes.default.hntasks
  }

  const getMeetingsView = () => {
    if (user && iframes[user.email]) {
      return iframes[user.email].meetings
    }
    return iframes.default.meetings
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
    {
      name: 'HN Meetings',
      description: 'Your view of HN meetings',
      airtableUrl: `https://airtable.com/embed/${getMeetingsView()}?viewControls=on`,
    },
    {
      name: 'Interactions',
      description: 'All benes interactions in one place',
      component: () => <FlagForReview />,
    },
  ]

  const [activeView, setActiveView] = React.useState(0)

  const AirtableView = ({ view }: { view: number }) => {
    return !views[view].hasCalendar ? (
      <AirtableIframe src={views[view].airtableUrl || ''} />
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
        {views[activeView].component ? (
          views[activeView].component()
        ) : (
          <AirtableView view={activeView} />
        )}
      </div>
    </div>
  )
}

export default HNDashboard
