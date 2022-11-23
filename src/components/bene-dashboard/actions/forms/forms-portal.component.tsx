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
import { useFormik } from 'formik'
import styles from './form.component.css'
import WorkflowPortal from '../workflows/workflow-portal.component'
import { formNames } from '../workflows/Forms/form-fields'
import MemberDetailsUpdateForm, {
  memberDetailsValidationSchema,
  createInitialFormState,
  parseMemberInputData,
  handleFormSubmissionErrors,
} from '../../summary/biodata/biodata-update/member-details-update.component'
import { WorkflowMeta } from '../workflows/workflow-types'
import { useMember } from '../../../../context/member.context'
import ToastNotification, {
  defaultToastMessage,
  ToastMessage,
} from '../../../utils/toast/toast-notification'
import Toasts from '../../../../helpers/toast'

type IForm = {
  name: string
  url?: string
  url_sandbox?: string
  airtableUrl?: boolean
  hnField?: string
  workflowId?: string
}

type HN = {
  'Record ID': string
}

type FormProps = {
  openedForms: IForm[]
  form: IForm
  hn?: HN
  onFormClose: (pointer: any, isWorkflow: boolean) => void
  onRefetch: (refetch: boolean) => void
  addOpenForm: (openForm: WorkflowMeta) => void
  airtableMeta: any
  formNum: number
  memberDetails: any
}

function FormPortal({
  form,
  openedForms,
  airtableMeta,
  formNum,
  addOpenForm,
  onFormClose,
  onRefetch,
}: FormProps) {
  const [calloutHeight, setcalloutHeight] = useState(66)
  const [isIncreasing, setIsIncreasing] = useState(true)

  const [isFormEdited, setIsFormEdited] = useState(false)
  const [isHighlighting, setIsHighlighting] = useState(true)
  const [dynamicPosition, setDynamicPosition] = useState(undefined)
  const [isDisabled, setIsDisabled] = useState(false)
  const dragClass = isDisabled ? 'draggable-disabled' : 'draggable'

  const containerHeight = `${calloutHeight}%`
  const isWorkflow = !!form.workflowId
  const [toastMessage, setToastMessage] =
    useState<ToastMessage>(defaultToastMessage)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const calloutWidth = isWorkflow ? 50 : 40
  const containerWidth = `${calloutWidth}%`

  const { v2Member, handleMemberUpdate, member, refetchMember, isLoading } =
    useMember()

  const updateMemberDetails = (values: any) => {
    setIsSubmitting(true)
    const antaraId = v2Member?.antaraId || member['Antara ID']
    const memberDetails = parseMemberInputData(values, antaraId)

    handleMemberUpdate(memberDetails)
      .then((res: any) => {
        const errors = handleFormSubmissionErrors(res?.data)
        if (errors.length > 0) {
          Toasts.showErrorNotification(
            'There was a problem saving member details. Error has been logged'
          )
        } else {
          Toasts.showSuccessNotification('Member details saved successfully')
          onFormClose('Edit member details', false)
        }
      })
      .finally(() => {
        refetchMember()
        setIsSubmitting(false)
      })
  }

  const {
    values,
    errors: formikErrors,
    submitForm,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: createInitialFormState(v2Member),
    onSubmit: updateMemberDetails,
    validationSchema: memberDetailsValidationSchema,
  })

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
      setcalloutHeight(8)
      setIsDisabled(true)
      setDynamicPosition({ x: formNum * 70, y: 0 })
    } else {
      setIsDisabled(false)
      setcalloutHeight(66)
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
      e.stopImmediatePropagation()
      e.returnValue = message
    })
    return () =>
      window.removeEventListener('beforeunload', (e) => {
        e.stopImmediatePropagation()
        e.returnValue = message
      })
  })

  const [open, setOpen] = React.useState(false)

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
  const handleFormCloseEvent = () => {
    if (isFormEdited) {
      setOpen(true)
    } else {
      setIsFormEdited(false)
      if (isWorkflow) {
        onFormClose(form.workflowId, true)
      } else {
        onFormClose(form.name, false)
      }
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
      setIsFormEdited(false)
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
          <DialogTitle
            id="alert-dialog-title"
            sx={{ maxHeight: '10%', height: '4rem' }}
          >
            {`Are you sure you want to leave ${formNames[formName]}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You might lose any changes you have made.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="inherit" variant="contained" onClick={handleStay}>
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
      </div>
    )
  }

  const formRender = () => {
    if (form.name === 'Edit member details') {
      return (
        <MemberDetailsUpdateForm
          errors={formikErrors}
          values={values}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          isMemberLoading={isLoading}
        />
      )
    }

    return (
      <WorkflowPortal
        isFormEdited={isFormEdited}
        setIsFormEdited={setIsFormEdited}
        openedForms={openedForms}
        workflow={form}
        addOpenForm={addOpenForm}
        airtableMeta={airtableMeta}
        onRefetch={onRefetch}
        onFormClose={onFormClose}
      />
    )
  }

  return (
    <>
      <ToastNotification
        isOpen={!!toastMessage.message}
        message={toastMessage}
        handleToastClose={() => setToastMessage(defaultToastMessage)}
      />
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
            sx={{ width: containerWidth, height: containerHeight, zIndex: 100 }}
            elevation={5}
          >
            <DialogTitle
              className={styles.formTitleContainer}
              id="draggable-dialog-title"
            >
              <div className={styles.formTitle}>
                {isWorkflow ? (
                  <span className="d-flex align-center">
                    <span>Workflow</span>
                    <ArrowRight width={15} height={15} />
                    <span>{form.workflowId}</span>
                  </span>
                ) : (
                  formNames[form.name] || form.name
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
                  <button
                    className="drag-actions"
                    onClick={handleFormCloseEvent}
                  >
                    <X />
                  </button>
                </Tooltip>
              </div>
            </DialogTitle>
            <DialogContent sx={{ padding: 0, height: '90%' }}>
              {formRender()}
              {confirmClose()}
            </DialogContent>

            {form.name === 'Edit member details' && (
              <DialogActions sx={{ p: 2 }}>
                <Button
                  variant="outlined"
                  className={`${styles.actionBtn} `}
                  onClick={submitForm}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </DialogActions>
            )}
          </Paper>
        </Draggable>
      </Portal>
    </>
  )
}

export default FormPortal
