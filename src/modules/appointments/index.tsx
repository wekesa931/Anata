import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import AirtableField from 'src/types/airtable-field'
import useAirtableFetch from 'src/hooks/airtable-fetch'
import List from 'src/components/list'
import filterFields from 'src/utils/airtable/field-utils'
import Tooltip from 'src/components/tooltip'
import airtableFetch from 'src/services/airtable/fetch'
import { useMember } from 'src/context/member'
import useHandleResponses from 'src/utils/airtable/error-handler'
import useAntaraStaff from 'src/hooks/antara-staff.hook'
import { User, HelpCircle, CheckCircle, Clock } from 'react-feather'
import { useModuleAnalytics } from 'src/modules/analytics'
import ExternalLinkIcon from 'src/assets/img/icons/external-link.svg'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import { useAirtableMeta } from 'src/context/airtable-meta'
import { useNotifications } from 'src/context/notifications'
import Modal from 'src/components/modals'
import { Button } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'
import PromptOtpCollection from 'src/modules/shared/components/prompt-otp-collection'
import ServiceBooking from 'src/modules/appointments/service-booking.component'
import {
  OTPCollectionModalInterface,
  useCheckForOTPPrompt,
} from 'src/modules/shared/services/index'
import {
  useQueryParam,
  useRemoveQueryParam,
  useSetQueryParam,
} from 'src/modules/shared/hooks'
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
  'end_date_time',
  'Source',
  'visit id',
]

function Appointments() {
  const [appointments, setAppointments] = React.useState<any[]>([])
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false)
  const [activeAppointment, setActiveAppointment] = useState({})
  const [serviceBookingStarted, setServiceBookingStarted] = useState(false)

  const { member } = useMember()
  const recId = member?.airtableRecordId

  const setQueryParam = useSetQueryParam()
  const hasUpdatedAppt = useQueryParam('reloadAppt')
  const removeQueryParam = useRemoveQueryParam()

  const status = ['All', 'Completed', 'Cancelled', 'Missed']

  const [selected, setSelected] = React.useState(status[0])
  const { trackActionEdited } = useModuleAnalytics()

  const [appointmentEditField, setAppointmenteEditField] = React.useState<
    AirtableField[]
  >([])
  const { airtableMeta, getFieldOptions } = useAirtableMeta()
  const { allAntaraStaffs, loading } = useAntaraStaff()
  const { notify } = useNotifications()

  const [otpCollectionModal, setOtpCollectionModal] =
    useState<OTPCollectionModalInterface>({
      name: '',
      modalOpen: false,
      service: { service: { name: '' } },
    })
  /** should prompt for OTP collection */
  const { scheme, promptOTP, services } = useCheckForOTPPrompt()

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

  const { data, isLoading, isError, refresh } = useAirtableFetch(
    `appointments/list?filterByFormula=FIND("${recId}", {Member Record ID})
    &sort=[{"field":"start_date_time","direction":"desc"}]
    &${filterFields(allowedFields)}`,
    []
  )

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

  useEffect(() => {
    if (hasUpdatedAppt === 'true') {
      refresh()
      const searchParams = new URLSearchParams(location.search)
      const reloadAppt = searchParams.get('reloadAppt')

      if (reloadAppt) {
        removeQueryParam('reloadAppt')
      }
    }

    return () => {
      if (hasUpdatedAppt === 'true') {
        removeQueryParam('reloadAppt')
        removeQueryParam('selectedAppt')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasUpdatedAppt])

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

  /**
   * prompt billing collection appointment has not visit id
   * @param appointment
   * @returns
   */
  const checkForOTPPrompt = async (appointment: any) => {
    if (!promptOTP || scheme !== 'FFS') return

    const { Service: serviceName } = appointment

    const aliasMap: Record<string, string> = {
      'Antara Virtual Doctor Consultation': 'Virtual Doctor Consultation',
      'Virtual Doctor Consultation': 'Virtual Doctor Consultation',
      'Pediatric Consultation': 'Paediatric Consultation',
      'Paediatric Consultation': 'Paediatric Consultation',
      'Nutrition Consultation': 'Nutrition Consultation',
      'Mental Health Consultation': 'Mental Health Consultation',
    }

    // determine if service name exists as an alias to a service pricing name
    const aliasMatch = aliasMap[serviceName]

    const selectedService = services.find(
      (serv) =>
        serv.service.name ===
        (aliasMatch ??
          'Virtual Doctor Consultation' ??
          'virtual doctor consultation')
    )

    if (!selectedService)
      return notify('No service matches this appointment', 'error')

    setQueryParam('selectedAppt', appointment.id)

    setOtpCollectionModal({
      name: serviceName,
      modalOpen: true,
      service: selectedService ?? {
        service: {
          name: `Collect OTP to capture service billing for ${serviceName}`,
        },
      },
    })
    setActiveAppointment(appointment)
  }

  useEffect(() => {}, [])

  const getOtpVisitId = (appointment: any) => {
    if (appointment['visit id'] && appointment.Status.includes('Scheduled')) {
      return {
        message: 'Billed',
        color: '#34C759',
        Icon: CheckCircle,
      }
    }
    return {
      message: 'Bill Pending',
      color: '#FF9500',
      Icon: HelpCircle,
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

  const formatDate = (start: string, end?: string) => {
    const startDate = dayjs(start)
    if (isToday(startDate)) {
      return (
        <>
          <span>Today</span>
          <span className="mx-1">:</span>
          {end ? formatTimeRange(start, end) : startDate.format('hh:mm A')}
        </>
      )
    }

    return (
      <>
        <span>{startDate.format("DD MMM 'YY")}</span>
        <span className="mx-1">:</span>
        {end ? formatTimeRange(start, end) : startDate.format('hh:mm A')}
      </>
    )
  }

  useEffect(() => {
    function getAssigneeName(assigned: string | { fullName: string }) {
      return typeof assigned === 'string' ? assigned : assigned?.fullName || ''
    }

    const getDisplayInfo = (appointment: any, scheme: string) => {
      const billingVisilibility = includesArrayValue(
        ['Scheduled'],
        appointment.Status
      )

      const { color, Icon } = getOtpVisitId(appointment)

      const showBillingStatusCollected =
        scheme === 'FFS' && billingVisilibility && appointment['visit id']

      const showBillingStatusPending =
        scheme === 'FFS' && billingVisilibility && !appointment['visit id']

      return (
        <div className="d-flex justify-center w-full items-start flex-col">
          <div className="font-medium text-base text-dark-blue-100 flex-col w-full">
            <div className="flex justify-between items-center">
              <div className="flex-col">
                <span className="font-medium!">{appointment.Service}</span>
              </div>
              {scheme === 'FFS' && (
                <>
                  {showBillingStatusCollected && (
                    <div className="flex-none">
                      <span
                        className="text-sm font-medium flex items-center space-x-2"
                        style={{ color }}
                      >
                        {Icon && <Icon width={14} height={14} />}
                        <span>Billed</span>
                      </span>
                    </div>
                  )}

                  {showBillingStatusPending && (
                    <div className="flex-none">
                      <span
                        className="text-sm font-medium flex items-center space-x-2"
                        style={{ color }}
                      >
                        {Icon && <Icon width={14} height={14} />}
                        <span>
                          Billing <br /> Pending
                        </span>
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <section>
            <div className="text-gray-400 text-sm flex items-center mb-1">
              <Clock width={14} height={14} />
              <span className="ml-2">
                {appointment?.Status?.toLowerCase() === 'schedule needed'
                  ? 'Pending'
                  : formatDate(
                      appointment.start_date_time,
                      appointment.end_date_time
                    )}
              </span>
            </div>

            <div className="mb-1">
              <div className="text-gray-400 text-sm flex items-center gap-x-2">
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
                <span>|</span>
                <Tooltip title="Appointment Status">
                  <span className="status-no-margin">{appointment.Status}</span>
                </Tooltip>
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
          {showBillingStatusPending && member?.isFfsEligible && (
            <>
              <div className="p-2 items-center mt-2 w-full">
                <section className="flex items-center justify-between relative">
                  <button
                    className="text-[#5D6B82] px-2 py-1 text-sm font-medium rounded border w-full mr-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      checkForOTPPrompt(appointment)
                    }}
                  >
                    Bill Member
                  </button>
                </section>
              </div>
            </>
          )}
        </div>
      )
    }

    if (data) {
      const mappedResponse = data?.map((d: any) => {
        return {
          data: includeFieldTypes(d),
          name: getDisplayInfo(d, scheme),
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

  const openServiceBooking = () => {
    setServiceBookingStarted(!serviceBookingStarted)
  }

  if (serviceBookingStarted) {
    return <ServiceBooking onBackPress={openServiceBooking} />
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <button
          className={styles.appointment}
          onClick={(e) => {
            e.stopPropagation()
            openServiceBooking()
          }}
        >
          Book Appointment
        </button>{' '}
        {(!isLoading || isError) && (
          <Tooltip title="Refresh appointments">
            <ReplayIcon
              className="w-6 cursor-pointer"
              color="primary"
              onClick={() => refresh()}
            />
          </Tooltip>
        )}
      </div>
      <div className="margin-top-0">
        <>
          <h4 className="mt-5">Up next</h4>
          {isReadytoShowAppt && (
            <List
              list={getNextAppointments(appointments)}
              emptyListText="No Appointment found for this member"
              editable
              onEdit={updateAppointment}
              modalTitle="Appointment"
              isItemEditable={isItemEditable}
            />
          )}
          {isLoading && (
            <div className="d-flex flex-direction-column flex-align-center margin-top-32">
              <LoadingIcon className="h-6 w-6" />
              <p className="text-small">Loading Next Appointments...</p>
            </div>
          )}
        </>
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
      {isLoading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon className="h-6 w-6" />
          <p className="text-small">Loading Past Appointments...</p>
        </div>
      )}
      {isError && (
        <p className="text-small text-danger margin-top-24">
          An error occurred while fetching appointments, please click on the
          refresh icon or refresh the page.
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

      {/* smart otp collection prompt */}
      {otpCollectionModal?.modalOpen && (
        <PromptOtpCollection
          otpCollectionModal={otpCollectionModal}
          setOtpCollectionModal={setOtpCollectionModal}
          selectedService={otpCollectionModal.service}
        />
      )}
    </div>
  )
}

export default Appointments
