import React, { useEffect } from 'react'
import { AlertCircle, AlertTriangle, CheckCircle } from 'react-feather'
import styles from './alert.component.css'

type AlertType = 'success' | 'info' | 'error'

export type TAlert = {
  type: AlertType
  message: string
  timeout?: number
}

type AlertProps = {
  hide: () => void
} & TAlert

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

function Alert({ type, message, timeout = 10000, hide }: AlertProps) {
  useEffect(() => {
    setTimeout(() => {
      hide()
    }, timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getClassName = () => {
    switch (type) {
      case 'success':
        return styles.sucessAlert
      case 'error':
        return styles.errorAlert
      default:
        return styles.infoAlert
    }
  }

  return (
    <div className={`flex-start ${styles.alertContainer}  ${getClassName()}`}>
      <AlertIcon type={type} />
      {message}
    </div>
  )
}

export default Alert
