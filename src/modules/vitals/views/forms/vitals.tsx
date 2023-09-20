import { Form } from 'formik'
import React, { useState } from 'react'
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
  temperature: yup.number().nullable(),
  respiratoryRate: yup.number().nullable(),
  oxygenSaturation: yup.number().nullable(),
  height: yup.number().nullable(),
  weight: yup.number().nullable(),
  muscleMass: yup.number().nullable(),
  bodyFat: yup.number().nullable(),
  visceralFat: yup.number().nullable(),
  waistCircumference: yup.number().nullable(),
  hipCircumference: yup.number().nullable(),
  boneDensity: yup.number().nullable(),
  waterContent: yup.number().nullable(),
  midUpperArmCircumference: yup.number().nullable(),
  sixLeadEcgFindings: yup.string().nullable(),
})

function VitalsCollection({
  saveInput,
  form,
  handleSubmissionError,
  handleSubmissionSuccess,
}: FormProps) {
  const { loading, handleCreateVitalsReading } = useVitalsUpdate()
  const [initialValues, setInitialValues] = useState<any>({
    timestamp: dayjs().toDate(),
    temperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    height: '',
    weight: '',
    muscleMass: '',
    bodyFat: '',
    visceralFat: '',
    waistCircumference: '',
    hipCircumference: '',
    boneDensity: '',
    waterContent: '',
    midUpperArmCircumference: '',
    sixLeadEcgFindings: '',
  })

  const onSubmit = (values: any) => {
    handleCreateVitalsReading(values)
      .then(async () => {
        await form.markAsCompleted()
        handleSubmissionSuccess()
      })
      .catch((error) => {
        setInitialValues(values)
        handleSubmissionError(error)
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
          <DateTimeField name="timestamp" label="Date" saveInput={saveInput} />
          <TextField
            name="temperature"
            label="Temperature"
            saveInput={saveInput}
            required={false}
            helperText="(°C)"
            placeholder="Temperature"
          />
          <TextField
            name="respiratoryRate"
            label="RR"
            saveInput={saveInput}
            required={false}
            helperText="BPM"
            placeholder="RR"
          />
          <TextField
            name="oxygenSaturation"
            label="SPO2"
            saveInput={saveInput}
            required={false}
            helperText="%"
            placeholder="SPO2"
          />

          <TextField
            name="height"
            label="Height"
            saveInput={saveInput}
            required={false}
            helperText="(m) - examples: 1.5m 1.8m 1.75m"
            placeholder="Height"
          />

          <TextField
            name="weight"
            label="Weight"
            saveInput={saveInput}
            required={false}
            helperText="(kg)"
            placeholder="Weight"
          />

          <TextField
            name="muscleMass"
            label="Muscle Mass"
            saveInput={saveInput}
            required={false}
            helperText={`
            Please enter the Muscle mass identified by the device in Kilograms.
            (if decimals, use a . not a ,)
            `}
            placeholder="Muscle Mass"
          />

          <TextField
            name="bodyFat"
            label="Body Fat"
            saveInput={saveInput}
            required={false}
            helperText={`
            Please enter the Body fat identified by the device.
            Example: 10%, 14.20%, 22.15%, 30%
            (if decimals, use a . not a ,)
            `}
            placeholder="Body Fat"
          />

          <TextField
            name="visceralFat"
            label="Visceral fat"
            saveInput={saveInput}
            required={false}
            helperText={`
            Please enter the Visceral fat identified by the device.
            0-9: Normal
            10-14: High
            15 and above: Very high
            `}
            placeholder="Visceral fat"
          />

          <TextField
            name="waistCircumference"
            label="Waist circumference"
            saveInput={saveInput}
            required={false}
            helperText={`
            Men: <94 cm is healthy, 94-101 cm is at Risk, >102 cm is at High Risk
            Women: <80 cm is healthy, 80-87 cm is at Risk, >88 cm is at High Risk
            `}
            placeholder="Waist circumference"
          />

          <TextField
            name="hipCircumference"
            label="Hip circumference"
            saveInput={saveInput}
            required={false}
            helperText="(cm)"
            placeholder="Hip circumference"
          />

          <TextField
            name="boneDensity"
            label="Bone density"
            saveInput={saveInput}
            required={false}
            helperText={`
            Normal values for Men: 3.1 kgs to 3.3 kgs
            Normal values for Women: 2.4 kgs to 2.6 kgs
            `}
            placeholder="Bone density"
          />

          <TextField
            name="waterContent"
            label="Water content"
            saveInput={saveInput}
            required={false}
            helperText={`
            Normal values for Men: 55% to 65%
            Normal values for Women: 45% to 60%
            `}
            placeholder="Water content"
          />
          <TextField
            name="midUpperArmCircumference"
            label="Mid upper arm circumference"
            saveInput={saveInput}
            required={false}
            placeholder="Mid upper arm circumference"
            helperText={`
            Enter vital reading for children below 5 years
              <11.5 cm - severely undernourished
              11.5 - 12.5 cm - moderately undernourished
              >12.5 cm - healthy
            `}
          />
          <RadioField
            name="sixLeadEcgFindings"
            label="6-Lead ECG Findings"
            saveInput={saveInput}
            required={false}
            options={[
              { label: 'Normal rhythm', value: 'Normal rhythm' },
              { label: 'Abnormal rhythm', value: 'Abnormal rhythm' },
            ]}
          />

          <div className="flex justify-end">
            <PrimaryButton loading={loading} disabled={loading} type="submit">
              Submit
            </PrimaryButton>
          </div>
        </Form>
      )}
    </PrimaryForm>
  )
}

export default VitalsCollection
