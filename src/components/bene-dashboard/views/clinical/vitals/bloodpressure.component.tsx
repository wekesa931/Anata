import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import AdapterDateFns from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DateRangePicker, DateRange } from '@mui/lab'
import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import { X } from 'react-feather'
import * as styles from './vitals.component.css'
import airtableFetch from '../../../../../resources/airtable-fetch'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'

const BloodPressure = () => {
  const todayDate = dayjs(new Date()).format('YYYY-MM-DD')
  const { recId } = useParams()
  const [bpData, setBpData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<DateRange<Date>>([
    null,
    null,
  ])
  const [showCalendar, setShowCalendar] = useState(true)

  const status = ['DAILY', 'WEEKLY', 'MONTHLY']
  const [selectedValue, setSelectedValue] = useState(status[0])
  const handleDropdown = (e) => {
    const { value } = e.target
    setSelectedValue(value)
  }

  const [toggleButton, setToggleButton] = useState('last-week')
  const [tabActive, setTabActive] = useState<boolean>(false)
  const handleClicked = (e) => {
    setToggleButton(e.target.value)
    setTabActive(!tabActive)
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

  const filter = (frequency: string, newDate = null) => {
    let arg = ''
    if (frequency === 'last-week') {
      const startDayOfPrevWeek = dayjs(todayDate)
        .subtract(1, 'week')
        .startOf('week')
        .format('YYYY-MM-DD')
      const lastDayOfPrevWeek = dayjs(todayDate)
        .subtract(1, 'week')
        .endOf('week')
        .format('YYYY-MM-DD')
      arg = `&startDate=${startDayOfPrevWeek}&endDate=${lastDayOfPrevWeek}`
    } else if (frequency === 'last-month') {
      const startDayOfPrevMonth = dayjs(todayDate)
        .subtract(1, 'month')
        .startOf('month')
        .format('YYYY-MM-DD')
      const lastDayOfPrevMonth = dayjs(todayDate)
        .subtract(1, 'month')
        .endOf('month')
        .format('YYYY-MM-DD')
      arg = `&startDate=${startDayOfPrevMonth}&endDate=${lastDayOfPrevMonth}`
    } else if (frequency === 'last-six-months') {
      const firstDayOfPrevSixMonths = dayjs(todayDate)
        .subtract(5, 'month')
        .startOf('month')
        .format('YYYY-MM-DD')
      arg = `&startDate=${firstDayOfPrevSixMonths}&endDate=${todayDate}`
    } else if (frequency === 'date-range') {
      const startDate = newDate[0]
      const endDate = newDate[1]
      arg = `&startDate=${startDate}&endDate=${endDate}`
    }
    setLoading(true)
    return airtableFetch(
      `bp/analysis?computation_type=${selectedValue.toLowerCase()}${arg}&member_id=${recId}`
    )
      .then((response) => {
        setLoading(false)
        const filterResults = response.data.averages.map((avs, index) => {
          return {
            id: index,
            Date: avs.date,
            'Morning BP': `${avs.mornSytoAvg || '-'}/${avs.mornDiasAvg || '-'}`,
            'Evening BP': `${avs.evenSytoAvg || '-'}/${avs.evenDiasAvg || '-'}`,
            'Average BP': `${avs.sytolicAverage || '-'}/${
              avs.diastolicAverage || '-'
            }`,
          }
        })
        setBpData(filterResults)
      })
      .catch(() => setLoading(false))
  }
  const handleChange = (newDate) => {
    const minDate = dayjs(newDate[0]).format('YYYY-MM-DD')
    const maxDate = dayjs(newDate[1]).format('YYYY-MM-DD')
    setSelectedDate([minDate, maxDate])
    if (newDate[1]) {
      filter('date-range', newDate)
    }
  }

  const CustomToolbar = () => {
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
          <button
            className={
              toggleButton === 'last-week' ? styles.activeButton : styles.btn
            }
            value="last-week"
            onClick={(e) => {
              filter('last-week')
              handleClicked(e)
            }}
          >
            LAST WEEK
          </button>
          <button
            className={
              toggleButton === 'last-month' ? styles.activeButton : styles.btn
            }
            value="last-month"
            onClick={(e) => {
              filter('last-month')
              handleClicked(e)
            }}
          >
            LAST MONTH
          </button>
          <button
            className={
              toggleButton === 'last-six-months'
                ? styles.activeButton
                : styles.btn
            }
            value="last-six-months"
            onClick={(e) => {
              filter('last-six-months')
              handleClicked(e)
            }}
          >
            LAST 6 MONTHS
          </button>
          <button
            className={
              toggleButton === 'date-range' ? styles.activeButton : styles.btn
            }
            value="date-range"
            onClick={(e) => {
              handleClicked(e)
              setShowCalendar(true)
            }}
          >
            CHOOSE DATE RANGE
          </button>
        </div>
        {toggleButton === 'date-range' && showCalendar ? (
          <div className={styles.calendar}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                inputFormat="YYYY-DD-MM"
                toolbarPlaceholder="YYYY-DD-MM"
                value={selectedDate}
                mask="____-__-__"
                onChange={handleChange}
                renderInput={(startProps, endProps) => (
                  <>
                    <input {...startProps.inputProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <input {...endProps.inputProps} />
                  </>
                )}
              />
            </LocalizationProvider>

            <button
              className={styles.cancel}
              onClick={() => {
                setShowCalendar(false)
              }}
            >
              <X />
            </button>
          </div>
        ) : null}
      </>
    )
  }
  const NoRowsOverlay = () => {
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
