import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSortFilter } from '../../../../../context/sort-filter-views.context'
import airtableFetch from '../../../../../resources/airtable-fetch'
import Table from '../../../../utils/table/table.component'

const Appointments = () => {
  const { recId } = useParams()
  const [appointments, setAppointments] = useState<any[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([])
  const {
    ops: {
      filters: { appointments: filters },
    },
  } = useSortFilter()

  useEffect(() => {
    let isCancelled = false
    airtableFetch(
      `appointments/list?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      if (!isCancelled) {
        const apps = Object.keys(response).map((key) => response[key])
        setAppointments(apps)
      }
    })
    return () => {
      isCancelled = true
    }
  }, [recId])

  useEffect(() => {
    let isCancelled = false
    let apps = appointments
    if (filters) {
      if (filters.service) {
        apps = apps.filter((app) => app.Service === filters.service)
      }
      if (filters.status) {
        apps = apps.filter((app) => app.Status === filters.status)
      }
      if (!isCancelled) {
        setFilteredAppointments(apps)
      }
    }
    return () => {
      isCancelled = true
    }
  }, [appointments, filters])

  const columns = [
    { name: 'Appt Date', format: 'dd/mmm/yy', key: 'start_date_time' },
    { name: 'Status', format: '\n', key: 'Status' },
  ]
  return (
    <div>
      <div className="d-flex flex-align-center">
        <h4>Appointments</h4>
        {filters.status && (
          <span className="badge badge-success">Status: {filters.status}</span>
        )}
        {filters.service && (
          <span className="badge badge-success">
            Service: {filters.service}
          </span>
        )}
      </div>
      <Table
        title=""
        columns={columns}
        data={filteredAppointments}
        dateColumnKey="start_date_time"
      />
    </div>
  )
}

export default Appointments
