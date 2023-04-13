import React from 'react'

import Table from '../../../../../utils/table/table.component'
import LoadingComponent from '../../utils/loading.component'
import useLogisticData from '../data'

function Logistic() {
  const { logisticData, loading } = useLogisticData()

  const columns = [
    {
      name: 'Date',
      format: 'dd/mmm/yy',
      key: 'Due date',
    },
    { name: 'Time', format: '', key: 'Time preference' },
    { name: 'Status', format: '', key: 'Status' },
    { name: 'Field notes', format: '', key: 'Field notes' },
  ]

  return (
    <div className="mb-ten">
      <h4>Logistic Tasks</h4>
      <Table
        title="Logistic details"
        columns={columns}
        data={logisticData}
        dateColumnKey="Due date"
        filterByDate
      />

      {loading && <LoadingComponent message="Loading logistic tasks" />}
    </div>
  )
}

export default Logistic
