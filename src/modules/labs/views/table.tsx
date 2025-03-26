import React, { useEffect } from 'react'
import { useLabsData } from 'src/modules/labs/hooks/labs.hook'
import { Column, DataTable } from 'src/components/table/data-table'
import { EditLab, Status } from 'src/modules/labs/components/table-cell-items'
import dayjs from 'dayjs'
import { useRefreshTrigger } from 'src/context/refresh-trigger'
import ErrorRetry from 'src/components/feedbacks/error-retry'

function LabRequestTable() {
  const labsDataApi = useLabsData()
  const { loading, labRequests, error, refetch } = labsDataApi

  const { refreshKey, setRefreshKey } = useRefreshTrigger()

  useEffect(() => {
    if (refreshKey.includes('Lab/imaging management')) {
      refetch()
    }

    // clean up, reset refreshKey
    return () => {
      if (setRefreshKey) {
        setRefreshKey('')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  const COLUMNS: Column[] = [
    {
      id: 'dateOfRequest',
      label: 'Request Date',
      type: 'date',
      sortable: true,
      format: (value: string) => dayjs(value).format('DD MMM YYYY'),
      width: '20%',
    },
    {
      id: 'status',
      label: 'Status',
      valueComponent: Status,
      width: '20%',
    },
    {
      id: 'type',
      label: 'Type',
      width: '10%',
    },
    {
      id: 'labType',
      label: 'Lab Type',
      width: '15%',
    },
    {
      id: 'notes',
      label: 'Notes',
      width: '20%',
    },
    {
      id: 'action',
      label: 'Action',
      valueComponent: ({ value }) => (
        <EditLab value={value} labsApi={labsDataApi} />
      ),
      width: '10%',
    },
  ]
  return error ? (
    <ErrorRetry retry={refetch} />
  ) : (
    <DataTable
      columns={COLUMNS}
      data={labRequests}
      title="Lab Requests"
      loading={loading}
      loadingContext={
        refreshKey?.includes('Lab/imaging management') ? refreshKey : undefined
      }
      filterByDate
      defaultFilterColumn="dateOfRequest"
      defaultSortColumn="dateOfRequest"
    />
  )
}

export default LabRequestTable
