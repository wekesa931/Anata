import dayjs from 'dayjs'
import React from 'react'
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
import styles from './appointments.component.css'

const SearchFieldsNameMap: Record<string, string> = {
  'Facilities from Provider base': 'Facilities name from Provider base',
  'Specialists from Provider Base': 'Specialist name from Provider base',
}

function Appointments() {
  const [appointments, setAppointments] = React.useState<any[]>([])
  const [filteredAppointments, setFilteredAppointments] = React.useState<any[]>(
    []
  )
  const { member } = useMember()
  const recId = member?.airtableRecordId

  const status = [
    'All',
    'Needed',
    'Scheduled',
    'Completed',
    'Cancelled',
    'Missed',
  ]

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
      options: ['Needed', 'Scheduled', 'Completed', 'Missed', 'Cancelled'].map(
        (type) => ({ label: type, value: type })
      ),
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

      const link = `https://calendly.com/antara-health?name=${urlName}&email=${memberEmail}&a1=${memberPhone}&utm_source=src - ${user.name}`

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

  React.useEffect(() => {
    const getDisplayInfo = (appointment: any) => {
      return (
        <div className="d-flex flex-justify-space-between">
          <span>{appointment.Service}</span>
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
      setFilteredAppointments(mappedResponse)
    }
    // eslint-disable-next-line
  }, [data])

  const getAppointmentDate = (appointment: any) => {
    return dayjs(
      appointment.reduce(
        (obj, { name, value }) => ({ ...obj, [name]: value }),
        {}
      ).start_date_time
    ).format("DD MMM 'YY HH:mmA")
  }

  const getAppointmentsStatus = (appointment) =>
    appointment.reduce(
      (obj, { name, value }) => ({ ...obj, [name]: value }),
      {}
    ).Status

  const filterByStatus = (val: string) => {
    if (val === 'All') {
      return appointments.filter((appointment) =>
        appointment.data.find(
          ({ name, value }: any) => name === 'Status' && value !== 'Complete'
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
    setFilteredAppointments(filterByStatus(value))
  }

  return (
    <div>
      <button className={styles.appointment} onClick={openCalendar}>
        Book Appointment
      </button>
      <div
        className="d-flex flex-align-center"
        style={{ justifyContent: 'space-between' }}
      >
        <h4>Appointments</h4>

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
      {filteredAppointments && !isLoading && !loading && (
        <List
          list={filteredAppointments}
          getTopLeftText={getAppointmentDate}
          getTopRightText={getAppointmentsStatus}
          emptyListText="No Appointments found for this member"
          editable
          onEdit={updateAppointment}
          modalTitle="Appointment"
        />
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
//
