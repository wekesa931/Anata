import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import BioData from './summary/biodata/biodata.component'
import airtableFetch from '../../resources/airtableFetch'
import styles from './bene-dashboard.component.css'

import { useUser } from '../../context/user-context'
import Views from './views/views.component'
import Actions from './actions/actions.component'

const PatientDashboard = () => {
  const [recId, setRecId] = useState<string>()
  const [member, setMember] = useState<any>(null)
  const { params } = useRouteMatch<any>()
  const user = useUser()

  if (params.recId && !recId) {
    setRecId(params.recId)
  }
  useEffect(() => {
    if (recId && user) {
      airtableFetch(`members/${recId}`, user.tokenId).then((response: any) => {
        setMember(response)
      })
    }
  }, [recId, user])

  return member ? (
    <div className={styles.container}>
      <div className="dashboard-content dashboard-raised-content">
        <BioData member={member} />
      </div>
      <div
        className="dashboard-content"
        style={{ flex: 1, borderRight: '1px solid var(--blue-light)' }}
      >
        <Views member={member} />
      </div>
      <div
        className="dashboard-content"
        style={{ width: '368px', background: 'white' }}
      >
        <Actions member={member} />
      </div>
    </div>
  ) : null
}

export default PatientDashboard
