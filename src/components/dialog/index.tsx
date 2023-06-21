import React from 'react'
import PrimaryButton from 'src/components/buttons/primary'
import PrimaryModal from 'src/components/modals/primary'

type ConfirmationDialogProps = {
  setOpen: (value: boolean) => void
  open: boolean
  onConfirm: () => void
  onReject: () => void
  title?: string
  description?: string
  rejectText?: string
  confirmText?: string
}

function ConfirmationDialog({
  onConfirm,
  onReject,
  open,
  setOpen,
  title,
  description,
  rejectText,
  confirmText,
}: ConfirmationDialogProps) {
  return (
    <PrimaryModal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirmation-dialog"
      aria-describedby="confirmation-dialog"
    >
      <div className="font-rubik p-2 text-left">
        <h1 className="text-dark-blue-100 text-xl font-medium">
          {' '}
          {title || 'Close the form?'}{' '}
        </h1>
        <p className="font-medium text-base">
          {' '}
          {description ||
            'Are you sure you want to close the form? All unsaved data will be lost.'}{' '}
        </p>
        <div className="flex justify-start flex-col gap-2 mt-4">
          <PrimaryButton
            variant="outlined"
            onClick={onReject}
            className="text-blue-btn w-full"
          >
            {' '}
            {rejectText || 'No, continue filling form'}{' '}
          </PrimaryButton>
          <PrimaryButton
            variant="contained"
            onClick={onConfirm}
            color="error"
            className="w-full"
          >
            {' '}
            {confirmText || 'Yes, close form'}{' '}
          </PrimaryButton>
        </div>
      </div>
    </PrimaryModal>
  )
}

export default ConfirmationDialog
