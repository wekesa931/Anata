import React, { useEffect, useState } from 'react'
import type { User } from 'src/types/user'
import { useWorkflowData } from 'src/modules/workflows/hooks/workflow-data'
import dayjs from 'dayjs'
import Loading from 'src/components/loaders/centered'
import DataTable, { Column } from 'src/components/table/data-table'
import { useModuleAnalytics } from 'src/modules/analytics'
import { Link } from 'react-router-dom'

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
  const { trackUserOpenedWorkflow } = useModuleAnalytics()

  const handleClick = () => {
    trackUserOpenedWorkflow(value)
  }
  return (
    <Link
      onClick={handleClick}
      to={`/member/${value?.member}?action=workflows&workflowId=${value?.workflowId}`}
      className="font-rubik bg-orange-100 text-xs normal-case text-white hover:bg-orange-100 hover:text-white shadow-none px-4 py-1 rounded-md"
      rel="noopener noreferrer"
      target="_blank"
    >
      {' '}
      Open workflow{' '}
    </Link>
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
          groupColumns={[
            { label: 'None', value: '' },
            { label: 'Member Name', value: 'member_name' },
            { label: 'Workflow Type', value: 'workflow_type' },
          ]}
          loading={isLoadingOngoingWorflows}
          canExpandRow={false}
        />
      )}
    </div>
  )
}

export default WorkflowDashboardView
