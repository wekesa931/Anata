import React from 'react'

import Table, { Column } from 'src/components/table/data-table'
import LoadingComponent from 'src/components/loaders/table-loader'
import useLogisticData from '../data'

const COLUMS: Column[] = [
  { id: 'Due date', label: 'Date', sortable: true, type: 'date' },
  { id: 'Type', label: 'Type' },
  { id: 'Status', label: 'Status' },
  { id: 'Field notes', label: 'Field notes' },
  { id: 'Missed #', label: 'Missed #', sortable: true },
  { id: 'Missed by', label: 'Missed by' },
]

function Logistic() {
  const { logisticData, loading } = useLogisticData()

  // TODO: add column helper text
  // const columns = [
  //   {
  //     name: 'Date',
  //     format: 'dd/mmm/yy',
  //     key: 'Due date',
  //   },
  //   { name: 'Type', format: '', key: 'Type' },
  //   {
  //     name: 'Status',
  //     format: '',
  //     key: 'Status',
  //     info: `Needed: no date agreed with member yet, not assigned to a rider yet,
  //            Scheduled: date is agreed, no rider assigned yet,
  //            Assigned: date is agreed and riders is assigned,
  //            Completed: is done by rider,
  //            Missed: by member or by rider,
  //            Canceled: by antara`,
  //   },
  //   { name: 'Field notes', format: '', key: 'Field notes' },
  //   { name: 'Missed #', format: '', key: 'Missed #' },
  //   { name: 'Missed by', format: '', key: 'Missed by' },
  // ]

  return (
    <div className="mb-ten">
      <h4>Logistic Tasks</h4>
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
