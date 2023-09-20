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
import SelectField from 'src/components/forms/fields/select-field'

const validationSchema = yup.object().shape({
  timestamp: yup.date().required(),
  systolic: yup.number().required(),
  diastolic: yup.number().required(),
  pulse: yup.number().required(),
  bpReadingType: yup.string().required(),
})

function BPReadingForm({
  handleSubmissionError,
  handleSubmissionSuccess,
  saveInput,
  form,
}: FormProps) {
  const { handleCreateBloodPressureReading, loading } = useVitalsUpdate()
  const [initialValues, setInitialValues] = React.useState<any>({
    timestamp: dayjs().toDate(),
    systolic: '',
    diastolic: '',
    pulse: '',
    bpReadingType: '',
  })

  const onSubmit = (values: any) => {
    handleCreateBloodPressureReading(values)
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
      {() => {
        return (
          <Form>
            <DateTimeField
              name="timestamp"
              label="Date"
              saveInput={saveInput}
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
            />
            <TextField
              name="systolic"
              label="Systolic"
              saveInput={saveInput}
              placeholder="Systolic"
            />
            <TextField
              name="diastolic"
              label="Diastolic"
              placeholder="Diastolic"
              saveInput={saveInput}
            />
            <TextField
              name="pulse"
              label="Pulse"
              placeholder="Pulse"
              saveInput={saveInput}
            />
            <div className="flex justify-end items-center gap-4 mt-3">
              <PrimaryButton loading={loading} type="submit">
                Save
              </PrimaryButton>
            </div>
          </Form>
        )
      }}
    </PrimaryForm>
  )
}

export default BPReadingForm
