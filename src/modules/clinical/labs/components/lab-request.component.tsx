import React from 'react'
import Table from 'src/components/table'
import LoadingComponent from 'src/components/loaders/table-loader'
import useLabData from '../data'

function LabRequest() {
  const { labData, loading } = useLabData()

  const columns = [
    {
      name: 'Date',
      format: 'dd/mmm/yy',
      key: 'Date of request (created at)',
    },
    { name: 'Status', format: '', key: 'Status' },
    { name: 'Type', format: '', key: 'Type' },
    { name: 'Notes', format: '', key: 'Notes' },
    { name: 'Lab type', format: '', key: 'Lab type' },
    { name: 'Imaging type', format: '', key: 'Imaging type' },
  ]

  return (
    <div className="mb-ten">
      <h4>Lab Request</h4>
      {!loading ? (
        <Table
          title="Lab Request Details"
          columns={columns}
          data={labData}
          dateColumnKey="Date of request (created at)"
          filterByDate
        />
      ) : (
        <LoadingComponent message="Loading lab requests" />
      )}
    </div>
  )
}

export default LabRequest
