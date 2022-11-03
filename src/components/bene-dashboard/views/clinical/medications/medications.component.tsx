import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import airtableFetch from '../../../../../resources/airtable-fetch'
import List from '../../../../utils/list/list.component'
import { useSortFilter } from '../../../../../context/sort-filter-views.context'
import AirtableField from '../../../../../types/airtable-field'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'

function Medications() {
  const { recId } = useParams()
  const [medications, setMedications] = useState<any[]>([])
  const [editable, setEditable] = useState<boolean>(false)
  const [filteredMedications, setFilteredMedications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const {
    ops: {
      filters: { medications: filters },
    },
  } = useSortFilter()

  const getMedicationName = (data: any) => {
    if (data['Drug Name'] === 'Other') {
      return data['Other Medication']
    }
    return data['Drug Name']
  }

  useEffect(() => {
    let isCancelled = false

    const getStatusClassName = (status: any) => {
      switch (status) {
        case 'FINISHED':
          return 'badge badge-warning'
        case 'STOPPED':
          return 'badge badge-danger'
        case 'ONGOING':
          return 'badge badge-success'
        default:
          return 'badge'
      }
    }

    const renderMedicationStatus = (med: any) => {
      return (
        <span className={getStatusClassName(med.Status)}>{med.Status}</span>
      )
    }
    const renderInfo = (med: any) => {
      return (
        <div className="d-flex flex-justify-space-between">
          <div>
            {getMedicationName(med)}, {med.Frequency}, {med.Duration} days
          </div>
          {renderMedicationStatus(med)}
        </div>
      )
    }
    airtableFetch(
      `medications/list?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const meds = Object.keys(response)
        .map((key) => ({ id: key, ...response[key] }))
        .map((data) => ({
          data,
          name: renderInfo(data),
        }))
      if (!isCancelled) {
        setMedications(meds)
        setLoading(false)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [recId, editable])

  useEffect(() => {
    let isCancelled = false
    if (filters) {
      let meds = medications
      if (filters.status) {
        meds = meds.filter(
          ({ data }) => data.Status === filters.status.toUpperCase()
        )
      }
      if (filters.name) {
        meds = meds.filter((med) => med['Drug Name'] === filters.name)
      }
      if (!isCancelled) {
        setFilteredMedications(meds)
      }
    }
    return () => {
      isCancelled = true
    }
  }, [medications, filters])

  const renderRefillText = (medication: any) => {
    if (medication.Refillable === 'Yes') {
      return medication['Days until Refill'] <= 3
        ? `Refill due in: ${medication['Days until Refill']} days`
        : 'Refillable'
    }
    return 'Not Refillable'
  }

  const editableFields = (): AirtableField[] => {
    return [
      {
        name: 'Stop Date',
        type: 'date',
      },
      {
        name: 'Stopped Notes',
        type: 'long-text',
      },
    ]
  }

  const updateMedication = async (updates: { id: string; fields: any }) => {
    await airtableFetch('medications', 'post', {
      id: updates.id,
      fields: { ...updates.fields },
    })
    setEditable(false)
  }

  const renderStartDate = (medication: any) => {
    return `Start Date: ${dayjs(medication['Start Date']).format("DD MMM 'YY")}`
  }

  const medicationListItemAction = (item: any, actionCallback?: any) => {
    if (item?.data.Status !== 'ONGOING') return null
    return (
      <>
        <button
          className="btn-icon"
          onClick={() => {
            setEditable(true)
            actionCallback()
          }}
          data-testid="modal-stop-btn"
        >
          Stop
        </button>
        <button
          className="btn-icon"
          onClick={() => window.open(item.data['Refill URL'].url, 'refill')}
          data-testid="modal-refill-btn"
        >
          Refill
        </button>
      </>
    )
  }
  const isReadyToShow = filteredMedications?.length >= 0 && !loading
  return (
    <div>
      <div className="d-flex flex-align-center">
        <h4>Medications</h4>
        {filters.status && (
          <span className="badge badge-success">Status: {filters.status}</span>
        )}
      </div>
      {isReadyToShow && (
        <List
          list={filteredMedications}
          emptyListText="No medications recorded"
          getTopLeftText={renderStartDate}
          getTopRightText={renderRefillText}
          dateColumnKey="Start Date"
          paginate
          modalTitle="Medication"
          editable={editable}
          onEdit={updateMedication}
          editableFields={editableFields()}
          listItemActions={medicationListItemAction}
        />
      )}
      {loading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small"> Loading Medications </p>
        </div>
      )}
    </div>
  )
}

export default Medications
