import React, { useEffect, useState } from 'react'
import { ArrowRight, Plus, Link2 } from 'react-feather'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Snackbar,
  Tooltip,
  Typography,
  Stack,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { includes, some } from 'lodash'
import { useNotifications } from 'src/context/notifications'
import PortalWindow from 'src/components/portal'
import {
  ActionsSection,
  FormsSection,
  ModulesSection,
  WorkflowFormsLayout,
} from 'src/modules/workflows/components/layout'
import FormsList from 'src/modules/workflows/components/workflows/modules-list'
import ConfirmButton from 'src/components/buttons/confirm'
import form_schemas from 'src/modules/workflows/components/forms/form-inputs-definitions'
import WorkflowForm from 'src/modules/workflows/components/forms'
import { useWorkflowData } from 'src/modules/workflows/hooks/workflow-data'
import logError from 'src/utils/logging/logger'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'
import { TAlertMessage } from 'src/components/alerts'
import { useFormsRouting } from 'src/modules/workflows/hooks/routing/forms'
import {
  Forms as TWorkflowForm,
  Workflows as TWorkflowModel,
} from 'src/modules/workflows/db/models'
import dayjs from 'dayjs'
import { formNames, duplicates, initialFormValues } from '../utils'

type TitleProps = {
  workflow: TWorkflowModel
  handleCopy: () => void
}

function Title({ workflow, handleCopy }: TitleProps) {
  return (
    <div className="bg-orange-100 text-orange-20">
      <span className="flex items-center">
        <span>Workflow</span>
        <ArrowRight width={15} height={15} />
        <span>{workflow.workflowId}</span>
        {workflow.isSynced ? (
          <small className="ml-2 text-xs italic">(Synced)</small>
        ) : (
          <small className="ml-2 text-xs italic">(Not Synced)</small>
        )}

        <Tooltip title="Copy link to this form">
          <Link2
            className="ml-2 cursor-pointer hover:text-orange-50"
            onClick={handleCopy}
            width={18}
            height={18}
          />
        </Tooltip>
      </span>
    </div>
  )
}

type WorkflowPortalProps = {
  workflow: TWorkflowModel
  closeWorkflow: () => void
}

type CopyAlertMessage = {
  type: 'error' | 'success'
  message: string
}

function WorkflowPortalRaw({ workflow, closeWorkflow }: WorkflowPortalProps) {
  const [activeFormName, setActiveFormName] = useState<string>('')
  const [showIncompleteForms, setShowIncompleteForms] = useState<boolean>(false)
  const [activeForms, setActiveForms] = useState<any[]>([])
  const [expanded, setExpanded] = useState<string | false>(false)
  const { notify } = useNotifications()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [submissionForm, setSubmissionForm] = useState<any | null>(null)
  const [formsData, setFormsData] = useState<any>([])
  const [isDraftSaved, setIsDraftSaved] = useState<boolean>(false)
  const {
    submitForm,
    loaderDisplayed,
    completeWorkflow,
    deleteModuleFromAPI,
    deleteWorkflowFromAPI,
    saveDraftWorkflow,
    getFormsByName,
    addNewWorkflowModule,
  } = useWorkflowData()
  const { member, v2Member } = useMember()
  const user = useUser()
  const [showDeleteWorkflowPrompt, setShowDeleteWorkflowPrompt] =
    useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<TAlertMessage | null>(null)
  const [copyAlertMessage, setCopyAlertMessage] =
    React.useState<CopyAlertMessage | null>(null)
  const { openForm } = useFormsRouting()
  const [workflowForms, setWorkflowForms] = useState<TWorkflowForm[]>([])
  // const workflowFormsObservable = workflow.forms.observe()
  // const workflowForms = useObservable(workflowFormsObservable, [], [workflow])

  // can only delete workflow is the workflow is not completed
  // or if any of the workflow forms is not edited and is a draft,
  // or if any of the workflow forms data property is empty object or null
  const canDeleteWorkflow =
    !workflow.isCompleted &&
    !isDraftSaved &&
    !isEdited &&
    !some(
      workflowForms,
      (form: TWorkflowForm) => form.isEdited || form.isSynced
    )

  const setFormStates = (formName: string) => {
    setActiveFormName(formName)
    getFormsByName(workflow, formName).then((allActiveForms) => {
      setActiveForms(allActiveForms)

      const allFormsData = allActiveForms.map((form: any) => form?.data || {})
      setFormsData(allFormsData)
    })
  }

  useEffect(() => {
    workflow.forms.fetch().then((wForms: TWorkflowForm[]) => {
      setWorkflowForms(wForms)
      if (!activeFormName) {
        setFormStates(wForms[0].name)
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflow, activeFormName])

  const isWorkflow = !!workflow?.workflowId

  const deleteForm = async (form: TWorkflowForm) => {
    const removeFormFromDb = async () => {
      form.delete().then(async () => {
        notify(`Deleted ${form.name} from workflow`)
        if (activeForms.length < 2) {
          const remainingWorkflowForms = await workflow.forms.fetch()
          setFormStates(remainingWorkflowForms[0].name)
        }
      })
    }
    if (form.isSynced) {
      // delete the module data from the API first
      deleteModuleFromAPI(workflow, form.name).then(async () => {
        await removeFormFromDb()
      })
    } else {
      await removeFormFromDb()
    }
  }

  const addForm = async (addedFormName: string) => {
    const initialFormData =
      initialFormValues(member, user, workflow.template)[addedFormName] || {}

    addNewWorkflowModule(workflow, addedFormName).then(() => {
      workflow
        .addForm(addedFormName, {
          ...initialFormData,
          Member: [v2Member?.airtableRecordId],
          moduleId: dayjs().toISOString(),
        })
        .then(() => {
          setFormStates(addedFormName)
          notify(`Added ${addedFormName} to workflow`)
        })
    })
  }

  const formSchema =
    (form_schemas as any[]).find((form: any) => form.name === activeFormName) ||
    {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleExpand =
    (panel: string) => (_: React.ChangeEvent<any>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const handleCompleteWorkflow = async () => {
    // grab all the forms in the workflow
    //  const allForms = await workflow.forms.fetch()
    // check if any of the forms are draft using any, if there is a draft form, notify the user
    const draftForms = some(workflowForms, (form: any) => form.isDraft)
    if (draftForms) {
      notify('Please submit all forms before completing the workflow')
      setShowIncompleteForms(true)
    } else {
      completeWorkflow(workflow)
        .then(() => {
          notify('Workflow completed successfully')
          closeWorkflow()
        })
        .catch((err: any) => {
          notify('Error completing workflow')
          logError(err)
        })
    }
  }

  const getSubmittedForm = () => {
    if (activeForms.length === 1) {
      return activeForms[0]
    }
    if (expanded) {
      // find the active form in the expanded forms
      const activeForm = activeForms.find((form: any) => form.id === expanded)
      return activeForm
    }

    return null
  }

  const handleSubmitForm = () => {
    const submittedForm = getSubmittedForm()
    if (submittedForm) {
      setSubmissionForm(submittedForm)
    } else {
      notify('Please select a form to submit')
    }
  }

  const formIsDraft = () => {
    // get the current active form and check if it is a draft
    const activeForm = getSubmittedForm()
    if (activeForm) {
      return activeForm.isDraft
    }

    return false
  }

  const showDeletionNotAllowedMessage = () => {
    if (workflow.isCompleted) {
      setAlertMessage({
        type: 'error',
        message:
          'Workflow cannot be deleted because a form has already been submitted',
      })
    } else {
      setAlertMessage({
        type: 'error',
        message: 'Please delete data from forms so as to delete the workflow',
      })
    }
  }

  const deleteWorkflow = async () => {
    if (canDeleteWorkflow) {
      deleteWorkflowFromAPI(workflow).then(() => {
        workflow.delete().then(() => {
          setShowDeleteWorkflowPrompt(false)
          notify('Workflow deleted successfully')
          closeWorkflow()
        })
      })
    }
  }

  // handle link copy
  const handleCopy = () => {
    if (!workflow.isSynced) {
      setCopyAlertMessage({
        type: 'error',
        message: 'You need to save the workflow before copying the link',
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopyAlertMessage({
        type: 'success',
        message: `Link to workflow ${workflow.workflowId} copied to clipboard`,
      })
    }
  }

  const handleSaveInput =
    (form: any, index: number) => (name: string, value: any) => {
      setIsEdited(true)
      form.saveInput(name, value)
      setFormsData((prev: any) => {
        const newForms = [...prev]
        newForms[index] = form.data
        return newForms
      })
    }

  const handleSaveDraftWorkflow = async () => {
    saveDraftWorkflow(workflow, activeForms)
      .then(() => {
        notify('Draft saved successfully')
        setIsDraftSaved(true)
        setIsEdited(false)
      })
      .catch(logError)
  }

  return (
    <>
      <PortalWindow
        closeWindow={closeWorkflow}
        title={<Title workflow={workflow} handleCopy={handleCopy} />}
        isEdited={isEdited}
        setIsEdited={setIsEdited}
        width={50}
        name={workflow.workflowId}
      >
        <WorkflowFormsLayout
          isWorkflow={isWorkflow}
          loading={loaderDisplayed}
          alertMessage={alertMessage}
          hideAlert={() => {
            setAlertMessage(null)

            if (alertMessage?.type === 'success') {
              closeWorkflow()
            }
          }}
        >
          <ModulesSection>
            <FormsList
              selectForm={setFormStates}
              activeForm={activeFormName}
              forms={workflowForms}
              addForm={addForm}
              showIncompleteForms={showIncompleteForms}
            />
          </ModulesSection>
          <FormsSection>
            <>
              {Object.keys(formSchema).length > 0 ? (
                <>
                  {isWorkflow && (
                    <div
                      className={`fixed z-1000 flex w-[64%] justify-between bg-white pt-2 `}
                    >
                      <p className="m-0 mr-2 text-left font-rubik text-sm font-medium text-dark-blue-100">
                        {formNames[activeFormName]}
                      </p>
                      <div className="d-flex">
                        {includes(duplicates, activeFormName, 0) && (
                          <Plus
                            className="mr-[5px] h-[18px] w-[18px] cursor-pointer text-white-50"
                            onClick={addForm.bind(null, activeFormName)}
                          />
                        )}
                        {formIsDraft() && activeForms.length === 1 && (
                          <ConfirmButton
                            onConfirm={() => deleteForm(activeForms[0])}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  <p className="mb-2.5 mt-[30px] whitespace-pre-line text-xs text-dark-blue-100">
                    {formSchema?.helper}
                  </p>
                  {activeForms.length === 0 ? (
                    <div className="flex h-3/4 flex-col items-center pt-7">
                      <p className="font-rubik text-xs">
                        This workflow does not have a module
                      </p>
                    </div>
                  ) : (
                    <>
                      {activeForms.length > 1 ? (
                        <>
                          {activeForms.map((form: any, index: number) => (
                            <Accordion
                              key={form.id}
                              expanded={form.id === expanded}
                              onChange={handleExpand(form.id)}
                            >
                              <AccordionSummary
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                expandIcon={<ExpandMoreIcon />}
                              >
                                <Typography>
                                  <div>
                                    <span>
                                      <div className="flex items-center">
                                        <span>-</span>
                                        <Tooltip title="Delete Module">
                                          <ConfirmButton
                                            onConfirm={() => deleteForm(form)}
                                          />
                                        </Tooltip>
                                      </div>
                                    </span>
                                    <div
                                      className={`ml-2.5 flex w-[60px] justify-center rounded-[5px] py-[3px] px-[7px] text-[10px] font-bold ${
                                        form.isDraft
                                          ? ' bg-yellow-200 text-status'
                                          : 'bg-green-100 text-white'
                                      }`}
                                    >
                                      {form.isDraft ? 'Pending' : 'Submitted'}
                                    </div>
                                  </div>
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <WorkflowForm
                                  form={form}
                                  formSchema={formSchema}
                                  submissionId={submissionForm?.id}
                                  submitForm={submitForm}
                                  openForm={openForm}
                                  saveInput={handleSaveInput(form, index)}
                                  formData={formsData[index] || {}}
                                  setIsEdited={setIsEdited}
                                />
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </>
                      ) : (
                        <WorkflowForm
                          form={activeForms[0]}
                          formSchema={formSchema}
                          submissionId={submissionForm?.id}
                          submitForm={submitForm}
                          openForm={openForm}
                          saveInput={handleSaveInput(activeForms[0], 0)}
                          formData={formsData[0] || {}}
                          setIsEdited={setIsEdited}
                        />
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className="flex h-3/4 flex-col items-center pt-7">
                  <p className="font-rubik text-xs">
                    The selected form ({activeFormName}) does not have form
                    inputs configured in {process.env.NODE_ENV} environment
                  </p>
                </div>
              )}
            </>
          </FormsSection>
          <ActionsSection>
            <>
              {!showDeleteWorkflowPrompt ? (
                <>
                  <div className="flex items-center justify-start p-2">
                    <Button
                      className={`font-rubik text-sm font-medium normal-case ${
                        canDeleteWorkflow ? 'text-red-100' : 'text-dark-blue-20'
                      }`}
                      onClick={() => {
                        canDeleteWorkflow
                          ? setShowDeleteWorkflowPrompt(true)
                          : showDeletionNotAllowedMessage()
                      }}
                    >
                      Delete workflow
                    </Button>
                    <Button
                      className="rounded-xl bg-blue-10 font-rubik font-medium normal-case text-blue-100"
                      disabled={loaderDisplayed || workflow.isCompleted}
                      onClick={handleCompleteWorkflow}
                    >
                      Complete workflow
                    </Button>
                  </div>

                  <div className="flex justify-end gap-1 p-2">
                    <Tooltip title="Save draft">
                      <Button
                        disabled={
                          loaderDisplayed || !getSubmittedForm()?.isDraft
                        }
                        className="rounded-xl bg-white-100 font-rubik font-medium normal-case text-blue-100"
                        onClick={handleSaveDraftWorkflow}
                      >
                        Save draft
                      </Button>
                    </Tooltip>
                    <Tooltip title="Submit form">
                      <Button
                        className="rounded-xl bg-blue-100 font-rubik text-sm font-medium normal-case text-white"
                        disabled={
                          loaderDisplayed || !getSubmittedForm()?.isDraft
                        }
                        onClick={handleSubmitForm}
                      >
                        Submit form
                      </Button>
                    </Tooltip>
                  </div>
                </>
              ) : (
                <>
                  <Stack
                    justifyContent="space-between"
                    direction="row"
                    alignItems="center"
                    className="w-full bg-red-20 py-0 px-2.5 font-rubik text-sm font-medium  normal-case"
                  >
                    <p>Delete workflow?</p>
                    <div className="flex justify-end gap-2">
                      <Button
                        className="gap-2 rounded-lg bg-white-100 font-rubik font-medium normal-case text-dark-blue-100"
                        onClick={() => {
                          setShowDeleteWorkflowPrompt(false)
                        }}
                      >
                        No, go back
                      </Button>
                      <Button
                        className="rounded-xl bg-red-100 font-rubik font-medium normal-case text-white"
                        onClick={() => {
                          deleteWorkflow()
                        }}
                      >
                        Yes, delete
                      </Button>
                    </div>
                  </Stack>
                </>
              )}
            </>
          </ActionsSection>
        </WorkflowFormsLayout>
      </PortalWindow>

      {copyAlertMessage && (
        <Snackbar
          open={!!copyAlertMessage}
          autoHideDuration={3000}
          onClose={() => setCopyAlertMessage(null)}
        >
          <Alert
            severity={copyAlertMessage.type}
            onClose={() => setCopyAlertMessage(null)}
          >
            {copyAlertMessage.message}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default WorkflowPortalRaw
