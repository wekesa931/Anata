import dayjs from 'dayjs'
import React from 'react'
import { useParams } from 'react-router-dom'
import useAirtableFetch from '../../../../hooks/airtable-fetch.hook'
import List from '../../../utils/list/list.component'
import filterFields from '../../../../helpers/filter-fields'
import Icon from '../../../utils/icon/icon.component'
import Tooltip from '../../../utils/tooltip/tooltip.component'
import analytics from '../../../../helpers/segment'
import airtableFetch from '../../../../resources/airtable-fetch'
import styles from './appointments.component.css'
import { useMember } from '../../../../context/member.context'

function Appointments() {
  const [appointments, setAppointments] = React.useState<any[]>([])
  const [filteredAppointments, setFilteredAppointments] = React.useState<any[]>(
    []
  )
  const { recId } = useParams()

  const status = [
    'All',
    'Completed',
    'Scheduled',
    'Cancelled',
    'Missed',
    'CheckedIn',
    'Not Started',
  ]

  const [selected, setSelected] = React.useState(status[0])

  const allowedFields = [
    'Service',
    'Status',
    'start_date_time',
    'Comments',
    'Providers',
    'Calendly Reschedule URL',
    'Record ID'
  ]

  const { data, isLoading, isError, refresh } = useAirtableFetch(
    `appointments/list?filterByFormula=FIND("${recId}", {Member Record ID})
    &sort=[{"field":"start_date_time","direction":"desc"}]
    &${filterFields(allowedFields)}`
  )

  const {
    data: providersData,
    isLoading: providersLoading,
    isError: providersError,
  } = useAirtableFetch(`providers/list?`)

  const getAllProviders = () => {
    const providersList: any = []
    Object.entries(providersData).forEach(([value, obj]) => {
      // eslint-disable-next-line
      for (const key in obj) {
        if (key === 'Specialist Summary') {
          providersList.push(`${value}: ${obj[key]}`)
        }
      }
    })
    return providersList
  }

  const APPOINTMENT_FIELDS: AirtableField[] = [
    {
      name: 'Comments',
      type: 'long-text',
    },
    {
      name: 'start_date_time',
      type: 'datetime',
    },
    {
      name: 'Providers',
      type: 'single-select',
      options: getAllProviders().map((type) => ({
        label: type.split(':')[1],
        value: type.split(':')[0],
      })),
    },
    {
      name: 'Status',
      type: 'single-select',
      options: [
        'Completed',
        'Scheduled',
        'Cancelled',
        'Missed',
        'CheckedIn',
        'Not Started',
        'Rescheduled by member',
        'Needed',
      ].map((type) => ({ label: type, value: type })),
    },
  ]
  const { member, v2Member } = useMember()

  const openCalendar = () => {
    if (v2Member || member) {
      const fullName = v2Member?.fullName || member['Full Name']
      const urlName = fullName?.replaceAll(' ', '%20')
      const email = v2Member?.email || member['Email 1']
      const memberEmail = email || 'navigation@antarahealth.com'
      const memberPhone = v2Member?.phone || member['Phone 1']

      const link = `https://calendly.com/antara-health?name=${urlName}&email=${memberEmail}&a1=${memberPhone}`

      const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }
  }

  const updateAppointment = async (appointment: {
    id: string
    fields: any
  }) => {
    const provCheck = appointment.fields.Providers
      ? [appointment.fields.Providers]
      : null
    await airtableFetch('appointments', 'post', {
      id: appointment.id,
      fields: {
        ...appointment.fields,
        start_date_time: dayjs(
          appointment.fields.start_date_time
        ).toISOString(),
        Providers: provCheck,
      },
    }).then((res) => {
      if (res) {
        setSelected(status[0])
      }
    })
    analytics.track(`Appointment Updated`, {
      bene: recId,
    })
    return refresh()
  }

  const includeFieldTypes = (appointment) => {
    return Object.keys(appointment).map((key) => {
      const field = APPOINTMENT_FIELDS.find(({ name }) => name === key)
      return field
        ? {
            value:
              field.type === 'datetime'
                ? dayjs(appointment[key]).format('YYYY-MM-DDTHH:mm')
                : appointment[key],
            ...field,
          }
        : appointment
    })
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

    if (data && providersData) {
      const mappedResponse = Object.keys(data)
        .map((key) => ({ appointment: data[key], id: key }))
        .map(({ appointment}) => ({
          data: includeFieldTypes(appointment),
          name: getDisplayInfo(appointment),
          id: appointment['Record ID'],
        }))

      setAppointments(mappedResponse)
      setFilteredAppointments(mappedResponse)
    }
    // eslint-disable-next-line
  }, [data, providersData])

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

  const handleChange = (e: any) => {
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
      {filteredAppointments && !isLoading && (
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
      {isLoading && providersLoading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <Icon name="loading" />
          <p className="text-small">Loading Appointments...</p>
        </div>
      )}
      {isError && providersError && (
        <p className="text-small text-danger margin-top-24">
          An error occurred while fetching appointments, please refresh the
          page.
        </p>
      )}
    </div>
  )
}

export default Appointments
