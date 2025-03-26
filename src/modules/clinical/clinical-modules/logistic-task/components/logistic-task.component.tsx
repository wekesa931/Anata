import React, { useEffect } from 'react'
import { Column, DataTable } from 'src/components/table/data-table'
import { Paper } from '@mui/material'
import { useRefreshTrigger } from 'src/context/refresh-trigger'
import ErrorRetry from 'src/components/feedbacks/error-retry'
import useLogisticData from '../data'

function StatusHelperText() {
  return (
    <Paper className="p-2 max-w-xs text-center">
      <p>
        Needed: no date agreed with member yet, not assigned to a rider yet,
        Scheduled: date is agreed, no rider assigned yet, Assigned: date is
        agreed and riders is assigned, Completed: is done by rider, Missed: by
        member or by rider, Canceled: by antara
      </p>
    </Paper>
  )
}

const COLUMS: Column[] = [
  { id: 'Due date', label: 'Date', sortable: true, type: 'date' },
  { id: 'Type', label: 'Type' },
  {
    id: 'Status',
    label: 'Status',
    helperText: <StatusHelperText />,
  },
  { id: 'Field notes', label: 'Field notes' },
  { id: 'Missed', label: 'Missed #', sortable: true },
  { id: 'Missed by', label: 'Missed by' },
]

function Logistic() {
  const { logisticData, loading, setLoading, refreshLogisticData, error } =
    useLogisticData()

  const { refreshKey, setRefreshKey } = useRefreshTrigger()

  useEffect(() => {
    if (refreshKey.includes('Logistics')) {
      setLoading(true)
      refreshLogisticData()
    }

    // clean up, reset refreshKey
    return () => {
      if (setRefreshKey) {
        setRefreshKey('')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  return error ? (
    <ErrorRetry retry={refreshLogisticData} />
  ) : (
    <DataTable
      title="Logistic Details"
      columns={COLUMS}
      data={logisticData}
      loading={loading}
      loadingContext={refreshKey.includes('Logistics') ? refreshKey : undefined}
      dateColumnKey="Due date"
      filterByDate
      defaultFilterColumn="Due date"
      defaultSortColumn="Due date"
    />
  )
}

export default Logistic
