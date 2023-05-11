import React, { useEffect, useState, RefObject } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import dayjs, { Dayjs } from 'dayjs'
import { useParams } from 'react-router-dom'
import { Modal, Paper } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import airtableFetch from 'src/services/airtable/fetch'
import Loading from 'src/components/loaders/centered'
import ListModal, { TOpenItem } from 'src/components/list/list-modal.component'
import { useMember } from 'src/context/member'
import { GET_MEMBER_INTERACTIONS } from 'src/modules/interactions/services/gql'
import { GET_FILES } from 'src/modules/udm/services/gql'
import {
  LongitudinalData,
  ILongitudinalTrackingData,
  IEvent,
  IGroupedEvent,
  TEventSlotInfo,
  InteractionsData,
  IDocument,
  IResource,
} from './modules'
import styles from './longitudinal.component.css'
import { CalendarHeader, TDateRange } from './header'
import requestBody from './config.json'
import useLongitudinalTracker from './analytics'

dayjs.extend(weekOfYear)

type TLongitudinalTable = {
  setToMaximize: (toMaximize: boolean) => void
  toMaximize: boolean
  calendarRef: RefObject<FullCalendar>
  currentView: string
  setCurrentView: (currentView: string) => void
  dateRange: TDateRange
  setDateRange: (dateRange: TDateRange) => void
  isLoading: boolean
  error: any
  rawLongitudinalData: ILongitudinalTrackingData | undefined
  interactions: InteractionsData[]
  documents: IDocument[]
}

function LongitudinalTable({
  setToMaximize,
  toMaximize,
  calendarRef,
  currentView,
  setCurrentView,
  dateRange,
  setDateRange,
  error,
  isLoading,
  rawLongitudinalData,
  interactions,
  documents,
}: TLongitudinalTable) {
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const longitudinalData = LongitudinalData(
    rawLongitudinalData,
    interactions,
    documents
  )
  const [selectedResources, setSelectedResources] = useState<IResource[]>([])
  const [initialDate, setInitialDate] = useState<Dayjs>(dayjs())
  const { viewChanged } = useLongitudinalTracker()

  useEffect(() => {
    setSelectedResources(longitudinalData?.getResources() || [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawLongitudinalData, interactions, documents])

  const handleSelectResource = (resources: string[]) => {
    // find resources whise title is in resources list
    const newSelectedResources =
      longitudinalData
        ?.getResources()
        .filter((resource) => resources.includes(resource.title)) || []

    setSelectedResources(newSelectedResources)
  }

  const handleViewChange = (newView: string) => {
    viewChanged(currentView, newView)
    setCurrentView(newView)
  }

  const fetchEvents = (
    info: any,
    successCallback: (events: any[]) => void,
    errorCallback: (error: any) => void
  ) => {
    if (error) {
      errorCallback(error)
    } else {
      const events = longitudinalData?.getEvents(info.start, info.end) || []
      successCallback(events)
    }
  }

  const fetchResources = (
    info: any,
    successCallback: (resources: any) => void,
    errorCallback: (error: any) => void
  ) => {
    if (error) {
      errorCallback(error)
    } else {
      successCallback(selectedResources)
    }
  }

  useEffect(() => {
    const callApi = calendarRef.current?.getApi()

    if (callApi) {
      callApi.changeView(currentView)
      let date

      switch (currentView) {
        case 'resourceThreeMonths':
          date = dayjs().subtract(2, 'months')
          setInitialDate(date)
          callApi.gotoDate(date.toDate())
          break
        case 'resourceSixMonths':
          date = dayjs().subtract(5, 'months')
          setInitialDate(date)
          callApi.gotoDate(date.toDate())
          break
        default:
          setInitialDate(dayjs())
      }
    }

    const start = callApi?.view.activeStart
    const end = callApi?.view.activeEnd

    if (start && end) {
      setDateRange([dayjs(start), dayjs(end)])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentView])

  const handleEventClick = (event: any) => {
    // eslint-disable-next-line no-underscore-dangle
    const eventProps = event?.event?._def?.extendedProps
    // eslint-disable-next-line no-underscore-dangle
    const eventRange = event?.event?._instance?.range

    const nextEvent = { ...eventProps, eventRange }

    setSelectedEvent((prev: any) => {
      if (prev === nextEvent) {
        return null
      }
      return nextEvent
    })
  }

  const renderEventContent = (eventInfo: any) => {
    // eslint-disable-next-line no-underscore-dangle
    const props = eventInfo?.event?._def
    const extendedProps = props?.extendedProps
    const title = props?.title

    if (extendedProps?.eventType === 'grouped') {
      return (
        <div className="groupedEvent">
          <div className="fc-event-title">{title}</div>
        </div>
      )
    }
    return (
      <div className="singleEvent">
        <div className="fc-event-title">{title}</div>
      </div>
    )
  }

  const renderResourceHeader = () => {
    return null
  }

  const handlePrev = () => {
    // when you click previous you should set the start date
    const calApi = calendarRef.current?.getApi()
    if (calApi) {
      const start = calApi.view.currentStart
      let currentStart
      switch (currentView) {
        case 'resourceThreeMonths':
        case 'resourceSixMonths':
          currentStart = dayjs(start).subtract(1, 'month')
          setInitialDate(currentStart)
          calApi.gotoDate(currentStart.toDate())
          break
        default:
          calApi.prev()
      }
    }
  }

  const handleNext = () => {
    const calApi = calendarRef.current?.getApi()
    if (calApi) {
      const start = calApi.view.currentStart
      let currentStart
      switch (currentView) {
        case 'resourceThreeMonths':
        case 'resourceSixMonths':
          currentStart = dayjs(start).add(1, 'month')
          setInitialDate(currentStart)
          calApi.gotoDate(currentStart.toDate())
          break
        default:
          calApi.next()
      }
    }
  }

  return (
    <div>
      <CalendarHeader
        calendarRef={calendarRef}
        toMaximize={toMaximize}
        setToMaximize={setToMaximize}
        currentView={currentView}
        setCurrentView={handleViewChange}
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectedResources={selectedResources.map((resource) => resource.title)}
        resources={longitudinalData?.getResources() || []}
        handleSelectResource={handleSelectResource}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <FullCalendar
          ref={calendarRef}
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[resourceTimelinePlugin]}
          initialView="resourceMonthly"
          headerToolbar={false}
          initialDate={initialDate.toDate()}
          views={{
            resourceThreeMonths: {
              type: 'resourceTimeline',
              duration: { months: 3 },
              buttonText: 'three months',
              slotDuration: { month: 1 },
              slotLabelInterval: { month: 1 },
              slotLabelContent: (info: any) => (
                <span className={styles.slotLabel}>
                  {dayjs(info.date).format("MMM'YY")}
                </span>
              ),
              description: '3 months view',
            },
            resourceSixMonths: {
              type: 'resourceTimeline',
              duration: { months: 6 },
              buttonText: 'six months',
              slotDuration: { month: 1 },
              slotLabelInterval: { month: 1 },
              slotLabelContent: (info: any) => (
                <span className={styles.slotLabel}>
                  {dayjs(info.date).format("MMM'YY")}
                </span>
              ),
            },
            resourceWeekly: {
              type: 'resourceTimeline',
              duration: { weeks: 1 },
              buttonText: 'weekly',
              slotDuration: { days: 1 },
              slotLabelInterval: { days: 1 },
              slotLabelContent: (info: any) => {
                const { date } = info as TEventSlotInfo
                return (
                  <span className={styles.slotLabel}>
                    {' '}
                    <b>{dayjs(date).format('ddd')}</b>{' '}
                    {dayjs(date).format('MMM DD')}
                  </span>
                )
              },
            },
            resourceMonthly: {
              type: 'resourceTimeline',
              duration: { months: 1 },
              buttonText: 'monthly',
              slotDuration: { days: 7 },
              slotLabelInterval: { days: 7 },
              slotLabelContent: (info: any) => {
                const { date } = info as TEventSlotInfo
                return (
                  <>
                    <b className={styles.slotLabelBold}>
                      W{dayjs(date).week()}
                    </b>{' '}
                    <span className={styles.slotLabel}>
                      {dayjs(date).startOf('week').format('MMM DD')} -{' '}
                      {dayjs(date).endOf('week').format('MMM DD')}
                    </span>
                  </>
                )
              },
            },
          }}
          editable={false}
          selectable={false}
          selectMirror
          dayMaxEvents
          weekends
          events={fetchEvents}
          resources={fetchResources}
          resourceOrder="order"
          eventClick={handleEventClick}
          expandRows
          datesAboveResources
          progressiveEventRendering={false}
          resourceAreaHeaderContent={renderResourceHeader}
          eventContent={renderEventContent}
          resourceAreaWidth="15%"
          resourceLabelContent={(info: any) => {
            const { resource } = info
            return (
              <div className={styles.resourceLabel}>
                <div className={styles.resourceLabelTitle}>
                  {resource.title}
                </div>
              </div>
            )
          }}
        />
      )}

      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      )}
    </div>
  )
}

function LongitudinalView() {
  const [toMaximize, setToMaximize] = useState<boolean>(true)
  const calendarRef = React.createRef<FullCalendar>()
  const [currentView, setCurrentView] = useState<string>('resourceMonthly')
  const [dateRange, setDateRange] = useState<TDateRange>([null, null])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const { v2Member } = useMember()
  const [interactions, setInteractions] = useState<InteractionsData[]>([])
  const [rawLongitudinalData, setLongitduinalData] =
    useState<ILongitudinalTrackingData>()
  const [documents, setDocuments] = useState<IDocument[]>([])
  const { page } = useLongitudinalTracker()

  useEffect(() => {
    page()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { recId } = useParams()
  useEffect(() => {
    if (v2Member) {
      getInteractions({ variables: { antaraId: v2Member?.antaraId } })
      getDocuments({ variables: { antaraId: v2Member?.antaraId } })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v2Member])

  const [getDocuments, { loading: loadingDocs }] = useLazyQuery(GET_FILES, {
    onCompleted: (data: any) => {
      if (data && data.files) {
        const files = data.files?.edges?.map(({ node }: any) => {
          const sharedFileSet = node?.sharedfileSet?.edges?.map((e: any) => ({
            folder: e?.node?.folder?.name,
            member: e?.node?.member?.fullName,
            read: e?.node?.read,
            sharedBy: e?.node?.sharedBy,
            sharedAt: e?.node?.createdAt,
            readAt: e?.node?.readAt,
          }))

          const parsed = {
            sharedFileSet: sharedFileSet?.length > 0 ? sharedFileSet[0] : null,
            title: node?.title,
            addedBy: node?.addedBy,
            category: node?.category,
            fileCategory: node?.fileCategory?.name,
            description: node?.description,
            createdAt: node?.createdAt,
            mimeType: node?.mimeType,
            id: node?.id,
          }

          return parsed
        })

        setDocuments(files)
      }
    },
  })

  const [getInteractions, { loading }] = useLazyQuery(GET_MEMBER_INTERACTIONS, {
    onCompleted: (data: any) => {
      if (data && data.memberInteractions) {
        const mappedResponse = data?.memberInteractions?.edges?.map(
          (e: any) => e?.node
        )
        setInteractions(mappedResponse)
      }
    },
  })

  useEffect(() => {
    if (recId) {
      setIsLoading(true)
      setError(null)
      airtableFetch(`longitudinal/${recId}`, 'POST', requestBody)
        .then((data: ILongitudinalTrackingData) => {
          setLongitduinalData(data)
        })
        .catch((err) => {
          setError(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [recId])

  const renderCalendar = () => {
    return (
      <LongitudinalTable
        calendarRef={calendarRef}
        setToMaximize={setToMaximize}
        toMaximize={toMaximize}
        currentView={currentView}
        setCurrentView={setCurrentView}
        dateRange={dateRange}
        setDateRange={setDateRange}
        rawLongitudinalData={rawLongitudinalData}
        interactions={interactions}
        isLoading={isLoading || loading || loadingDocs}
        error={error}
        documents={documents}
      />
    )
  }

  return toMaximize ? (
    renderCalendar()
  ) : (
    <Modal
      open
      onClose={() => setToMaximize(true)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: 'scroll' }}
    >
      <Paper className={styles.modalPaper}>{renderCalendar()}</Paper>
    </Modal>
  )
}

function EventDetails({ event, setSelectedEvent }: any) {
  const getGroupedEvents = (groupedEvent: IGroupedEvent) => {
    return groupedEvent?.from(0)?.map((e: IEvent) => e?.getEventDetails())
  }

  const { itemOpened } = useLongitudinalTracker()

  const trackItem = (item: TOpenItem) => {
    const { data } = item

    itemOpened(data)
  }

  return event?.eventType === 'grouped' ? (
    <ListModal
      modalOpen={!!event}
      setModalOpen={setSelectedEvent}
      items={getGroupedEvents(event)}
      multiple
      itemCallback={trackItem}
    />
  ) : (
    <ListModal
      modalOpen={!!event}
      modalTitle={event?.getEventDetails()?.name}
      setModalOpen={setSelectedEvent}
      openItem={event?.getEventDetails()}
      editable={false}
      multiple={false}
      items={[]}
      itemCallback={trackItem}
    />
  )
}

export default LongitudinalView
