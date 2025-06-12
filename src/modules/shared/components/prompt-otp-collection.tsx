import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'src/components/modals'
import SmartServiceCharge from 'src/modules/appointments/smart-verification/smart-service-booking-flow'
import { ModalHeader } from 'src/modules/tasks/components/task-modal.component'
import ButtonField from 'src/modules/workflows/components/forms/button-field'
import WorkflowFormsFields from 'src/modules/workflows/components/forms/form-fields'
import { useAirtableMeta } from 'src/context/airtable-meta'
import { useMember } from 'src/context/member'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'
import Backdrop from '@mui/material/Backdrop/Backdrop'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import PrimaryButton from 'src/components/buttons/primary'
import Chip from '@mui/material/Chip'
import { useCheckForOTPPrompt } from '../services'
import {
  useRemoveQueryParam,
  useSetQueryParam,
  useUpdateQueryParams,
} from '../hooks'

type FormValues = {
  [key: string]: any
}

function PromptOtpCollection({
  otpCollectionModal: otpContext,
  setOtpCollectionModal: resetAndcloseModal,
  hideCancelBtn = true,
  selectedService,
  setSelectedService,
  setShowOptCollectionStep,
  showOptCollectionStep,
}: {
  otpCollectionModal: any
  setOtpCollectionModal: any
  hideCancelBtn?: boolean
  selectedService?: any
  setSelectedService?: any
  setShowOptCollectionStep?: any
  showOptCollectionStep?: boolean
}) {
  const formSchema =
    process.env.PROD === 'true'
      ? {
          name: 'Select Appointment',
          id: 'tblLhL72JyizQ4ycc',
          formId: 'shrPWg4S3LYxHbgmv',
          fields: [
            {
              id: 'fldQsjPejgDj3FyHk',
              name: 'Appointments',
              type: 'foreignKey',
              format: '',
              isDateTime: false,
              options: [],
              symmetricColumnId: 'fldz7vf0iwdAq5AuW',
              unreversed: true,
              relationship: 'one',
              foreignTableId: 'tblZB4YOpd7XH3cYt',
              required: true,
              helper:
                'Please add the appointment record here. If you do not, the appointment will not be automatically marked as completed',
              parentKey: 'Consultation Type',
              parentValues: ['Refillable medication prescription'],
              toggleRequriedOnCondition: true,
              conditionType: '',
              requirementCondition: (values: any) => {
                if (Array.isArray(values?.['Consultation Type'])) {
                  return ['Refillable medication prescription'].some((r) =>
                    values?.['Consultation Type'].includes(r)
                  )
                }

                return ['Refillable medication prescription'].includes(
                  values?.['Consultation Type']
                )
              },
            },
          ],
        }
      : {
          name: 'Select Appointment',
          id: 'tbl3nTYifMQxibPTg',
          formId: 'shr9Q23J6pB5oDd8p',
          fields: [
            {
              id: 'fld8yrGuPubhvMPoo',
              name: 'Appointments',
              type: 'foreignKey',
              format: '',
              isDateTime: false,
              options: [],
              symmetricColumnId: 'fldRdD6gOKLyScRb0',
              unreversed: true,
              relationship: 'one',
              foreignTableId: 'tblhHcP4VrFV9atFx',
              required: true,
              helper:
                'Please add the appointment record here. If you do not, the appointment will not be automatically marked as completed',
              parentKey: 'Consultation Type',
              parentValues: ['Refillable medication prescription'],
              conditionType: '',
              toggleRequriedOnCondition: true,
            },
          ],
        }

  const airtableMetaData = useAirtableMeta()
  const { airtableMeta, taskDefinitions } = airtableMetaData
  const { member } = useMember()

  const [appointment, setAppointment] = useState<any>()
  const [billedAppointment, setBilledAppointment] = useState<any>([])
  const [showAppointments, setShowAppointments] = useState<boolean>(false)
  const [hideAppointmentSelected, setHideAppointmentSelected] =
    useState<boolean>(false)

  const {
    loading: loadingAppointments,
    showLoading,
    urlSource: source,
    showAppointmentField,
    appointments,
  } = useCheckForOTPPrompt()

  if (!formSchema) {
    throw new Error(`Form fields for form:${name} not found`)
  }

  const setQueryParam = useSetQueryParam()
  const removeQueryParam = useRemoveQueryParam()
  const updateQueryParams = useUpdateQueryParams()

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: {},
    mode: 'onBlur',
  })

  const SCRIBE_TAGS_FIELD_ID = 'fldluUjdXcncSqpNk'

  const getOptions = (field: any) => {
    if (field.id === SCRIBE_TAGS_FIELD_ID) {
      const definitionOptions = [
        ...new Set( // extract unique tags (from duplicated if any)
          Object.keys(groupBy(taskDefinitions, 'scribeTags')) // group the definitions by scribeTags
            .map((tag: any) => tag.split(',')) // split by , to extract multiple tags in a single string
            .flat() // flatten to obtain a single array (may contain duplicated)
        ),
      ].map((t) => ({
        id: t,
        name: t,
      }))

      const parsedField = {
        ...field,
        options: definitionOptions,
      }
      return parsedField
    }

    return {}
  }

  const getFieldValue = (field: any, fieldValue: any) => {
    if (fieldValue?.id) {
      const parsedField = getOptions(field)
      if (parsedField?.type === 'foreignKey') {
        return [fieldValue?.id]
      }
    }

    if (field.type === 'collaborator') {
      return fieldValue
    }

    return fieldValue?.name ?? fieldValue
  }

  /** get fields to render to the form  */
  const getFieldsToRender = () => {
    const values = getValues()
    const returnFields: any = []
    formSchema?.fields?.forEach((field: any) => {
      if (!field.condition || field.condition(values, member)) {
        const fieldValue = values[field.name] || null
        returnFields.push({
          field,
          fieldValue,
        })
      }
    })
    return returnFields.filter((f: any) => !f?.field?.hide)
  }

  const getRequirements = (field: any) => {
    const prevRequired = field?.required

    if (
      field?.toggleRequriedOnCondition &&
      !!field?.requirementCondition &&
      field?.requirementCondition(getValues())
    ) {
      return !prevRequired
    }

    return prevRequired
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSaveInput = (fl: any) => (name: string, value: any) => {
    if (Array.isArray(value) && value.length > 0) {
      const selectedApp = appointments.find((app) => app.id === value[0])
      setAppointment(selectedApp)
      if (selectedApp) {
        setQueryParam('selectedAppt', selectedApp?.id)
        setBilledAppointment(selectedApp)
      }
    } else {
      removeQueryParam('selectedAppt')
      setAppointment(null)
      setBilledAppointment(null)
    }
  }

  const confirmSelectedAppt = () => {
    if ('visit id' in billedAppointment) {
      setShowOptCollectionStep(false)
      updateQueryParams({
        completedApptSelection: true,
        apptBilled: true,
      })
      resetAndcloseModal()
    } else {
      setShowOptCollectionStep(true)
      setHideAppointmentSelected(true)
      updateQueryParams({
        apptBilled: false,
      })
    }
  }

  const closePromptModal = () => {
    resetAndcloseModal()
  }

  const handleVisitIdVerified = (data: boolean) => {
    setShowAppointments(data)
  }

  const showCollectionStepFromApptSource =
    !showOptCollectionStep &&
    !hideAppointmentSelected &&
    source === 'appointments'

  const showCollectionStepFromFormsSource =
    showOptCollectionStep &&
    hideAppointmentSelected &&
    source !== 'appointments'

  return (
    <>
      {showLoading && (
        <Backdrop
          open={loadingAppointments}
          onClick={() => {}}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 99999,
            color: '#fff',
          }}
        >
          <div className="flex h-1/2 flex-col items-center">
            <LoadingIcon />
            <p className="font-rubik text-lg">Loading Appointments</p>
          </div>
        </Backdrop>
      )}
      {!showLoading && (
        <Modal
          open={otpContext.modalOpen}
          setModalOpen={closePromptModal}
          heading={
            <ModalHeader
              modalTitle={otpContext.name}
              modalDescription=""
              editMode={false}
            />
          }
          height="auto"
          width="500px"
          closeOption
        >
          {!showAppointments &&
            !hideAppointmentSelected &&
            source !== 'appointments' && (
              <>
                {showAppointmentField && (
                  <div className="mb-6">
                    {!!formSchema?.fields?.length && (
                      <>
                        <form>
                          {getFieldsToRender()?.map(
                            ({ field, fieldValue }: any) => (
                              <div key={field.id}>
                                <div>
                                  {field?.formId && (
                                    <ButtonField field={field} />
                                  )}
                                  <WorkflowFormsFields
                                    value={getFieldValue(field, fieldValue)}
                                    control={control}
                                    field={{
                                      ...field,
                                      parentTableId: formSchema?.id,
                                      required: getRequirements(field),
                                      ...getOptions(field),
                                    }}
                                    error={errors[field.name]}
                                    airtableMeta={airtableMeta}
                                    saveInput={handleSaveInput(field)}
                                    disabled={false}
                                  />
                                  <div className="text-end mt-8">
                                    <PrimaryButton
                                      disabled={!appointment}
                                      className="normal-case"
                                      onClick={() => confirmSelectedAppt()}
                                    >
                                      {`Confirm selected appointment >>`}
                                    </PrimaryButton>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </form>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          {(showCollectionStepFromApptSource ||
            showCollectionStepFromFormsSource) && (
            <>
              {appointment && (
                <div className="">
                  <Chip
                    className="text-sm text-white font-medium rounded-md bg-blue-btn h-auto max-w-full"
                    label={
                      <span className="whitespace-normal break-words block">
                        {appointment?.Summary}
                      </span>
                    }
                    size="medium"
                  />
                  {appointment?.start_date_time && (
                    <div className="text-center">
                      <Chip
                        className="text-xs text-white font-medium rounded-md bg-blue-btn h-4"
                        label={`${dayjs(appointment?.start_date_time).format(
                          'HH:mma'
                        )}`}
                        size="small"
                      />
                    </div>
                  )}
                </div>
              )}

              <SmartServiceCharge
                hideCancelBtn={hideCancelBtn}
                showPrice={selectedService?.price}
                selectedService={selectedService}
                cancelSmartBilling={() => setSelectedService(null)}
                otpContext={otpContext}
                closeModal={closePromptModal}
                appointment={appointment}
                showAppointments={showAppointments}
                handleVisitIdVerified={handleVisitIdVerified}
              />
            </>
          )}
        </Modal>
      )}
    </>
  )
}

export default PromptOtpCollection
