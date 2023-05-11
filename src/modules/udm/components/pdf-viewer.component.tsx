import React, { useState, useEffect } from 'react'
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import ImageLoader from 'react-image-render'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useMutation } from '@apollo/client'
import { AlertTriangle, Download, Info, Lock, X } from 'react-feather'
import { Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'
import axios from 'axios'
import { ENCRYPT_FILE, GENERATE_FILE_LINK } from 'src/modules/udm/services/gql'
import LoadingIcon from 'src/assets/img/icons/loading.svg'

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
  url: string
}

function FilePasswordEncrypt(props) {
  const [open, setOpen] = useState(true)
  const [encyptFile] = useMutation(ENCRYPT_FILE)

  const [password, setPassword] = useState('')
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        fileId: file?.id,
      },
    })
      .then((res) => {
        if (!res.errors) {
          const link = res?.data?.encryptFile?.link
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

function Loader() {
  return (
    <div className="d-flex flex-direction-column flex-align-center margin-top-32">
      <LoadingIcon />
      <p className="text-small">Loading File</p>
    </div>
  )
}

type LoadingErrorProps = {
  fileMessage: string
}

function LoadingError({ fileMessage }: LoadingErrorProps) {
  return (
    <div className="d-flex flex-direction-column flex-align-center margin-top-32">
      <AlertTriangle />
      <p className="text-heading-5">
        The file is no longer available for viewing
      </p>
      {fileMessage && <p className="text-heading-5">{fileMessage}</p>}
    </div>
  )
}

export default function PdfViewer(props) {
  const { file, onFileClosed } = props
  const [displayFile, setDisplayFile] = useState<IFiles>(file)
  const [isEncypting, setIsEncypting] = useState(false)
  const [fileMessage, setFileMessage] = useState('')
  const [open, setOpen] = React.useState(true)
  const [generateAccessFileLink] = useMutation(GENERATE_FILE_LINK)
  const handledExtensions = [
    'jpg',
    'jpeg',
    'png',
    'doc',
    'docx',
    'txt',
    'gif',
    'pdf',
  ]
  const isImage =
    displayFile.mimeType &&
    (displayFile.mimeType.includes('jpg') ||
      displayFile.mimeType.includes('jpeg') ||
      displayFile.mimeType.includes('gif') ||
      displayFile.mimeType.includes('png'))
  const isDocument =
    displayFile.mimeType &&
    (displayFile.mimeType.includes('doc') ||
      displayFile.mimeType.includes('docx') ||
      displayFile.mimeType.includes('txt') ||
      displayFile.mimeType.includes('pdf')) &&
    !isImage

  const base64ToBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = Buffer.from(b64Data, 'base64').toString('binary')
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: contentType })
    return blob
  }

  useEffect(() => {
    if (file?.id && file?.driveUrl) {
      generateAccessFileLink({
        variables: {
          duration: 5000,
          fileId: file?.id,
        },
      }).then((res) => {
        if (!res.errors) {
          const url = res?.data?.generateLink?.link
          const fileExtension = file?.storageKey?.split('.').pop()
          if (handledExtensions.includes(fileExtension)) {
            axios.get(url, { responseType: 'arraybuffer' }).then((result) => {
              const blob = base64ToBlob(result?.data, file?.mimeType)
              const fileUrl = URL.createObjectURL(blob)
              setDisplayFile({ ...file, url: fileUrl })
            })
          } else {
            setFileMessage('File has been downloaded or opened in the next tab')

            // open url if not undefined
            if (url) {
              window.open(url, '_blank').focus()
            }
          }
        }
      })
    } else {
      setDisplayFile({ ...file })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const handleClose = () => {
    onFileClosed()
    setOpen(false)
    setFileMessage('')
  }

  const handleEncyptFile = () => {
    // Show password interface
    setIsEncypting(true)
  }

  const downloadFile = () => {
    const newWindow = window.open(
      `${displayFile?.url || displayFile?.driveUrl}`,
      '_blank',
      'noopener,noreferrer'
    )
    if (newWindow) newWindow.opener = null
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

  type FileTitleProps = {
    title: string
  }
  function FileTitle({ title }: FileTitleProps) {
    return <Typography className="file-title">{title}</Typography>
  }

  type FileContentProps = {
    content: string
  }

  function FileContent({ content }: FileContentProps) {
    return <Typography className="file-title-content">{content}</Typography>
  }

  const loadingIcon = () => {
    return (
      <div className="d-flex flex-direction-column flex-align-center margin-top-32">
        <LoadingIcon />
      </div>
    )
  }

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
          {displayFile?.title}
          <DialogActions>
            <Button autoFocus onClick={handleEncyptFile}>
              <Lock className="file-action-btn" />
              <Typography className="file-action-button-text">
                Encrypt
              </Typography>
            </Button>
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
                {fileMessage && (
                  <div className="d-flex flex-direction-column flex-align-center margin-top-32">
                    <Info />
                    <p className="text-heading-5">{fileMessage}</p>
                  </div>
                )}

                {isDocument && displayFile?.url ? (
                  <iframe
                    src={`${displayFile?.url || displayFile?.driveUrl}`}
                    width="900px"
                    height="600px"
                    frameBorder={0}
                    allowFullScreen
                    title={displayFile?.title}
                  />
                ) : (
                  loadingIcon()
                )}

                {isImage && (
                  <ImageLoader src={displayFile?.url}>
                    {({ loaded, errored }: any) => {
                      if (loaded) {
                        return (
                          <img
                            src={displayFile?.url}
                            alt={displayFile?.title}
                          />
                        )
                      }
                      if (errored) {
                        return <LoadingError fileMessage={fileMessage} />
                      }
                      return <Loader />
                    }}
                  </ImageLoader>
                )}
              </DialogContentText>
            </Grid>
            <Grid item xs={3} style={{ borderLeft: '1px solid #e8eaed' }}>
              <div className="p-absolute">
                <FileTitle title="Category" />
                <FileContent content={displayFile?.category} />
                <FileTitle title="Description" />
                <FileContent content={displayFile?.description} />
                <FileTitle title="Created On" />
                <FileContent
                  content={dayjs(displayFile?.updatedAt).format('MMM DD YYYY')}
                />
                <FileTitle title="Created By" />
                <FileContent content={displayFile?.addedBy} />
                <FileTitle title="File Type" />
                <FileContent content={displayFile?.mimeType} />
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}
