import React, { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { AlertTriangle, Check, Plus, Search, Trash2, X } from 'react-feather'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import { Add } from '@mui/icons-material'
import { useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import { includes } from 'lodash'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import airtableFetch from '../../../../resources/airtable-fetch'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import styles from './guided-workflows.component.css'
import logError from '../../../utils/Bugsnag/Bugsnag'
import {
  SAVE_MODULE_DATA,
  ADD_MODULE_TO_WORKFLOW,
  REMOVE_MODULE,
  SAVE_WORKFLOW,
} from '../../../../gql/workflows'
import { useUser } from '../../../../context/user-context'
import analytics from '../../../../helpers/segment'
import ToastNotification, {
  defaultToastMessage,
  ToastMessage,
} from '../../../utils/toast/toast-notification'
import FormSection from './Forms/form-section'
import TABLE_ROUTES from '../../../utils/airtable-tables/table-routes'
import TABLES from './Forms/FormSchema/form-fields-complete'
import {
  ConfirmButtonProps,
  FormMeta,
  IWorkflow,
  WorkflowMeta,
} from './workflow-types'
import {
  DUPLICATE_DEFAULTS,
  duplicates,
  formNames,
  initialFormValues,
  interactionLogPayload,
  airtableFormNames,
  feedbackPayload,
} from './Forms/form-fields'
import {
  CREATE_INTERACTION,
  CREATE_MEMBER_FEEDBACK,
} from '../../../../gql/interactions'
import createApolloClient from '../../../../resources/apollo-client'

// v2 schema apollo client
const apolloClient = createApolloClient(true)

type IProps = {
  workflow: IWorkflow
  isFormEdited: boolean
  openedForms: any[]
  airtableMeta: any
  addOpenForm: (openForm: WorkflowMeta) => void
  onFormClose: (pointer: any, isWorkflow: boolean) => void
  setIsFormEdited: (touched: boolean) => void
  onRefetch: (onRefetch: boolean) => void
}

function ConfirmButton({ onConfirm }: ConfirmButtonProps) {
  const [confirming, setConfirming] = useState(false)
  useEffect(() => {
    if (confirming) {
      setTimeout(() => {
        setConfirming(false)
      }, 5000)
    }
  }, [confirming])
  return (
    <div className={styles.confirmButton}>
      {confirming && (
        <Button variant="contained" color="error" onClick={() => onConfirm()}>
          Confirm
        </Button>
      )}
      {!confirming && (
        <Tooltip title="Delete Module">
          <Trash2
            className="pointer"
            onClick={() => setConfirming(true)}
            color="var(--white-50)"
            width={18}
            height={18}
          />
        </Tooltip>
      )}
    </div>
  )
}

function WorkflowPortal({
  workflow: openedWorkflow,
  isFormEdited,
  airtableMeta,
  addOpenForm,
  onFormClose,
  setIsFormEdited,
  onRefetch,
}: IProps) {
  const recId = openedWorkflow.member.recID
  const { member } = openedWorkflow
  const user = useUser()
  const [toastMessage, setToastMessage] =
    useState<ToastMessage>(defaultToastMessage)
  const [shouldSaveModule, setShouldSaveModule] = useState(false)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [activeForm, setActiveForm] = useState<string>(null)
  const [displayForms, setDisplayForms] = useState(false)
  const [allForms, setAllForms] = useState(airtableFormNames)
  const [localFormMeta, setLocalFormMeta] = useState<FormMeta>(null)
  const [listOfTables, setlistOfTables] = useState([])
  const [showIncompleteForms, setShowIncompleteForms] = useState(false)
  const [currentWorkflow, setCurrentWorkflow] = useState<IWorkflow>(null)
  const [formPayload, setFormPayload] = useState<any[]>([])
  const [displayLoader, setDisplayLoader] = useState(false)
  const [incomingForm, setIncomingForm] = useState<string | null>(null)
  const [saveModuleData, { loading: savingModule }] =
    useMutation(SAVE_MODULE_DATA)
  const [createMemberFeedback, { loading: updatingMemberFeedback }] =
    useMutation(CREATE_MEMBER_FEEDBACK, {
      client: apolloClient,
    })
  const [createInteraction, { loading: creatingInteraction }] =
    useMutation(CREATE_INTERACTION)
  const [addModuleToWorkflow, { loading: addingModule }] = useMutation(
    ADD_MODULE_TO_WORKFLOW
  )
  const [saveWorkflow, { loading: savingWorkflow }] = useMutation(SAVE_WORKFLOW)
  const [deleteModuleData, { loading: deletingModule }] =
    useMutation(REMOVE_MODULE)
  const isWorkflowTemplate = openedWorkflow.workflowId
  const currentIndex = formPayload?.findIndex((fm) => fm.moduleId === expanded)
  const submittedForm = expanded
    ? formPayload?.find((fm) => fm.moduleId === expanded)
    : formPayload[0]
  const buttonMessage =
    formPayload.length > 1 && currentIndex === -1
      ? 'Select a form to submit'
      : ''
  const extractUsername = (email: string) => {
    return email.replace(/@.*$/, '')
  }
  const closeToast = () => {
    setToastMessage(defaultToastMessage)
  }
  const updateFormMeta = (fl: IWorkflow) => {
    let form = null
    if (fl.currentModules[0]) {
      form = TABLES.find((frm) => frm.name === fl.currentModules[0])
    }
    return form
  }
  const workflowForms = (fm: IWorkflow) => {
    const modules = fm?.currentModules.map((mod) => {
      if (fm?.moduleData[mod]) {
        return {
          name: mod,
          isDraft: fm?.moduleData[mod].status === 'Draft',
        }
      }
      return {
        name: mod,
        isDraft: true,
      }
    })
    return modules
  }

  const loaderDisplayed =
    displayLoader ||
    savingModule ||
    creatingInteraction ||
    addingModule ||
    savingWorkflow ||
    deletingModule ||
    shouldSaveModule ||
    updatingMemberFeedback

  const initialFormMeta = (fm) => {
    const formValues = initialFormValues(member, user)
    let values = {}
    if (formValues[activeForm]) {
      values = formValues[activeForm]
    }
    const prefills = fm?.prefills || {}

    return {
      ...values,
      moduleId: dayjs().toISOString(),
      Member: [recId],
      isDraft: true,
      createdBy: {
        email: user?.email,
        name: user?.name,
      },
      updatedBy: {
        email: user?.email,
        name: user?.name,
      },
      ...prefills,
    }
  }

  const isAllowedField = (name: string) => {
    return (
      name === 'createdBy' || name === 'updatedBy' || name === 'Data Source'
    )
  }

  /**
   * This method allows us to
   * 1. Send the payload with ID reference of the fields on airtable and not the name(We get the ID's from the local form schema)
   * 2. Confirm that the payload has valid fields as the ones on airtable.
   * 3. Ensures form submission is not hindered but notifies the devs and user in case of field mismatch
   */
  const generatePayload = (initialPayload: any) => {
    const airtableFieldsMap = airtableMeta[localFormMeta.id].fields
    const erroredFields: string[] = []
    const mappedPayload: any = {}
    const localFieldsMap: any = {}
    localFormMeta.fields.forEach((fm) => {
      localFieldsMap[fm.name] = {
        id: fm.id,
      }
    })

    Object.keys(initialPayload).forEach((k) => {
      if (localFieldsMap[k] && airtableFieldsMap[localFieldsMap[k].id]) {
        mappedPayload[localFieldsMap[k].id] = initialPayload[k]
      } else if (isAllowedField(k)) {
        mappedPayload[k] = initialPayload[k]
      } else {
        erroredFields.push(k)
      }
    })
    if (erroredFields.length > 0) {
      const affectedFields = JSON.stringify(erroredFields)
      logError(
        `The following fields are missing on airtable and have not been saved ${affectedFields}`
      )
    }
    return {
      fields: mappedPayload,
    }
  }
  const notify = (text: string) => {
    setToastMessage({
      ...toastMessage,
      message: text,
    })
  }
  useEffect(() => {
    if (incomingForm) {
      setToastMessage({
        type: 'CONFIRM',
        message: 'You may have unsaved changes',
        time: 10000,
      })
    }
  }, [incomingForm])
  useEffect(() => {
    setlistOfTables(workflowForms(openedWorkflow))
    setCurrentWorkflow(openedWorkflow)
    setActiveForm(openedWorkflow.currentModules[0])
    setLocalFormMeta(updateFormMeta(openedWorkflow))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedWorkflow])
  useEffect(() => {
    if (activeForm) {
      let formData = []
      if (currentWorkflow?.moduleData[activeForm]) {
        const newPayload = currentWorkflow?.moduleData[activeForm].filled_values
        formData = newPayload.map((py) => ({
          ...py,
          updatedBy: {
            email: user?.email,
            name: user?.name,
          },
        }))
      } else {
        formData = [initialFormMeta(currentWorkflow)]
      }
      setFormPayload(formData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeForm, currentWorkflow])
  const workflowCaseId = async () => {
    try {
      let caseId = null
      const res = await airtableFetch('create/caseId', 'post', {
        fields: {
          ID: openedWorkflow.workflowId,
          Status: 'Ongoing',
          Members: [recId],
        },
      })
      if (Array.isArray(res)) {
        throw new Error()
      }
      caseId = res.id
      await saveWorkflow({
        variables: {
          workflowId: openedWorkflow.workflowId,
          airtableId: caseId,
          completed: false,
        },
      }).then((wk) => {
        setCurrentWorkflow(wk.data.updateWorkflow.workflow)
      })
      onRefetch(true)
      return [`${caseId}`]
    } catch (e) {
      notify('Record has not been successfully saved')
      logError(`Retry workflow id save to airtable failed ${e}`)
      return null
    }
  }
  const handleLeave = () => {
    setOpen(false)
    onFormClose(openedWorkflow.name, false)
  }
  const handleStay = () => {
    setOpen(false)
    setCurrentWorkflow(openedWorkflow)
  }
  const closeFormOptions = () => {
    setAllForms(airtableFormNames)
    setDisplayForms(false)
  }
  const checkModuleStatus = (payload: any[]) => {
    let isDraft = false
    payload.forEach((py) => {
      if (py.isDraft === true) {
        isDraft = true
      }
    })
    return isDraft
  }
  const confirmSubmit = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleLeave}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Data saved successfully.
          </DialogTitle>
          <Typography sx={{ padding: '0 50px 0 20px' }}>
            Would you like to submit another response?
          </Typography>

          <DialogActions>
            <Button color="inherit" variant="contained" onClick={handleStay}>
              Yes
            </Button>
            <Button
              color="info"
              variant="contained"
              onClick={handleLeave}
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
  const moduleIsDraft = () => {
    const activeMod = listOfTables.find((tb) => tb.name === activeForm)
    return activeMod?.isDraft
  }
  const selectForm = (fm: string, isNewForm: boolean) => {
    const newMeta = TABLES.find((frm) => frm.name === fm)
    if (isNewForm) {
      addModuleToWorkflow({
        variables: {
          workflowId: currentWorkflow?.workflowId,
          moduleName: fm,
        },
      }).then((res) => {
        if (res.data.addWorkflowModule.status !== 200) {
          notify(JSON.stringify(res.data.addWorkflowModule.errors))
        } else {
          const response = res.data.addWorkflowModule.workflow
          setlistOfTables(workflowForms(response))
          setCurrentWorkflow(response)
          onRefetch(true)
          setLocalFormMeta(newMeta)
          setActiveForm(fm)
          setDisplayForms(false)
          setAllForms(airtableFormNames)
          analytics.track(`Guided Workflow`, {
            event: 'Form added',
            beneId: recId,
            staff: user ? user.email : '',
            moduleName: activeForm,
            workflow: response,
          })
        }
      })
    } else {
      setLocalFormMeta(newMeta)
      setActiveForm(fm)
      setDisplayForms(false)
      setIncomingForm(null)
      setIsFormEdited(false)
    }
  }
  const deleteModule = () => {
    deleteModuleData({
      variables: {
        moduleName: activeForm,
        workflowId: openedWorkflow.workflowId,
      },
    })
      .then((res) => {
        if (res.data.removeWorkflowModule.status === 200) {
          const response = res.data.removeWorkflowModule.workflow
          analytics.track(`Guided Workflow`, {
            event: 'Form deleted',
            beneId: recId,
            staff: user ? user.email : '',
            moduleName: activeForm,
            workflow: response,
          })
          setCurrentWorkflow(response)
          onRefetch(true)
          setlistOfTables(workflowForms(response))
          setActiveForm(response.currentModules[0])
          setLocalFormMeta(updateFormMeta(response))
        } else {
          notify(JSON.stringify(res.data.removeWorkflowModule.errors))
        }
        setIsFormEdited(false)
      })
      .catch((e) => {
        notify(e.message)
        logError(e.message)
      })
  }
  const saveModule = async (isDraft: boolean, draftData?: any) => {
    try {
      if (isDraft) {
        const formData = draftData || formPayload
        saveModuleData({
          variables: {
            moduleName: activeForm,
            workflowId: currentWorkflow?.workflowId,
            data: formData,
            draft: checkModuleStatus(formData),
          },
        })
          .then((res) => {
            const response = res.data.saveModuleData.workflow
            setFormPayload(response.moduleData[activeForm].filled_values)
            setCurrentWorkflow(response)
            setlistOfTables(workflowForms(response))
            onRefetch(true)
            analytics.track(`Guided Workflow`, {
              event: 'Module draft saved',
              beneId: recId,
              staff: user ? user.email : '',
              moduleName: activeForm,
              moduleData: formPayload,
              workflow: response,
            })
            setToastMessage({
              ...toastMessage,
              type: 'GENERAL',
              message: 'Successful',
            })
            if (incomingForm) {
              selectForm(incomingForm, false)
            }
          })
          .catch((e) => {
            notify('Something went wrong. Changes have not been saved')
            logError(e)
          })
      } else {
        let airtablePayload = { ...draftData }
        if ('isDraft' in airtablePayload) delete airtablePayload.isDraft
        if ('moduleId' in airtablePayload) delete airtablePayload.moduleId
        if (activeForm === 'HIF Minor') {
          delete airtablePayload.Member
        }
        if (activeForm === 'Physiotherapy Consultation') {
          airtablePayload = {
            ...airtablePayload,
            member: airtablePayload.Member,
          }
          delete airtablePayload.Member
        }
        if (
          activeForm === 'Logistics Tasks' ||
          activeForm === 'Incident reports'
        ) {
          airtablePayload = {
            ...airtablePayload,
            Members: airtablePayload.Member,
          }
          delete airtablePayload.Member
        }

        if (activeForm === 'Intervention Data Tracking') {
          delete airtablePayload.Member
        }

        airtablePayload = {
          fields: {
            ...airtablePayload,
          },
        }

        if (activeForm === 'Interaction log') {
          const interactionData: any = interactionLogPayload(
            airtablePayload.fields
          )
          const outcomeMetadata: any = {
            creator: user && user.email,
          }
          const outcome = JSON.stringify(interactionData.outcome)
          if (interactionData.reasonForConsultation) {
            outcomeMetadata.reasonForConsultation =
              interactionData.reasonForConsultation
            delete interactionData.reasonForConsultation
          }
          const res = await createInteraction({
            variables: {
              input: {
                ...interactionData,
                member: member['Antara ID'],
                interactionStartedAt: dayjs(
                  interactionData.interactionStartedAt
                ).toISOString(),
                historyUserIdField: user && user.email,
                healthNavigator: user && extractUsername(user.email),
                outcomeMetadata,
                outcome,
              },
            },
          })

          if (res.data.createInteraction.status !== 200) {
            notify('Failed to save interaction log data')
            logError(res)
            throw new Error()
          }
        } else {
          if (activeForm === 'Member Feedback') {
            const feedbackData = feedbackPayload(airtablePayload.fields)
            const feedback =
              feedbackData.feedback && feedbackData.feedback === 'Yes'
            const createdBy = user && user.email
            const res = await createMemberFeedback({
              variables: {
                input: {
                  ...feedbackData,
                  feedback,
                  createdBy,
                  source: feedbackData.source[0],
                  memberAntaraId: member['Antara ID'],
                },
              },
            })
            if (res.data.memberFeedback.status !== 200) {
              setToastMessage({
                ...toastMessage,
                message: `Failed to save member feedback data`,
              })
              logError(res)
              throw new Error()
            }
          }
          if (isWorkflowTemplate) {
            airtablePayload = {
              fields: {
                ...airtablePayload.fields,
                'Case ID': openedWorkflow.airtableId
                  ? [`${openedWorkflow.airtableId}`]
                  : await workflowCaseId(),
                'Data Source': 'Guided Workflow',
              },
            }
          } else {
            airtablePayload = {
              fields: {
                ...airtablePayload.fields,
                'Data Source': 'Scribe form',
              },
            }
          }

          const tableName = TABLE_ROUTES[activeForm]
          let hifId = null
          if (activeForm === 'HIF') {
            const hifInfo = await airtableFetch(
              `hif/list?filterByFormula=FIND("${airtablePayload.fields.Member[0]}", {Member Record ID})`
            )
            if (
              typeof hifInfo === 'object' &&
              !Array.isArray(hifInfo) &&
              hifInfo !== null
            ) {
              Object.keys(hifInfo).forEach((key) => {
                if (/^rec\w+/.test(key)) {
                  hifId = key
                }
              })
            }
          }
          airtablePayload = generatePayload(airtablePayload.fields)
          let res = null
          if (hifId) {
            res = await airtableFetch('hif', 'post', {
              id: hifId,
              fields: airtablePayload.fields,
            })
          } else {
            res = await airtableFetch(
              `create/${tableName}`,
              'post',
              airtablePayload
            )
          }

          if (res === 'Network Error') {
            notify('Network Error. Changes have not been updated')
            throw new Error(res)
          }
          if (Array.isArray(res)) {
            analytics.track(`Guided Workflow`, {
              event: 'Form saved to airtable failed',
              beneId: recId,
              staff: user ? user.email : '',
              moduleName: activeForm,
              moduleData: airtablePayload,
              workflow: currentWorkflow,
            })
            // logError(`${res[0].message}`)
            notify(`Error: ${res[0].message}`)
            // eslint-disable-next-line
            throw { message: `${res[0].error}` }
          }
        }
        if (isWorkflowTemplate) {
          let updatedFormPayload = [...formPayload]
          if (currentIndex !== -1) {
            const sectionFormData = {
              ...formPayload[currentIndex],
              isDraft: false,
            }
            updatedFormPayload[currentIndex] = sectionFormData
          }
          if (formPayload.length === 1) {
            updatedFormPayload = [{ ...formPayload[0], isDraft: false }]
          }
          saveModuleData({
            variables: {
              moduleName: activeForm,
              workflowId: openedWorkflow.workflowId,
              data: updatedFormPayload,
              draft: checkModuleStatus(updatedFormPayload),
            },
          }).then((res) => {
            const response = res.data.saveModuleData.workflow
            setlistOfTables(workflowForms(response))
            setFormPayload(response.moduleData[activeForm].filled_values)
            setCurrentWorkflow(response)
            onRefetch(true)
            analytics.track(`Guided Workflow`, {
              event: 'Form saved to airtable successful',
              beneId: recId,
              staff: user ? user.email : '',
              moduleName: activeForm,
              moduleData: updatedFormPayload,
              workflow: response,
            })
            notify('Workflow form saved successfully')
          })
        } else {
          setOpen(true)
          setCurrentWorkflow({
            ...currentWorkflow,
            completed: true,
            moduleData: {
              [`${activeForm}`]: {
                filled_values: formPayload,
              },
            },
          })
          notify(`${formNames[activeForm]} form saved successfully`)
        }
      }
    } catch (err) {
      notify(`Failed to save ${err.message}`)
      logError(err)
    } finally {
      setShouldSaveModule(false)
      setIsFormEdited(false)
      setDisplayLoader(false)
    }
  }
  const moduleOptions = () => {
    return (
      <>
        <div id="search-wrap">
          <div id="search-input-wrap" className={styles.searchInputWrap}>
            <TextField
              id="input-with-icon-textfield"
              className="full-width"
              placeholder="Search forms..."
              onChange={(e) => {
                const { value } = e.target
                let form = airtableFormNames
                if (value) {
                  form = form.filter(
                    (table) =>
                      table && table.toLowerCase().includes(value.toLowerCase())
                  )
                }
                setAllForms(form)
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
        </div>
        {allForms.map((mod: string) => {
          const isAvailable = listOfTables.find((tb) => tb.name === mod)
          return (
            <Button
              key={mod}
              disabled={!!isAvailable}
              className={styles.workflowOptions}
              variant="text"
              onClick={selectForm.bind(null, mod, true)}
            >
              {formNames[mod]}
            </Button>
          )
        })}
      </>
    )
  }
  const renderForm = () => {
    const formSection = (id: string) => (
      <FormSection
        id={id}
        activeForm={activeForm}
        setShouldSaveModule={setShouldSaveModule}
        saveModule={saveModule}
        setDisplayLoader={setDisplayLoader}
        setFormPayload={setFormPayload}
        setIsFormEdited={setIsFormEdited}
        moduleId={expanded || formPayload[0].moduleId}
        airtableMeta={airtableMeta}
        localFormMeta={localFormMeta}
        shouldSaveModule={shouldSaveModule}
        formPayload={formPayload}
        addOpenForm={addOpenForm}
        template={openedWorkflow}
      />
    )
    const handleChange =
      (panel: string) =>
      (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
      }
    if (formPayload.length > 1) {
      return (
        <>
          {formPayload.map((fm) => {
            const moduleTitle = fm[DUPLICATE_DEFAULTS[activeForm]] || '-'
            return (
              <Accordion
                expanded={expanded === fm.moduleId}
                onChange={handleChange(fm.moduleId)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>
                    <div>
                      <span>
                        <div className={styles.subModuleHeader}>
                          <span>{moduleTitle}</span>
                          {fm.isDraft && (
                            <div className={styles.deleteSubModule}>
                              <Tooltip title="Delete Module">
                                <ConfirmButton
                                  onConfirm={() => {
                                    const newData = formPayload.filter(
                                      (dat) => dat.moduleId !== fm.moduleId
                                    )
                                    saveModule(true, newData)
                                  }}
                                />
                              </Tooltip>
                            </div>
                          )}
                        </div>
                      </span>
                      {fm.isDraft ? (
                        <div className={styles.statusText}>Pending</div>
                      ) : (
                        <div className={styles.statusTextSubmitted}>
                          Submitted
                        </div>
                      )}
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>{formSection(fm.moduleId)}</AccordionDetails>
              </Accordion>
            )
          })}
        </>
      )
    }
    return (
      <div className={styles.forms}>{formSection(formPayload[0].moduleId)}</div>
    )
  }
  return (
    <>
      {toastMessage.type === 'GENERAL' && (
        <ToastNotification
          message={toastMessage}
          isOpen={!!toastMessage.message}
          handleToastClose={closeToast}
        />
      )}
      {toastMessage.type === 'CONFIRM' && (
        <ToastNotification
          message={toastMessage}
          isOpen={!!toastMessage.message}
          handleToastClose={closeToast}
          onReject={selectForm.bind(null, incomingForm, false)}
          onAccept={saveModule.bind(null, true)}
        />
      )}
      <div className={styles.workflowDialogueContent}>
        <Grid
          className={styles.workflowDialogueContentGrid}
          container
          spacing={0}
        >
          {isWorkflowTemplate && (
            <Grid
              className={styles.componentGrid}
              sx={{ borderRight: '1px solid #e8eaed' }}
              item
              xs={4}
            >
              {!addingModule &&
                listOfTables.map((tbl) => {
                  return (
                    <Button
                      disabled={loaderDisplayed}
                      className={`${styles.tblList} ${
                        activeForm === tbl.name
                          ? styles.workflowTablesActive
                          : styles.workflowTables
                      }`}
                      variant="text"
                      key={tbl.name}
                      onClick={() => {
                        if (isFormEdited) {
                          setIncomingForm(tbl.name)
                        } else {
                          selectForm(tbl.name, false)
                        }
                      }}
                    >
                      <span>{formNames[tbl.name]}</span>
                      {!tbl.isDraft && (
                        <Check
                          color="var(--green-100)"
                          width={18}
                          height={18}
                        />
                      )}
                      {tbl.isDraft && showIncompleteForms && (
                        <AlertTriangle
                          color="var(--red-100)"
                          width={12}
                          height={12}
                        />
                      )}
                    </Button>
                  )
                })}
              {addingModule && (
                <div className={styles.fieldsLoader}>
                  <LoadingIcon />
                  <p className="text-small">Adding Form</p>
                </div>
              )}
              {!currentWorkflow?.completed && (
                <Button
                  disabled={loaderDisplayed}
                  className={styles.addModule}
                  onClick={() => {
                    if (isFormEdited) {
                      notify(
                        'Save the current form before creating another one'
                      )
                    } else {
                      setDisplayForms(true)
                    }
                  }}
                  variant="text"
                  startIcon={<Add />}
                >
                  Add Form
                </Button>
              )}

              {displayForms && (
                <div className={styles.modulesList}>
                  <div
                    className={`d-flex flex-between p-8 ${styles.selectModule}`}
                  >
                    <p className={styles.selectModule}>Select Form</p>
                    <X
                      style={{ cursor: 'pointer' }}
                      color="var(--white)"
                      width={15}
                      height={15}
                      onClick={closeFormOptions}
                    />
                  </div>
                  <div
                    className={`${styles.workflowDropDown} ${styles.workflowDropDownPortal}`}
                  >
                    {moduleOptions()}
                  </div>
                </div>
              )}
            </Grid>
          )}
          <Grid
            className={styles.componentGridForm}
            style={{ padding: isWorkflowTemplate ? '0 8px' : '0 30px' }}
            item
            xs={isWorkflowTemplate ? 8 : 12}
          >
            {loaderDisplayed && (
              <div className={styles.universalLoader}>
                <span className={styles.backdropText}>
                  <CircularProgress color="inherit" />
                </span>
              </div>
            )}
            {isWorkflowTemplate && (
              <div className={`d-flex flex-between ${styles.stickyHeader}`}>
                <p className={styles.moduleName}>{formNames[activeForm]}</p>
                <div className="d-flex">
                  {includes(duplicates, activeForm, 0) && (
                    <Plus
                      className={styles.addModuleIcon}
                      onClick={saveModule.bind(null, true, [
                        ...formPayload,
                        initialFormMeta(),
                      ])}
                    />
                  )}
                  {moduleIsDraft() &&
                    formPayload.length === 1 &&
                    listOfTables.length > 1 && (
                      <ConfirmButton onConfirm={deleteModule} />
                    )}
                </div>
              </div>
            )}
            <p className={styles.formHelperText}>{localFormMeta?.helper}</p>
            {currentWorkflow?.modules.length === 0 && (
              <div className={styles.fieldsLoader}>
                <p className="text-small">
                  This workflow does not have a module
                </p>
              </div>
            )}
            {formPayload.length > 0 && renderForm()}
          </Grid>
        </Grid>
      </div>
      <div
        className={`${styles.btnContainer} d-flex flex-between p-8 ${
          !currentWorkflow?.workflowId && 'flex-end'
        }`}
      >
        {currentWorkflow?.workflowId && (
          <Button
            className={styles.completeWorkflow}
            disabled={loaderDisplayed || currentWorkflow.completed}
            onClick={() => {
              let canComplete = true
              for (const tbl of listOfTables) {
                if (tbl.isDraft) {
                  canComplete = false
                }
              }
              if (canComplete) {
                saveWorkflow({
                  variables: {
                    workflowId: openedWorkflow.workflowId,
                    completed: true,
                    airtableId: currentWorkflow?.airtableId,
                  },
                })
                  .then((res) => {
                    if (res.data.updateWorkflow.status === 200) {
                      airtableFetch('caseId', 'post', {
                        id: currentWorkflow?.airtableId,
                        fields: {
                          Status: 'Resolved',
                        },
                      }).then(() =>
                        notify('Workflow status successfully updated')
                      )
                      setCurrentWorkflow(res.data.updateWorkflow.workflow)
                      notify('Workflow submitted successfully')
                      setIsFormEdited(false)
                      onRefetch(true)
                      analytics.track(`Guided Workflow`, {
                        event: 'Workflow completed',
                        beneId: recId,
                        staff: user ? user.email : '',
                        workflow: res.data.updateWorkflow.workflow,
                      })
                    } else {
                      notify('The changes have not been saved successfully')
                    }
                  })
                  .catch((err) => logError(`saveWorkflow: ${err.message}`))
              } else {
                setShowIncompleteForms(true)
                notify('You have to submit all forms to complete the workflow')
              }
            }}
          >
            Complete Workflow
          </Button>
        )}
        <div className="d-flex flex-end">
          {currentWorkflow?.workflowId && (
            <Button
              disabled={loaderDisplayed || !checkModuleStatus(formPayload)}
              className={styles.saveDraftBtn}
              onClick={() => saveModule(true)}
            >
              Save Draft
            </Button>
          )}
          <Tooltip title={buttonMessage}>
            <div>
              <Button
                disabled={
                  loaderDisplayed ||
                  !checkModuleStatus(formPayload) ||
                  !submittedForm?.isDraft
                }
                className={styles.submitModuleBtn}
                onClick={() => {
                  if (buttonMessage) {
                    notify('Select a form to submit')
                  } else {
                    setShouldSaveModule(true)
                    setDisplayLoader(true)
                  }
                }}
              >
                Submit form
              </Button>
            </div>
          </Tooltip>
          <DialogContent sx={{ padding: 0, height: '90%' }}>
            {confirmSubmit()}
          </DialogContent>
        </div>
      </div>
    </>
  )
}
export default WorkflowPortal
