import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import AirtableField from 'src/types/airtable-field'
import { useUser } from 'src/context/user'
import useAirtableFetch from 'src/hooks/airtable-fetch'
import List from 'src/components/list'
import filterFields from 'src/utils/airtable/field-utils'
import Icon from 'src/components/icon/svg-icon'
import Tooltip from 'src/components/tooltip'
import airtableFetch from 'src/services/airtable/fetch'
import { useMember } from 'src/context/member'
import logError from 'src/utils/logging/logger'
import useHandleResponses from 'src/utils/airtable/error-handler'
import useAntaraStaff from 'src/hooks/antara-staff.hook'
import { User } from 'react-feather'
import styles from './appointments.component.css'

const SearchFieldsNameMap: Record<string, string> = {
  'Facilities from Provider base': 'Facilities name from Provider base',
  'Specialists from Provider Base': 'Specialist name from Provider base',
}

function Appointments() {
  const [appointments, setAppointments] = React.useState<any[]>([])
  const { member } = useMember()
  const recId = member?.airtableRecordId

  const status = ['All', 'Completed', 'Cancelled', 'Missed']

  const [selected, setSelected] = React.useState(status[0])

  const allowedFields = [
    'Service',
    'Status',
    'start_date_time',
    'Comments',
    'Calendly Reschedule URL',
    'Record ID',
    'Assignee',
    'Reasons for missed or rescheduled meeting',
    'Facilities from Provider base',
    'Specialists from Provider Base',
    'Facilities name from Provider base',
    'Specialist name from Provider base',
    'Assignee Name',
  ]

  const { data, isLoading, isError, refresh } = useAirtableFetch(
    `appointments/list?filterByFormula=FIND("${recId}", {Member Record ID})
    &sort=[{"field":"start_date_time","direction":"desc"}]
    &${filterFields(allowedFields)}`,
    []
  )

  const { allAntaraStaffs, loading } = useAntaraStaff()

  const APPOINTMENT_FIELDS: AirtableField[] = [
    {
      name: 'Comments',
      type: 'long-text',
    },
    {
      name: 'start_date_time',
      helperText: 'Please enter time in UTC+3 (Kenya time zone)',
      type: 'datetime',
    },
    {
      name: 'Status',
      type: 'single-select',
      options: [
        'Needed',
        'Scheduled',
        'Completed',
        'Missed',
        'Cancelled',
        'Proposed',
        'Suggested',
      ].map((type) => ({ label: type, value: type })),
      helperText:
        'Needed: if the appointment has no date and no time and you want our team to schedule it\nScheduled: we know the date and time and it is assigned\nMissed: the member did not pick up the call or picked up but could not do the call without giving a new date and time, we will need to reschedule\nComplete: successful interaction/ consultation has been done (on phone or in person)\nCanceled: we, Antara, decides that the appointment is not relevant anymore.',
    },
    {
      name: 'Assignee',
      type: 'single-select',
      options: allAntaraStaffs.map((staff: any) => ({
        label: staff.fullName,
        value: staff.atRecordId,
      })),
    },
    {
      name: 'Assignee Name',
      type: 'lookup',
      calculated: true,
    },
    {
      name: 'Reasons for missed or rescheduled meeting',
      type: 'long-text',
    },
    {
      name: 'Facilities from Provider base',
      type: 'search',
      tableId:
        process.env.PROD === 'true' ? 'tbltmQuqyuKPc4Ffo' : 'tblU94ZnFmMT7S0o0',
    },
    {
      name: 'Specialists from Provider Base',
      type: 'search',
      tableId:
        process.env.PROD === 'true' ? 'tblsixUe3jfbOUMQP' : 'tblPpf5F81JypdC9k',
    },
  ]
  const user = useUser()
  const openCalendar = () => {
    if (member) {
      const fullName = member?.fullName || ''
      const urlName = fullName?.replace(' ', '%20')
      const email = member?.email || ''
      const memberEmail = email || 'navigation@antarahealth.com'
      const memberPhone = member?.phone
      const link = `https://calendly.com/antara-health?name=${urlName}&email=${memberEmail}&a1=${memberPhone}&utm_source=src-${user?.name}`

      const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }
  }

  const { handleResponses } = useHandleResponses('Appointments')

  const updateAppointment = async (appointment: {
    id: string
    fields: any
  }) => {
    const transformDataForServer = () => {
      const payload = appointment.fields
      Object.keys(appointment.fields).forEach((fieldKey) => {
        if (fieldKey === 'start_date_time') {
          payload[fieldKey] = dayjs(
            appointment.fields.start_date_time
          ).toISOString()
        }

        if (fieldKey === 'Assignee') {
          payload[fieldKey] = [appointment.fields.Assignee]
        }

        if (Object.keys(SearchFieldsNameMap).includes(fieldKey)) {
          payload[fieldKey] = [appointment.fields[fieldKey].id]
        }
      })
      return payload
    }

    await airtableFetch('appointments', 'post', {
      id: appointment.id,
      fields: transformDataForServer(),
    })
      .then((res) => {
        handleResponses(res)
        setSelected(status[0])
      })
      .catch((err) => {
        logError(err)
      })
      .finally(() => {
        return refresh()
      })
  }

  const includeFieldTypes = (appointment: any) => {
    const parsedFields: any[] = []
    Object.keys(appointment).forEach((key) => {
      const field = APPOINTMENT_FIELDS.find(({ name }) => name === key)

      // process the search fields (facilities and specialists)
      if (field) {
        const searchKeyName = SearchFieldsNameMap[field.name] // Facilities name from Provider base
        if (searchKeyName) {
          const name = appointment[searchKeyName]?.length
            ? appointment[searchKeyName][0]
            : ''
          const value = {
            id: appointment[key]?.length ? appointment[key][0] : '',
            name,
            displayName: name,
          }

          parsedFields.push({
            ...field,
            value,
          })
        } else {
          parsedFields.push({
            value:
              field.type === 'datetime'
                ? dayjs(appointment[key]).format('YYYY-MM-DDTHH:mm')
                : appointment[key],
            ...field,
          })
        }
      }
    })

    return parsedFields
  }

  useEffect(() => {
    function getAssigneeName(assigned: string | { fullName: string }) {
      return typeof assigned === 'string' ? assigned : assigned?.fullName || ''
    }
    const getDisplayInfo = (appointment: any) => {
      return (
        <div className="d-flex justify-center w-full items-start flex-col">
          <div className="font-medium text-base text-dark-blue-100 flex-col w-full">
            <div className="flex justify-between">
              <div className="flex-col">
                <span>{appointment.Service}</span>
                {appointment.Assignee && (
                  <div className="text-gray-400 text-sm flex items-center">
                    <User width={14} height={14} />
                    {Array.isArray(appointment['Assignee Name']) &&
                      appointment['Assignee Name'].map(
                        (
                          assigned: string | { fullName: string },
                          index: number
                        ) => (
                          <span key={index} className="ml-1">
                            {getAssigneeName(assigned)}
                          </span>
                        )
                      )}
                  </div>
                )}
              </div>
              <span>
                <Tooltip title="Reschedule">
                  <a
                    href={appointment['Calendly Reschedule URL']}
                    target="__blank"
                    className="btn-unstyled"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon
                      name="external-link"
                      fill="var(--blue-base)"
                      width={16}
                      height={16}
                    />
                  </a>
                </Tooltip>
              </span>
            </div>
          </div>
          <div className="font-medium text-sm text-gray-400 flex justify-between w-full items-center">
            <span className="status">{appointment.Status}</span>
            <span>
              {dayjs(appointment.start_date_time).format("DD MMM 'YY HH:mmA")}
            </span>
          </div>
        </div>
      )
    }

    if (data) {
      const mappedResponse = data?.map((d: any) => {
        return {
          data: includeFieldTypes(d),
          name: getDisplayInfo(d),
          id: d['Record ID'],
        }
      })
      setAppointments(mappedResponse)
    }
    // eslint-disable-next-line
  }, [data])

  const getPastAppointments = (pastAppointments: any[]): any[] => {
    return pastAppointments.filter((appointment: any) => {
      return ['Missed', 'Cancelled', 'Completed'].includes(
        appointment.data.find(({ name }: any) => name === 'Status')?.value
      )
    })
  }

  const getNextAppointments = (nextAppointments: any[]): any[] => {
    return nextAppointments.filter((appointment: any) => {
      return ['Scheduled', 'Needed', 'Proposed', 'Suggested'].includes(
        appointment.data.find(({ name }: any) => name === 'Status')?.value
      )
    })
  }

  const filterByStatus = (val: string) => {
    if (val === 'All') {
      return appointments.filter((appointment) =>
        appointment.data.find(
          ({ name, value }: any) =>
            name === 'Status' &&
            ['Missed', 'Cancelled', 'Completed'].includes(value)
        )
      )
    }
    return appointments.filter((appointment) =>
      appointment.data.find(
        ({ name, value }: any) => name === 'Status' && value === val
      )
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSelected(value)
  }

  const isReadytoShowAppt = !isLoading && !loading

  return (
    <div>
      <button className={styles.appointment} onClick={openCalendar}>
        Book Appointment
      </button>
      <div className="margin-top-0">
        {isReadytoShowAppt && (
          <>
            <h4 className="mt-5">Up next</h4>
            <List
              list={getNextAppointments(appointments)}
              emptyListText="No Appointment found for this member"
              editable
              onEdit={updateAppointment}
              modalTitle="Appointment"
            />
          </>
        )}
      </div>
      <div
        className="d-flex flex-align-center mt-5"
        style={{ justifyContent: 'space-between' }}
      >
        <h4>Past Appointments</h4>

        <div>
          <select
            value={selected}
            onChange={handleChange}
            className="form-control"
            data-testid="status-filter"
          >
            <option key="all">{selected}</option>
            {status.includes(selected)
              ? status
                  .filter((el) => el !== selected)
                  .map((stat) => <option key={stat}>{stat}</option>)
              : status.map((stat) => <option key={stat}>{stat}</option>)}
          </select>
        </div>
      </div>
      {isReadytoShowAppt && (
        <div>
          <List
            list={getPastAppointments(filterByStatus(selected))}
            emptyListText="No Appointment found for this member"
            editable
            onEdit={updateAppointment}
            modalTitle="Appointment"
          />
        </div>
      )}
      {isLoading && loading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <Icon name="loading" />
          <p className="text-small">Loading Appointments...</p>
        </div>
      )}
      {isError && (
        <p className="text-small text-danger margin-top-24">
          An error occurred while fetching appointments, please refresh the
          page.
        </p>
      )}
    </div>
  )
}

export default Appointments
