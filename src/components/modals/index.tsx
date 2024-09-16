import React, { useState } from 'react'
import { Minimize, Maximize } from 'react-feather'
import { Dialog } from '@airtable/blocks/ui'
import CloseIcon from 'src/assets/img/icons/close_16.svg'

function Modal({
  open,
  setModalOpen,
  heading,
  height = '560px',
  attachmentUrl,
  children,
  width = '480px',
  closeOption = true,
}: any) {
  const [maximize, setMaximize] = useState(false)
  const handleClose = () => {
    if (closeOption) {
      setModalOpen(false)
    }
  }
  return (
    <div data-testid="modal">
      {open && (
        <Dialog
          onClose={handleClose}
          width={maximize ? '100%' : width}
          height={maximize ? '100%' : height}
        >
          <div className="d-flex flex-align-center">
            <div className="full-width">{heading}</div>
            {closeOption && (
              <button
                className="btn-icon"
                onClick={(e) => {
                  e.stopPropagation()
                  setModalOpen(false)
                }}
              >
                <CloseIcon />
              </button>
            )}
            {attachmentUrl && (
              <>
                <button
                  className="btn-icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMaximize(!maximize)
                  }}
                >
                  {!maximize ? <Maximize /> : <Minimize />}
                </button>

                <button className="btn-icon">
                  <a
                    href={attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </button>
              </>
            )}
          </div>
          <div>{children}</div>
        </Dialog>
      )}
    </div>
  )
}

export default Modal
