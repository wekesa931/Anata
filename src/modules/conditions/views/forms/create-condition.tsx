import { Form } from 'formik'
import React, { useEffect } from 'react'
import PrimaryButton from 'src/components/buttons/primary'
import {
  AutocompleteField,
  SelectField,
  TextField,
  DateField,
} from 'src/components/forms/fields'
import PrimaryForm from 'src/components/forms/primary-form'
import useConditionsData from 'src/modules/conditions/hooks/conditions.data'
import { ConditionDefinition } from 'src/modules/conditions/types'
import * as yup from 'yup'
import {
  mapCreateConditionFormValues,
  dedupOptions,
  addNoneToKey,
} from 'src/modules/conditions/utils'
import type { FormProps } from 'src/modules/workflows/types'

const getProvisionedStatusValue = (lookups: any = {}) => {
  return lookups?.conditionVerificationStatuses?.find(
    (status: any) => status?.label === 'Provisioned'
  )?.value
}

const validationSchema = (conditions: string[], lookups: any) => {
  return yup.object().shape({
    condition: yup
      .mixed<ConditionDefinition>()
      .required('Condition name is required')
      .test(
        'no-existing-condition',
        'The member already has this condition',
        (value) => {
          return !conditions.includes(value?.name || '')
        }
      ),
    clinicalStatus: yup
      .number()
      .required('Clinical status is required')
      .typeError('Clinical status can not be none'),
    verificationStatus: yup
      .number()
      .required('Verification status is required')
      .typeError('Verification status cannot be none')
      .test(
        'invalid-verification-status',
        'Verification status cannot be Provisioned if Stage at diagnosis is set',
        function invalidVerificationStatusTest(value) {
          const { startingStageId } = this.parent
          const provisionedStatus = getProvisionedStatusValue(lookups)
          return !(startingStageId !== -1 && value === provisionedStatus)
        }
      ),
    diagnosisDate: yup
      .date()
      .required("Date of diagnosis can't be empty")
      .typeError('Please enter a date')
      .max(new Date(), 'Date of diagnosis can not be in the future')
      .when('onsetDate', (onsetDate: any, schema: any) => {
        return onsetDate
          ? schema.min(onsetDate, 'Diagnosis date must be after onset date')
          : schema
      }),
    newlyDiagnosed: yup.string().required('Newly diagnosed is required'),
    icd11Code: yup.string().required('ICD-11 code is required'),
    acuteVsChronic: yup.string().required('Acute vs Chronic is required'),
    startingStageId: yup.number().when('verificationStatus', {
      is: (value: number) => {
        const provisioned = getProvisionedStatusValue(lookups)
        return value === provisioned
      },
      then: yup.number().notRequired(),
      otherwise: yup.number().required('Starting stage is required'),
    }),
    targetId: yup.number().when('verificationStatus', {
      is: (value: number) => {
        const provisioned = getProvisionedStatusValue(lookups)
        return value === provisioned
      },
      then: yup.number().notRequired(),
      otherwise: yup.number().required('Starting stage is required'),
    }),
    atRiskFromIds: yup
      .array()
      .of(yup.number())
      .min(1, "Risk factor at diagnosis can't be empty")
      .test(
        'no-negative-one',
        "You cannot add another option if 'None' is selected",
        (value) => {
          const v = value || []
          if (v.length > 1) return !v?.includes(-1)
          return true
        }
      ),
    onsetDate: yup
      .date()
      .nullable()
      .notRequired()
      .max(new Date(), 'Onset date can not be in the future')
      .typeError('Please enter a date'),
  })
}

const presets = {
  condition: '',
  clinicalStatus: '',
  verificationStatus: '',
  startingStageId: '',
  targetId: '',
  acuteVsChronic: '',
  note: '',
  diagnosisDate: null,
  newlyDiagnosed: '',
  atRiskFromIds: [],
  onsetDate: null,
  icd11Code: '',
}

type Prefills = {
  actuteVsChronic: boolean
  icd11Code: boolean
}

type CreateConditionProps = {
  refetch?: () => void
  closeWindow?: () => void
} & FormProps

export function CreateCondition({
  refetch,
  handleSubmissionSuccess,
  handleSubmissionError,
  saveInput,
  form,
  upsertDraft,
  isWorkflowComplete = false,
  closeWindow,
}: CreateConditionProps) {
  const {
    conditionDefinitions,
    lookups,
    handleCreateNewCondition,
    allConditions,
  } = useConditionsData()

  // from form?.data (coming from workflows) the condition is a string (name of it)
  // we need to map it to the value of the conditionDefintion (the id)
  const getInitialValuesFromFormData = () => {
    const c =
      conditionDefinitions?.find((d) => d?.name === form?.data?.condition) || ''

    return {
      ...presets,
      ...form?.data,
      condition: c,
    }
  }

  const [initialValues, setInitialValues] = React.useState<any>(presets)

  useEffect(() => {
    if (conditionDefinitions?.length) {
      setInitialValues(getInitialValuesFromFormData())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionDefinitions])
  const [submitting, setSubmitting] = React.useState(false)

  // track prefilled fields to disable overwriting
  const [prefilled, setPrefilled] = React.useState<Prefills>({
    actuteVsChronic: false,
    icd11Code: false,
  })

  const handleStagePrefill = (
    condition: ConditionDefinition,
    selectedStageId: any
  ) => {
    const conditionIcd11Code = condition?.icd11Code || ''
    const selectedStage = condition?.possibleStages?.find(
      (stage) => stage.value === selectedStageId
    )

    const newIcd11Code = selectedStage?.icd11Code || conditionIcd11Code

    setInitialValues((prevValues: any) => ({
      ...prevValues,
      startingStageId: selectedStageId,
      icd11Code: newIcd11Code,
    }))

    setPrefilled((prev) => ({
      ...prev,
      icd11Code: !!newIcd11Code,
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleConditionPrefills = (
    n: string,
    c: ConditionDefinition,
    values: any
  ) => {
    setInitialValues((prev: any) => ({
      ...prev,
      ...values,
      condition: c,
      icd11Code: c?.icd11Code || '',
      acuteVsChronic:
        c && c?.isChronic !== null ? (c?.isChronic ? 'chronic' : 'acute') : '',
      startingStageId: '',
      targetId: '',
    }))

    setPrefilled(() => ({
      actuteVsChronic: !!c && c.isChronic !== null,
      icd11Code: !!c && !!c.icd11Code,
    }))

    saveInput(n, c?.name)
  }

  const handleSubmit = async (values: any) => {
    try {
      setSubmitting(true)
      if (upsertDraft) await upsertDraft()

      const payload = mapCreateConditionFormValues(values)
      await handleCreateNewCondition(payload)
      await form.markAsCompleted()
      handleSubmissionSuccess(false, values)
      // only reset if we intend to close the window (from +Add condition)
      if (closeWindow) {
        setInitialValues(presets)
        closeWindow()
      }

      refetch && refetch()
    } catch (error: any) {
      handleSubmissionError(error)
    } finally {
      setSubmitting(false)
    }
  }

  const disabled = !form?.data?.isDraft || isWorkflowComplete

  const makeTargetAndStageOptional = (verificationStatus: number) => {
    const provisioned = getProvisionedStatusValue(lookups)
    return verificationStatus !== provisioned
  }

  return (
    <div className="p-4 relative overflow-auto">
      <PrimaryForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationSchema={validationSchema(
          (allConditions || []).map((c) => c.name),
          lookups
        )}
      >
        {({ values, errors }) => (
          <Form>
            <AutocompleteField
              label="Condition"
              name="condition"
              options={conditionDefinitions || []}
              multiple={false}
              saveInput={(n, v) => handleConditionPrefills(n, v, values)}
              disabled={disabled}
            />
            <div className="flex gap-2 items-center">
              <SelectField
                label="Clinical Status"
                options={lookups?.conditionClinicalStatuses || []}
                name="clinicalStatus"
                required
                placeholder="-- Select --"
                saveInput={saveInput}
                disabled={disabled}
              />

              <SelectField
                label="Verification Status"
                options={lookups?.conditionVerificationStatuses || []}
                name="verificationStatus"
                required
                placeholder="-- Select --"
                saveInput={saveInput}
                disabled={disabled}
              />
            </div>

            <div className="flex gap-2 items-center">
              <SelectField
                label="Stage at diagnosis"
                options={addNoneToKey(
                  dedupOptions(values.condition?.possibleStages || [])
                )}
                name="startingStageId"
                required={makeTargetAndStageOptional(
                  values?.verificationStatus
                )}
                placeholder="-- Select --"
                saveInput={(name, value) => {
                  handleStagePrefill(values.condition, value)
                  saveInput(name, value)
                }}
                disabled={disabled}
              />

              <SelectField
                label="Starting target"
                options={addNoneToKey(
                  dedupOptions(values?.condition?.possibleTargets || [])
                )}
                name="targetId"
                required={makeTargetAndStageOptional(
                  values?.verificationStatus
                )}
                placeholder="-- Select --"
                saveInput={saveInput}
                disabled={disabled}
              />
            </div>
            <SelectField
              label="Acute vs Chronic"
              options={[
                { label: 'Acute', value: 'acute' },
                { label: 'Chronic', value: 'chronic' },
              ]}
              name="acuteVsChronic"
              required
              disabled={prefilled.actuteVsChronic || disabled}
              placeholder="-- Select --"
              saveInput={saveInput}
            />

            <TextField
              label="Condition notes"
              name="note"
              required={false}
              textarea
              rows={3}
              placeholder="Anything else about the condition"
              saveInput={saveInput}
              disabled={disabled}
            />

            <div className="flex gap-2 items-center mt-4">
              <DateField
                label="Date of diagnosis"
                name="diagnosisDate"
                required
                openToYear={false}
                maxDate={new Date()}
                saveInput={saveInput}
                disabled={disabled}
              />
              <SelectField
                label="Newly Diagnosed"
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
                name="newlyDiagnosed"
                required
                placeholder="-- Select --"
                saveInput={saveInput}
                disabled={disabled}
              />
            </div>
            <SelectField
              label="Risk factor at diagnosis"
              name="atRiskFromIds"
              options={addNoneToKey(lookups?.atRiskFromItems || [], -1, false)}
              multiple
              required
              placeholder="-- Select --"
              saveInput={saveInput}
              disabled={disabled}
            />

            <DateField
              label="Onset Date"
              name="onsetDate"
              required={false}
              openToYear={false}
              maxDate={new Date()}
              saveInput={saveInput}
              disabled={disabled}
            />

            <TextField
              label="ICD-11 Code"
              name="icd11Code"
              required
              disabled={prefilled.icd11Code || disabled}
              placeholder="Click to edit"
              saveInput={saveInput}
            />

            <div className="flex items-center mt-8">
              <p className="text-sm font-rubik text-dark-red-100">
                {Object.values(errors).length > 0 && 'Please fill all fields'}
              </p>
            </div>

            <div className="sticky bottom-0 right-0 mt-8 bg-white w-full flex flex-col gap-2">
              <PrimaryButton
                type="submit"
                fullWidth={!!closeWindow}
                loading={submitting}
                disabled={disabled}
              >
                {submitting ? 'Submitting' : 'Submit Form'}
              </PrimaryButton>
            </div>
          </Form>
        )}
      </PrimaryForm>
    </div>
  )
}

export default CreateCondition
