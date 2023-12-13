import React, { useEffect, useState } from 'react'
import type { User } from 'src/types/user'
import { useWorkflowData } from 'src/modules/workflows/hooks/workflow-data'
import dayjs from 'dayjs'
import Loading from 'src/components/loaders/centered'
import DataTable, { Column } from 'src/components/table/data-table'
import PrimaryButton from 'src/components/buttons/primary'
import { useNavigate } from 'react-router-dom'
import { useModuleAnalytics } from 'src/modules/analytics'
import { useNotifications } from 'src/context/notifications'

type Props = {
  user: User
}

function UpdatedDisplay({ value }: any) {
  return (
    <div className="font-rubik">
      <p className="text-grey-dark">{value?.updatedAt}</p>
      {value?.updatedBy && (
        <p className="text-grey-main">By: {value.updatedBy}</p>
      )}{' '}
    </div>
  )
}

function StartedDisplay({ value }: any) {
  return (
    <div className="font-rubik">
      <p className="text-grey-dark">{value?.createdAt}</p>
      {value?.createdBy && (
        <p className="text-grey-main">By: {value.createdBy}</p>
      )}{' '}
    </div>
  )
}

function ActionComponent({ value }: any) {
  const navigate = useNavigate()
  const { trackUserOpenedWorkflow } = useModuleAnalytics()
  const { notify } = useNotifications()

  const redirectToWorkflowModal = () => {
    if (!value?.member) {
      notify('Member ID not found')
      return
    }

    trackUserOpenedWorkflow(value)
    navigate(
      `/member/${value.member}?action=workflows&workflowId=${value.workflowId}`
    )
  }
  return (
    <PrimaryButton
      className="bg-orange-main text-white hover:bg-orange-500 normal-case w-full"
      onClick={redirectToWorkflowModal}
    >
      Open workflow
    </PrimaryButton>
  )
}

const columns: readonly Column[] = [
  {
    id: 'workflowId',
    label: 'Workflow ID',
    sortable: true,
  },
  { id: 'workflow_type', label: 'Workflow Type', sortable: true },
  {
    id: 'member_name',
    label: 'Member Name',
    sortable: true,
  },
  {
    id: 'createdAt',
    label: 'Date Started',
    sortable: true,
    valueComponent: StartedDisplay,
  },
  {
    id: 'updatedAt',
    label: 'Last Updated',
    sortable: true,
    valueComponent: UpdatedDisplay,
  },
  {
    id: 'action',
    label: 'Action',
    valueComponent: ActionComponent,
  },
]

function createData(
  workflowId: string,
  workflow_type: string,
  member_name: string,
  createdAt: Date,
  updatedAt: Date,
  updatedBy: string,
  createdBy: string,
  member: string
) {
  return {
    workflowId,
    workflow_type,
    member_name,
    createdAt: formatDate(createdAt).valueOf(),
    updatedAt: formatDate(updatedAt).valueOf(),
    updatedBy,
    createdBy,
    member,
  }
}

function formatDate(dateString: any) {
  const date = dayjs(dateString)
  const formattedDate = date.format('Do MMMM YYYY')
  return formattedDate
}

function getMemberName(person: any = {}) {
  if (!person || Object.keys(person).length === 0) {
    return 'Unknown member'
  }

  const { firstName, middleName, lastName } = person
  return `${firstName}${middleName ? ` ${middleName}` : ''}${
    lastName ? ` ${lastName}` : ''
  }`
}

function WorkflowDashboardView({ user }: Props) {
  const [rows, setRows] = useState<any[]>([])
  const { hydrateWorkflows, incompleteWorkflows } = useWorkflowData()
  const [isLoadingOngoingWorflows, setIsLoadingOngoingWorkflows] =
    useState<boolean>(false)

  const addedBy = user?.email

  useEffect(() => {
    if (addedBy) {
      setIsLoadingOngoingWorkflows(true)
      hydrateWorkflows('', addedBy).finally(() => {
        if (incompleteWorkflows && incompleteWorkflows.length > 0) {
          const updatedRows = incompleteWorkflows.map((workflow: any) =>
            createData(
              workflow.workflowId,
              workflow.template,
              getMemberName(workflow.memberData),
              workflow.createdAt,
              workflow.updatedAt,
              workflow.updatedBy?.name ?? '',
              workflow.createdBy?.name ?? '',
              workflow.member
            )
          )
          setRows(updatedRows)
        }
        setIsLoadingOngoingWorkflows(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, incompleteWorkflows])

  return (
    <div className="p-1 overflow-scroll">
      {isLoadingOngoingWorflows ? (
        <div className="flex items-center justify-center flex-col mt-[15%] mb-[15%]">
          <Loading message="Loading Ongoing Workflows" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={rows}
          defaultSortColumn="updatedAt"
          title="My Ongoing Workflows"
          groupColumns={['member_name', 'workflow_type']}
          loading={isLoadingOngoingWorflows}
          canExpandRow={false}
        />
      )}
    </div>
  )
}

export default WorkflowDashboardView
