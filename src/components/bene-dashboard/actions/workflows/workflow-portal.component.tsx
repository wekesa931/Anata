import React, { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  TextField,
  InputAdornment,
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
import { every, isEmpty, includes } from 'lodash'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import airtableFetch from '../../../../resources/airtable-fetch'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import styles from './guided-workflows.component.css'
import Toasts from '../../../../helpers/toast'
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
import TABLES from './Forms/form-fields-complete'
import { ConfirmButtonProps, FormMeta, IWorkflow } from './workflow-types'
import { DUPLICATE_DEFAULTS, duplicates, formNames } from './Forms/form-fields'

type IProps = {
  workflow: IWorkflow
  isFormEdited: boolean
  openedForms: any[]
  closeForm: (openForm: any[], healthNavigator: any) => void
  onFormClose: (pointer: any, isWorkflow: boolean) => void
  setIsFormEdited: (touched: boolean) => void
  onRefetch: (onRefetch: boolean) => void
}

const ConfirmButton = ({ onConfirm }: ConfirmButtonProps) => {
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
const WorkflowPortal = ({
  workflow: openedWorkflow,
  isFormEdited,
  airtableMeta,
  onFormClose,
  setIsFormEdited,
  onRefetch,
}: IProps) => {
  const recId = openedWorkflow?.member['recID']
  const member = openedWorkflow?.member
  const [toastMessage, setToastMessage] =
    useState<ToastMessage>(defaultToastMessage)
  const [template, setTemplate] = useState<IWorkflow>(null)
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [saveWorkflowError, setSaveWorkflowError] = useState(false)
  const [isToastOpen, setIsToastOpen] = useState(false)
  const [incomingIndex, setIncomingIndex] = useState(null)
  const [savingWorkflowStart, setsavingWorkflowStart] = useState(false)
  const [activeModule, setActiveModule] = useState(0)
  const [isDuplicate, setIsDuplicate] = useState(false)
  const [addingDuplicate, setAddingDuplicate] = useState(false)
  const [formError, setFormError] = useState<any>(null)
  const [shouldSaveModule, setShouldSaveModule] = useState(false)
  const [newModuleName, setNewModuleName] = useState('')
  const [updatingActiveModule, setUpdatingActiveModule] = useState(false)
  const [shouldDisplayModules, setShouldDisplayModules] = useState(false)
  const [allModules, setAllModules] = useState<string[]>([])
  const [validatedData, setValidatedData] = useState<any[]>([])
  const [finalPayload, setfinalPayload] = useState<any[]>([])
  const [gettingTableMeta, setGettingTableMeta] = useState(true)
  const [savingDraft, setSavingDraft] = useState(false)
  const [savingFinal, setSavingFinal] = useState(false)
  const [open, setOpen] = useState(false)
  const [formMeta, setFormMeta] = useState<FormMeta>(null)
  const [listOfTables, setlistOfTables] = useState<
    { name: string; isDraft: boolean }[]
  >([])
  const [formPayload, setFormPayload] = useState<any[]>([])
  const [saveModuleData] = useMutation(SAVE_MODULE_DATA)
  const [addModuleToWorkflow, { loading: addingModule }] = useMutation(
    ADD_MODULE_TO_WORKFLOW
  )
  const [deleteModuleData, { loading: deletingModule }] =
    useMutation(REMOVE_MODULE)
  const [saveWorkflow, { loading: savingWorkflow }] = useMutation(SAVE_WORKFLOW)
  const user = useUser()
  const canRenderFields =
    formMeta && !gettingTableMeta && !updatingActiveModule && !deletingModule
  const loadingFields = gettingTableMeta || updatingActiveModule
  const activeModuleName =
    listOfTables.length > 0 ? listOfTables[activeModule]?.name : ''
  /**
   * At all instances the form will have three properties
   * 1. member id
   * 2. Check whether form is draft or saved
   * 3. unique id identifying the form
   */
  const formDataAdded =
    formPayload.length > 0 && Object.keys(formPayload[0]).length === 3
  const isSubmitDisabled =
    savingFinal ||
    savingDraft ||
    formDataAdded ||
    !isFormEdited ||
    template?.completed ||
    template?.moduleData[activeModuleName]?.status === 'Saved'
  const isSubmitting = savingWorkflowStart || savingWorkflow
  const isCompleteButtonDisabled =
    savingWorkflowStart || savingWorkflow || template?.completed
  const canRenderForm = canRenderFields && !isDuplicate && formPayload
  const isMissingModule = template && template?.modules.length === 0
  const isWorkflowTemplate = template?.workflowId
  const canAddModule =
    !gettingTableMeta && !template?.completed && isWorkflowTemplate
  const canAddDuplicate = !addingDuplicate && isWorkflowTemplate
  const hasDuplicateForm = formPayload.length > 1
  const setModuleNames = () => {
    const loadedModules = TABLES.map((mod) => mod.name)
    setAllModules(loadedModules)
  }
  const deleteModule = (name: string, workflowId: string) => {
    if (name) {
      deleteModuleData({
        variables: {
          moduleName: name,
          workflowId,
        },
      }).then((res) => {
        if (res.data.removeWorkflowModule.status === 200) {
          setTemplate({
            ...res.data.removeWorkflowModule.workflow,
            member,
          })
          onRefetch(true)
          const updatedModules = listOfTables.filter((fm) => fm.name !== name)
          if (updatedModules.length === 0) {
            setFormMeta(null)
          }
          setActiveModule(0)
          setlistOfTables(updatedModules)
          analytics.track(`Guided Workflow`, {
            event: 'Form deleted',
            beneId: recId,
            staff: user ? user.email : '',
            moduleName: name,
            workflow: res.data.removeWorkflowModule.workflow,
          })
        }
        setIsFormEdited(false)
      })
    }
  }
  const hasDuplicates = (values: any) => {
    const valueArr = values.map((item: any) => {
      return item.moduleId
    })
    const isDuplicated = valueArr.some((item: any, idx: number) => {
      return valueArr.indexOf(item) !== idx
    })
    return isDuplicated
  }
  const closeToast = () => {
    setIncomingIndex(null)
    setToastMessage(defaultToastMessage)
  }
  const isModuleErrored = (id: string) => {
    let isErrored = false
    if (formError) {
      if (!every(formError[`${id}`], isEmpty)) {
        isErrored = true
      }
    }
    return isErrored
  }

  const setSelectedModule = (mod: string) => {
    setNewModuleName(mod)
    setShouldDisplayModules(false)
    setModuleNames()
  }
  const displayModuleOptions = () => {
    setShouldDisplayModules(false)
    setModuleNames()
  }
  const updateModuleList = (response: IWorkflow, isNewModule = false) => {
    const filledData = response.moduleData
    let filledModules = {}
    Object.keys(filledData).forEach((key) => {
      filledModules = {
        ...filledModules,
        [`${key}`]: {
          name: key,
          isDraft: !(filledData[`${key}`].status === 'Saved'),
        },
      }
    })
    const mappedTables = response.currentModules.map((mod: string) => {
      if (filledModules[`${mod}`]) {
        return filledModules[`${mod}`]
      }
      return {
        name: mod,
        isDraft: true,
      }
    })
    if (isNewModule && listOfTables.length > 0) {
      const modIdx = listOfTables.findIndex(
        (mod) => mod.name === activeModuleName
      )
      const moduleToReIndex = mappedTables.find(
        (mod) => mod.name === activeModuleName
      )
      const filteredModules = mappedTables.filter(
        (mod) => mod.name !== activeModuleName
      )
      if (modIdx && moduleToReIndex) {
        filteredModules.splice(modIdx, 0, moduleToReIndex)
        setlistOfTables(filteredModules)
      } else {
        setlistOfTables(mappedTables)
      }
    } else {
      setlistOfTables(mappedTables)
    }
  }

  useEffect(() => {
    if (allModules.length === 0) {
      setModuleNames()
    }
    setTemplate(openedWorkflow)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedWorkflow])

  useEffect(() => {
    if (incomingIndex !== null && incomingIndex !== activeModule) {
      if (isFormEdited) {
        setToastMessage({
          type: 'CONFIRM',
          message: 'You may have unsaved changes',
          time: 10000,
        })
      } else {
        setUpdatingActiveModule(true)
        setActiveModule(incomingIndex)
        setIsFormEdited(false)
        setShouldSaveModule(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingIndex])

  useEffect(() => {
    setIncomingIndex(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canRenderFields, activeModule])

  useEffect(() => {
    if (newModuleName) {
      addModuleToWorkflow({
        variables: {
          workflowId: template?.workflowId,
          moduleName: newModuleName,
        },
      }).then((res) => {
        updateModuleList(res.data.addWorkflowModule.workflow, true)
        setTemplate({
          ...res.data.addWorkflowModule.workflow,
          member,
        })
        onRefetch(true)
        analytics.track(`Guided Workflow`, {
          event: 'Form added',
          beneId: recId,
          staff: user ? user.email : '',
          moduleName: newModuleName,
          workflow: res.data.addWorkflowModule.workflow,
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newModuleName])

  const moduleIsDraft = (name: string) => {
    const activeMod = listOfTables.find((tb) => tb.name === name)
    return activeMod?.isDraft
  }
  const displayModDelete =
    moduleIsDraft(activeModuleName) && isWorkflowTemplate && !hasDuplicateForm

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
                let form = TABLES.map((mod) => mod.name)
                if (value) {
                  form = form.filter(
                    (table) =>
                      table && table.toLowerCase().includes(value.toLowerCase())
                  )
                }
                setAllModules(form)
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
        {allModules.map((mod: string) => {
          let isDisabled = false
          const isAvailable = listOfTables.find((tb) => tb.name === mod)
          if (isAvailable) {
            isDisabled = true
          }
          return (
            <Button
              key={mod}
              disabled={isDisabled}
              className={styles.workflowOptions}
              variant="text"
              onClick={() => setSelectedModule(mod)}
            >
              {formNames[mod]}
            </Button>
          )
        })}
      </>
    )
  }

  const saveModule = (isDraft: boolean, draftData?: any) => {
    try {
      if (isDraft) {
        if (!addingDuplicate) setSavingDraft(true)
        saveModuleData({
          variables: {
            moduleName: activeModuleName,
            workflowId: template?.workflowId,
            data: draftData || formPayload,
            draft: isDraft,
          },
        })
          .then((res) => {
            const response = res.data.saveModuleData.workflow
            setFormPayload(response.moduleData[activeModuleName].filled_values)
            updateModuleList(response)
            setTemplate({
              ...response,
              member,
            })
            onRefetch(true)
            analytics.track(`Guided Workflow`, {
              event: 'Module draft saved',
              beneId: recId,
              staff: user ? user.email : '',
              moduleName: activeModuleName,
              moduleData: draftData || formPayload,
              workflow: response,
            })
            if (incomingIndex !== null) {
              setUpdatingActiveModule(true)
              setActiveModule(incomingIndex)
            }
            setToastMessage({
              ...toastMessage,
              type: 'GENERAL',
              message: `${
                addingDuplicate
                  ? 'Duplicate form added'
                  : 'Details saved successfully'
              }`,
            })
            setSavingDraft(false)
          })
          .catch((e) => {
            setSavingDraft(false)
            setToastMessage({
              ...toastMessage,
              message: 'Something went wrong. Changes have not been saved',
            })
            logError(e)
          })
      } else {
        setSavingFinal(true)
        const tableTosave = TABLES.find((tbl) => tbl.name === formMeta.name)
        finalPayload.forEach((payload) => {
          if (payload.isDraft) {
            let airtablePayload = { ...payload }
            if ('isDraft' in airtablePayload) delete airtablePayload.isDraft
            if ('moduleId' in airtablePayload) delete airtablePayload.moduleId
            if (activeModuleName === 'HIF Minor') {
              delete airtablePayload.Member
            }
            if (activeModuleName === 'Physiotherapy Consultation') {
              airtablePayload = {
                ...airtablePayload,
                member: airtablePayload.Member,
              }
              delete airtablePayload.Member
            }
            if (activeModuleName === 'Logistics Tasks') {
              airtablePayload = {
                ...airtablePayload,
                Members: airtablePayload.Member,
              }
              delete airtablePayload.Member
            }

            if (activeModuleName === 'Intervention Data Tracking') {
              delete airtablePayload.Member
            }

            const tableName = TABLE_ROUTES[`${tableTosave?.name}`]
            let finalAirtablePayload = {
              fields: {
                ...airtablePayload,
              },
            }

            if (isWorkflowTemplate) {
              finalAirtablePayload = {
                fields: {
                  ...airtablePayload,
                  'Case ID': [`${template.airtableId}`],
                },
              }
            }
            airtableFetch(
              `create/${tableName}`,
              'post',
              finalAirtablePayload
            ).then((resp) => {
              if (resp === 'Network Error') {
                setToastMessage({
                  ...toastMessage,
                  message: 'Network Error. Changes have not been updated',
                })
                setSavingFinal(false)
                throw new Error()
              }
              if (Array.isArray(resp)) {
                analytics.track(`Guided Workflow`, {
                  event: 'Form saved to airtable failed',
                  beneId: recId,
                  staff: user ? user.email : '',
                  moduleName: activeModuleName,
                  moduleData: finalPayload,
                  workflow: template,
                })
                setToastMessage({
                  ...toastMessage,
                  message: `Error: ${resp[0].message}`,
                })
                setSavingFinal(false)
                // eslint-disable-next-line
                throw { message: `${resp[0].error}` }
              } else if (!isWorkflowTemplate) {
                setOpen(true)
                setTemplate({
                  ...template,
                  completed: true,
                  moduleData: {
                    [`${template.name}`]: {
                      filled_values: finalPayload,
                    },
                  },
                })
                setSavingFinal(false)
                setToastMessage({
                  ...toastMessage,
                  message: `${
                    formNames[template?.name]
                  } form saved successfully`,
                })
              } else {
                const updatedFormPayload = finalPayload.map((pl) => ({
                  ...pl,
                  isDraft: false,
                }))
                saveModuleData({
                  variables: {
                    moduleName: activeModuleName,
                    workflowId: template?.workflowId,
                    data: updatedFormPayload,
                    draft: false,
                  },
                }).then((res) => {
                  updateModuleList(res.data.saveModuleData.workflow)
                  setTemplate({
                    ...res.data.saveModuleData.workflow,
                    member,
                  })
                  onRefetch(true)
                  analytics.track(`Guided Workflow`, {
                    event: 'Form saved to airtable successful',
                    beneId: recId,
                    staff: user ? user.email : '',
                    moduleName: activeModuleName,
                    moduleData: finalPayload,
                    workflow: res.data.saveModuleData.workflow,
                  })
                  setToastMessage({
                    ...toastMessage,
                    message: 'Workflow form saved successfully',
                  })
                  setSavingFinal(false)
                })
              }
            })
          }
        })
      }
    } catch (err) {
      setSavingFinal(false)
      setSavingDraft(false)
      setOpen(false)
      setToastMessage({
        ...toastMessage,
        message: `Failed to save ${err.message}`,
      })
      logError(err)
    } finally {
      setfinalPayload([])
      setAddingDuplicate(false)
      setValidatedData([])
      setShouldSaveModule(false)
      setIsDuplicate(false)
      setIsFormEdited(false)
    }
  }

  useEffect(() => {
    if (finalPayload.length > 0 && finalPayload.length === formPayload.length) {
      if (hasDuplicates(finalPayload)) {
        setShouldSaveModule(false)
        setOpen(false)
        setfinalPayload([])
        setToastMessage({
          ...toastMessage,
          message: 'Confirm the forms do not have errors before submission',
        })
      } else {
        saveModule(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalPayload])

  useEffect(() => {
    if (addingDuplicate) {
      saveModule(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formPayload])
  useEffect(() => {
    if (addingDuplicate) {
      setFormPayload((pl) => [
        ...pl,
        {
          moduleId: dayjs().toISOString(),
          Member: [recId],
          isDraft: true,
        },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addingDuplicate])

  useEffect(() => {
    if (template && template.modules.length > 0) {
      updateModuleList(template, true)
    } else {
      setGettingTableMeta(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template])

  useEffect(() => {
    const form = TABLES.find((frm) => frm.name === activeModuleName)
    if (form) {
      setFormMeta({ ...form })
    }
    if (template?.moduleData[activeModuleName]) {
      setFormPayload(template?.moduleData[activeModuleName].filled_values)
    } else {
      setFormPayload([
        {
          moduleId: dayjs().toISOString(),
          Member: [recId],
          isDraft: true,
        },
      ])
    }
    setUpdatingActiveModule(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeModule,
    listOfTables,
    activeModuleName,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    template?.workflowId,
  ])

  useEffect(() => {
    if (formMeta) {
      setActiveModule(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template?.workflowId])

  useEffect(() => {
    if (toastMessage.message) {
      setIsToastOpen(true)
    } else {
      setIsToastOpen(false)
    }
  }, [toastMessage.message])

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const renderForm = () => {
    const moduleForm = (id: any, index: number) => {
      const disableForm = template?.completed || !formPayload[index]?.isDraft
      return (
        <FormSection
          modId={id}
          index={index}
          setFormError={setFormError}
          formError={formError}
          airtableMeta={airtableMeta}
          validatedData={validatedData}
          shouldSaveModule={shouldSaveModule}
          formMeta={formMeta}
          finalPayload={finalPayload}
          setValidatedData={setValidatedData}
          setfinalPayload={setfinalPayload}
          disabled={disableForm}
          setFormPayload={setFormPayload}
          setIsFormEdited={setIsFormEdited}
          saveModule={saveModule}
          setShouldSaveModule={setShouldSaveModule}
          isToastOpen={isToastOpen}
          formPayload={formPayload}
          activeModule={listOfTables[activeModule]}
          activeModuleName={activeModuleName}
          template={template}
          resetActiveModule={() => setActiveModule(0)}
        />
      )
    }
    if (hasDuplicateForm) {
      return (
        <div className={styles.forms}>
          {formPayload.map((mod: any, idx: number) => {
            const submitStatus = formPayload[idx]
            const displayModuleDeleteBtn =
              hasDuplicateForm && submitStatus.isDraft
            const moduleTitle = mod[DUPLICATE_DEFAULTS[activeModuleName]] || '-'
            return (
              <Accordion
                key={idx}
                expanded={expanded === mod.moduleId}
                onChange={handleChange(mod.moduleId)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <div>
                      <span
                        style={{
                          color: isModuleErrored(mod.moduleId)
                            ? 'var(--red-100)'
                            : '',
                        }}
                      >
                        <span className="d-flex">
                          {displayModuleDeleteBtn && (
                            <span style={{ margin: '3px 8px 0 0' }}>
                              <ConfirmButton
                                onConfirm={() => {
                                  const newData = formPayload.filter(
                                    (dat) => dat.moduleId !== mod.moduleId
                                  )
                                  saveModule(true, newData)
                                }}
                              />
                            </span>
                          )}
                          <span>{moduleTitle}</span>
                        </span>

                        <span style={{ marginLeft: '10px', fontSize: '10px' }}>
                          {isModuleErrored(mod.moduleId) && (
                            <>
                              Errors on this section!
                              <AlertTriangle
                                color="var(--red-100)"
                                width={12}
                                height={12}
                              />
                            </>
                          )}
                        </span>
                      </span>
                      <span>
                        {submitStatus.isDraft ? (
                          <p className={styles.statusText}>Pending</p>
                        ) : (
                          <p className={styles.statusText}>Submitted</p>
                        )}
                      </span>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {moduleForm(mod.moduleId, idx)}
                </AccordionDetails>
              </Accordion>
            )
          })}
        </div>
      )
    }
    return (
      <div className={styles.forms}>
        {moduleForm(formPayload[0].moduleId, 0)}
      </div>
    )
  }
  const handleStay = () => {
    setOpen(false)
    setTemplate(openedWorkflow)
  }

  const handleLeave = () => {
    setOpen(false)
    onFormClose(openedWorkflow.name, false)
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
  return (
    <>
      {toastMessage.type === 'GENERAL' && (
        <ToastNotification
          message={toastMessage}
          isOpen={isToastOpen}
          handleToastClose={closeToast}
        />
      )}
      {toastMessage.type === 'CONFIRM' && (
        <ToastNotification
          message={toastMessage}
          isOpen={isToastOpen}
          handleToastClose={closeToast}
          onReject={() => {
            setUpdatingActiveModule(true)
            setActiveModule(incomingIndex)
            setShouldSaveModule(false)
          }}
          onAccept={() => saveModule(true)}
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
                listOfTables.map((tbl, idx) => {
                  return (
                    <Button
                      className={`${styles.tblList} ${
                        activeModule === idx
                          ? styles.workflowTablesActive
                          : styles.workflowTables
                      }`}
                      variant="text"
                      key={idx}
                      onClick={() => setIncomingIndex(idx)}
                    >
                      <span>{formNames[tbl.name]}</span>
                      {!tbl.isDraft && (
                        <Check
                          color="var(--green-100)"
                          width={18}
                          height={18}
                        />
                      )}
                      {tbl.isDraft && saveWorkflowError && (
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
              {canAddModule && (
                <Button
                  className={styles.addModule}
                  onClick={() => {
                    if (isFormEdited) {
                      setToastMessage({
                        ...toastMessage,
                        message:
                          'Save the current form before creating another one',
                      })
                    } else {
                      setShouldDisplayModules(true)
                    }
                  }}
                  variant="text"
                  startIcon={<Add />}
                >
                  Add Form
                </Button>
              )}

              {shouldDisplayModules && (
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
                      onClick={displayModuleOptions}
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
            {canRenderFields && !isDuplicate && (
              <div className={`d-flex flex-between ${styles.stickyHeader}`}>
                <p className={styles.moduleName}>
                  {formNames[activeModuleName]}
                </p>
                <div className="d-flex">
                  {addingDuplicate && (
                    <div>
                      <LoadingIcon />
                    </div>
                  )}
                  {canAddDuplicate &&
                    includes(duplicates, activeModuleName, 0) && (
                      <Plus
                        className={styles.addModuleIcon}
                        onClick={() => {
                          setAddingDuplicate(true)
                        }}
                      />
                    )}
                  {displayModDelete && (
                    <ConfirmButton
                      onConfirm={() =>
                        deleteModule(activeModuleName, template?.workflowId)
                      }
                    />
                  )}
                </div>
              </div>
            )}
            {isDuplicate && (
              <div className={styles.fieldsLoader}>
                <LoadingIcon />
                <p className="text-small">Adding duplicate module</p>
              </div>
            )}
            {deletingModule && (
              <div className={styles.fieldsLoader}>
                <LoadingIcon />
                <p className="text-small">Removing Module</p>
              </div>
            )}
            {loadingFields && (
              <div className={styles.fieldsLoader}>
                <LoadingIcon />
                <p className="text-small">Loading Fields</p>
              </div>
            )}
            {isMissingModule && (
              <div className={styles.fieldsLoader}>
                <p className="text-small">
                  This workflow does not have a module
                </p>
              </div>
            )}
            {canRenderForm && renderForm()}
          </Grid>
        </Grid>
      </div>
      <div
        className={`${styles.btnContainer} d-flex flex-between p-8 ${
          !isWorkflowTemplate && 'flex-end'
        }`}
      >
        {template?.workflowId && (
          <Button
            className={styles.completeWorkflow}
            disabled={isCompleteButtonDisabled}
            onClick={() => {
              setsavingWorkflowStart(true)
              let canComplete = true
              for (const tbl of listOfTables) {
                if (tbl.isDraft) {
                  canComplete = false
                  break
                }
              }
              if (canComplete) {
                saveWorkflow({
                  variables: {
                    workflowId: template?.workflowId,
                    completed: true,
                    airtableId: template?.airtableId,
                  },
                })
                  .then((res) => {
                    if (res.data.updateWorkflow.status === 200) {
                      airtableFetch('caseId', 'post', {
                        id: template?.airtableId,
                        fields: {
                          Status: 'Resolved',
                        },
                      }).then(() =>
                        Toasts.showSuccessNotification(
                          'Workflow status successfully updated'
                        )
                      )
                      setTemplate({
                        ...res.data.updateWorkflow.workflow,
                        member,
                      })
                      setToastMessage({
                        ...toastMessage,
                        message: 'Workflow submitted successfully',
                      })
                      // setCurrentFormDisabled(true)
                      setIsFormEdited(false)
                      onRefetch(true)
                      analytics.track(`Guided Workflow`, {
                        event: 'Workflow completed',
                        beneId: recId,
                        staff: user ? user.email : '',
                        workflow: res.data.updateWorkflow.workflow,
                      })
                    } else {
                      setToastMessage({
                        ...toastMessage,
                        message: 'The changes have not been saved successfully',
                      })
                    }
                  })
                  .catch((err) => logError(`saveWorkflow: ${err.message}`))
              } else {
                setSaveWorkflowError(true)
                setToastMessage({
                  ...toastMessage,
                  message:
                    'You have to submit all forms to complete the workflow',
                })
              }

              setsavingWorkflowStart(false)
            }}
          >
            {isSubmitting ? (
              <div className="d-flex">
                <p className={styles.submitting}>Submitting</p> <LoadingIcon />{' '}
              </div>
            ) : (
              'Complete Workflow'
            )}
          </Button>
        )}
        <div className="d-flex flex-end">
          {isWorkflowTemplate && (
            <Button
              disabled={isSubmitDisabled}
              className={styles.saveDraftBtn}
              onClick={() => saveModule(true)}
            >
              {savingDraft ? (
                <div className="d-flex">
                  <p className={styles.submitting}>Submitting</p>{' '}
                  <LoadingIcon />{' '}
                </div>
              ) : (
                'Save Draft'
              )}
            </Button>
          )}
          <Button
            disabled={isSubmitDisabled}
            className={styles.submitModuleBtn}
            onClick={() => setShouldSaveModule(true)}
          >
            {savingFinal || shouldSaveModule ? (
              <div className="d-flex">
                <p className={styles.submitting}>Saving</p> <LoadingIcon />{' '}
              </div>
            ) : (
              'Submit form'
            )}
          </Button>
          <DialogContent sx={{ padding: 0, height: '90%' }}>
            {confirmSubmit()}
          </DialogContent>
        </div>
      </div>
    </>
  )
}

export default WorkflowPortal
