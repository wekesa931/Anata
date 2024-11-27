import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import AirtableField from 'src/types/airtable-field'
import { useUser } from 'src/context/user'
import useAirtableFetch from 'src/hooks/airtable-fetch'
import List from 'src/components/list'
import filterFields from 'src/utils/airtable/field-utils'
import Tooltip from 'src/components/tooltip'
import airtableFetch from 'src/services/airtable/fetch'
import { useMember } from 'src/context/member'
import useHandleResponses from 'src/utils/airtable/error-handler'
import useAntaraStaff from 'src/hooks/antara-staff.hook'
import { User, HelpCircle, CheckCircle, XCircle, Clock } from 'react-feather'
import { useModuleAnalytics } from 'src/modules/analytics'
import ExternalLinkIcon from 'src/assets/img/icons/external-link.svg'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import { useAirtableMeta } from 'src/context/airtable-meta'
import { SEND_WHATSAPP_MESSAGE } from 'src/modules/comms/services/gql'
import { useMutation } from '@apollo/client'
import { useNotifications } from 'src/context/notifications'
import Modal from 'src/components/modals'
import { Button } from '@mui/material'
import styles from './appointments.module.css'

const SearchFieldsNameMap: Record<string, any> = {
  'Facilities from Provider base': {
    name: 'Facilities name from Provider base',
    tableId:
      process.env.PROD === 'true' ? 'tbltmQuqyuKPc4Ffo' : 'tblU94ZnFmMT7S0o0',
    type: 'search',
  },
  'Specialists from Provider Base': {
    name: 'Specialist name from Provider base',
    tableId:
      process.env.PROD === 'true' ? 'tblsixUe3jfbOUMQP' : 'tblPpf5F81JypdC9k',
    type: 'search',
  },
}

type ConsentValue = 'Needed' | 'Requested' | 'Consented' | 'Rejected'

function Appointments() {
  const [appointments, setAppointments] = React.useState<any[]>([])
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false)
  const [activeAppointment, setActiveAppointment] = useState({})
  const [showOptions, setShowOptions] = useState(false)

  const { member } = useMember()
  const recId = member?.airtableRecordId

  const status = ['All', 'Completed', 'Cancelled', 'Missed']

  const [selected, setSelected] = React.useState(status[0])
  const { trackActionEdited } = useModuleAnalytics()

  const [appointmentEditField, setAppointmenteEditField] = React.useState<
    AirtableField[]
  >([])
  const { airtableMeta, getFieldOptions } = useAirtableMeta()
  const { allAntaraStaffs, loading } = useAntaraStaff()
  const [sendWhatsappMessage] = useMutation(SEND_WHATSAPP_MESSAGE)
  const { notify } = useNotifications()
  useEffect(() => {
    if (airtableMeta) {
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
          options: getFieldOptions('Appointments', 'Status') || [],
          helperText:
            'Schedule needed: if the appointment has no date and no time and you want our team to schedule it\nScheduled: we know the date and time and it is assigned\nMissed: the member did not pick up the call or picked up but could not do the call without giving a new date and time, we will need to reschedule\nComplete: successful interaction/ consultation has been done (on phone or in person)\nCanceled: we, Antara, decides that the appointment is not relevant anymore.',
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
          name: 'Reason for missed',
          type: 'single-select',
          options: getFieldOptions('Appointments', 'Reason for missed') || [],
          condition: (appt: any = {}) => {
            const { Status } = appt
            return Status === 'Missed'
          },
          required: true,
        },
        {
          name: 'Facilities from Provider base',
          type: 'search',
          tableId:
            process.env.PROD === 'true'
              ? 'tbltmQuqyuKPc4Ffo'
              : 'tblU94ZnFmMT7S0o0',
        },
        {
          name: 'Specialists from Provider Base',
          type: 'search',
          tableId:
            process.env.PROD === 'true'
              ? 'tblsixUe3jfbOUMQP'
              : 'tblPpf5F81JypdC9k',
        },
        {
          name: 'Reason for cancellation',
          type: 'single-select',
          options:
            getFieldOptions('Appointments', 'Reason for cancellation') || [],
          condition: (appt: any = {}) => {
            const { Status } = appt
            return Status === 'Cancelled'
          },
          required: true,
        },
      ]
      setAppointmenteEditField(APPOINTMENT_FIELDS)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airtableMeta, loading, allAntaraStaffs])

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
    'Reason for cancellation',
    'Reason for missed',
    'Consent',
    'calendly_booking_url',
  ]

  const { data, isLoading, isError, refresh } = useAirtableFetch(
    `appointments/list?filterByFormula=FIND("${recId}", {Member Record ID})
    &sort=[{"field":"start_date_time","direction":"desc"}]
    &${filterFields(allowedFields)}`,
    []
  )

  const user = useUser()
  const openCalendar = () => {
    if (member) {
      const fullName = member?.fullName || ''
      const urlName = fullName?.replace(' ', '%20')
      const email = member?.email || ''
      const memberEmail = email || 'navigation@antarahealth.com'
      const memberPhone = member?.phone
      const antaraId = member?.antaraId
      const link = `https://calendly.com/antara-health?name=${urlName}&email=${memberEmail}&a1=${memberPhone}&utm_source=src-${user?.name}&utm_content=${antaraId}`

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

        if (
          Object.keys(SearchFieldsNameMap).includes(fieldKey) &&
          appointment?.fields[fieldKey]
        ) {
          payload[fieldKey] = [appointment?.fields[fieldKey]?.id]
        }
      })
      return payload
    }

    const serverPayload = transformDataForServer()

    return airtableFetch('appointments', 'post', {
      id: appointment.id,
      fields: serverPayload,
    }).then((res) => {
      handleResponses(res)
      setSelected(status[0])
      trackActionEdited('Appointment', serverPayload)
      refresh()
    })
  }

  const includeFieldTypes = (appointment: any) => {
    const parsedFields: any[] = []

    appointmentEditField.forEach((field) => {
      const key = field.name
      let value = appointment[key]

      if (field.type === 'datetime') {
        value = value ? dayjs(value).format('YYYY-MM-DDTHH:mm') : ''
      }

      if (SearchFieldsNameMap[key]) {
        /**
         * Parse the search field into the format expected by the search component
         * And the field format is name, value: {name, displayName, id}, type: 'search', tableId
         */
        parsedFields.push({
          name: key,
          value: {
            name: appointment[SearchFieldsNameMap[key]?.name]?.join() ?? '',
            displayName:
              appointment[SearchFieldsNameMap[key]?.name]?.join() ?? '',
            id: appointment[key],
          },
          type: 'search',
          tableId: SearchFieldsNameMap[key].tableId,
        })
      } else {
        parsedFields.push({
          ...field,
          value,
        })
      }
    })

    return parsedFields
  }

  const includesArrayValue = (source: any, value: any): boolean => {
    if (Array.isArray(source)) {
      return source.includes(value)
    }
    return false
  }
  const triggerAppointmentConsent = async (appt: any) => {
    sendWhatsappMessage({
      variables: {
        input: {
          antaraId: member?.antaraId,
          botName: member?.hasPrimary
            ? 'FFS Dependent Service Consent'
            : 'FFS Service Consent',
          components: [
            {
              memberName: member?.fullName,
              serviceName:
                appt.Service === 'Baseline' ? 'Health Check' : appt.Service,
              appointmentDate: dayjs(appt.start_date_time).format(
                'MMMM Do h:mm A'
              ),
              insurerName: member?.primaryInsuranceCompany,
              appointmentBookingUrl: appt.calendly_booking_url,
            },
          ],
        },
      },
    })
      .then(() => {
        notify('Appointment consent to member sent successfully', 'success')
      })
      .catch((err) => {
        notify(`Unable to send member consent ${err}`, 'error')
      })
  }

  const getConsentState = (consentValue: ConsentValue) => {
    switch (consentValue) {
      case 'Needed':
      case 'Requested':
        return {
          message: 'Consent needed',
          color: '#FF9500',
          Icon: HelpCircle,
        }
      case 'Consented':
        return {
          message: 'Consent confirmed',
          color: '#34C759',
          Icon: CheckCircle,
        }
      case 'Rejected':
        return { message: 'Consent rejected', color: '#CB314B', Icon: XCircle }
      default:
        return { message: 'Consent needed', color: '#FF9500', Icon: HelpCircle }
    }
  }

  const isToday = (date: dayjs.Dayjs) => dayjs().isSame(date, 'day')

  const formatTimeRange = (start: string, end: string) => (
    <>
      <span>{dayjs(start).format('hh:mm A')}</span>
      <span className="mx-1">-</span>
      <span>{dayjs(end).format('hh:mm A')}</span>
    </>
  )

  const formatDate = (start: string, end: string) => {
    const startDate = dayjs(start)

    if (isToday(startDate)) {
      return (
        <>
          <span>Today</span>
          <span className="mx-1">:</span>
          {formatTimeRange(start, end)}
        </>
      )
    }
    return (
      <>
        <span>{startDate.format("DD MMM 'YY")}</span>
        <span className="mx-1">:</span>
        {formatTimeRange(start, end)}
      </>
    )
  }
  useEffect(() => {
    function getAssigneeName(assigned: string | { fullName: string }) {
      return typeof assigned === 'string' ? assigned : assigned?.fullName || ''
    }
    const allowedConsentStatuses = [
      'Needed',
      'Requested',
      'Consented',
      'Rejected',
    ]

    const getDisplayInfo = (appointment: any) => {
      const consent =
        appointment.Consent || (member?.isFfsEligible ? 'Needed' : undefined)

      const consentVisilibility =
        includesArrayValue(allowedConsentStatuses, consent) &&
        includesArrayValue(['Scheduled'], appointment.Status)

      const resendConsent = includesArrayValue(['Needed', 'Requested'], consent)
      const { message, color, Icon } = getConsentState(consent)

      return (
        <div className="d-flex justify-center w-full items-start flex-col">
          <div className="font-medium text-base text-dark-blue-100 flex-col w-full">
            <div className="flex justify-between items-center">
              <div
                className={`flex-col ${
                  consentVisilibility && member?.isFfsEligible ? 'w-1/2' : ''
                }`}
              >
                <span className="font-medium!">{appointment.Service}</span>
              </div>
              {consentVisilibility && member?.isFfsEligible && (
                <div className="flex-none">
                  <span
                    className="text-sm font-medium flex items-center space-x-2"
                    style={{ color }}
                  >
                    {Icon && <Icon width={14} height={14} />}
                    <span>{message}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          <section>
            <div className="text-gray-400 text-sm flex items-center mb-1">
              <Clock width={14} height={14} />
              <span className="ml-2">
                {formatDate(
                  appointment.start_date_time,
                  appointment.end_date_time
                )}
              </span>
            </div>

            <div className="mb-1">
              <div className="text-gray-400 text-sm flex items-center">
                <User width={14} height={14} className="mr-2" />
                {Array.isArray(appointment['Assignee Name'])
                  ? appointment['Assignee Name'].map(
                      (
                        assigned: string | { fullName: string },
                        index: number
                      ) => (
                        <span key={index} className="ml-1">
                          {getAssigneeName(assigned)}
                        </span>
                      )
                    )
                  : 'Not Assigned'}
                <span className="mx-1">|</span>
                <span className="status">{appointment.Status}</span>
              </div>
            </div>
          </section>
          <div>
            {appointment['Calendly Reschedule URL'] && (
              <div className="flex text-gray-400">
                <Tooltip title="Reschedule">
                  <a
                    href={appointment['Calendly Reschedule URL']}
                    target="__blank"
                    className="btn-unstyled"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLinkIcon className="w-4 h-4 text-blue-50 " />
                  </a>
                </Tooltip>

                <span className="ml-2">Calendly Reschedule URL</span>
              </div>
            )}
          </div>
          {consentVisilibility && member?.isFfsEligible && (
            <>
              {resendConsent && (
                <div className="p-2 items-center mt-2 w-full">
                  {showOptions}
                  <section className="flex items-center justify-between relative">
                    <button
                      className="text-[#5D6B82] px-2 py-1 text-sm font-medium rounded border w-full mr-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        triggerAppointmentConsent(appointment)
                      }}
                    >
                      Request consent
                    </button>
                    <button
                      className="text-[#5D6B82] px-2 py-1 text-sm font-medium rounded w-full ml-1 border"
                      onMouseEnter={() => setShowOptions(true)}
                      onMouseLeave={() => setShowOptions(false)}
                    >
                      Update consent
                    </button>
                  </section>
                  <div>
                    {showOptions && (
                      <div
                        className="px-0 bg-[#FFFFFF] w-1/2 z-20 shadow-lg float-right"
                        onMouseEnter={() => setShowOptions(true)}
                        onMouseLeave={() => setShowOptions(false)}
                      >
                        <button
                          tabIndex={0}
                          className="w-full border-none flex text-[#424242] p-2 cursor-pointer"
                          style={{
                            backgroundColor: '#E0E0E0',
                            transition: 'background-color 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#E8F5E9'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#fff'
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveAppointment(appointment)
                            setIsConsentModalOpen(true)
                          }}
                        >
                          <CheckCircle
                            width={16}
                            height={16}
                            className="mr-2"
                          />
                          Confirmed
                        </button>
                        <button
                          className="w-full border-none flex text-[#D32F2F] p-2 cursor-pointer"
                          style={{
                            backgroundColor: '#fff',
                            transition: 'background-color 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FFEBEE'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#fff'
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleUpdateConsent(appointment, 'Rejected')
                          }}
                        >
                          <XCircle width={16} height={16} className="mr-2" />
                          Rejected
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
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
  }, [data, showOptions])

  const getPastAppointments = (pastAppointments: any[]): any[] => {
    return pastAppointments.filter((appointment: any) => {
      return ['Missed', 'Cancelled', 'Completed'].includes(
        appointment.data.find(({ name }: any) => name === 'Status')?.value
      )
    })
  }

  const getNextAppointments = (nextAppointments: any[]): any[] => {
    return nextAppointments.filter((appointment: any) => {
      return ['Scheduled', 'Schedule needed'].includes(
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

  const isItemEditable = (item: any) => {
    const items = item?.data
    const filteredStatus = items.find(
      ({ name }: any) => name === 'Status'
    )?.value
    return filteredStatus !== 'Cancelled'
  }

  const handleUpdateConsent = async (
    appt: any,
    type: 'Consented' | 'Rejected'
  ) => {
    try {
      if (type === 'Rejected') {
        notify('Appointment consent rejection request initiated', 'success')
      }

      const payload = {
        Consent: type,
      }

      const res = await airtableFetch('appointments', 'post', {
        id: appt['Record ID'],
        fields: payload,
      })

      handleResponses(res)
      setIsConsentModalOpen(false)
      refresh()
    } catch (err) {
      notify(`Unable to update member consent ${err}`, 'error')
    }
  }

  return (
    <div>
      <button
        className={styles.appointment}
        onClick={(e) => {
          e.stopPropagation()
          openCalendar()
        }}
      >
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
              isItemEditable={isItemEditable}
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
            isItemEditable={isItemEditable}
          />
        </div>
      )}
      {isLoading && loading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon className="h-6 w-6" />
          <p className="text-small">Loading Appointments...</p>
        </div>
      )}
      {isError && (
        <p className="text-small text-danger margin-top-24">
          An error occurred while fetching appointments, please refresh the
          page.
        </p>
      )}
      <Modal
        open={isConsentModalOpen && Object.keys(activeAppointment).length > 0}
        setModalOpen={setIsConsentModalOpen}
        height="auto"
        width="30%"
        closeOption={false}
      >
        <div className="modal-body">
          <p className="mb-10 mt-5">
            Consent can only be given by text (whatsapp or SMS), do not confirm
            consent over the phone
          </p>
        </div>
        <div className="modal-footer flex justify-between">
          <Button
            fullWidth
            className="border mr-1"
            sx={{
              backgroundColor: '#ffff',
              border: '1px #205284 solid',
              color: '#205284',
            }}
            onClick={() => handleUpdateConsent(activeAppointment, 'Consented')}
          >
            Yes
          </Button>
          <Button
            type="button"
            fullWidth
            className="border ml-1"
            sx={{
              backgroundColor: '#972323 !important',
              border: '1px #972323 solid',
              color: '#FFFFFF !important',
            }}
            onClick={() => {
              setIsConsentModalOpen(false)
              setActiveAppointment({})
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Appointments
