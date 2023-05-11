import React, { useEffect } from 'react'
import WorkflowTemplateList from 'src/modules/workflows/components/templates/listing'
import WorkflowList from 'src/modules/workflows/components/workflows/listing'
import { useWorkflowAnalytics } from 'src/modules/workflows/hooks/analytics'
import { useWorkflowRouter } from 'src/modules/workflows/hooks/routing/workflows'
import WorkflowPortal from './workflow-portal'

function WorkflowPage() {
  const { trackWorkflowPageOpened } = useWorkflowAnalytics()
  const { workflow, openWorkflow, closeWorkflow } = useWorkflowRouter()

  useEffect(() => {
    trackWorkflowPageOpened()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <WorkflowTemplateList openWorkflow={openWorkflow} />
      <WorkflowList openWorkflow={openWorkflow} />
      {workflow && (
        <WorkflowPortal workflow={workflow} closeWorkflow={closeWorkflow} />
      )}
    </div>
  )
}

export default WorkflowPage
