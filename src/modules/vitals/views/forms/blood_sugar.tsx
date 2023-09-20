import { Form } from 'formik'
import React from 'react'
import PrimaryForm from 'src/components/forms/primary-form'
import { DateTimeField } from 'src/components/forms/fields/date-field'
import TextField from 'src/components/forms/fields/text'
import * as yup from 'yup'
import type { FormProps } from 'src/modules/workflows/types'
import PrimaryButton from 'src/components/buttons/primary'
import { useVitalsUpdate } from 'src/modules/vitals/hooks/vitals.update.hook'
import dayjs from 'dayjs'

// set the number field type message to be more specific field must be a number
yup.setLocale({
  mixed: {
    default: 'Field must be a number',
  },
})

const validationSchema = yup.object().shape({
  timestamp: yup.date().required(),
  preprandialBloodGlucose: yup.number().nullable(),
  postprandialBloodGlucose: yup.number().nullable(),
  fastingBloodGlucose: yup.number().nullable(),
  hba1c: yup.number().nullable(),
})

function DMMonitoring({
  form,
  handleSubmissionError,
  handleSubmissionSuccess,
  saveInput,
}: FormProps) {
  const { handleCreateDMReading, loading } = useVitalsUpdate()
  const [initialValues, setInitialValues] = React.useState<any>({
    timestamp: dayjs().toDate(),
    preprandialBloodGlucose: '',
    postprandialBloodGlucose: '',
    fastingBloodGlucose: '',
    hba1c: '',
  })

  const onSubmit = (values: any) => {
    handleCreateDMReading(values)
      .then(async () => {
        await form.markAsCompleted()
        handleSubmissionSuccess()
      })
      .catch((error) => {
        handleSubmissionError(error)
        setInitialValues(values)
      })
  }

  return (
    <PrimaryForm
      initialValues={initialValues}
      handleSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <DateTimeField name="timestamp" label="Date and Time" required />
          <TextField
            name="preprandialBloodGlucose"
            label="Preprandial Blood Glucose"
            saveInput={saveInput}
            placeholder="Enter preprandial blood glucose"
            required={false}
          />
          <TextField
            name="postprandialBloodGlucose"
            label="Postprandial Blood Glucose"
            saveInput={saveInput}
            placeholder="Enter postprandial blood glucose"
            required={false}
          />
          <TextField
            name="fastingBloodGlucose"
            label="Fasting Blood Glucose"
            saveInput={saveInput}
            placeholder="Enter fasting blood glucose"
            required={false}
            helperText={`
            Preprandial morning blood sugar indicates a fasting Blood sugar reading. If it is post-prandial then it is not a fasting glucose

            Interpretation of Results:
            
            Normal: <5.5 mmol/l
            Pre-diabetic: 5.5-6.9 mmol/l
            Diabetic: >7 mmol/l
            
            Target for Diabetics: <7 mmol/l
            `}
          />
          <TextField
            name="hba1c"
            label="HbA1c"
            saveInput={saveInput}
            placeholder="Enter HbA1c"
            required={false}
            helperText={`
            Interpretation of Results:

            Normal: <5.7%
            pre-diabetes: 5.7-6.4%
            Diabetic: >6.5%
            
            Target Level for Diabetics: <7.5%
            `}
          />
          <div className="flex justify-end">
            <PrimaryButton type="submit" disabled={loading} loading={loading}>
              Save
            </PrimaryButton>
          </div>
        </Form>
      )}
    </PrimaryForm>
  )
}

export default DMMonitoring
