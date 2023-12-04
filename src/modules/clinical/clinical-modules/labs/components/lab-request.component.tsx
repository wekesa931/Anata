import React from 'react'
import Table, { Column } from 'src/components/table/data-table'
import LoadingComponent from 'src/components/loaders/table-loader'
import useLabData from '../data'

const COLUMS: Column[] = [
  {
    id: 'Date of request (created at)',
    label: 'Date',
    sortable: true,
    type: 'date',
  },
  { id: 'Status', label: 'Status' },
  { id: 'Type', label: 'Type' },
  { id: 'Notes', label: 'Notes' },
  { id: 'Lab type', label: 'Lab type' },
  { id: 'Imaging type', label: 'Imaging type' },
]

function LabRequest() {
  const { labData, loading } = useLabData()

  return (
    <div className="mb-ten">
      {!loading ? (
        <Table
          title="Lab Request Details"
          columns={COLUMS}
          data={labData}
          dateColumnKey="Date of request (created at)"
          filterByDate
          defaultFilterColumn="Date of request (created at)"
          defaultSortColumn="Date of request (created at)"
        />
      ) : (
        <LoadingComponent message="Loading lab requests" />
      )}
    </div>
  )
}

export default LabRequest
