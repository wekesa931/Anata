import React, { ReactNode, useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Portal,
  Tooltip,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Draggable from 'react-draggable'
import { Maximize, Maximize2, Minimize, Minimize2, X } from 'react-feather'
import styles from './portal.component.css'

type PortalWindowTypes = {
  title: string | ReactNode
  width?: number
  index?: number
  closeWindow: () => void
  children: ReactNode
  windowActions?: ReactNode
  isEdited: boolean
  setIsEdited: (value: boolean) => void
}

function PortalWindow({
  title,
  width = 40,
  index = 0,
  closeWindow,
  children,
  windowActions,
  isEdited,
  setIsEdited,
}: PortalWindowTypes) {
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [isHighlighting, setIsHighlighting] = useState<boolean>(true)
  const [dynamicPosition, setDynamicPosition] = useState<any | undefined>(
    undefined
  )
  const [calloutHeight, setcalloutHeight] = useState<number>(66)
  const [isIncreasing, setIsIncreasing] = useState<boolean>(true)
  const [open, setOpen] = useState(false)

  const containerWidth = `${width}%`
  const containerHeight = `${calloutHeight}%`

  const dragClass = isDisabled ? 'draggable-disabled' : 'draggable'
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const changeCalloutSize = () => {
    const newHeight = isIncreasing ? calloutHeight + 20 : calloutHeight - 20
    setcalloutHeight(newHeight)

    if (newHeight > 66) {
      setIsIncreasing(false)
    }
    if (newHeight <= 66) {
      setIsIncreasing(true)
    }
  }

  const resizeDialog = () => {
    if (!isDisabled) {
      setcalloutHeight(8)
      setIsDisabled(true)
      setDynamicPosition({ x: index * 70, y: 0 })
    } else {
      setIsDisabled(false)
      setcalloutHeight(66)
      setDynamicPosition(undefined)
    }
  }

  const handleDragActive = (e: MouseEvent) => {
    try {
      const { cursor } = getComputedStyle(e.target as Element)
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

  const handleFormCloseEvent = () => {
    if (isEdited) {
      setOpen(true)
    } else {
      setIsEdited(false)
      closeWindow()
    }
  }

  const handleLeave = () => {
    setOpen(false)
    setIsEdited(false)
    closeWindow()
  }

  return (
    <Portal>
      <Draggable
        bounds="parent"
        enableUserSelectHack
        disabled={isDisabled || isHighlighting}
        defaultClassName={dragClass}
        position={dynamicPosition}
        data-testid="draggable"
      >
        <Paper
          className={styles.formContainer}
          sx={{ width: containerWidth, height: containerHeight, zIndex: 100 }}
          elevation={5}
        >
          <DialogTitle
            className={styles.formTitleContainer}
            id="draggable-dialog-title"
          >
            <div className={styles.formTitle}>{title}</div>
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
          <DialogContent sx={{ padding: 0, height: '90%' }}>
            {children}
            <Dialog
              open={open}
              onClose={handleLeave}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullScreen={fullScreen}
            >
              <DialogTitle
                id="alert-dialog-title"
                sx={{ maxHeight: '10%', height: '4rem' }}
              >
                {`Are you sure you want to leave ${title}?`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You might lose any changes you have made.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  color="inherit"
                  variant="contained"
                  onClick={() => setOpen(false)}
                >
                  Stay
                </Button>
                <Button
                  color="info"
                  variant="contained"
                  onClick={handleLeave}
                  autoFocus
                >
                  Leave
                </Button>
              </DialogActions>
            </Dialog>
          </DialogContent>
          {windowActions && (
            <DialogActions sx={{ padding: 2 }}>{windowActions}</DialogActions>
          )}
        </Paper>
      </Draggable>
    </Portal>
  )
}

export default PortalWindow
