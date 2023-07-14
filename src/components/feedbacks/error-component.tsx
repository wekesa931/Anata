import { Alert } from '@mui/material'
import React from 'react'

type ErrorComponentProps = {
  children?: React.ReactNode
  handleClose?: () => void
}

export function ErrorComponent({ children, handleClose }: ErrorComponentProps) {
  return (
    <Alert severity="error" onClose={handleClose} className="mt-2">
      {children || 'An error occurred'}
    </Alert>
  )
}

export default ErrorComponent
