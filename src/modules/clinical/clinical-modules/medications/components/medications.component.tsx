import React from 'react'

import LoadingComponent from 'src/components/loaders/table-loader'
import DataTable, { Column } from 'src/components/table/data-table'
import useMedicationData from '../data'
import { toTitleCase } from 'src/utils/text-utils'

const MEDICATION_NAME_KEY = 'Medication Name (from Medication Base)'
const OTHER_MEDICATION_NAME_KEY = 'Other Medication'

function MedicationName({ value }: any) {
  let medName: string = value?.[MEDICATION_NAME_KEY]
  if (medName && medName?.toUpperCase() === 'OTHER') {
    medName = value?.[OTHER_MEDICATION_NAME_KEY]
  }

  const quantity = value?.Quantity
  const quantityUnits = value?.['Quantity Units']

  const frequency = value?.Frequency

  return (
    <div className="font-rubik flex flex-col items-start justify-center text-xs text-left">
      <p className="text-dark-blue-100">{medName}</p>
      <p className="text-dark-blue-70">
        {quantity} {quantityUnits}
      </p>
      <p className="text-dark-blue-50">{frequency}</p>
    </div>
  )
}

function MedicationStatus({ value }: any) {
  const status: string = value?.Status
  const getBorderColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'stopped':
        return {
          border: 'border-red-100',
          text: 'text-red-100',
        }
      case 'finished':
        return {
          border: 'border-green-100',
          text: 'text-green-100',
        }
      case 'ongoing':
        return {
          border: 'border-blue-100',
          text: 'text-blue-100',
        }
      default:
        return {
          border: 'border-dark-blue-50',
          text: 'text-dark-blue-100',
        }
    }
  }
  const colors = getBorderColor(status)
  return (
    <div
      className={`w-full m-1 p-0 rounded-2xl border text-center ${colors.border} ${colors.text}`}
    >
      {toTitleCase(status) ?? '-'}
    </div>
  )
}

const COLUMNS: Column[] = [
  {
    id: 'Start Date',
    label: 'Start Date',
    sortable: true,
    type: 'date',
    width: '15%',
  },
  {
    id: 'Medication Name (from Medication Base)',
    label: 'Medication Name',
    width: '30%',
    valueComponent: MedicationName,
  },
  {
    id: 'Status',
    label: 'Status',
    width: '20%',
    valueComponent: MedicationStatus,
  },
  { id: 'Refillable', label: 'Refillable', width: '10%' },
  {
    id: 'Refill Date calculated',
    label: 'Refill Date',
    width: '15%',
  },
]

function Medications() {
  const { medicationsData, loading } = useMedicationData()

  return (
    <div className="mb-ten">
      <h4>Medications</h4>
      {!loading ? (
        <DataTable
          title="Medications"
          columns={COLUMNS}
          data={medicationsData}
          dateColumnKey="Start Date"
          filterByDate
          defaultFilterColumn="Start Date"
          defaultSortColumn="Start Date"
        />
      ) : (
        <LoadingComponent message="Loading Medications" />
      )}
    </div>
  )
}

export default Medications
