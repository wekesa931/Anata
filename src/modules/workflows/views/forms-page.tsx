import React, { useEffect, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { Search } from 'react-feather'
import { TForm } from 'src/modules/workflows/types'
import form_schemas from 'src/modules/workflows/components/forms/form-inputs-definitions'
import AirtableIframe from 'src/components/iframes/airtable-iframe'
import PortalWindow from 'src/components/portal'
import { useFormsRouting } from 'src/modules/workflows/hooks/routing/forms'
import { Forms as TWorkflowForm } from 'src/modules/workflows/db/models'
import { sortAlphabetically } from 'src/utils/sort'
import { useMember } from 'src/context/member'
import PromptOtpCollection from 'src/modules/shared/components/prompt-otp-collection'
import {
  OTPCollectionModalInterface,
  useCheckForOTPPrompt,
} from 'src/modules/shared/services'
import { useDeleteQueryParams, useQueryParam } from 'src/modules/shared/hooks'
import FormPortal from './forms-portal'
import { formNames } from '../utils'

const FORMS = [...form_schemas]

function Forms() {
  const [airtableForm, setAirtableForm] = useState<TForm | null>(null)
  const [isEdited, setIsEdited] = useState(false)
  const { openForm, closeForm, forms, openFormFromSearchParams } =
    useFormsRouting()
  const [searchForm, setSearchForm] = useState<any[]>(FORMS)
  const [selectedForm, setSelectedForm] = useState<TForm>()
  const { member } = useMember()
  const [otpCollectionModal, setOtpCollectionModal] =
    useState<OTPCollectionModalInterface>({
      name: '',
      modalOpen: false,
      service: { service: { name: '' } },
      price: 0,
    })

  const [showOptCollectionStep, setShowOptCollectionStep] = useState(false)
  /** should prompt for OTP collection */
  const { scheme, promptOTP, services, hasAppointments } =
    useCheckForOTPPrompt()

  const appointmentId = useQueryParam('selectedAppt')

  const completedApptSelection = useQueryParam('completedApptSelection')
  const completedAndBilledApptSelection = useQueryParam(
    'completedAndBilledApptSelection'
  )
  const isApptBilled = useQueryParam('apptBilled')
  const deleteQueryParams = useDeleteQueryParams()

  // opens form when service is billed successfully
  useEffect(() => {
    if (
      isApptBilled === 'true' &&
      appointmentId &&
      selectedForm &&
      completedAndBilledApptSelection === 'true'
    ) {
      // add appoinment id to prefill the appt field in the form
      openFormHandler(selectedForm, [appointmentId])
    }

    return () => {
      if (
        isApptBilled === 'true' &&
        completedAndBilledApptSelection === 'true'
      ) {
        deleteQueryParams(['apptBilled', 'completedAndBilledApptSelection'])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    appointmentId,
    selectedForm,
    completedAndBilledApptSelection,
    isApptBilled,
  ])

  // opens form when service was already billed
  useEffect(() => {
    if (
      isApptBilled === 'true' &&
      appointmentId &&
      selectedForm &&
      completedApptSelection === 'true'
    ) {
      openFormHandler(selectedForm, [appointmentId])
    }

    return () => {
      if (isApptBilled === 'true' && completedApptSelection === 'true') {
        deleteQueryParams(['apptBilled', 'completedApptSelection'])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentId, selectedForm, completedApptSelection, isApptBilled])

  const handleCloseModal = () => {
    if (isApptBilled === 'false') {
      deleteQueryParams([
        'apptBilled',
        'selectedAppt',
        'completedApptSelection',
      ])
    }
    setOtpCollectionModal({
      name: '',
      modalOpen: false,
      service: { service: { name: '' } },
      price: 0,
    })
  }

  useEffect(() => {
    if (!otpCollectionModal?.modalOpen) {
      setShowOptCollectionStep(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpCollectionModal])

  const openFormHandler = async (form: TForm, prefills?: any) => {
    // prompt smart OTP collection, if form name matches the smart otp paid services
    if (form.type === 'airtableForm') {
      await setAirtableForm(form)
    } else {
      const prefilled = { Appointments: prefills }
      await openForm(form.name, prefilled)
    }
  }

  const checkForOTPPrompt = async (name: string, form?: any) => {
    if (!promptOTP || (scheme === 'FFS' && !hasAppointments)) return
    // map form titles not perfectly matched in naming to the service names they represent
    const aliasMap: Record<string, string> = {
      'nutritional consultation': 'nutrition consultation',
      'clinical consultation': 'virtual doctor consultation',
      'prescriptions vc': 'virtual doctor consultation',
      'health check': 'virtual doctor consultation',
    }

    const searchTerm = name.toLowerCase()

    // determine if form.name exists as an alias to a service
    const aliasMatch = aliasMap[searchTerm]

    const finalSearchTerm = (aliasMatch || searchTerm).split(/\s+/)

    const selectedService = services.find((service) => {
      const serviceName = service?.service?.name?.toLowerCase() || ''

      const matchedWordCount = finalSearchTerm.filter((word) =>
        serviceName.includes(word)
      ).length

      // since form/template name may not exactly match the service name check atleast 2 matching words
      return matchedWordCount >= 2
    })

    const formName = name === 'Prescriptions VC' ? 'VC Prescription' : name

    if (selectedService) {
      setSelectedForm(form)
      setOtpCollectionModal({
        name: formName,
        modalOpen: true,
        service: selectedService ?? {
          service: {
            name: `Collect OTP to capture service billing for ${name}`,
          },
        },
        price: selectedService.price,
      })
      // setFormDetails({ name, form })
    }

    if (!selectedService) {
      return false
    }
    return true
  }

  useEffect(() => {
    if (member) {
      openFormFromSearchParams()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  return (
    <>
      <div className="d-flex flex-direction-column">
        <div className="margin-top-0 flex-1">
          <div>
            <TextField
              className="w-full text-[13px]"
              id="input-with-icon-textfield"
              placeholder="Search forms"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target
                let formMeta = FORMS
                if (value) {
                  formMeta = (FORMS as any[]).filter((form) =>
                    form.name.toLowerCase().includes(value.toLowerCase())
                  )
                  setSearchForm(formMeta)
                } else {
                  setSearchForm(formMeta)
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search width={18} height={18} />
                  </InputAdornment>
                ),
                style: {
                  marginBottom: 10,
                },
              }}
              variant="standard"
            />
          </div>
          {sortAlphabetically(searchForm).map((form) => (
            <button
              onClick={() => {
                if (!promptOTP) {
                  openFormHandler(form)
                } else {
                  checkForOTPPrompt(form.name, form).then((res) => {
                    if (!res) {
                      openFormHandler(form)
                    }
                  })
                }
              }}
              className="full-width btn btn-secondary form-btns"
              key={form.name}
            >
              {formNames[form.name] || form.name}
            </button>
          ))}
        </div>
      </div>
      {airtableForm && (
        <PortalWindow
          title={airtableForm.name}
          closeWindow={() => setAirtableForm(null)}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
        >
          <AirtableIframe src={airtableForm.url as string} />
        </PortalWindow>
      )}
      {forms.map((form: TWorkflowForm, index: number) => {
        return (
          <FormPortal
            key={form.name}
            form={form}
            closeForm={closeForm}
            index={index}
          />
        )
      })}

      {/* smart otp collection prompt */}
      {otpCollectionModal?.modalOpen && (
        <PromptOtpCollection
          otpCollectionModal={otpCollectionModal}
          setOtpCollectionModal={handleCloseModal}
          selectedService={otpCollectionModal.service}
          showOptCollectionStep={showOptCollectionStep}
          setShowOptCollectionStep={setShowOptCollectionStep}
        />
      )}
    </>
  )
}

export default Forms
