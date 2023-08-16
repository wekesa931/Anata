import React from 'react'

import Table from 'src/components/table'
import LoadingComponent from 'src/components/loaders/table-loader'
import useMedicationData from '../data'

function Medications() {
  const { medicationsData, loading } = useMedicationData()

  const columns = [
    {
      name: 'Start Date',
      format: 'dd/mmm/yy',
      key: 'Start Date',
    },
    {
      name: 'Medication Name',
      format: '',
      key: 'Medication Name (from Medication Base)',
    },
    {
      name: 'Status',
      format: '',
      key: 'Status',
    },
    { name: 'Refillable', format: '', key: 'Refillable' },
    {
      name: 'Refill Date',
      format: 'dd/mmm/yy',
      key: 'Refill Date calculated',
    },
  ]

  return (
    <div className="mb-ten">
      <h4>Medications</h4>
      {!loading ? (
        <Table
          title="Medications"
          columns={columns}
          data={medicationsData}
          dateColumnKey="Start Date"
          filterByDate
        />
      ) : (
        <LoadingComponent message="Loading Medications" />
      )}
    </div>
  )
}

export default Medications
