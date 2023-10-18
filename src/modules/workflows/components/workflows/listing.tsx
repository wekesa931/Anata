import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { sortByCreatedAt, workflowStartDate } from 'src/modules/workflows/utils'
import { useWorkflowData } from 'src/modules/workflows/hooks/workflow-data'
import { Workflows as TWorkflowModel } from 'src/modules/workflows/db/models'
import { useMember } from 'src/context/member'
import Loader from '../loaders'

type WorkflowListProps = {
  openWorkflow: (workflow: TWorkflowModel) => void
  openWorkflowFromSearchParams: () => void
}

function WorkflowListItem({
  workflow,
  openWorkflow,
}: {
  workflow: TWorkflowModel
  openWorkflow: WorkflowListProps['openWorkflow']
}) {
  return (
    <div
      className={`mb-[5px] flex items-center justify-between rounded-lg bg-white p-2 font-sans hover:bg-dark-blue-10 `}
      key={workflow.id}
    >
      <div>
        <p className="flex grow text-left text-sm text-dark-blue-100">
          {workflow.workflowId}
        </p>
        <p className="flex grow text-left text-sm text-dark-blue-100 opacity-50">
          {workflowStartDate(workflow.createdAt)}
        </p>
      </div>
      <Button
        className="my-3 mx-0 flex flex-col items-center justify-start gap-2 rounded-lg bg-blue-10 py-[3px] px-[5px] font-rubik text-sm font-medium capitalize text-blue-100"
        variant="contained"
        onClick={() => openWorkflow(workflow)}
      >
        {workflow.isCompleted ? 'View' : 'Resume'}
      </Button>
    </div>
  )
}

function WorkflowList({
  openWorkflow,
  openWorkflowFromSearchParams,
}: WorkflowListProps) {
  const { incompleteWorkflows, completedWorkflows, hydrateWorkflows } =
    useWorkflowData()
  const { member } = useMember()

  const [isLoadingWorflows, setIsLoadingWorkflows] = useState<boolean>(false)

  const hasActiveWorkflows =
    !!incompleteWorkflows?.length || !!completedWorkflows?.length

  useEffect(() => {
    if (member) {
      setIsLoadingWorkflows(true)
      hydrateWorkflows()
        .then(() => {
          openWorkflowFromSearchParams()
        })
        .finally(() => {
          setIsLoadingWorkflows(false)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  return (
    <>
      {isLoadingWorflows ? (
        <Loader message="Loading Workflows" />
      ) : (
        <>
          {hasActiveWorkflows ? (
            <>
              <div className="overflow-scroll max-h-[300px]">
                <p className="mx-0 mt-4 mb-2.5 flex grow text-left text-sm font-medium text-dark-blue-100">
                  Ongoing
                </p>
                {incompleteWorkflows?.length ? (
                  sortByCreatedAt(incompleteWorkflows).map(
                    (workflow: TWorkflowModel) => (
                      <WorkflowListItem
                        workflow={workflow}
                        key={workflow.id}
                        openWorkflow={openWorkflow}
                      />
                    )
                  )
                ) : (
                  <p className="mx-0 mt-4 mb-2.5 flex grow text-left text-sm font-medium text-dark-blue-100">
                    No ongoing workflows
                  </p>
                )}
              </div>

              <div className="overflow-scroll max-h-[300px]">
                <p className="mx-0 mt-4 mb-2.5 flex grow text-left text-sm font-medium text-dark-blue-100">
                  Complete
                </p>
                {completedWorkflows?.length ? (
                  sortByCreatedAt(completedWorkflows).map(
                    (workflow: TWorkflowModel) => (
                      <WorkflowListItem
                        workflow={workflow}
                        openWorkflow={openWorkflow}
                        key={workflow.id}
                      />
                    )
                  )
                ) : (
                  <p className="mx-0 mt-4 mb-2.5 flex grow text-left text-sm font-medium text-dark-blue-100">
                    No completed workflows
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex h-3/4 flex-col items-center">
              <p className="mb-[5px] flex items-center justify-between rounded-lg bg-white-10 p-[5px]">
                No loaded workflow
              </p>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default WorkflowList
