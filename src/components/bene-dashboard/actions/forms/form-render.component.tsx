import * as React from 'react'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'
import Draggable from 'react-draggable'
import { useParams } from 'react-router-dom'
import { Maximize, Minimize, X } from 'react-feather'
import InteractionLogsForm from './interaction-logs/interaction-logs-form.component'

type IProps = {
  form: {
    name: string
    url?: string
    url_sandbox?: string
    airtableUrl?: boolean
    hnField?: string
  }
  hn: any
}

export default function DraggableDialog({ form, hn }: IProps) {
  const { recId } = useParams()
  const [position, setPosition] = React.useState({ x: 311, y: -700 })
  const [dynamicPosition, setDynamicPosition] = React.useState(undefined)
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [open, setOpen] = React.useState(true)
  const handleClose = (event: any, reason: string) => {
    event.preventDefault()
    if (reason !== 'backdropClick') setOpen(false)
  }
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

  // React.useEffect(() => {
  //   if(position.x === 311 && dynamicPosition !== undefined){
  //     setDynamicPosition(undefined)
  //   }

  // }, [position]);

  const formRender = () => {
    if (form.airtableUrl === false) {
      return <InteractionLogsForm />
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
    <div className="drag-container">
      {open && (
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
              <button className="drag-actions" onClick={handleClose}>
                <X />
              </button>
              <span className="form-modal-title">{form.name}</span>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>{formRender()}</DialogContentText>
            </DialogContent>
          </Paper>
        </Draggable>
      )}
    </div>
  )
}
