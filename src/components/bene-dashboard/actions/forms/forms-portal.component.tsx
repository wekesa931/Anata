import React, { useEffect, useState } from 'react'
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
import styles from './form.component.css'
import InteractionLogsForm from './interaction-logs/interaction-logs-form.component'
import WorkflowPortal from '../workflows/workflow-portal.component'

type IForm = {
  name: string
  url?: string
  url_sandbox?: string
  airtableUrl?: boolean
  hnField?: string
}
type HN = {
  'Record ID': string
}
type FormProps = {
  openedForms: IForm[]
  form: IForm
  isFormEdited: boolean
  hn: HN | null
  closeForm: (openForm: IForm[], healthNavigator: HN) => void
  onFormClose: (pointer: any, isWorkflow: boolean) => void
  onRefetch: (refetch: boolean) => void
  setIsFormEdited: (touched: boolean) => void
}

const FormPortal = ({
  form,
  hn,
  isFormEdited,
  openedForms,
  closeForm,
  setIsFormEdited,
  onFormClose,
  onRefetch,
}: FormProps) => {
  const { recId } = useParams()
  const [position, setPosition] = useState({ x: 311, y: -700 })
  const [isHighlighting, setIsHighlighting] = useState(true)
  const [dynamicPosition, setDynamicPosition] = useState(undefined)
  const [isDisabled, setIsDisabled] = useState(false)
  const dragClass = isDisabled ? 'draggable-disabled' : 'draggable'
  const containerWidth = isDisabled ? '450px' : '650px'
  const isWorkflow = form.workflowId

  const handleDragActive = (e: MouseEvent) => {
    try {
      const { cursor } = getComputedStyle(e.target)
      if (cursor === 'move') {
        setIsHighlighting(false)
      } else {
        setIsHighlighting(true)
      }
    } catch {
      setIsHighlighting(true)
    }
  }

  useEffect(() => {
    document.addEventListener('mouseenter', handleDragActive, true)
    return () => {
      document.removeEventListener('mouseenter', handleDragActive, true)
    }
  })

  useEffect(() => {
    if (isDisabled) {
      setPosition({ x: 74, y: -55 })
    } else {
      setDynamicPosition({ x: 311, y: -700 })
    }
  }, [isDisabled])

  useEffect(() => {
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
    if (form.workflowId && !isFormEdited) {
      setIsFormEdited(false)
      onFormClose(form.workflowId, true)
    } else {
      setOpen(true)
    }
  }

  const handleStay = () => {
    setOpen(false)
  }

  const handleLeave = () => {
    setOpen(false)
    if (isWorkflow) {
      setIsFormEdited(false)
      onFormClose(form.workflowId, true)
    } else {
      onFormClose(form.name, false)
    }
  }

  const confirmClose = () => {
    const formName = form.workflowId ? '' : form.name
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
            {`Are you sure you want to leave ${formName}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You might lose any changes you have made.
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
    if (form.workflowId) {
      return (
        <WorkflowPortal
          isFormEdited={isFormEdited}
          setIsFormEdited={setIsFormEdited}
          openedForms={openedForms}
          workflow={form}
          onRefetch={onRefetch}
          closeForm={closeForm}
        />
      )
    }
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
                process.env.PROD ? form.url : form.url
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
      <Draggable
        enableUserSelectHack
        disabled={isDisabled || isHighlighting}
        defaultClassName={dragClass}
        defaultPosition={position}
        position={dynamicPosition}
      >
        <Paper
          className={styles.formContainer}
          sx={{ width: containerWidth }}
          elevation={5}
        >
          <DialogTitle className={styles.formTitle} id="draggable-dialog-title">
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
            <span className={styles.formTitle}>
              {isWorkflow ? `Workflow -{'>'} ${form.workflowId}` : form.name}
            </span>
          </DialogTitle>
          <DialogContent sx={{ padding: 0, height: '100%' }}>
            {formRender()}
            {confirmClose()}
          </DialogContent>
        </Paper>
      </Draggable>
      {/* </div> */}
    </Portal>
  )
}

export default FormPortal
