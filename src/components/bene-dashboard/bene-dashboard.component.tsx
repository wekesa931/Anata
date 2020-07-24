import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import BioData from './biodata/biodata.component'
import airtableFetch from '../../utils/airtableFetch'
import styles from './bene-dashboard.component.css'

import { useUser } from '../../context/user-context'

const PatientDashboard = () => {
  const [recId, setRecId] = useState<string>()
  const [member, setMember] = useState<any>()
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
      <div>
        <BioData member={member} />
      </div>
      <div style={{ width: '550px' }} />
      <div style={{ width: '350px' }} />
    </div>
  ) : null
}

export default PatientDashboard
