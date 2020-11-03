import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import BioData from './summary/biodata/biodata.component'
import styles from './bene-dashboard.component.css'
import Views from './views/views.component'
import Actions from './actions/actions.component'
import Fetcher from '../utils/fetcher/fetcher'
import analytics from '../../helpers/segment'

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

  return (
    <Fetcher url={`members/${recId}`} contextKey={recId} skeleton={false}>
      {(response: any) => (
        <div className={styles.container}>
          <div className="dashboard-content dashboard-raised-content padding-top-32">
            <BioData member={response} />
          </div>
          <div
            className="dashboard-content padding-top-32"
            style={{ flex: 1, borderRight: '1px solid var(--blue-light)' }}
          >
            <Views member={response} />
          </div>
          <div
            className="dashboard-content dashboard-raised-content padding-top-32"
            style={{ width: '372px', borderRadius: '0px' }}
          >
            <Actions member={response} />
          </div>
        </div>
      )}
    </Fetcher>
  )
}

export default PatientDashboard
