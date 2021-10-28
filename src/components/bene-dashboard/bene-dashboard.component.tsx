import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { ArrowRightCircle, ArrowLeftCircle } from 'react-feather'
import BioData from './summary/biodata/biodata.component'
import styles from './bene-dashboard.component.css'
import Views from './views/views.component'
import Actions from './actions/actions.component'
import Fetcher from '../utils/fetcher/fetcher'
import ErrorBoundary from '../error-boundary/error-boundary.component'
import analytics from '../../helpers/segment'
import { MemberProvider } from '../../context/member.context'

const PatientDashboard = () => {
  const [recId, setRecId] = useState<string>()
  const { params } = useRouteMatch<any>()
  const [rightSidebarOpen, setRightSidebarOpen] = useState<boolean>(true)

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

  const toggleRightSideBar = () => {
    setRightSidebarOpen(!rightSidebarOpen)
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
          <div className={styles.container}>
            <div className="dashboard-content dashboard-raised-content">
              <ErrorBoundary>
                <BioData />
              </ErrorBoundary>
            </div>
            <div className="dashboard-content padding-top-16 bene-views">
              <Views />
            </div>

            <div className="dashboard-content dashboard-raised-content">
              <div className="right-sidebar">
                {rightSidebarOpen ? (
                  <>
                    <button className="hide-show" onClick={toggleRightSideBar}>
                      <ArrowRightCircle />
                    </button>
                    <div
                      style={{
                        display: 'flex',
                        overflowY: 'scroll',
                      }}
                    >
                      <Actions />
                    </div>
                  </>
                ) : (
                  <button
                    className="hide-show-right"
                    onClick={toggleRightSideBar}
                  >
                    <ArrowLeftCircle />
                  </button>
                )}
              </div>
            </div>
          </div>
        </MemberProvider>
      )}
    </Fetcher>
  )
}

export default PatientDashboard
