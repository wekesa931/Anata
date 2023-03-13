import React, { RefObject, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayjs, { Dayjs } from 'dayjs'
import {
  Button,
  Tooltip,
  Typography,
  Stack,
  OutlinedInput,
  Checkbox,
  ListItemText,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'react-feather'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import styles from './longitudinal.component.css'
import { IResource } from './modules'

export type TDateRange = [Dayjs | null, Dayjs | null]

export type TCalendarHeader = {
  calendarRef: RefObject<FullCalendar>
  toMaximize: boolean
  setToMaximize: (toMaximize: boolean) => void
  dateRange: TDateRange
  setDateRange: (dateRange: TDateRange) => void
  currentView: string
  setCurrentView: (currentView: string) => void
  selectedResources: string[]
  resources: IResource[]
  handleSelectResource: (selectedResources: string[]) => void
  handlePrev: () => void
  handleNext: () => void
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export function CalendarHeader({
  calendarRef,
  toMaximize,
  setToMaximize,
  dateRange,
  setDateRange,
  currentView,
  setCurrentView,
  selectedResources,
  handleSelectResource,
  resources,
  handleNext,
  handlePrev,
}: TCalendarHeader) {
  useEffect(() => {
    const callApi = calendarRef.current?.getApi()

    if (callApi) {
      // get the date range of the current view
      const { view } = callApi
      const start = dayjs(view.activeStart)
      const end = dayjs(view.activeEnd)
      setDateRange([start, end])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDateRangeTitle = () => {
    const start = dateRange[0]
    const end = dateRange[1]

    switch (currentView) {
      case 'resourceWeekly':
      case 'resourceMonthly':
        return `${start?.format('MMM YY')}`
      case 'resourceThreeMonths':
      case 'resourceSixMonths':
        return `${start?.format('MMM YY')} - ${end?.format('MMM YY')}`
      default:
        return `${start?.format("MMM'YY")} - ${end?.format("MMM'YY")}`
    }
  }

  const handleDateChange = (direction: 'prev' | 'next' | 'today') => {
    const callApi = calendarRef.current?.getApi()

    if (callApi) {
      switch (direction) {
        case 'prev':
          handlePrev()
          break
        case 'next':
          handleNext()
          break
        case 'today':
          callApi.today()
          break
        default:
          break
      }
    }

    setDateRange([
      dayjs(callApi?.view.activeStart),
      dayjs(callApi?.view.activeEnd),
    ])
  }

  const handleChange = (event: SelectChangeEvent<typeof selectedResources>) => {
    const { value } = event.target
    handleSelectResource(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <header className={styles.calendarHeader}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <ButtonGroup variant="outlined" size="small">
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleDateChange('prev')}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleDateChange('today')}
          >
            Today
          </Button>

          <Button
            variant="outlined"
            size="small"
            onClick={() => handleDateChange('next')}
          >
            <ChevronRight />
          </Button>
        </ButtonGroup>

        <Stack
          direction="row"
          alignItems="center"
          gap={3}
          justifyContent="space-evenly"
          sx={{ width: '100%' }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ ml: 2, fontSize: 14, fontWeight: 600 }}
          >
            {getDateRangeTitle()}
          </Typography>
          <ToggleButtonGroup
            value={currentView}
            exclusive
            onChange={(event, newView) => {
              if (newView) {
                setCurrentView(newView)
              }
            }}
            size="small"
            aria-label="current view"
          >
            <ToggleButton value="resourceWeekly" aria-label="resource weekly">
              W
            </ToggleButton>
            <ToggleButton value="resourceMonthly" aria-label="resource monthly">
              1M
            </ToggleButton>
            <ToggleButton
              value="resourceThreeMonths"
              aria-label="resource two months"
            >
              3M
            </ToggleButton>
            <ToggleButton
              value="resourceSixMonths"
              aria-label="resource six months"
            >
              6M
            </ToggleButton>
          </ToggleButtonGroup>
          <FormControl>
            <Select
              id="demo-simple-resources"
              multiple
              value={selectedResources}
              onChange={handleChange}
              input={<OutlinedInput size="small" />}
              renderValue={(selected) =>
                selected.length > 0
                  ? `Events (${selected.length})`
                  : 'Events (0)'
              }
              MenuProps={MenuProps}
              size="small"
            >
              {resources.map((resource) => (
                <MenuItem key={resource?.id} value={resource.title}>
                  <Checkbox
                    checked={selectedResources.indexOf(resource.title) > -1}
                  />
                  <ListItemText primary={resource.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Tooltip title={toMaximize ? 'Full screen' : 'Minimize'}>
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() => setToMaximize(!toMaximize)}
            size="small"
          >
            {toMaximize ? <Maximize2 /> : <Minimize2 />}
          </Button>
        </Tooltip>
      </Stack>
    </header>
  )
}
