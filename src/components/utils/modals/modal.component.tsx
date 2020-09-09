import React, { useEffect } from 'react'
import { Dialog, Heading } from '@airtable/blocks/ui'

const Modal = ({ open, setModalOpen, heading, children }: any) => {
  useEffect(() => {
    setModalOpen(open)
  })
  return (
    <div data-testid="modal">
      {open && (
        <Dialog
          onClose={() => setModalOpen(false)}
          width="480px"
          height="560px"
        >
          <Dialog.CloseButton />
          <Heading>{heading}</Heading>
          {children}
        </Dialog>
      )}
    </div>
  )
}

export default Modal
