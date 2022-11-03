/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSortFilter } from '../../../../../context/sort-filter-views.context'
import airtableFetch from '../../../../../resources/airtable-fetch'
import Icon from '../../../../utils/icon/icon.component'
import Modal from '../../../../utils/modals/modal.component'
import Table from '../../../../utils/table/table.component'
import TextArea from '../../../../../helpers/textarea.component'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'

function PafuView({ data }: any) {
  const [showPafu, setShowPafu] = useState(false)
  const [pafuRecordId, setPafuRecordId] = useState('')
  const [pafu, setPafu] = useState({})
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
    setPafuRecordId(data[0])
  }

  return (
    <>
      <button
        className="btn btn-small btn-secondary"
        onClick={(e) => openPafu(e)}
      >
        PAFU
      </button>
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
                    <TextArea disabled value={`${pafu[key]}`} />
                  </label>
                </div>
              )
            })}
          {loading && (
            <div className="d-flex flex-direction-column flex-align-center">
              <Icon name="loading" />
              Loading Pafu
            </div>
          )}
        </Modal>
      )}
    </>
  )
}

function Appointments() {
  const { recId } = useParams()
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

    airtableFetch(
      `appointments/list?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      if (!isCancelled) {
        const apps = Object.keys(response).map((key) => response[key])
        setAppointments(apps)
        setLoading(false)
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
    { name: 'Type', format: '\n', key: 'Service' },
    { name: 'Status', format: '\n', key: 'Status' },
    {
      name: 'PAFU',
      key: 'PAFU',
      format: '\n',
      type: 'UI',
      // eslint-disable-next-line react/no-unstable-nested-components
      component: ({ data }: any) => <PafuView data={data} />,
    },
  ]
  const isReadyToShow = filteredAppointments?.length >= 0 && !loading
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
      {isReadyToShow && (
        <Table
          title="Appointment"
          columns={columns}
          data={filteredAppointments}
          dateColumnKey="start_date_time"
        />
      )}
      {loading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small"> Loading Appointments </p>
        </div>
      )}
    </div>
  )
}

export default Appointments
