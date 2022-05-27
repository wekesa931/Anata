import React, { useEffect, useState } from 'react'
import Portal from '@mui/material/Portal'
import Draggable from 'react-draggable'
import Paper from '@mui/material/Paper'
import DialogTitle from '@mui/material/DialogTitle'
import {
  ArrowRight,
  Maximize,
  Maximize2,
  Minimize,
  Minimize2,
  X,
} from 'react-feather'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
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
  isFormEdited,
  openedForms,
  airtableMeta,
  formNum,
  closeForm,
  setIsFormEdited,
  onFormClose,
  onRefetch,
}: FormProps) => {
  const [calloutHeight, setcalloutHeight] = useState(546)
  const [isIncreasing, setIsIncreasing] = useState(true)
  const [calloutWidth, setCalloutWidth] = useState(50)
  // const [position, setPosition] = useState({ x: 211, y: -700 })
  const [isHighlighting, setIsHighlighting] = useState(true)
  const [dynamicPosition, setDynamicPosition] = useState(undefined)
  const [isDisabled, setIsDisabled] = useState(false)
  const dragClass = isDisabled ? 'draggable-disabled' : 'draggable'
  const containerWidth = isDisabled ? '450px' : `${calloutWidth}%`
  const containerHeight = `${calloutHeight}px`
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

  const resizeDialog = () => {
    if (!isDisabled) {
      setcalloutHeight(60)
      setIsDisabled(true)
      setDynamicPosition({ x: formNum * 70, y: 0 })
    } else {
      setIsDisabled(false)
      setcalloutHeight(546)
      setDynamicPosition(undefined)
    }
  }

  useEffect(() => {
    document.addEventListener('mouseenter', handleDragActive, true)
    return () => {
      document.removeEventListener('mouseenter', handleDragActive, true)
    }
  })

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
  const changeCalloutSize = () => {
    if (isIncreasing) {
      setCalloutWidth((width) => width + 10)
      setcalloutHeight((height) => height + 50)
    } else {
      setCalloutWidth((width) => width - 10)
      setcalloutHeight((height) => height - 50)
    }
    if (calloutWidth === 70) {
      setIsIncreasing(false)
    }
    if (calloutWidth === 60) {
      setIsIncreasing(true)
    }
  }
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
    if (form.name === 'Interaction Log form') {
      return <InteractionLogsForm form={form} onFormClose={onFormClose} />
    }

    return (
      <WorkflowPortal
        isFormEdited={isFormEdited}
        setIsFormEdited={setIsFormEdited}
        openedForms={openedForms}
        workflow={form}
        airtableMeta={airtableMeta}
        onRefetch={onRefetch}
        closeForm={closeForm}
      />
    )
  }

  return (
    <Portal>
      <Draggable
        bounds="parent"
        enableUserSelectHack
        disabled={isDisabled || isHighlighting}
        defaultClassName={dragClass}
        position={dynamicPosition}
      >
        <Paper
          className={styles.formContainer}
          sx={{ width: containerWidth, height: containerHeight }}
          elevation={5}
        >
          <DialogTitle className={styles.formTitle} id="draggable-dialog-title">
            <div className={styles.formTitle}>
              {isWorkflow ? (
                <span className="d-flex align-center">
                  <span>Workflow</span>
                  <ArrowRight width={15} height={15} />
                  <span>{form.workflowId}</span>
                </span>
              ) : (
                form.name
              )}
            </div>
            <div>
              {!isDisabled && (
                <Tooltip title={isIncreasing ? 'Maximize' : 'Minimize'}>
                  <button
                    className="drag-actions-size"
                    onClick={changeCalloutSize}
                  >
                    {isIncreasing ? <Maximize /> : <Minimize />}
                  </button>
                </Tooltip>
              )}
              <Tooltip title={isDisabled ? 'Expand' : 'Collapse'}>
                <button className="drag-actions-size" onClick={resizeDialog}>
                  {isDisabled ? <Maximize2 /> : <Minimize2 />}
                </button>
              </Tooltip>
              <Tooltip title="Close">
                <button className="drag-actions" onClick={handleFormCloseEvent}>
                  <X />
                </button>
              </Tooltip>
            </div>
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
