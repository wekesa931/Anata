import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import airtableFetch from '../../../../../resources/airtable-fetch'
import Table from '../../../../utils/table/table.component'

const Appointments = () => {
  const { recId } = useParams()
  const [appointments, setAppointments] = useState<any[]>([])
  useEffect(() => {
    airtableFetch(
      `appointments/list/0?view=HN%20Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const apps = Object.keys(response).map((key) => response[key])
      setAppointments(apps)
    })
  }, [recId])
  const columns = [
    { name: 'Appt Date', format: 'dd/mmm/yy', key: 'start_date_time' },
    { name: 'Status', format: '\n', key: 'Status' },
  ]
  return (
    <div>
      <h4>Appointments</h4>
      <Table
        title=""
        columns={columns}
        data={appointments}
        dateColumnKey="start_date_time"
      />
    </div>
  )
}

export default Appointments
