import React from 'react'
import { Dialog } from '@airtable/blocks/ui'
import CloseIcon from '../../../assets/img/icons/close_16.svg'

const Modal = ({
  open,
  setModalOpen,
  heading,
  height = '560px',
  children,
}: any) => {
  return (
    <div data-testid="modal">
      {open && (
        <Dialog
          onClose={() => setModalOpen(false)}
          width="480px"
          height={height}
        >
          <div className="d-flex flex-align-center">
            <div className="full-width">{heading}</div>
            <button
              className="btn-icon"
              onClick={(e) => {
                e.stopPropagation()
                setModalOpen(false)
              }}
            >
              <CloseIcon />
            </button>
          </div>
          <>{children}</>
        </Dialog>
      )}
    </div>
  )
}

export default Modal
