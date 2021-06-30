import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { ArrowRightCircle, ArrowLeftCircle } from 'react-feather'
import BioData from './summary/biodata/biodata.component'
import styles from './bene-dashboard.component.css'
import Views from './views/views.component'
import Actions from './actions/actions.component'
import Fetcher from '../utils/fetcher/fetcher'
import analytics from '../../helpers/segment'
import { MemberProvider } from '../../context/member.context'
import { CallProvider } from '../../context/calls-context'

const PatientDashboard = () => {
  const [recId, setRecId] = useState<string>()
  const { params } = useRouteMatch<any>()
  const [expandActions, setExpandActions] = useState<boolean>(true)

  if (params.recId && recId !== params.recId) {
    setRecId(params.recId)
  }

  useEffect(() => {
    if (recId) {
      analytics.page('Member Dashboard', {
        memberId: recId,
      })
    }
  }, [recId])

  const getDocumentTitle = (member: any) => {
    return `Scribe: ${member['Full Name'] ? member['Full Name'] : 'Loading'}`
  }

  return (
    <Fetcher
      url={`members/${recId}`}
      contextKey={recId}
      skeleton={false}
      getDocumentTitle={getDocumentTitle}
    >
      {(response: any) => (
        <MemberProvider member={response}>
          <CallProvider>
            <div className={styles.container}>
              <div className="dashboard-content dashboard-raised-content padding-top-32">
                <BioData />
              </div>
              <div
                className="dashboard-content padding-top-32"
                style={{ flex: 1, borderRight: '1px solid var(--blue-light)' }}
              >
                <Views />
              </div>
              <div
                className="right-sidebar dashboard-content dashboard-raised-content "
                style={{
                  display: expandActions ? 'flex' : 'none',
                }}
              >
                <Actions />
              </div>
            </div>
          </CallProvider>
          {expandActions && (
            <button
              className="hide-show"
              onClick={() => setExpandActions(!expandActions)}
            >
              <ArrowRightCircle />
            </button>
          )}
          {!expandActions && (
            <button
              className="hide-show-right"
              onClick={() => setExpandActions(!expandActions)}
            >
              <ArrowLeftCircle />
            </button>
          )}
        </MemberProvider>
      )}
    </Fetcher>
  )
}

export default PatientDashboard
