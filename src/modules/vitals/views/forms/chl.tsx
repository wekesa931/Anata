import { Form } from 'formik'
import React, { useEffect } from 'react'
import PrimaryForm from 'src/components/forms/primary-form'
import { DateTimeField } from 'src/components/forms/fields/date-field'
import TextField from 'src/components/forms/fields/text'
import RadioField from 'src/components/forms/fields/radio-field'
import * as yup from 'yup'
import type { FormProps } from 'src/modules/workflows/types'
import PrimaryButton from 'src/components/buttons/primary'
import { useVitalsUpdate } from 'src/modules/vitals/hooks/vitals.update.hook'
import dayjs from 'dayjs'

const validationSchema = yup.object().shape({
  timestamp: yup.date().required(),
  lipidPanelTestType: yup.string().required(),
  hdl: yup.number().nullable(),
  ldl: yup.number().nullable(),
  totalCholesterol: yup.number().nullable(),
  triglyceride: yup.number().nullable(),
})

const getInitialValues = (data: any) => {
  return {
    timestamp: data?.timestamp,
    lipidPanelTestType: data?.lipidPanelTestType,
    hdl: data?.hdl,
    ldl: data?.ldl,
    totalCholesterol: data?.totalCholesterol,
    triglyceride: data?.triglyceride,
  }
}

function CHLForm({
  form,
  saveInput,
  handleSubmissionError,
  handleSubmissionSuccess,
  isWorkflowComplete = false,
  saveDraft,
}: FormProps) {
  const { loading, handleCreateCholesterolReading } = useVitalsUpdate()
  const [initialValues, setInitialValues] = React.useState<any>({
    timestamp: dayjs().toDate(),
    lipidPanelTestType: '',
    hdl: '',
    ldl: '',
    totalCholesterol: '',
    triglyceride: '',
  })

  const onSubmit = async (values: any) => {
    if (saveDraft) {
      await saveDraft()
    }
    handleCreateCholesterolReading(values)
      .then(async () => {
        await form.markAsCompleted()
        handleSubmissionSuccess(false)
      })
      .catch((error) => {
        setInitialValues(values)
        handleSubmissionError(error)
      })
  }

  useEffect(() => {
    if (form?.data) {
      setInitialValues(getInitialValues(form.data))
    }
  }, [form])

  const disabled = !form?.data?.isDraft || isWorkflowComplete

  return (
    <PrimaryForm
      initialValues={initialValues}
      handleSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <DateTimeField name="timestamp" label="Date" saveInput={saveInput} />
          <RadioField
            name="lipidPanelTestType"
            label="Lipid Panel Test Type"
            options={[
              { label: 'Fasting', value: 'Fasting' },
              { label: 'Non fasting', value: 'Non fasting' },
            ]}
            saveInput={saveInput}
            disabled={disabled}
          />
          <TextField
            name="hdl"
            label="HDL"
            saveInput={saveInput}
            helperText={`
              Interpretation of Results:
              
              Men < 40mg/dL: Poor
              Women <50 mg/dL: Poor
              40-59 mg/dL: Better
              > 60 mg/dL: Best`}
            required={false}
            disabled={disabled}
          />
          <TextField
            name="ldl"
            label="LDL"
            saveInput={saveInput}
            helperText={`
              Interpretation of Results:
              
              < 100 mg/dL: Optimal
              100-129 mg/dL: Near optimal
              130-159 mg/dL: Borderline high
              160-189 mg/dL: High
              > 190 mg/dL: Very high`}
            required={false}
            disabled={disabled}
          />
          <TextField
            name="totalCholesterol"
            label="Total Cholesterol"
            saveInput={saveInput}
            helperText={`
              Interpretation of Results:
              
              < 200 mg/dL: Desirable
              200-239 mg/dL: Borderline high
              > 240 mg/dL: High`}
            required={false}
            disabled={disabled}
          />
          <TextField
            name="triglyceride"
            label="Triglyceride"
            saveInput={saveInput}
            helperText={`
              Interpretation of Results:
              
              < 150 mg/dL: Normal
              150-199 mg/dL: Borderline high
              200-499 mg/dL: High
              > 500 mg/dL: Very high`}
            required={false}
            disabled={disabled}
          />

          <div className="flex justify-end">
            <PrimaryButton
              loading={loading}
              disabled={loading || disabled}
              type="submit"
            >
              Submit form
            </PrimaryButton>
          </div>
        </Form>
      )}
    </PrimaryForm>
  )
}

export default CHLForm
