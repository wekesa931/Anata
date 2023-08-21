import React from 'react'

import Table from 'src/components/table'
import LoadingComponent from 'src/components/loaders/table-loader'
import useMemberTaskData from 'src/modules/tasks/views/member-tasks'

function MemberTasks() {
  const { memberTaskData, loading } = useMemberTaskData()

  const columns = [
    {
      name: 'Date',
      format: 'dd/mmm/yy',
      key: 'created_at',
    },
    {
      name: 'Type',
      format: '',
      key: 'Type',
    },
    {
      name: 'Appointment booking type',
      format: '',
      key: 'Appointment booking type',
    },
    {
      name: 'Data collection type',
      format: '',
      key: 'Data collection type',
    },
    {
      name: 'Status',
      format: '',
      key: 'Status',
    },
  ]

  return (
    <div className="mb-ten">
      {!loading ? (
        <Table
          title="MemberTask"
          columns={columns}
          data={memberTaskData}
          dateColumnKey="Start Date"
          filterByDate
        />
      ) : (
        <LoadingComponent message="Loading Member Tasks" />
      )}
    </div>
  )
}

export default MemberTasks
