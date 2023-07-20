import React from 'react'

import Table from 'src/components/table'
import LoadingComponent from 'src/components/loaders/table-loader'
import useLogisticData from '../data'

function Logistic() {
  const { logisticData, loading } = useLogisticData()

  const columns = [
    {
      name: 'Date',
      format: 'dd/mmm/yy',
      key: 'Due date',
    },
    { name: 'Type', format: '', key: 'Type' },
    {
      name: 'Status',
      format: '',
      key: 'Status',
      info: `Needed: no date agreed with member yet, not assigned to a rider yet,
             Scheduled: date is agreed, no rider assigned yet,
             Assigned: date is agreed and riders is assigned,
             Completed: is done by rider,
             Missed: by member or by rider,
             Canceled: by antara`,
    },
    { name: 'Field notes', format: '', key: 'Field notes' },
    { name: 'Missed #', format: '', key: 'Missed #' },
    { name: 'Missed by', format: '', key: 'Missed by' },
  ]

  return (
    <div className="mb-ten">
      <h4>Logistic Tasks</h4>
      {!loading ? (
        <Table
          title="Logistic Details"
          columns={columns}
          data={logisticData}
          dateColumnKey="Due date"
          filterByDate
        />
      ) : (
        <LoadingComponent message="Loading logistic tasks" />
      )}
    </div>
  )
}

export default Logistic
