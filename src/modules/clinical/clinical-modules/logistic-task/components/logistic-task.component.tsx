import React from 'react'

import Table, { Column } from 'src/components/table/data-table'
import LoadingComponent from 'src/components/loaders/table-loader'
import { Paper } from '@mui/material'
import useLogisticData from '../data'

function StatusHelperText() {
  return (
    <Paper className="p-2 max-w-xs text-center">
      <p>
        Needed: no date agreed with member yet, not assigned to a rider yet,
        Scheduled: date is agreed, no rider assigned yet, Assigned: date is
        agreed and riders is assigned, Completed: is done by rider, Missed: by
        member or by rider, Canceled: by antara
      </p>
    </Paper>
  )
}

const COLUMS: Column[] = [
  { id: 'Due date', label: 'Date', sortable: true, type: 'date' },
  { id: 'Type', label: 'Type' },
  {
    id: 'Status',
    label: 'Status',
    helperText: <StatusHelperText />,
  },
  { id: 'Field notes', label: 'Field notes' },
  { id: 'Missed', label: 'Missed #', sortable: true },
  { id: 'Missed by', label: 'Missed by' },
]

function Logistic() {
  const { logisticData, loading } = useLogisticData()

  return (
    <div className="mb-ten">
      {!loading ? (
        <Table
          title="Logistic Details"
          columns={COLUMS}
          data={logisticData}
          dateColumnKey="Due date"
          filterByDate
          defaultFilterColumn="Due date"
          defaultSortColumn="Due date"
        />
      ) : (
        <LoadingComponent message="Loading logistic tasks" />
      )}
    </div>
  )
}

export default Logistic
