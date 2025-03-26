/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react'
import { useSortFilter } from 'src/context/sort-filter'
import airtableFetch from 'src/services/airtable/fetch'
import Modal from 'src/components/modals'
import TextArea from 'src/components/forms/textarea'
import { useMember } from 'src/context/member'
import DataTable, { Column } from 'src/components/table/data-table'
import dayjs from 'dayjs'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import { useAppointmentsData } from 'src/modules/clinical/clinical-modules/appointments/hooks/appointments-data'
import logError from 'src/utils/logging/logger'
import { useRefreshTrigger } from 'src/context/refresh-trigger'
import ErrorRetry from 'src/components/feedbacks/error-retry'

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    format: (v: any) => (v ? dayjs(v).format('DD/MM/YYYY') : '-'),
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {
    ops: {
      filters: { appointments: filters },
    },
  } = useSortFilter()
  const { getAppointments } = useAppointmentsData()
  const { refreshKey, setRefreshKey } = useRefreshTrigger()

  const fetchAppointments = async () => {
    setError(null)
    setLoading(true)
    try {
      const data = await getAppointments()
      setAppointments(data)
    } catch (error: any) {
      logError(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (refreshKey.includes('Appointments')) {
      setLoading(true)
      fetchAppointments()
    }

    // clean up, reset refreshKey
    return () => {
      if (setRefreshKey) {
        setRefreshKey('')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  useEffect(() => {
    let isCancelled = false

    if (recId) {
      setError(null)
      setLoading(true)
      getAppointments()
        .then((data: any[]) => {
          if (!isCancelled) {
            setAppointments(data)
          }
        })
        .catch((error) => {
          logError(error)
          setError(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    return () => {
      isCancelled = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recId])

  useEffect(() => {
    let isCancelled = false
    let apps = appointments.map((app) => {
      if (app.Status === 'Schedule needed' && !app.start_date_time) {
        return { ...app, start_date_time: undefined }
      }
      return app
    })
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
      {error ? (
        <ErrorRetry retry={fetchAppointments} />
      ) : (
        <DataTable
          columns={COLUMNS}
          data={filteredAppointments}
          title="Appointments"
          filterByDate
          loading={loading}
          loadingContext={
            refreshKey?.includes('Appointments') ? refreshKey : undefined
          }
          dateColumnKey="start_date_time"
          defaultFilterColumn="start_date_time"
          defaultSortColumn="start_date_time"
        />
      )}
    </div>
  )
}

export default Appointments
