import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Button from '@mui/material/Button'
import styles from './toast.component.css'

export type ToastMessage = {
  message: string | null
  type: 'GENERAL' | 'CONFIRM'
  time: number
}

type IProps = {
  message: ToastMessage
  isOpen: boolean
  handleToastClose: () => void
  onAccept?: () => void
  onReject?: () => void
}

export const defaultToastMessage: ToastMessage = {
  message: null,
  type: 'GENERAL',
  time: 5000,
}

function ToastNotification({
  message,
  isOpen,
  handleToastClose,
  onAccept,
  onReject,
}: IProps) {
  const action =
    onAccept || onReject ? (
      <>
        <Button
          className={`${styles.saveButton} ${styles.marginR}`}
          variant="contained"
          color="success"
          sx={{ color: 'white' }}
          size="small"
          onClick={() => {
            handleToastClose()
            onAccept && onAccept()
          }}
        >
          save
        </Button>
        <Button
          className={styles.saveButton}
          variant="contained"
          color="info"
          size="small"
          onClick={() => {
            handleToastClose()
            onReject && onReject()
          }}
        >
          Discard
        </Button>
      </>
    ) : null
  return (
    <div className={styles.toastBar}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isOpen}
        autoHideDuration={message.time}
        onClose={handleToastClose}
        message={message.message}
        key="bottomcenter"
        action={action}
      />
    </div>
  )
}

export default ToastNotification
