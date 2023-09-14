import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { Link2, Monitor } from 'react-feather'
import Box from '@mui/material/Box'
import DropDownComponent from 'src/components/dropdown'
import styles from 'src/modules/udm/files.component.css'

type Props = {
  open: boolean
  setOpen: (isOpen: boolean) => void
  docLink?: string
  setdocLink: (docLink: string | undefined) => void
  uploadDisabled: () => boolean
  openFileSelector: () => void
  setConfirmationDrawerHelper: (confirmationDrawerHelper: boolean) => void
  clear: () => void
}

export function UploadOptions({
  open,
  setOpen,
  docLink,
  setdocLink,
  uploadDisabled,
  openFileSelector,
  setConfirmationDrawerHelper,
  clear,
}: Props) {
  const [openLinkInput, setOpenLinkInput] = useState(false)
  const showUploadLink = false

  const handleFileSelector = () => {
    openFileSelector()
    setOpen(false)
    setdocLink(undefined)
  }
  const handleUpload = () => {
    // this is important since the file is not cleared by default after choosing a file, even if they did not upload it
    clear()
    setConfirmationDrawerHelper(true)
    setOpen(false)
    setOpenLinkInput(false)
  }

  const handleCancel = () => {
    setOpen(false)
    setdocLink(undefined)
    setOpenLinkInput(false)
  }

  return (
    <DropDownComponent isVisible={open} setvisibility={setOpen}>
      <div className={styles.fileUploadOptions}>
        <Box
          sx={{
            borderBottom: '1px solid #e8eaed',
            bgcolor: 'background.paper',
          }}
        >
          {openLinkInput ? (
            <p className={`${styles.upText} ${styles.paste}`}>Paste Link URL</p>
          ) : (
            <div>
              {showUploadLink && (
                <Button
                  onClick={() => {
                    setOpenLinkInput(true)
                  }}
                >
                  <Link2 />
                  <div className={`d-flex ${styles.uploadText}`}>
                    <p className={styles.upText}>Upload via Link</p>
                    <p className={styles.upTextSummary}>
                      Google Drive, Dropbox
                    </p>
                  </div>
                </Button>
              )}
            </div>
          )}
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #e8eaed',
            bgcolor: 'background.paper',
          }}
        >
          {openLinkInput ? (
            <>
              <input
                className={styles.input}
                type="text"
                placeholder="https://drive.google.com/file/d/"
                value={docLink}
                onChange={(e) => setdocLink(e.target.value)}
              />
              {docLink && uploadDisabled() && (
                <p className={styles.urlError}>Not a valid url</p>
              )}
            </>
          ) : (
            <Button onClick={handleFileSelector}>
              <Monitor />
              <div className={`d-flex ${styles.uploadText}`}>
                <p className={styles.upText}>Upload from your computer</p>
                <p className={styles.upTextSummary}>PDF, DOC, XLS</p>
              </div>
            </Button>
          )}
        </Box>
        {openLinkInput && (
          <Box className="d-flex flex-end" sx={{ bgcolor: 'background.paper' }}>
            <Button
              disabled={uploadDisabled()}
              className={styles.upBtn}
              onClick={handleUpload}
            >
              Upload
            </Button>
            <Button
              className={styles.upBtn}
              color="error"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        )}
      </div>
    </DropDownComponent>
  )
}
