import React, { useState } from 'react'
import { Minimize, Maximize } from 'react-feather'
import { Dialog } from '@airtable/blocks/ui'
import CloseIcon from '../../../assets/img/icons/close_16.svg'

function Modal({
  open,
  setModalOpen,
  heading,
  height = '560px',
  attachmentUrl,
  children,
}: any) {
  const [maximize, setMaximize] = useState(false)
  return (
    <div data-testid="modal">
      {open && (
        <Dialog
          onClose={() => setModalOpen(false)}
          width={maximize ? '100%' : '480px'}
          height={maximize ? '100%' : height}
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
