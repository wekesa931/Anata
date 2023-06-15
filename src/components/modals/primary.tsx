import React from 'react'
import { Modal, ModalProps, Box } from '@mui/material'

type PrimaryModalProps = ModalProps

function PrimaryModal(props: PrimaryModalProps) {
  return (
    <Modal {...props}>
      <Box className="bg-white-100 p-6 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-scroll min-w-1/2 max-h-full">
        {props.children}
      </Box>
    </Modal>
  )
}

export default PrimaryModal
