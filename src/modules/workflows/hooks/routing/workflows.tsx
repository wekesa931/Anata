import React from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useNotifications } from 'src/context/notifications'
import useWorkflowData from 'src/modules/workflows/hooks/workflow-data'
import { Workflows as TWorkflowModel } from '../../db/models'

type WorkflowRouterProps = {
  workflow: TWorkflowModel | null
  openWorkflow: (workflow: TWorkflowModel) => void
  closeWorkflow: () => void
  copyWorkflowLink: (workflow: TWorkflowModel) => void
  openWorkflowFromSearchParams: () => void
}

export const useWorkflowRouter = (): WorkflowRouterProps => {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [workflow, setWorkflow] = React.useState<TWorkflowModel | null>(null)
  const { notify } = useNotifications()
  const { findWorkflow } = useWorkflowData()

  const getWorkflowIdFromSearchParams = () => {
    return searchParams.get('workflowId')
  }

  const setWorkflowIdInSearchParams = (workflowId: string | null) => {
    if (workflowId) {
      searchParams.set('workflowId', workflowId)
    } else {
      searchParams.delete('workflowId')
    }
    setSearchParams(searchParams)
  }

  const openWorkflow = (newWorkflow: TWorkflowModel) => {
    const isWorkflowOpen = !!workflow
    if (isWorkflowOpen) {
      notify('Close the current workflow before resuming another')
    } else if (newWorkflow) {
      const { workflowId } = newWorkflow
      const currentWorkflowId = getWorkflowIdFromSearchParams()
      if (workflowId !== currentWorkflowId) {
        setWorkflowIdInSearchParams(workflowId)
      }

      setWorkflow(newWorkflow)
    }
  }

  const openWorkflowFromSearchParams = () => {
    const workflowId = getWorkflowIdFromSearchParams()
    if (workflowId) {
      findWorkflow(workflowId)
        .then((result: TWorkflowModel | null) => {
          if (result) {
            openWorkflow(result)
          } else {
            notify(`Workflow ${workflowId} not found`)
          }
        })
        .catch((error: any) => {
          notify(`Failed to load workflow ${workflowId}: ${error.message}`)
        })
    }
  }

  const closeWorkflow = () => {
    setWorkflow(null)
    setWorkflowIdInSearchParams(null)
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    })
  }

  const copyWorkflowLink = (w: TWorkflowModel) => {
    // remove the formIds and formName from the search params and replace workflowId with workflow.workflowId
    const link = window.location.href
      .replace(/formIds=[^&]*/, '')
      .replace(/formName=[^&]*/, '')
      .replace(/workflowId=[^&]*/, `workflowId=${w.workflowId}`)
    navigator.clipboard.writeText(link)
  }

  return {
    workflow,
    openWorkflow,
    closeWorkflow,
    copyWorkflowLink,
    openWorkflowFromSearchParams,
  }
}

export default useWorkflowRouter
