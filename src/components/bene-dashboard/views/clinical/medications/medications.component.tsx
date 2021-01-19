import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import airtableFetch from '../../../../../resources/airtable-fetch'
import List from '../../../../utils/list/list.component'
import { useSortFilter } from '../../../../../context/sort-filter-views.context'

const Medications = () => {
  const { recId } = useParams()
  const [medications, setMedications] = useState<any[]>([])
  const [filteredMedications, setFilteredMedications] = useState<any[]>([])
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
    const isStopped = (med: any) => med.Stopped || med['Stop Date']

    const isFinished = (med: any) =>
      new Date() > new Date(med['Stop Date (Calculated)'])

    const renderMedicationStatus = (med: any) => {
      if (isStopped(med)) {
        return <span className="badge badge-danger">Stopped</span>
      }
      if (isFinished(med)) {
        return <span className="badge badge-warning">Finished</span>
      }
      return <span className="badge badge-success">Ongoing</span>
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
        .map((key) => response[key])
        .map((data) => ({
          data,
          name: renderInfo(data),
        }))
      if (!isCancelled) {
        setMedications(meds)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [recId])

  useEffect(() => {
    const isStopped = (med: any) => med.Stopped || med['Stop Date']

    const isFinished = (med: any) =>
      new Date() > new Date(med['Stop Date (Calculated)'])

    const isOngoing = (med: any) => !isStopped(med) && !isFinished(med)
    let isCancelled = false
    if (filters) {
      let meds = medications
      if (filters.status) {
        if (filters.status === 'finished') {
          meds = meds.filter(({ data }) => isFinished(data))
        } else if (filters.status === 'stopped') {
          meds = meds.filter(({ data }) => isStopped(data))
        } else if (filters.status === 'ongoing') {
          meds = meds.filter(({ data }) => isOngoing(data))
        }
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

  const renderStartDate = (medication: any) => {
    return `Start Date: ${dayjs(medication['Start Date']).format("DD MMM 'YY")}`
  }

  return (
    <div>
      <div className="d-flex flex-align-center">
        <h4>Medications</h4>
        {filters.status && (
          <span className="badge badge-success">Status: {filters.status}</span>
        )}
      </div>
      <List
        list={filteredMedications}
        emptyListText="No medications recorded"
        getTopLeftText={renderStartDate}
        getTopRightText={renderRefillText}
        dateColumnKey="Start Date"
        paginate
        modalTitle="Medication"
      />
    </div>
  )
}

export default Medications
