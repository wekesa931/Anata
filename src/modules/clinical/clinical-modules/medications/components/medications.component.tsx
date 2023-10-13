import React from 'react'

import LoadingComponent from 'src/components/loaders/table-loader'
import DataTable, { Column } from 'src/components/table/data-table'
import useMedicationData from '../data'

const COLUMNS: Column[] = [
  { id: 'Start Date', label: 'Start Date', sortable: true, type: 'date' },
  {
    id: 'Medication Name (from Medication Base)',
    label: 'Medication Name',
  },
  { id: 'Status', label: 'Status' },
  { id: 'Refillable', label: 'Refillable' },
  {
    id: 'Refill Date calculated',
    label: 'Refill Date',
    sortable: true,
    type: 'date',
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
