import dayjs from 'dayjs'
import React from 'react'
import { useParams } from 'react-router-dom'
import useAirtableFetch from '../../../../hooks/airtable-fetch.hook'
import List from '../../../utils/list/list.component'
import filterFields from '../../../../helpers/filter-fields'
import Icon from '../../../utils/icon/icon.component'
import Tooltip from '../../../utils/tooltip/tooltip.component'
import MEETING_FIELDS from './meeting-fields'
import analytics from '../../../../helpers/segment'
import airtableFetch from '../../../../resources/airtable-fetch'

const Meetings = () => {
  const [meetings, setMeetings] = React.useState<any[]>([])
  const { recId } = useParams()
  const allowedFields = [
    'Meeting Type',
    'Date',
    'Status',
    'Meeting Notes',
    'HIF filled',
    'New Task',
    'Summary',
    'Followup tasks (rollup)',
  ]
  const { data, isLoading, isError, refresh } = useAirtableFetch(
    `meetings/list?
    &filterByFormula=FIND("${recId}", {memberRecIds})
    &sort=[{"field":"Date","direction":"desc"}]`
  )

  const openNewTaskForm = (e: any, url: string) => {
    e.stopPropagation()
    window.open(url, '__blank')
  }

  const updateMeeting = async (meeting: { id: string; fields: any }) => {
    await airtableFetch('meetings', 'post', {
      id: meeting.id,
      fields: {
        ...meeting.fields,
        Date: dayjs(meeting.fields.Date).toISOString(),
      },
    })
    analytics.track(`Meeting Updated`, {
      bene: recId,
    })
    return refresh()
  }

  const includeFieldTypes = (meeting) => {
    return Object.keys(meeting).map((key) => {
      const field = MEETING_FIELDS.find(({ name }) => name === key)
      return field
        ? {
            value:
              field.type === 'datetime'
                ? dayjs(meeting[key]).format('YYYY-MM-DDThh:mm')
                : meeting[key],
            ...field,
          }
        : meeting
    })
  }

  React.useEffect(() => {
    const getDisplayInfo = (meeting: any) => {
      return (
        <div className="d-flex flex-justify-space-between">
          <span>{meeting['Meeting Type']}</span>
          <span>
            {meeting['New Task'] && (
              <Tooltip title="New task">
                <button
                  onClick={(e) => openNewTaskForm(e, meeting['New Task'])}
                  className="btn-unstyled"
                >
                  <Icon
                    name="external-link"
                    fill="var(--blue-base)"
                    width={16}
                    height={16}
                  />
                </button>
              </Tooltip>
            )}
          </span>
        </div>
      )
    }
    if (data) {
      const mappedResponse = Object.keys(data)
        .map((key) => ({ meeting: data[key], id: key }))
        .map(({ meeting, id }) => ({
          data: includeFieldTypes(meeting),
          name: getDisplayInfo(meeting),
          id,
        }))
      setMeetings(mappedResponse)
    }
  }, [data])

  return (
    <div>
      <h3>Meetings</h3>
      {meetings && !isLoading && (
        <List
          list={meetings}
          getTopLeftText={(meeting) =>
            dayjs(
              meeting.reduce(
                (obj, { name, value }) => ({ ...obj, [name]: value }),
                {}
              ).Date
            ).format("DD MMM 'YY HH:mmA")
          }
          getTopRightText={(meeting) =>
            meeting.reduce(
              (obj, { name, value }) => ({ ...obj, [name]: value }),
              {}
            ).Status
          }
          emptyListText="No meetings found for this member"
          editable
          onEdit={updateMeeting}
          modalTitle="Meeting"
        />
      )}
      {isLoading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <Icon name="loading" />
          <p className="text-small">Loading Meetings...</p>
        </div>
      )}
      {isError && (
        <p className="text-small text-danger margin-top-24">
          An error occurred while fetching meetings, please refresh the page.
        </p>
      )}
    </div>
  )
}

export default Meetings
