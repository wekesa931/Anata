import { Form } from 'formik'
import React, { useEffect } from 'react'
import PrimaryForm from 'src/components/forms/primary-form'
import { DateTimeField } from 'src/components/forms/fields/date-field'
import TextField from 'src/components/forms/fields/text'
import * as yup from 'yup'
import type { FormProps } from 'src/modules/workflows/types'
import PrimaryButton from 'src/components/buttons/primary'
import { useVitalsUpdate } from 'src/modules/vitals/hooks/vitals.update.hook'
import SelectField from 'src/components/forms/fields/select-field'

const validationSchema = yup.object().shape({
  timestamp: yup.date().required(),
  systolic: yup.number().required(),
  diastolic: yup.number().required(),
  pulse: yup.number().notRequired().nullable(),
  bpReadingType: yup.string().required(),
})

const getInitialValues = (data: any) => {
  return {
    timestamp: data?.timestamp,
    systolic: data?.systolic,
    diastolic: data?.diastolic,
    pulse: data?.pulse,
    bpReadingType: data?.bpReadingType,
  }
}

function BPReadingForm({
  handleSubmissionError,
  handleSubmissionSuccess,
  saveInput,
  form,
  isWorkflowComplete = false,
  saveDraft,
}: FormProps) {
  const { handleCreateBloodPressureReading, loading } = useVitalsUpdate()
  const [initialValues, setInitialValues] = React.useState<any>({
    timestamp: new Date(),
    systolic: '',
    diastolic: '',
    pulse: '',
    bpReadingType: '',
  })

  useEffect(() => {
    if (form?.data) {
      setInitialValues(getInitialValues(form.data))
    }
  }, [form])

  const onSubmit = async (values: any) => {
    if (saveDraft) {
      await saveDraft()
    }
    handleCreateBloodPressureReading(values)
      .then(async () => {
        await form.markAsCompleted()
        handleSubmissionSuccess(false, values)
      })
      .catch((error) => {
        handleSubmissionError(error)
        setInitialValues(values)
      })
  }

  const disabled = !form?.data?.isDraft || isWorkflowComplete

  return (
    <PrimaryForm
      initialValues={initialValues}
      handleSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <Form>
            <DateTimeField
              name="timestamp"
              label="Date"
              saveInput={saveInput}
              disabled={disabled}
            />
            <SelectField
              name="bpReadingType"
              label="BP Reading Type"
              placeholder="BP Reading Type"
              saveInput={saveInput}
              options={[
                {
                  label: 'Data collection for HMP',
                  value: 'Data collection for HMP',
                },
                {
                  label: 'Ad hoc BP measurement',
                  value: 'Ad hoc BP measurement',
                },
                {
                  label: 'Routine BP measurement',
                  value: 'Routine BP measurement',
                },
                { label: 'App data collection', value: 'App data collection' },
              ]}
              disabled={disabled}
            />
            <TextField
              name="systolic"
              label="Systolic"
              saveInput={saveInput}
              placeholder="Systolic"
              disabled={disabled}
            />
            <TextField
              name="diastolic"
              label="Diastolic"
              placeholder="Diastolic"
              saveInput={saveInput}
              disabled={disabled}
            />
            <TextField
              name="pulse"
              label="Pulse"
              placeholder="Pulse"
              saveInput={saveInput}
              required={false}
              disabled={disabled}
            />

            <div className="flex justify-end items-center gap-4 mt-3">
              <PrimaryButton
                loading={loading}
                disabled={loading || disabled}
                type="submit"
              >
                Submit form
              </PrimaryButton>
            </div>
          </Form>
        )
      }}
    </PrimaryForm>
  )
}

export default BPReadingForm
