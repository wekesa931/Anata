import React from 'react'
import Portal from '@mui/material/Portal'
import { useParams } from 'react-router-dom'
import Draggable from 'react-draggable'
import Paper from '@mui/material/Paper'
import DialogTitle from '@mui/material/DialogTitle'
import { Maximize, Minimize, X } from 'react-feather'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import InteractionLogsForm from './interaction-logs/interaction-logs-form.component'

type FormProps = {
  form: {
    name: string
    url?: string
    url_sandbox?: string
    airtableUrl?: boolean
    hnField?: string
  }
  hn: {
    'Record ID': string
  } | null
  onFormClose: (name: string) => void
}

const FormPortal = ({ form, hn, onFormClose }: FormProps) => {
  const { recId } = useParams()
  const [position, setPosition] = React.useState({ x: 311, y: -700 })
  const [dynamicPosition, setDynamicPosition] = React.useState(undefined)
  const [isDisabled, setIsDisabled] = React.useState(false)
  const dragClass = isDisabled ? 'draggable-disabled' : 'draggable'
  const containerWidth = isDisabled ? '450px' : '650px'

  React.useEffect(() => {
    if (isDisabled) {
      setPosition({ x: 74, y: -55 })
    } else {
      setDynamicPosition({ x: 311, y: -700 })
    }
  }, [isDisabled])

  React.useEffect(() => {
    if (dynamicPosition !== undefined && dynamicPosition.x === 311) {
      setDynamicPosition(undefined)
    } else if (dynamicPosition !== undefined) {
      setIsDisabled(true)
    }
  }, [dynamicPosition])

  React.useEffect(() => {
    const message = `Warning Navigating away from this page will delete your text if you have not already saved it`
    window.addEventListener('beforeunload', (e) => {
      e.returnValue = message
    })
    return () =>
      window.removeEventListener('beforeunload', (e) => {
        e.returnValue = message
      })
  })

  const [open, setOpen] = React.useState(false)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleFormCloseEvent = () => {
    setOpen(true)
  }

  const handleStay = () => {
    setOpen(false)
  }

  const handleLeave = () => {
    setOpen(false)
    onFormClose(form.name)
  }

  const confirmClose = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleLeave}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullScreen={fullScreen}
        >
          <DialogTitle id="alert-dialog-title">
            {`Are you sure you want to leave ${form.name}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You might lose any changes you have made on {form.name}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="warning" variant="contained" onClick={handleStay}>
              Stay
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleLeave}
              autoFocus
            >
              Leave
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  const formRender = () => {
    if (form.airtableUrl === false) {
      return <InteractionLogsForm name={form.name} onFormClose={onFormClose} />
    }
    return (
      <div
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{
          __html: `<iframe
              className="airtable-embed"
              scrolling="yes"
              src="https://airtable.com/embed/${
                process.env.PROD ? form.url : form.url_sandbox
              }?prefill_${form.hnField}=${
            hn['Record ID']
          }&prefill_Member=${recId}"
              frameBorder="0"
              width="100%"
              height="533"
              style="background: url(../../../../../src/assets/img/icons/loading.svg); background-repeat: no-repeat; background-position: center; border: 1px solid #ccc;"
            />`,
        }}
      />
    )
  }

  return (
    <Portal>
      <div className="drag-container">
        <Draggable
          disabled={isDisabled}
          defaultClassName={dragClass}
          defaultPosition={position}
          position={dynamicPosition}
        >
          <Paper sx={{ width: containerWidth }} elevation={5}>
            <DialogTitle
              style={{ cursor: 'move', position: 'relative' }}
              id="draggable-dialog-title"
            >
              <button
                className="drag-actions-size"
                onClick={() => {
                  if (!isDisabled) {
                    setDynamicPosition({ x: 74, y: -55 })
                  } else {
                    setIsDisabled(false)
                  }
                }}
              >
                {isDisabled ? <Maximize /> : <Minimize />}
              </button>
              <button className="drag-actions" onClick={handleFormCloseEvent}>
                <X />
              </button>
              <span className="form-modal-title">{form.name}</span>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {formRender()}
                {confirmClose()}
              </DialogContentText>
            </DialogContent>
          </Paper>
        </Draggable>
      </div>
    </Portal>
  )
}

export default FormPortal
