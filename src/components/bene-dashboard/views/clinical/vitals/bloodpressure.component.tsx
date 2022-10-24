import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { DateRangePicker, DateRange } from "mui-daterange-picker";
import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import * as styles from './vitals.component.css'
import airtableFetch from '../../../../../resources/airtable-fetch'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'

const BloodPressure = () => {
  const todayDate = dayjs(new Date()).add(1, 'day').format('YYYY-MM-DD')
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

  const [toggleButton, setToggleButton] = useState('last-six-months')
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
      const startDate = newDate.startDate
      const endDate = newDate.endDate
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

  const closeDatePicker = () => setShowCalendar(false)
  const handleChange = (newDate) => {
    const startDate = dayjs(newDate.startDate).format('YYYY-MM-DD')
    const endDate = dayjs(newDate.endDate).format('YYYY-MM-DD')
    setSelectedDate([startDate, endDate])
    if (newDate.startDate) {
      filter('date-range', newDate)
    }
    setShowCalendar(false)
  }

  useEffect(() => {
    if (selectedValue && toggleButton) {
      filter(toggleButton, selectedDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, toggleButton])

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
            }}
          >
            Custom
          </button>
          {toggleButton === 'date-range' && <button
            className={styles.dateBtn}
            value="date-range"
            onClick={() => setShowCalendar(!showCalendar)}
          >
           {showCalendar ? 'Close' : 'Choose date range'} 
          </button>}
        </div>
        {toggleButton === 'date-range' ? (
          <div className={styles.dateContainer}>
            <DateRangePicker
              open={showCalendar}
              closeOnClickOutside
              toggle={closeDatePicker}
              onChange={handleChange}
            />
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
