import React from 'react'
import styles from './dashboard.component.css'
import { always } from 'kremling'
import CircleChevronRight from '../../assets/img/icons/ circle-chevron-right.svg'
import AirtableIframe from '../../components/airtableIframe/airtableIframe.component'

const Dashboard = () => {
  const views = [
    {
      name: 'Members table',
      description: 'View all member details.',
      airtableUrl:
        'https://airtable.com/embed/shrMjDe4yAifyJLyV?viewControls=on',
    },
    {
      name: 'Baseline',
      description: 'View member baselines.',
      airtableUrl:
        'https://airtable.com/embed/shrxDM8cg1gCh7ku9?viewControls=on',
    },
    {
      name: 'Vitals',
      description: 'View all member vitals.',
      airtableUrl:
        'https://airtable.com/embed/shr1Vt8OfiwYt87mT?viewControls=on',
    },
    {
      name: 'Members table',
      description: 'View all member details.',
      airtableUrl:
        'https://airtable.com/embed/shrMjDe4yAifyJLyV?viewControls=on',
    },
    {
      name: 'Baseline',
      description: 'View member baselines.',
      airtableUrl:
        'https://airtable.com/embed/shrxDM8cg1gCh7ku9?viewControls=on',
    },
    {
      name: 'Vitals',
      description: 'View all member vitals.',
      airtableUrl:
        'https://airtable.com/embed/shr1Vt8OfiwYt87mT?viewControls=on',
    },
    {
      name: 'Members table',
      description: 'View all member details.',
      airtableUrl:
        'https://airtable.com/embed/shrMjDe4yAifyJLyV?viewControls=on',
    },
    {
      name: 'Baseline',
      description: 'View member baselines.',
      airtableUrl:
        'https://airtable.com/embed/shrxDM8cg1gCh7ku9?viewControls=on',
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

export default Dashboard
