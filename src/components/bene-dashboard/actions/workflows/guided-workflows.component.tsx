import React, { useState, useEffect, Fragment } from 'react'
import { Button } from '@mui/material'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'
import styles from './guided-workflows.component.css'
import DropDownComponent from '../../../../helpers/dropdown-helper'
import {
  CREATE_WORKFLOW,
  GET_ALL_TEMPLATES,
  GET_WORKFLOWS,
  SAVE_WORKFLOW,
} from '../../../../gql/workflows'
import ToastNotification, {
  defaultToastMessage,
  ToastMessage,
} from '../../../utils/toast/toast-notification'
import Toasts from '../../../../helpers/toast'
import { useMember } from '../../../../context/member.context'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import logError from '../../../utils/Bugsnag/Bugsnag'
import analytics from '../../../../helpers/segment'
import { useUser } from '../../../../context/user-context'
import { useFormPortal } from '../../../../context/forms-context'
import { IWorkflow } from './workflow-types'
import airtableFetch from '../../../../resources/airtable-fetch'

function GuidedWorkflows() {
  const { recId } = useParams()
  const { member } = useMember()
  const user = useUser()
  const [toastMessage, setToastMessage] =
    useState<ToastMessage>(defaultToastMessage)
  const [savingToAirtable, setSavingToAirtable] = useState(false)
  const [isToastOpen, setIsToastOpen] = useState(false)
  const [worflowOptionsOpen, setWorflowOptionsOpen] = useState(false)
  const [workflowsWithGrouping, setWorkflowsWithGrouping] = useState<any>(null)
  const [loadedTemplate, setloadedTemplate] = useState<any>(null)
  const [workflowOptions, setWorkflowOptions] = useState<string[]>([])
  const [templateName, setTemplateName] = useState<string | null>(null)
  const { addOpenForm, onRefetch, shouldRefetch, openedForms } = useFormPortal()

  const [loadWorkflows, { loading: gettingWorkflows, refetch }] = useLazyQuery(
    GET_WORKFLOWS,
    {
      onCompleted: (loadedWorkflows) => {
        if (loadedWorkflows) {
          const allWorkflows = loadedWorkflows?.workflows?.edges.map(
            (fl: { node: IWorkflow }) => fl.node
          )
          if (allWorkflows.length > 0) {
            const groupedWorkflows = groupBy(allWorkflows, 'completed')
            setWorkflowsWithGrouping({
              incomplete: groupedWorkflows.false || [],
              complete: groupedWorkflows.true || [],
            })
          }
          onRefetch(false)
        }
      },
      onError: (gettingWorkflowError) => {
        if (gettingWorkflowError) {
          logError(gettingWorkflowError)
        }
      },
    }
  )

  const [saveWorkflow, { loading: savingWorkflow }] = useMutation(SAVE_WORKFLOW)
  const [createWorkflow, { loading }] = useMutation(CREATE_WORKFLOW)
  const [getTemplates, { loading: gettingTemplateOptions }] = useLazyQuery(
    GET_ALL_TEMPLATES,
    {
      onCompleted: (templateOptions) => {
        if (templateOptions) {
          const templateNames = templateOptions.workflowTemplates.edges.map(
            (temp: { node: { name: string } }) => temp.node.name
          )
          setWorkflowOptions(templateNames)
        }
      },
    }
  )

  useEffect(() => {
    if (member) {
      loadWorkflows({
        variables: { memberId: member['Antara ID'], workflowId: '' },
      })
    }

    getTemplates({
      variables: {
        name: '',
        status: 'Active',
      },
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])
  const noRecordsRender = () => (
    <div className={styles.loader}>
      <p className={`d-flex flex-between ${styles.ongoingContainer}`}>
        No loaded workflow
      </p>
    </div>
  )
  const viewWorkflow = (payload: any) => {
    const isWorkflowOpen = openedForms.find((fm: any) => fm.workflowId)
    if (isWorkflowOpen)
      setToastMessage({
        ...toastMessage,
        message: 'Close the current workflow before resuming another',
      })
    addOpenForm({ ...payload, member })
    setTemplateName(null)
  }
  const closeToast = () => {
    setToastMessage(defaultToastMessage)
  }
  useEffect(() => {
    if (shouldRefetch) {
      refetch && refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRefetch])
  useEffect(() => {
    if (toastMessage.message) {
      setIsToastOpen(true)
    } else {
      setIsToastOpen(false)
    }
  }, [toastMessage.message])
  useEffect(() => {
    if (loadedTemplate) {
      viewWorkflow(loadedTemplate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedTemplate])

  useEffect(() => {
    analytics.track(`Guided Workflow`, {
      event: 'Guided workflows page opened',
      beneId: recId,
      staff: user ? user.email : '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (templateName) {
      createWorkflow({
        variables: {
          templateName,
          memberId: member['Antara ID'],
        },
      })
        .then((res) => {
          setSavingToAirtable(true)
          airtableFetch('create/caseId', 'post', {
            fields: {
              ID: res.data.createWorkflow.workflow.workflowId,
              Status: 'Ongoing',
              Members: [recId],
              createdBy: {
                email: user?.email,
                name: user?.name,
              },
              updatedBy: {
                email: user?.email,
                name: user?.name,
              },
            },
          }).then((response) => {
            setSavingToAirtable(false)
            if (Array.isArray(response)) {
              Toasts.showErrorNotification(
                'The workflow has not been saved in airtable'
              )
              logError(response)
            } else {
              saveWorkflow({
                variables: {
                  workflowId: res.data.createWorkflow.workflow.workflowId,
                  airtableId: response.id,
                  completed: false,
                },
              }).then((re) => {
                setloadedTemplate(re.data.updateWorkflow.workflow)
                Toasts.showSuccessNotification('Workflow created successfully')
                analytics.track(`Guided Workflow`, {
                  event: 'Workflow created',
                  beneId: recId,
                  staff: user ? user.email : '',
                  workflow: re.data.updateWorkflow.workflow,
                })
              })
            }
          })
          refetch()
        })
        .catch((e) => {
          logError(e)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateName])

  const validTemplateList = () => {
    if (workflowOptions.length > 0) {
      return (
        <>
          {workflowOptions.map((temp: string) => (
            <Button
              key={temp}
              className={styles.workflowOptions}
              variant="text"
              onClick={() => {
                setTemplateName(temp)
              }}
            >
              {temp}
            </Button>
          ))}
        </>
      )
    }
    if (gettingTemplateOptions) {
      return (
        <div className={styles.loader}>
          <LoadingIcon />
          <p className="text-small">Getting Template Options</p>
        </div>
      )
    }
    return <>No templates loaded</>
  }

  const templateList =
    loading || savingWorkflow || savingToAirtable ? (
      <div className={styles.loader}>
        <LoadingIcon />
        <p className="text-small">Creating Template</p>
      </div>
    ) : (
      validTemplateList()
    )
  const workflowStartDate = (date: Date) => {
    const difference = Math.floor(dayjs().diff(dayjs(date), 'hours') / 24)
    if (difference < 1) {
      return `Started less than a day ago`
    }
    if (difference < 7) {
      return `Started ${difference} days ago`
    }
    if (difference < 14) {
      return `Started a week ago`
    }
    return `started on ${dayjs(date).format('DD/MMM/YYYY')}`
  }

  const renderWorkflows = () => {
    const flowType = {
      incomplete: 'Ongoing',
      complete: 'Complete',
    }
    const render =
      workflowsWithGrouping &&
      Object.keys(workflowsWithGrouping).map((key, idx: number) => {
        return (
          <Fragment key={idx}>
            <p className={styles.flowHeader}>{flowType[key]}</p>
            {workflowsWithGrouping[key].length === 0 ? (
              noRecordsRender()
            ) : (
              <div
                className={
                  workflowsWithGrouping[key].length > 3
                    ? styles.workflowList
                    : ''
                }
              >
                {workflowsWithGrouping[key].map((workflow: IWorkflow) => (
                  <div
                    key={workflow.id}
                    className={`d-flex flex-between ${styles.ongoingContainer}`}
                  >
                    <div>
                      <p className={styles.flowId}>{workflow.workflowId}</p>
                      <p className={styles.flowResumeDate}>
                        {workflowStartDate(workflow.createdAt)}
                      </p>
                    </div>
                    <Button
                      className={styles.workflowBtn}
                      variant="contained"
                      onClick={() => viewWorkflow(workflow)}
                    >
                      {workflow.completed ? 'View' : 'Resume'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Fragment>
        )
      })
    return (
      <>
        {gettingWorkflows && (
          <div className={styles.loader}>
            <LoadingIcon />
            <p className="text-small">Loading Workflows</p>
          </div>
        )}
        {!gettingWorkflows && !workflowsWithGrouping && noRecordsRender()}
        {render}
      </>
    )
  }

  return (
    <div>
      <ToastNotification
        message={toastMessage}
        isOpen={isToastOpen}
        handleToastClose={closeToast}
      />
      <h1 className={styles.header}>Workflows</h1>
      <p className={styles.workflowHeaderText}>
        Create a new workflow with custom set of forms
      </p>
      <div className="p-relative new-workflow">
        <Button
          id={styles.newWorkflowBtn}
          variant="text"
          onClick={() => setWorflowOptionsOpen(true)}
        >
          Create new workflow
        </Button>
        <div className={styles.workflowDropDownContainer}>
          {worflowOptionsOpen && (
            <DropDownComponent
              isVisible={worflowOptionsOpen}
              setvisibility={setWorflowOptionsOpen}
            >
              <div className={styles.workflowDropDown}>{templateList}</div>
            </DropDownComponent>
          )}
        </div>
      </div>
      <div>{renderWorkflows()}</div>
    </div>
  )
}

export default GuidedWorkflows
