import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import BioData from './summary/biodata/biodata.component'
import styles from './bene-dashboard.component.css'
import Views from './views/views.component'
import Actions from './actions/actions.component'
import Fetcher from '../utils/fetcher/fetcher'
import analytics from '../../helpers/segment'
import { MemberProvider } from '../../context/member.context'

const PatientDashboard = () => {
  const [recId, setRecId] = useState<string>()
  const { params } = useRouteMatch<any>()

  if (params.recId && recId !== params.recId) {
    setRecId(params.recId)
  }

  React.useEffect(() => {
    if (recId) {
      analytics.page()
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
              className="dashboard-content dashboard-raised-content padding-top-32"
              style={{ width: '372px', borderRadius: '0px' }}
            >
              <Actions />
            </div>
          </div>
        </MemberProvider>
      )}
    </Fetcher>
  )
}

export default PatientDashboard
