import React from 'react'
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
  sms: Yup.string().required('SMS message is required').trim(),
  interactionLog: Yup.string()
    .required('Interaction notes are required')
    .trim(),
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
  handleCheckboxChange: (name: keyof TCheckboxes, data: any) => void
  handleEditClick: (fieldName: keyof TEditModes, data: any) => void
  handleIncrement: () => void
  handleDecrement: () => void
  checkboxes: TCheckboxes
  editModes: TEditModes
  progress: number
  progressColor: string
  stepLabel: string
  count: number
  modalOpen: boolean
  setModalOpen: (value: boolean) => void
  retryFailedTasks: () => void
}
function ModalHeader({ modalTitle }: { modalTitle: string }) {
  return (
    <div className="full-width">
      <h3 className="text-blue-800 font-medium text-base">{modalTitle}</h3>
      <p className="text-xs mt-2">
        Quickly select/edit the next action(s) you would like to submit for this
        member
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
  editModes,
  progress,
  progressColor,
  stepLabel,
  count,
  modalOpen,
  retryFailedTasks,
  setModalOpen,
}: ListModalProps) {
  return modalOpen ? (
    <Modal
      open={modalOpen}
      setModalOpen={setModalOpen}
      heading={<ModalHeader modalTitle="Automatic next steps" />}
      height="75%"
    >
      <PrimaryForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form key="list-edit-form">
            <div
              className={`mb-3 ${
                progress > 0 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              <div className=" mb-3 flex items-center">
                <Checkbox
                  checked={checkboxes.smsCheck}
                  onChange={() => handleCheckboxChange('smsCheck', formik)}
                  disabled={!formik.values.sms?.trim()}
                />
                <TextField
                  name="sms"
                  label="SMS"
                  textarea
                  placeholder="We tried to call for a virtual consulation"
                  required={false}
                  editMode={editModes.sms}
                  onEditClick={() => handleEditClick('sms', formik)}
                  editable
                />
              </div>
              <div className=" mb-3 flex items-center">
                <Checkbox
                  checked={checkboxes.interactionLogCheck}
                  onChange={() =>
                    handleCheckboxChange('interactionLogCheck', formik)
                  }
                  disabled={!formik.values.interactionLog?.trim()}
                />
                <TextField
                  name="interactionLog"
                  label="Interaction log"
                  textarea
                  placeholder="We tried to call for a virtual consulation"
                  required={false}
                  editMode={editModes.interactionLog}
                  onEditClick={() => handleEditClick('interactionLog', formik)}
                  editable
                />
              </div>
              <div className="mb-3 flex items-center ">
                <Checkbox
                  checked={checkboxes.rescheduleTaskCheck}
                  onChange={() =>
                    handleCheckboxChange('rescheduleTaskCheck', formik)
                  }
                />
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <h1 className="text-gray-500 font-medium text-sm ">
                      Reschedule task
                    </h1>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="flex items-center">
                      Select the number of days you want to add to the due date.
                      <div className="flex items-center">
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

                        <TextField
                          name="dueDate"
                          label=""
                          type="number"
                          required={false}
                        />
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
                  color={progressColor}
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
                >
                  Cancel
                </Button>
              </div>
            )}
            {progressColor === 'secondary' && progress > 0 && (
              <PrimaryButton
                className="mt-3 float-right"
                onClick={retryFailedTasks}
              >
                Retry
              </PrimaryButton>
            )}
          </Form>
        )}
      </PrimaryForm>
    </Modal>
  ) : null
}

export default ListModalView
