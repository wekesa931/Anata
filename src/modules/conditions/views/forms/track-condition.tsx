import React, { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PortalWindow from 'src/components/portal'
import { Form, Formik } from 'formik'
import SelectField, { Options } from 'src/components/forms/fields/select-field'
import { TextField } from 'src/components/forms/fields'
import PrimaryButton from 'src/components/buttons/primary'
import useConditionsData from 'src/modules/conditions/hooks/conditions.data'
import { useNotifications } from 'src/context/notifications'
import { useMember } from 'src/context/member'
import * as yup from 'yup'
import { dedupOptions } from '../../utils'

type alertProps = {
  open: boolean
  handleClose: () => void
}

const customValidation = (options: any) => {
  const { currentStageOptions, keyGoalOptions } = options

  return yup.object().shape({
    currentStage: yup
      .string()
      .when([], (schema) =>
        currentStageOptions && currentStageOptions.length > 0
          ? schema.required('New stage is required')
          : schema
      ),
    targetId: yup
      .string()
      .when([], (schema) =>
        keyGoalOptions && keyGoalOptions.length > 0
          ? schema.required('New target is required')
          : schema
      ),
  })
}

function AlertDialog({ open, handleClose }: alertProps) {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="text-lg font-semibold">
        Condition Tracking Alert
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          className="text-sm text-gray-600"
        >
          You can only track conditions that have an Active or Recurrent
          Clinical Status and a Confirmed Verification Status. Kindly update to
          track.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

type TrackingProps = {
  initialCondition: any
  keyTargetOptions: Options[]
  possibleStages: Options[]
  refetchData: () => void
}

interface Option {
  value: any
  label: string
}

function HelperText({ title, text }: { title: string; text: string }) {
  return (
    <p className="text-xs bg-[#F0F3F5] p-2 rounded-md text-[#777777] max-h-8 overflow-y-auto">
      {`${title}: ${text}`}
    </p>
  )
}

function getLabelByValue({
  array,
  value,
}: {
  array: Array<Option>
  value: any
}) {
  const foundItem = array.find((item) => item.value === value)
  return foundItem ? foundItem.label : ''
}

export function TrackCondition({
  initialCondition,
  keyTargetOptions,
  possibleStages,
  refetchData,
}: TrackingProps) {
  const [show, setShow] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const { lookups, handleUpdateConditions } = useConditionsData()
  const [process, setProcessing] = React.useState(false)
  const { notify } = useNotifications()
  const { member } = useMember()
  const [isEdited, setIsEdited] = useState(false)
  const [errorState, setErrorState] = useState(false)

  const saveInput = () => {
    setIsEdited(true)
  }

  const [initialValues, setInitialValues] = useState({
    conditionName: '',
    clinicalStatus: '',
    notes: '',
    currentStage: '',
    targetId: '',
    achievementStatus: '',
  })

  const [newValues, setNewValues] = useState({
    isChronic: '',
    notes: '',
    currentStage: '',
    targetId: '',
  })

  const stageOptions = dedupOptions(possibleStages || [])
  const keyGoalOptions = dedupOptions(keyTargetOptions || [])

  const validationSchema = customValidation({
    currentStageOptions: stageOptions,
    keyGoalOptions,
  })

  const getAchievementStatus = (targetId: any) => {
    const achievementArray = lookups?.conditionTargetAchievementStatuses
    const currentAchievementStatus = initialValues.achievementStatus

    if (
      targetId !== initialValues.targetId ||
      currentAchievementStatus === 'Unknown'
    ) {
      const pendingStatus = achievementArray.find(
        (item: any) => item.label === 'Pending'
      )
      return pendingStatus ? pendingStatus.value : currentAchievementStatus
    }
    return currentAchievementStatus
  }

  const handleSubmit = (values: any) => {
    if (member) {
      setProcessing(true)
      const payload = {
        ...values,
        achievementStatus: getAchievementStatus(values.targetId),
        isChronic: initialCondition.isChronic,
        conditionDefinitionId: initialCondition.conditionDefinitionId,
        clinicalStatusId: initialCondition.clinicalStatus,
        icd11Code: initialCondition.icd11Code,
        onsetDate: initialCondition.onsetDate,
        diagnosisDate: initialCondition.diagnosisDate,
        isNewlyDiagnosed: initialCondition.isNewlyDiagnosed,
      }
      handleUpdateConditions(payload)
        .then((result: any) => {
          if (result?.error) {
            notify(`Error tracking conditions : ${result.error.message}`)
          } else {
            notify('Condition tracked successfully')
            refetchData()
          }
          setProcessing(false)
          setShow(false)
        })
        .catch((err: any) => {
          notify(err?.message ?? 'Error tracking conditions')
          setProcessing(false)
        })
    }
  }

  useEffect(() => {
    if (Object.keys(initialCondition).length > 0) {
      setInitialValues({
        conditionName: initialCondition.conditionName,
        clinicalStatus: initialCondition.clinicalStatus.value,
        currentStage: initialCondition.currentStage.value,
        notes: initialCondition.notes,
        targetId: initialCondition.currentTarget.value,
        achievementStatus: initialCondition.achievementStatus.value,
      })
      setNewValues((prevValues) => ({
        ...prevValues,
        isChronic: initialCondition.isChronic ? 'chronic' : 'acute',
      }))
    }
  }, [initialCondition])

  const allowedConditionsToTrack = () => {
    const validStatuses = ['Active', 'Recurrence']
    const label = initialCondition.clinicalStatus?.label

    return (
      validStatuses.includes(label) &&
      initialCondition.verificationStatus?.label === 'Confirmed'
    )
  }

  useEffect(() => {
    if (errorState) {
      notify('Cant submit form. Please check for errors and retry')
      setErrorState(false)
    }
  }, [errorState, notify])

  const handleButtonClick = () => {
    if (!allowedConditionsToTrack()) {
      setAlertOpen(true)
    } else {
      setShow(true)
    }
  }

  return (
    <div>
      <Button
        className="border cursor-pointer mr-4"
        sx={{
          backgroundColor: '#E7F3FD',
          color: allowedConditionsToTrack() ? '#007AFF' : 'rgba(0, 0, 0, 0.26)',
        }}
        onClick={handleButtonClick}
      >
        <TrendingUpIcon className="mr-2" />
        Track
      </Button>
      {show && (
        <PortalWindow
          closeWindow={() => setShow(false)}
          title="Condition Tracking"
          isEdited={isEdited}
          setIsEdited={setIsEdited}
        >
          <div className="p-4 relative overflow-auto">
            <Formik
              initialValues={newValues}
              validationSchema={validationSchema}
              validateOnMount={false}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={handleSubmit}
              validate={(values) => {
                try {
                  validationSchema.validateSync(values, { abortEarly: false })
                  setErrorState(false)
                  return {}
                } catch (errors) {
                  setErrorState(true)
                  return {}
                }
              }}
            >
              {() => (
                <Form>
                  <div className="mb-4">
                    <h1 className="text-base mb-2 text-left text-grey-main font-rubik font-medium">
                      Condition
                    </h1>
                    <p className="text-xs bg-[#F0F3F5] p-2 rounded-md text-[#777777]">
                      {initialValues.conditionName}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    {stageOptions.length > 0 && (
                      <SelectField
                        label="New Stage"
                        options={stageOptions}
                        name="currentStage"
                        placeholder="-- Select --"
                        required
                        helperText={
                          <HelperText
                            title="Current Stage"
                            text={
                              getLabelByValue({
                                array: possibleStages,
                                value: initialValues.currentStage,
                              }) || 'N/A'
                            }
                          />
                        }
                        saveInput={saveInput}
                      />
                    )}

                    {keyGoalOptions.length > 0 && (
                      <SelectField
                        label="New target"
                        options={keyGoalOptions}
                        name="targetId"
                        placeholder="-- Select --"
                        required
                        helperText={
                          <HelperText
                            title="Current target"
                            text={
                              getLabelByValue({
                                array: keyTargetOptions,
                                value: initialValues.targetId,
                              }) || 'N/A'
                            }
                          />
                        }
                        saveInput={saveInput}
                      />
                    )}
                  </div>
                  <TextField
                    name="notes"
                    label="Tracking Notes"
                    textarea
                    rows={4}
                    bottomPadding={false}
                    placeholder="Anything else about the condition?"
                    required={false}
                    saveInput={saveInput}
                  />
                  <div className="sticky bottom-0 right-0 mt-8 bg-white w-full flex flex-col gap-2">
                    <PrimaryButton type="submit" loading={process}>
                      {process ? 'Submitting' : 'Submit'}
                    </PrimaryButton>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </PortalWindow>
      )}
      <AlertDialog open={alertOpen} handleClose={() => setAlertOpen(false)} />
    </div>
  )
}

export default TrackCondition
