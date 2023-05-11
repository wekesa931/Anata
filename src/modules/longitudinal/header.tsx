import React, { RefObject, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayjs, { Dayjs } from 'dayjs'
import {
  Button,
  Typography,
  Stack,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
  Popper,
  ClickAwayListener,
  Paper,
  Grid,
  Divider,
} from '@mui/material'
import { Check, ChevronDown, ChevronLeft, ChevronRight } from 'react-feather'
import styles from './longitudinal.component.css'
import { IResource } from './modules'
import useLongitudinalTracker from './analytics'

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

export function CalendarHeader({
  calendarRef,
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
  const [anchroEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { periodChanged, resourcesSelected } = useLongitudinalTracker()

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

      periodChanged(callApi.view)
    }

    setDateRange([
      dayjs(callApi?.view.activeStart),
      dayjs(callApi?.view.activeEnd),
    ])
  }

  const toggleSelectResouce = (resourceTitle: string) => {
    const currentIndex = selectedResources.indexOf(resourceTitle)
    const newSelectedResources = [...selectedResources]

    if (currentIndex === -1) {
      newSelectedResources.push(resourceTitle)
    } else {
      newSelectedResources.splice(currentIndex, 1)
    }
    handleSelectResource(newSelectedResources)
    resourcesSelected(newSelectedResources)
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
          justifyContent="space-between"
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

          <Button
            variant="text"
            startIcon={<ChevronDown />}
            sx={{ color: 'var(--dark-blue-100)', fontSize: 14 }}
            size="small"
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              setAnchorEl(anchroEl ? null : e.currentTarget)
            }
          >
            Events ({selectedResources.length})
          </Button>

          <Popper
            open={Boolean(anchroEl)}
            anchorEl={anchroEl}
            placement="bottom-start"
            id={anchroEl ? 'details' : undefined}
            sx={{ zIndex: 1 }}
          >
            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
              <Paper sx={{ p: 2, width: 350 }} elevation={2}>
                <Grid container direction="row">
                  {resources.map((resource) => (
                    <Grid item xs={6} key={resource.id}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => toggleSelectResouce(resource.title)}
                        startIcon={
                          selectedResources.includes(resource.title) ? (
                            <Check />
                          ) : null
                        }
                        sx={{
                          fontSize: 14,
                          textAlign: 'left',
                          textTransform: 'none',
                        }}
                      >
                        <span
                          className={
                            selectedResources.includes(resource.title)
                              ? styles.selected
                              : styles.hidden
                          }
                        >
                          {resource.title}
                        </span>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleSelectResource([])}
                  >
                    Hide all
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      handleSelectResource(
                        resources.map((resource) => resource.title)
                      )
                    }
                  >
                    Show All
                  </Button>
                </Stack>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Stack>

        {/* <Tooltip title={toMaximize ? 'Full screen' : 'Minimize'}>
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() => setToMaximize(!toMaximize)}
            size="small"
          >
            {toMaximize ? <Maximize2 /> : <Minimize2 />}
          </Button>
        </Tooltip> */}
      </Stack>
    </header>
  )
}
