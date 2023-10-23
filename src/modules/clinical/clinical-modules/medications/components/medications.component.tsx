import React from 'react'

import LoadingComponent from 'src/components/loaders/table-loader'
import DataTable, { Column } from 'src/components/table/data-table'
import useMedicationData from '../data'

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
  },
  { id: 'Status', label: 'Status', width: '20%' },
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
