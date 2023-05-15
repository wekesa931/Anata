import React from 'react'

import Table from 'src/components/table'
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
    { name: 'Type', format: '', key: 'Type' },
    { name: 'Status', format: '', key: 'Status' },
    { name: 'Field notes', format: '', key: 'Field notes' },
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
