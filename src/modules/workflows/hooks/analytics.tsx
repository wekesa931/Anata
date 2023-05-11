import useAnalytics from 'src/hooks/analytics'
import { TWorkflow } from 'src/modules/workflows/types'

type ModuleData = Record<string, any> | Array<Record<string, any>>

export const useWorkflowAnalytics = () => {
  const workflowAnalytics = useAnalytics('Guided Workflow')

  const trackWorkflowPageOpened = () => {
    workflowAnalytics.track('Guided workflows page opened')
  }

  const trackWorkflowCreated = (workflow: any) => {
    workflowAnalytics.track('Guided workflow created', {
      workflow,
    })
  }

  const trackFormAdded = (workflow: TWorkflow, moduleName: string) => {
    workflowAnalytics.track('Form added', {
      workflow,
      moduleName,
    })
  }

  const trackWorkflowModuleEvent = (
    event: string,
    workflow: any,
    moduleName: string,
    moduleData: ModuleData
  ) => {
    workflowAnalytics.track(event, {
      workflow,
      moduleName,
      moduleData,
    })
  }

  const trackModuleDataSaved = (
    workflow: any,
    moduleName: string,
    moduleData: ModuleData,
    draft = false
  ) => {
    const event = draft ? 'Module draft saved' : 'Module data saved'
    trackWorkflowModuleEvent(event, workflow, moduleName, moduleData)
  }

  const trackAirtableSaveFailed = (
    workflow: any,
    moduleName: string,
    moduleData: ModuleData
  ) => {
    trackWorkflowModuleEvent(
      'Form saved to airtable failed',
      workflow,
      moduleName,
      moduleData
    )
  }

  const trackAirtableSaveSucceeded = (
    workflow: any,
    moduleName: string,
    moduleData: ModuleData
  ) => {
    trackWorkflowModuleEvent(
      'Form saved to airtable succeeded',
      workflow,
      moduleName,
      moduleData
    )
  }

  const trackFormDeleted = (workflow: TWorkflow, moduleName: string) => {
    workflowAnalytics.track('Form deleted', {
      workflow,
      moduleName,
    })
  }

  const trackWorkflowCompleted = (workflow: TWorkflow) => {
    workflowAnalytics.track('Workflow completed', {
      workflow,
    })
  }

  return {
    trackWorkflowPageOpened,
    trackWorkflowCreated,
    trackFormAdded,
    trackModuleDataSaved,
    trackAirtableSaveFailed,
    trackAirtableSaveSucceeded,
    trackFormDeleted,
    trackWorkflowCompleted,
  }
}

export default useWorkflowAnalytics
