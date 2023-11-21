import React from 'react'
import { Modal, ModalProps, Box } from '@mui/material'
import PrimaryButton from '../buttons/primary'

type PrimaryModalProps = ModalProps & {
  title?: string
}

function PrimaryModal(props: PrimaryModalProps) {
  return (
    <Modal {...props}>
      <Box className="bg-white-100 p-6 rounded-lg absolute inset-x-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto min-w-1/2 max-h-full">
        {props.title && (
          <header className="bg-white-100 flex justify-between items-center font-rubik text-xl font-semibold">
            {props.title}
            <PrimaryButton
              variant="text"
              onClick={(e) =>
                props.onClose && props.onClose(e, 'backdropClick')
              }
            >
              Close
            </PrimaryButton>
          </header>
        )}
        {props.children}
      </Box>
    </Modal>
  )
}

export default PrimaryModal
