import React, { useState, useEffect } from 'react'
import { Document, Page, Outline } from 'react-pdf/dist/esm/entry.webpack'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useMutation } from '@apollo/client'
import { AlertTriangle, Download, Edit, Lock, X } from 'react-feather'
import { Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { ENCRYPT_FILE, GENERATE_FILE_LINK } from './files.gql'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'

type IFiles = {
  addedBy: string
  antaraId: string
  category: string
  description: string
  driveUrl: string
  title: string
  fileSize: number
  id: string
  mimeType: string
  otherMetadata: any
  storageKey: string
  updatedAt: Date
}

function FilePasswordEncrypt(props) {
  const [open, setOpen] = useState(true)
  const [encyptFile] = useMutation(ENCRYPT_FILE)

  const [password, setPassword] = useState('')
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const { file, onEncyptionDone } = props

  const handleClose = () => {
    setOpen(false)
    onEncyptionDone()
  }

  const handleEncyption = () => {
    encyptFile({
      variables: {
        password,
        fileId: file.id,
      },
    })
      .then((res) => {
        if (!res.errors) {
          const { link } = res?.data?.encryptFile
          const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
          if (newWindow) newWindow.opener = null
        }
      })
      .finally(() => onEncyptionDone())
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Encypt {file.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To encypt this file with a password, please enter the password you
          would like to use.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          type="password"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEncyption}>Encrypt</Button>
      </DialogActions>
    </Dialog>
  )
}

export default function PdfViewer(props) {
  const { file, onFileClosed } = props
  const [numPages, setNumPages] = useState(null)
  const [displayFile, setDisplayFile] = useState<IFiles>(file)
  const [isEncypting, setIsEncypting] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)
  const [generateAccessFileLink] = useMutation(GENERATE_FILE_LINK)

  useEffect(() => {
    if (file.id) {
      generateAccessFileLink({
        variables: {
          duration: 5000,
          fileId: file.id,
        },
      }).then((res) => {
        if (!res.errors) {
          const { link: url } = res?.data?.generateLink
          setDisplayFile({ ...file, url })
        }
      })
    }
  }, [file, generateAccessFileLink])

  function onDocumentLoadSuccess({ docNumPages }) {
    setNumPages(docNumPages)
  }
  const [open, setOpen] = React.useState(true)
  const handleClose = () => {
    onFileClosed()
    setOpen(false)
  }

  const handleEncyptFile = () => {
    // Show password interface
    setIsEncypting(true)
  }

  const downloadFile = () => {
    const newWindow = window.open(
      displayFile.url,
      '_blank',
      'noopener,noreferrer'
    )
    if (newWindow) newWindow.opener = null
  }

  const editFile = () => {
    const newWindow = window.open(
      file.driveUrl,
      '_blank',
      'noopener,noreferrer'
    )
    if (newWindow) newWindow.opener = null
  }

  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber)
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const fileTitle = (title: string) => (
    <Typography className="file-title">{title}</Typography>
  )
  const fileContent = (content: string) => (
    <Typography className="file-title-content">{content}</Typography>
  )
  const Loader = () => (
    <div className="d-flex flex-direction-column flex-align-center margin-top-32">
      <LoadingIcon />
      <p className="text-small">Loading File</p>
    </div>
  )
  const LoadingError = () => (
    <div className="d-flex flex-direction-column flex-align-center margin-top-32">
      <AlertTriangle />
      <p className="text-heading-5">Failed to load PDF file.</p>
    </div>
  )

  return (
    <>
      {isEncypting && (
        <FilePasswordEncrypt
          file={file}
          onEncyptionDone={() => setIsEncypting(false)}
        />
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        className="pdf-dialog"
        fullWidth
        maxWidth="lg"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          className="d-flex align-center flex-between"
        >
          {displayFile.title}
          <DialogActions>
            <Button autoFocus onClick={handleEncyptFile}>
              <Lock className="file-action-btn" />
              <Typography className="file-action-button-text">
                Encrypt
              </Typography>
            </Button>
            {displayFile.driveUrl && (
              <Button autoFocus onClick={editFile}>
                <Edit className="file-action-btn" />
                <Typography className="file-action-button-text">
                  Edit
                </Typography>
              </Button>
            )}
            <Button autoFocus onClick={downloadFile}>
              <Download className="file-action-btn" />
              <Typography className="file-action-button-text">
                Download
              </Typography>
            </Button>
            <Button autoFocus onClick={handleClose}>
              <X className="file-close-btn" />
            </Button>
          </DialogActions>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2} className="max-height">
            <Grid item xs={9} className="scroll">
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <Document
                  file={displayFile.url}
                  externalLinkTarget="_blank"
                  renderMode="svg"
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<Loader />}
                  error={<LoadingError />}
                  noData={<Loader />}
                >
                  <Outline onItemClick={onItemClick} />
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={pageNumber}
                      width={900}
                    />
                  ))}
                </Document>
              </DialogContentText>
            </Grid>
            <Grid item xs={3} style={{ borderLeft: '1px solid #e8eaed' }}>
              <div className="p-absolute">
                {fileTitle('Category')}
                {fileContent(displayFile.category)}
                {fileTitle('Description')}
                {fileContent(displayFile.description)}
                {fileTitle('Created On')}
                {fileContent(
                  dayjs(displayFile.updatedAt).format('MMM DD YYYY')
                )}
                {fileTitle('Created By')}
                {fileContent(displayFile.addedBy)}
                {fileTitle('File Type')}
                {fileContent(displayFile.mimeType)}
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}
