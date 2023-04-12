import React from 'react'
import Table from '../../../../../utils/table/table.component'
import { useMember } from '../../../../../../context/member.context'
import useLabData from '../data'
import LoadingComponent from '../../utils/loading.component'

function LabRequest() {
  const { member } = useMember()
  const antaraId = member['Antara ID']
  const { labData, loading } = useLabData(antaraId)

  const columns = [
    {
      name: 'Date',
      format: 'dd/mmm/yy',
      key: 'Date of request (created at)',
    },
    { name: 'Status', format: '', key: 'Status' },
    { name: 'Type', format: '', key: 'Type' },
    { name: 'Notes', format: '', key: 'Notes' },
  ]

  const isReadyToShow = labData?.length >= 0 && !loading

  return (
    <div className="mb-ten">
      <h4>Lab Request</h4>
      {isReadyToShow && (
        <Table
          title="Lab Request Details"
          columns={columns}
          data={labData}
          dateColumnKey="Date of request (created at)"
          filterByDate
        />
      )}

      {loading && <LoadingComponent message="Loading Lab Request" />}
    </div>
  )
}

export default LabRequest
