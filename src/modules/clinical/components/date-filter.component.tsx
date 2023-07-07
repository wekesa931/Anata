import React, { useEffect } from 'react'
import {
  CssBaseline,
  Popper,
  TextField,
  Box,
  Grid,
  ClickAwayListener,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useDateRangeFilter, Actions } from 'src/context/date-range-filter'
import styles from './date-filter.component.css'

export type TDateRange = [Dayjs | null, Dayjs | null]

function DateFilterView() {
  const { handleAction, currentFilter } = useDateRangeFilter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [customDateRange, setCustomDateRange] = React.useState<TDateRange>([
    null,
    null,
  ])

  const open = Boolean(anchorEl)
  const id = open ? 'date-range-selector' : undefined

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const [startTime, endTime] = customDateRange

  const handleDateRangeChange = (date: TDateRange) => {
    setCustomDateRange(date)
  }

  useEffect(() => {
    if (customDateRange[0] && customDateRange[1]) {
      handleAction(Actions.SET_DATE_RANGE, customDateRange)
      setAnchorEl(null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customDateRange])

  useEffect(() => {
    if (currentFilter !== Actions.SET_DATE_RANGE) {
      setCustomDateRange([null, null])
    }
  }, [currentFilter])

  return (
    <div className="absolute w-1/2 left-1/4 z-10 p-1 bg-white shadow-sm top-[3rem]">
      <CssBaseline />
      <p className={styles.title}>Filter all tables</p>
      <div className={styles.container}>
        <button
          className={`${styles.button} btn ${
            currentFilter === Actions.WEEKLY && styles.buttonSuccess
          }`}
          onClick={() => handleAction(Actions.WEEKLY)}
        >
          Last week
        </button>
        <button
          className={`${styles.button} btn ${
            currentFilter === Actions.MONTHLY && styles.buttonSuccess
          }`}
          onClick={() => handleAction(Actions.MONTHLY)}
        >
          Last month
        </button>
        <button
          className={`${styles.button} btn ${
            currentFilter === Actions.LAST_3_MONTHS && styles.buttonSuccess
          }`}
          onClick={() => handleAction(Actions.LAST_3_MONTHS)}
        >
          Last 3 months
        </button>
        <button
          className={`${styles.button} btn ${
            currentFilter === Actions.LAST_6_MONTHS && styles.buttonSuccess
          }`}
          onClick={() => handleAction(Actions.LAST_6_MONTHS)}
        >
          Last 6 months
        </button>
        <button
          className={`${styles.button} btn ${
            currentFilter === Actions.SET_DATE_RANGE && styles.buttonSuccess
          }`}
          onClick={handleClick}
          aria-describedby={id}
        >
          Custom
        </button>

        <Popper open={open} anchorEl={anchorEl} id={id}>
          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 2,
                width: 350,
                mt: 1.25,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={6}>
                    <DatePicker
                      label="From"
                      value={startTime}
                      onChange={(newValue) => {
                        handleDateRangeChange([dayjs(newValue), endTime])
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DatePicker
                      label="To"
                      value={endTime}
                      onChange={(newValue) => {
                        handleDateRangeChange([startTime, dayjs(newValue)])
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </Box>
          </ClickAwayListener>
        </Popper>
      </div>
    </div>
  )
}

export default DateFilterView
