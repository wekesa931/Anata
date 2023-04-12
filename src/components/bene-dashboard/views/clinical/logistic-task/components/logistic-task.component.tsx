import React from 'react'

import Table from '../../../../../utils/table/table.component'
import { useMember } from '../../../../../../context/member.context'
import LoadingComponent from '../../utils/loading.component'
import useLogisticData from '../data'

function Logistic() {
  const { member } = useMember()
  const antaraId = member['Antara ID']
  const { logisticData, loading } = useLogisticData(antaraId)

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
  const isReadyToShow = logisticData?.length >= 0 && !loading

  return (
    <div className="mb-ten">
      <h4>Logistic Tasks</h4>
      {isReadyToShow && (
        <Table
          title="Logistic Details"
          columns={columns}
          data={logisticData}
          dateColumnKey="Due date"
          filterByDate
        />
      )}

      {loading && <LoadingComponent message="Loading Logistic Tasks" />}
    </div>
  )
}

export default Logistic
