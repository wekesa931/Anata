import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DropDownComponent from 'src/components/dropdown'
import { useTemplatesData } from 'src/modules/workflows/hooks/templates-data'
import { useNotifications } from 'src/context/notifications'
import { Templates as TWorkflowTemplate } from 'src/modules/workflows/db/models'
import PromptOtpCollection from 'src/modules/shared/components/prompt-otp-collection'
import {
  OTPCollectionModalInterface,
  useCheckForOTPPrompt,
} from 'src/modules/shared/services'
import { useDeleteQueryParams, useQueryParam } from 'src/modules/shared/hooks'
import Loader from '../loaders'

function WorkflowTemplateList({ openWorkflow }: any) {
  const [open, setOpen] = useState<boolean>(false)
  const { templates, loading, createWorkflow, creatingWorkflow } =
    useTemplatesData()
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const { notify } = useNotifications()

  const [showOptCollectionStep, setShowOptCollectionStep] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<TWorkflowTemplate>()
  const [otpCollectionModal, setOtpCollectionModal] =
    useState<OTPCollectionModalInterface>({
      name: '',
      modalOpen: false,
      service: { service: { name: '' } },
      price: 0,
    })
  /** should prompt for OTP collection */
  const { scheme, promptOTP, services, hasAppointments } =
    useCheckForOTPPrompt()

  const appointmentId = useQueryParam('selectedAppt')
  const isApptBilled = useQueryParam('apptBilled')
  const completedApptSelection = useQueryParam('completedApptSelection')
  const completedAndBilledApptSelection = useQueryParam(
    'completedAndBilledApptSelection'
  )
  const deleteQueryParams = useDeleteQueryParams()

  // opens form when service is billed successfully
  useEffect(() => {
    if (
      isApptBilled === 'true' &&
      appointmentId &&
      selectedWorkflow &&
      completedAndBilledApptSelection === 'true'
    ) {
      // add appoinment id to prefill the appt field in the form
      handleCreateWorkflow(selectedWorkflow, { Appointments: [appointmentId] })
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
    selectedWorkflow,
    completedAndBilledApptSelection,
    isApptBilled,
  ])

  // opens form when service was already billed
  useEffect(() => {
    if (
      isApptBilled === 'true' &&
      appointmentId &&
      selectedWorkflow &&
      completedApptSelection === 'true'
    ) {
      handleCreateWorkflow(selectedWorkflow, { Appointments: [appointmentId] })
    }

    return () => {
      if (isApptBilled === 'true' && completedApptSelection === 'true') {
        deleteQueryParams(['apptBilled', 'completedApptSelection'])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentId, selectedWorkflow, completedApptSelection, isApptBilled])

  const checkForOTPPrompt = async (wkflw: any) => {
    const name: string = wkflw?.name
    if (!promptOTP || (scheme === 'FFS' && !hasAppointments)) return

    const searchTerm = name.toLowerCase().split(/\s+/)

    const selectedService = services.find((service) => {
      const serviceName = service?.service?.name?.toLowerCase() || ''

      const matchedWordCount = searchTerm.filter((word) =>
        serviceName.includes(word)
      ).length

      // since form/template name may not exactly match the service name check atleast 2 matching words
      return matchedWordCount >= 2
    })

    if (selectedService) {
      setSelectedWorkflow(wkflw)
      setOtpCollectionModal({
        name,
        modalOpen: true,
        service: selectedService ?? {
          service: {
            name: `Collect OTP to capture service billing for ${name}`,
          },
        },
        price: selectedService?.price,
      })
    }

    if (!selectedService) {
      return false
    }
    return true
  }

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

  const handleCreateWorkflow = async (
    template: TWorkflowTemplate,
    prefill?: any
  ) => {
    setIsCreating(true)
    createWorkflow(template, prefill)
      .then((workflow) => {
        if (workflow) {
          setOpen(false)
          notify('Workflow created')
          openWorkflow(workflow)
        } else {
          notify('Error creating workflow')
        }
      })
      .catch((e) => {
        if (typeof e === 'string') {
          notify(e)
        } else {
          notify('Error creating workflow')
        }
      })
      .finally(() => {
        setIsCreating(false)
      })
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div>
      <h1 className="text-sm font-medium text-dark-blue-100">Workflows</h1>
      <p className="mb-2 text-xs text-dark-blue-50">
        Create a new workflow with custom set of forms
      </p>

      <div className="relative">
        <Button
          className="flex grow-0 pl-0 text-left font-rubik text-sm font-medium normal-case text-blue-100"
          onClick={toggleOpen}
        >
          Create new workflow
        </Button>
        <div className="absolute z-2000 min-w-200">
          {open && (
            <>
              <DropDownComponent isVisible={open} setvisibility={setOpen}>
                <div className="flex flex-col items-stretch justify-start overflow-scroll rounded-xl border border-solid border-white bg-white p-0 shadow-template">
                  {isCreating || creatingWorkflow ? (
                    <Loader message="Creating template" />
                  ) : (
                    <>
                      {loading ? (
                        <Loader message="Getting Template Options" />
                      ) : (
                        <>
                          {templates?.length ? (
                            <>
                              {templates.map((d: TWorkflowTemplate) => (
                                <Button
                                  id={d.id}
                                  className="justify-start text-left text-sm normal-case text-dark-blue-100"
                                  variant="text"
                                  onClick={() => {
                                    if (!promptOTP) {
                                      handleCreateWorkflow(d)
                                    } else {
                                      checkForOTPPrompt(d).then((res) => {
                                        if (!res) {
                                          handleCreateWorkflow(d)
                                        }
                                      })
                                    }
                                  }}
                                  key={d.id}
                                >
                                  {d.name}
                                </Button>
                              ))}
                            </>
                          ) : (
                            <>No templates loaded</>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </DropDownComponent>
            </>
          )}
        </div>
      </div>

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
    </div>
  )
}

export default WorkflowTemplateList
