import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import styles from './vitals.component.css'
import airtableFetch from '../../../../../resources/airtable-fetch'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'
import {
  useDateRangeFilter,
  Actions,
} from '../../../../../context/filter-views.context'

function BloodPressure() {
  const todayDate = dayjs(new Date()).add(1, 'day').format('YYYY-MM-DD')
  const { recId } = useParams()
  const [bpData, setBpData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const status = ['DAILY', 'WEEKLY', 'MONTHLY']
  const [selectedValue, setSelectedValue] = useState(status[0])
  const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setSelectedValue(value)
  }

  const columns: GridColDef[] = [
    {
      headerName: 'Date',
      field: 'Date',
      width: 130,
      type: 'date',
    },
    {
      headerName: 'BP, avg',
      field: 'Average BP',
      filterable: false,
      width: 140,
      description: `
      Stage 2 hypertension: Systolic >140 or Diastolic >=90
      Stage 1 hypertension: Systolic 130-140 or Diastolic 80-89 
      Elevated blood pressure : Systolic of 120-130 and Diastolic of  <80 
      Normal blood pressure is <120/80
      `,
    },
    {
      headerName: 'BP, morning',
      field: 'Morning BP',
      filterable: false,
      width: 140,
    },
    {
      headerName: `BP, evening`,
      field: 'Evening BP',
      filterable: false,
      width: 140,
    },
  ]

  const { currentFilter, dateRange } = useDateRangeFilter()

  const getRange = () => {
    let startOfRange
    let endOfRange

    switch (currentFilter) {
      case Actions.WEEKLY:
        startOfRange = dayjs(todayDate).subtract(1, 'week').startOf('week')
        endOfRange = dayjs(todayDate).subtract(1, 'week').endOf('week')
        break
      case Actions.MONTHLY:
        startOfRange = dayjs(todayDate).subtract(1, 'month').startOf('month')
        endOfRange = dayjs(todayDate).subtract(1, 'month').endOf('month')
        break
      case Actions.LAST_3_MONTHS:
        startOfRange = dayjs(todayDate).subtract(2, 'month').startOf('month')
        endOfRange = dayjs(todayDate).subtract(2, 'month').endOf('month')
        break
      case Actions.LAST_6_MONTHS:
        startOfRange = dayjs(todayDate).subtract(5, 'month').startOf('month')
        endOfRange = dayjs(todayDate)
        break
      case Actions.SET_DATE_RANGE:
        startOfRange = dayjs(dateRange[0])
        endOfRange = dayjs(dateRange[1])
        break
      default:
        startOfRange = dayjs(todayDate).subtract(5, 'month').startOf('month')
        endOfRange = dayjs(todayDate)
    }

    return [startOfRange.format('YYYY-MM-DD'), endOfRange.format('YYYY-MM-DD')]
  }

  const filterData = () => {
    const [startOfRange, endOfRange] = getRange()

    const arg = `&startDate=${startOfRange}&endDate=${endOfRange}`

    setLoading(true)
    return airtableFetch(
      `bp/analysis?computation_type=${selectedValue.toLowerCase()}${arg}&member_id=${recId}`
    )
      .then((response) => {
        setLoading(false)
        const filterResults = response.data.averages.map(
          (avs: any, index: number) => {
            return {
              id: index,
              Date: avs.date,
              'Morning BP': `${avs.mornSytoAvg || '-'}/${
                avs.mornDiasAvg || '-'
              }`,
              'Evening BP': `${avs.evenSytoAvg || '-'}/${
                avs.evenDiasAvg || '-'
              }`,
              'Average BP': `${avs.sytolicAverage || '-'}/${
                avs.diastolicAverage || '-'
              }`,
            }
          }
        )
        setBpData(filterResults)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    filterData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilter, selectedValue, dateRange])

  function CustomToolbar() {
    return (
      <>
        <div className="justify-end d-flex flex-align-center">
          <div>
            <select
              onChange={handleDropdown}
              className="remove-border form-control "
              data-testid="status-filter"
              value={selectedValue}
            >
              {status.map((opt) => (
                <option value={opt} key={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </>
    )
  }
  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        No data within this range
      </Stack>
    )
  }
  const loadingIcon = () => {
    return (
      <div className={styles.bpLoading}>
        <LoadingIcon />
        <p className="text-small"> Loading Blood Pressure Averages </p>
      </div>
    )
  }

  return (
    <div className={`${styles.tableContainer} margin-top-16`}>
      <h4 className={styles.vitalsHeading}>Blood Pressure Averages</h4>
      <div style={{ height: 400, width: 610, justifyContent: 'center' }}>
        <DataGrid
          className={styles.table}
          columns={columns}
          rows={loading ? [] : bpData}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay,
            LoadingOverlay: loadingIcon,
          }}
          loading={loading}
          disableSelectionOnClick
          hideFooter
        />
      </div>
    </div>
  )
}

export default BloodPressure
