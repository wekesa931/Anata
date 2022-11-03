import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BioData from './summary/biodata/biodata.component'
import styles from './bene-dashboard.component.css'
import Views from './views/views.component'
import Actions from './actions/actions.component'
import Fetcher from '../utils/fetcher/fetcher'
import ErrorBoundary from '../error-boundary/error-boundary.component'
import analytics from '../../helpers/segment'
import { MemberProvider } from '../../context/member.context'

function PatientDashboard() {
  const [recId, setRecId] = useState<string>()
  const params = useParams<any>()

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
          <div className={styles.container}>
            <ErrorBoundary>
              <BioData />
            </ErrorBoundary>
            <div className="bene-views">
              <Views />
            </div>

            <div className="right-pane">
              <Actions />
            </div>
          </div>
        </MemberProvider>
      )}
    </Fetcher>
  )
}

export default PatientDashboard
