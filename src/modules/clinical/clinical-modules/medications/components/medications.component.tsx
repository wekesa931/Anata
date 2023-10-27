import React from 'react'

import LoadingComponent from 'src/components/loaders/table-loader'
import DataTable, { Column } from 'src/components/table/data-table'
import useMedicationData from 'src/modules/clinical/clinical-modules/medications/hooks'
import { toTitleCase } from 'src/utils/text-utils'
import { EditMedication } from 'src/modules/clinical/clinical-modules/medications/components/edit-medication'

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
  const getBorderColor = (s?: string) => {
    switch (s?.toLowerCase()) {
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
      className={`w-full p-0 rounded-2xl border text-center ${colors.border} ${colors.text}`}
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
    width: '20%',
  },
  {
    id: 'Medication Name (from Medication Base)',
    label: 'Medication Name',
    width: '20%',
    valueComponent: MedicationName,
  },
  {
    id: 'Status',
    label: 'Status',
    width: '15%',
    valueComponent: MedicationStatus,
  },
  { id: 'Refillable', label: 'Refillable', width: '10%' },
  {
    id: 'Refill Date calculated',
    label: 'Refill Date',
    width: '15%',
  },
  {
    id: 'Actions',
    label: 'Actions',
    width: '20%',
    valueComponent: EditMedication,
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
