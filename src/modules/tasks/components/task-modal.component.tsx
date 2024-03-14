import React, { useState } from 'react'
import {
  Checkbox,
  Grid,
  Button,
  Typography,
  LinearProgress,
} from '@mui/material'
import Modal from 'src/components/modals'
import { Form } from 'formik'
import TextField from 'src/components/forms/fields/text'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import PrimaryButton from 'src/components/buttons/primary'
import PrimaryForm from 'src/components/forms/primary-form'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  smsCheck: Yup.boolean(),
  interactionLogCheck: Yup.boolean(),

  sms: Yup.string().when('smsCheck', {
    is: true,
    then: Yup.string()
      .required(
        'Please enter the required information. This field cannot be left blank.'
      )
      .trim()
      .max(360, 'Character limit exceeded. Please shorten your message.'),
    otherwise: Yup.string().trim(),
  }),

  interactionLog: Yup.string().when('interactionLogCheck', {
    is: true,
    then: Yup.string()
      .required(
        'Please enter the required information. This field cannot be left blank.'
      )
      .trim(),
    otherwise: Yup.string().trim(),
  }),
})

type TCheckboxes = {
  smsCheck: boolean
  interactionLogCheck: boolean
  rescheduleTaskCheck: boolean
}

type TEditModes = {
  sms: boolean
  interactionLog: boolean
}

type ListModalProps = {
  initialValues: any
  handleSubmit: (values: any) => void
  handleCheckboxChange: (e: any, data: any) => void
  handleEditClick: (fieldName: keyof TEditModes, data: any) => void
  handleIncrement: () => void
  handleDecrement: () => void
  checkboxes: TCheckboxes
  editModes: TEditModes
  progress: number
  progressState: string
  stepLabel: string
  count: number
  modalOpen: boolean
  setModalOpen: (value: boolean) => void
  retryFailedTasks: () => void
  dueDate: number
}
function ModalHeader({
  modalTitle,
  modalDescription,
  editMode,
}: {
  modalTitle: string
  modalDescription: string
  editMode: boolean
}) {
  return (
    <div className="full-width">
      <h3
        className={`font-medium text-base ${
          editMode ? 'text-[#205284]' : 'text-[#000000] text-xl mb-2'
        }`}
      >
        {modalTitle}
      </h3>
      <p className={`mt-2 ${editMode ? 'text-xs' : 'text-base mt-6 mb-4'}`}>
        {modalDescription}
      </p>
    </div>
  )
}
function ListModalView({
  initialValues,
  handleSubmit,
  handleCheckboxChange,
  handleEditClick,
  handleIncrement,
  handleDecrement,
  checkboxes,
  progress,
  progressState,
  stepLabel,
  count,
  modalOpen,
  retryFailedTasks,
  setModalOpen,
  dueDate,
}: ListModalProps) {
  const [editMode, setEditMode] = useState(true)
  const getErrorMessage = () => {
    return 'We encountered an error while finishing this up. Please retry to resolve it. If the issue continues, contact our support team via Slack for help'
  }
  const getModalTitle = () => {
    if (editMode) {
      return 'Automatic next steps'
    }
    return 'Delete next steps details?'
  }
  const getModalDescription = () => {
    if (editMode) {
      return 'Quickly select/edit the next action(s) you would like to submit for this member'
    }
    return 'Are you sure you want to delete the automatic next steps details? You will not be able to recover it once you delete.'
  }

  return modalOpen ? (
    <Modal
      open={modalOpen}
      setModalOpen={setModalOpen}
      heading={
        <ModalHeader
          modalTitle={getModalTitle()}
          modalDescription={getModalDescription()}
          editMode={editMode}
        />
      }
      height="auto"
      width="auto"
      closeOption={false}
    >
      <PrimaryForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form key="list-edit-form">
            {editMode ? (
              <div>
                <div
                  className={`mb-10 ${
                    progress > 0 ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <div className=" mb-3 flex items-center">
                    <span>{checkboxes.smsCheck}</span>
                    <Checkbox
                      checked={checkboxes.smsCheck}
                      onChange={(event) => handleCheckboxChange(event, formik)}
                      disabled={!formik.values.sms?.trim()}
                      name="smsCheck"
                    />
                    <TextField
                      name="sms"
                      label="SMS"
                      textarea
                      placeholder="We tried to call for a virtual consulation"
                      required={false}
                      onEditClick={() => handleEditClick('sms', formik)}
                      maxLength={360}
                    />
                  </div>
                  <div className=" mb-3 flex items-center">
                    <Checkbox
                      checked={checkboxes.interactionLogCheck}
                      onChange={(event) => handleCheckboxChange(event, formik)}
                      disabled={!formik.values.interactionLog?.trim()}
                      name="interactionLogCheck"
                    />
                    <TextField
                      name="interactionLog"
                      label="Interaction log"
                      textarea
                      placeholder="We tried to call for a virtual consulation"
                      required={false}
                      onEditClick={() =>
                        handleEditClick('interactionLog', formik)
                      }
                    />
                  </div>
                  <div className="mb-3 flex items-center ">
                    <Checkbox
                      checked={checkboxes.rescheduleTaskCheck}
                      onChange={(event) => handleCheckboxChange(event, formik)}
                      name="rescheduleTaskCheck"
                    />
                    <Grid container alignItems="center">
                      <Grid item xs={12}>
                        <h1 className="text-gray-500 font-medium text-sm ">
                          Reschedule task
                        </h1>
                      </Grid>
                      <Grid item xs={12}>
                        <div className="flex items-center justify-between">
                          Select the number of days you want to add to the due
                          date.
                          <div className="flex items-center justify-between">
                            <RemoveCircleIcon
                              sx={{
                                width: '31%',
                                height: '28px',
                                minHeight: '28px',
                                color: '#FF9500',
                                cursor: 'pointer',
                              }}
                              onClick={handleDecrement}
                            />

                            <p className="text-lg">{dueDate}</p>
                            <AddCircleIcon
                              sx={{
                                width: '31%',
                                height: '28px',
                                minHeight: '28px',
                                color: '#FF9500',
                                cursor: 'pointer',
                              }}
                              onClick={handleIncrement}
                            />
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="mb-3 flex items-center">
                    <Checkbox checked disabled />
                    <Grid container alignItems="center">
                      <Grid item xs={12}>
                        <h1 className="text-gray-500 font-medium text-sm">
                          Status change
                        </h1>
                      </Grid>
                      <Grid item xs={12}>
                        <p className="flex items-center">
                          This task will now be marked as :
                          <span className="status !m-0 ml-2 bg-yellow-50 text-yellow-500">
                            In progress
                          </span>
                        </p>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="mb-3 flex items-center">
                    <Checkbox checked disabled />
                    <Grid container alignItems="center">
                      <Grid item xs={12}>
                        <h1 className="text-gray-500 font-medium text-sm">
                          Increase task attempt
                        </h1>
                      </Grid>
                      <Grid item xs={12}>
                        <p>
                          Increases the number of attempts for this task.
                          <span />
                        </p>
                      </Grid>
                    </Grid>
                  </div>
                </div>

                {progress > 0 ? (
                  <div className="mt-5">
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="flex justify-between mb-2"
                    >
                      <p className="text-sm text-black">{stepLabel}</p>
                      <p className="text-black font-bold">{`${count}%`}</p>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      sx={{
                        backgroundColor: 'white',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor:
                            progressState === 'error' ? '#972323' : '#007AFF',
                        },
                      }}
                      value={count}
                      style={{ transition: 'width 0.5s ease' }}
                    />
                  </div>
                ) : (
                  <div className="mt-2 flex flex-col gap-2">
                    <PrimaryButton fullWidth type="submit">
                      Submit all actions
                    </PrimaryButton>
                    <Button
                      fullWidth
                      className="border "
                      sx={{
                        backgroundColor: '#ffff',
                        border: '1px #205284 solid',
                        color: '#205284',
                      }}
                      onClick={() => {
                        setEditMode(false)
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
                {progressState === 'error' && progress > 0 && (
                  <div>
                    <span className="text-[#972323] text-xs font-normal">
                      {getErrorMessage()}
                    </span>
                    <PrimaryButton
                      className="mt-3 float-right"
                      onClick={retryFailedTasks}
                    >
                      Retry
                    </PrimaryButton>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-10 flex flex-col gap-4">
                <Button
                  fullWidth
                  className="border "
                  sx={{
                    backgroundColor: '#ffff',
                    border: '1px #205284 solid',
                    color: '#205284',
                  }}
                  onClick={() => {
                    setEditMode(true)
                  }}
                >
                  No, continue filling form
                </Button>
                <Button
                  fullWidth
                  className="border "
                  sx={{
                    backgroundColor: '#972323 !important',
                    border: '1px #972323 solid',
                    color: '#FFFFFF !important',
                  }}
                  onClick={() => {
                    setModalOpen(false)
                  }}
                >
                  Yes, delete next steps details
                </Button>
              </div>
            )}
          </Form>
        )}
      </PrimaryForm>
    </Modal>
  ) : null
}

export default ListModalView
