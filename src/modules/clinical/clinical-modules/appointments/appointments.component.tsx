/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react'
import { useSortFilter } from 'src/context/sort-filter'
import airtableFetch from 'src/services/airtable/fetch'
import Modal from 'src/components/modals'
import TextArea from 'src/components/forms/textarea'
import LoadingComponent from 'src/components/loaders/table-loader'
import { useMember } from 'src/context/member'
import DataTable, { Column } from 'src/components/table/data-table'
import dayjs from 'dayjs'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import filterFields from 'src/utils/airtable/field-utils'

function PafuView({ data }: any) {
  const [showPafu, setShowPafu] = useState(false)
  const [pafuRecordId, setPafuRecordId] = useState('')
  const [pafu, setPafu] = useState<any>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (pafuRecordId) {
      setLoading(true)
      airtableFetch(`pafu/${pafuRecordId}`)
        .then((res: any) => {
          setPafu(res)
        })
        .finally(() => setLoading(false))
    }
  }, [pafuRecordId])

  const openPafu = (e: any) => {
    e.stopPropagation()
    setShowPafu(true)
    setPafuRecordId(data?.PAFU[0])
  }

  const getValue = (value: any) => {
    if (Array.isArray(value)) {
      return value.join(', ')
    }
    if (typeof value === 'object') {
      return JSON.stringify(value)
    }
    return value
  }

  return (
    <>
      {data?.PAFU?.length > 0 && (
        <button
          className="btn btn-small btn-secondary"
          onClick={(e) => openPafu(e)}
        >
          PAFU
        </button>
      )}
      {showPafu && (
        <Modal
          heading={<h3>PAFU</h3>}
          open={showPafu}
          setModalOpen={setShowPafu}
        >
          {pafu &&
            Object.keys(pafu).map((key) => {
              return (
                <div key={key} onClick={(e) => e.stopPropagation()}>
                  <label htmlFor={key}>
                    {key}
                    <TextArea disabled value={getValue(pafu[key])} />
                  </label>
                </div>
              )
            })}
          {loading && (
            <div className="d-flex flex-direction-column flex-align-center">
              <LoadingIcon className="h-6 w-6" />
              Loading Pafu
            </div>
          )}
        </Modal>
      )}
    </>
  )
}

const COLUMNS: Column[] = [
  {
    id: 'start_date_time',
    label: 'Appt Date',
    sortable: true,
    type: 'date',
    format: (v: any) => dayjs(v).format('DD/MM/YYYY'),
    width: '20%',
  },
  { id: 'Service', label: 'Service', width: '20%' },
  { id: 'Status', label: 'Status', width: '10%' },
  // eslint-disable-next-line react/no-unstable-nested-components
  {
    id: 'PAFU',
    label: 'PAFU',
    valueComponent: ({ value }: any) => <PafuView data={value} />,
    width: '10%',
  },
  { id: 'Missed', label: 'Missed', units: '#', width: '15%' },
  { id: 'Rescheduled', label: 'Rescheduled', units: '#', width: '15%' },
]

function Appointments() {
  const { member } = useMember()
  const recId = member?.airtableRecordId
  const [appointments, setAppointments] = useState<any[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const {
    ops: {
      filters: { appointments: filters },
    },
  } = useSortFilter()

  useEffect(() => {
    let isCancelled = false
    const allowedFields = [
      'App Sign-up (from Member)',
      'Assignee Name',
      'Calendly Cancellation URL',
      'Calendly Reschedule URL',
      'Calendly event ID',
      'Clinical Consultation',
      'Comments',
      'Consultation Type (from Clinical Consultation)',
      'Data Source',
      'Days left before Appointment',
      'DaysSinceLastStatusUpdate',
      'Internal vs External',
      'LastStatusUpdate',
      'Minor Health Check (from Member)',
      'Plan (from Clinical Consultations)',
      'Primary Diagnosis (from Clinical Consultations)',
      'Service',
      'Baseline',
      'Source',
      'Start_date_time_month_of_the_year',
      'State Machine ID',
      'Status',
      'Summary',
      'Tags (from Member)',
      'Tasks',
      'created_by',
      'created_at',
      'end_date_time',
      'last_modified_by_',
      'start_date_time',
      'start_day_of_week_int',
      'start_time_hour_int',
      'status_last_modified_at',
      'updated_by',
      'Rescheduled',
      'Missed',
    ]
    if (recId) {
      airtableFetch(
        `appointments/list?filterByFormula=FIND("${recId}", {Member Record ID})&${filterFields(
          allowedFields
        )}`
      ).then((response) => {
        if (!isCancelled) {
          const apps = Object.keys(response).map((key) => response[key])
          setAppointments(apps)
          setLoading(false)
        }
      })
    }
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

  const isReadyToShow = filteredAppointments?.length >= 0 && !loading
  return (
    <div>
      <div className="d-flex flex-align-center">
        {filters.status && (
          <span className="badge badge-success">Status: {filters.status}</span>
        )}
        {filters.service && (
          <span className="badge badge-success">
            Service: {filters.service}
          </span>
        )}
      </div>
      {isReadyToShow && (
        <DataTable
          columns={COLUMNS}
          data={filteredAppointments}
          title="Appointments"
          filterByDate
          dateColumnKey="start_date_time"
          defaultFilterColumn="start_date_time"
          defaultSortColumn="start_date_time"
        />
      )}
      {loading && <LoadingComponent message="Loading Appointments " />}
    </div>
  )
}

export default Appointments
