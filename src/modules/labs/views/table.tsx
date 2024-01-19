import React from 'react'
import { useLabsData } from 'src/modules/labs/hooks/labs.hook'
import { Column, DataTable } from 'src/components/table/data-table'
import { EditLab, Status } from 'src/modules/labs/components/table-cell-items'
import dayjs from 'dayjs'
import ErrorRetry from 'src/components/feedbacks/error-retry'

const COLUMNS: Column[] = [
  {
    id: 'dateOfRequest',
    label: 'Request Date',
    type: 'date',
    sortable: true,
    format: (value: string) => dayjs(value).format('DD MMM YYYY'),
    width: '25%',
  },
  {
    id: 'status',
    label: 'Status',
    valueComponent: Status,
    width: '20%',
  },
  {
    id: 'labType',
    label: 'Lab Type',
    width: '15%',
  },
  {
    id: 'notes',
    label: 'Notes',
    width: '30%',
  },
  {
    id: 'action',
    label: 'Action',
    valueComponent: EditLab,
    width: '10%',
  },
]

function LabRequestTable() {
  const { loading, labRequests, error, refetch } = useLabsData()
  return error ? (
    <ErrorRetry retry={refetch} />
  ) : (
    <DataTable
      columns={COLUMNS}
      data={labRequests}
      loading={loading}
      title="Lab Requests"
      filterByDate
      defaultFilterColumn="dateOfRequest"
      defaultSortColumn="dateOfRequest"
    />
  )
}

export default LabRequestTable
