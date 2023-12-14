import React from 'react'
import { UserTask, Priority } from 'src/modules/tasks/types'
import { Link } from 'react-router-dom'
import PrimaryButton from 'src/components/buttons/primary'

type Props = {
  value: UserTask
}

export function TaskPriorityComponent({ value }: Props) {
  const getColor = (priority?: Priority) => {
    switch (priority) {
      case Priority.P0:
        return 'bg-status-terminated'
      case Priority.P1:
        return 'bg-status-provisioned'
      default:
        return 'bg-dark-blue-50'
    }
  }
  return (
    <p
      className={`flex font-rubik items-center justify-center text-center text-white rounded-2xl max-w-[150px] ${getColor(
        value?.priority
      )}`}
    >
      {value?.priority}
    </p>
  )
}

export function StatusComponent({ value }: Props) {
  const getColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'complete':
        return 'text-green-100 border-green-100'
      case 'in progress':
        return 'text-orange-100 border-orange-100'
      case 'not started':
        return 'text-blue-70 border-blue-70'
      case 'cancelled':
        return 'text-status-terminated border-status-terminated'
      default:
        return 'text-blue-70 border-blue-70'
    }
  }
  return (
    <p
      className={`flex items-center font-rubik justify-center border rounded-2xl text-center max-w-[100px] ${getColor(
        value?.status
      )}`}
    >
      {value?.status}
    </p>
  )
}

export function ActionComponent({ value }: any) {
  return (
    <PrimaryButton className="bg-orange-100 text-xs font-rubik normal-case text-white hover:bg-orange-100 hover:text-white">
      <Link to={`/member/${value?.antaraId}`} className="font-rubik">
        {' '}
        Open dashboard{' '}
      </Link>
    </PrimaryButton>
  )
}
