import React, { Fragment } from 'react'
import Portal from '@mui/material/Portal'
import DraggableDialog from './form-render.component'

type IProps = {
  openedForms: {
    name: string
    url?: string
    url_sandbox?: string
    airtableUrl?: boolean
    hnField?: string
  }[]
  hn: any
}

const FormPortal = ({ openedForms, hn }: IProps) => {
  // Close a singleForm
  // Drag a form container
  // Embed a form URL
  return (
    <Portal>
      {openedForms.map((form) => (
        <Fragment key={form.name}>
          <DraggableDialog form={form} hn={hn} />
        </Fragment>
      ))}
    </Portal>
  )
}

export default FormPortal
