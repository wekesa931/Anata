import React, { useEffect } from 'react'
import { Button, Dialog, Heading } from '@airtable/blocks/ui'

const Modal = ({ open, setModalOpen, heading, children }: any) => {
  useEffect(() => {
    setModalOpen(open)
  })
  return (
    <>
      {open && (
        <Dialog onClose={() => setModalOpen(false)} width="480px">
          <Dialog.CloseButton />
          <Heading>{heading}</Heading>
          {children}
          <div style={{ float: 'right' }}>
            <Button onClick={() => setModalOpen(false)}>Close</Button>
          </div>
        </Dialog>
      )}
    </>
  )
}

export default Modal
