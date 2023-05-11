import React, { useEffect } from 'react'
import { AlertCircle, AlertTriangle, CheckCircle } from 'react-feather'

type AlertType = 'success' | 'info' | 'error'

export type TAlertMessage = {
  type: AlertType
  message: string
  timeout?: number
}

type AlertProps = {
  hide: () => void
} & TAlertMessage

function AlertIcon({ type }: any) {
  switch (type) {
    case 'success':
      return <CheckCircle />
    case 'error':
      return <AlertTriangle />
    default:
      return <AlertCircle />
  }
}

export function Alert({ type, message, timeout = 10000, hide }: AlertProps) {
  useEffect(() => {
    setTimeout(() => {
      hide()
    }, timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getClassName = () => {
    switch (type) {
      case 'success':
        return 'background-green-10 text-green-100'
      case 'error':
        return 'background-red-10 text-red-100'
      default:
        return 'background-[#efeff3] text-dark-blue-100'
    }
  }

  return (
    <div
      className={`relative z-10 mt-[-2.5rem] flex w-full items-center justify-start rounded-lg p-2 text-left font-rubik text-sm  ${getClassName()}`}
    >
      <AlertIcon type={type} />
      {message}
    </div>
  )
}

export default Alert
