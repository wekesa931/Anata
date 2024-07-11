import { FieldArray, Form } from 'formik'
import React, { useState } from 'react'
import { MultiselectField } from 'src/components/forms/fields/select-field'
import PrimaryForm from 'src/components/forms/primary-form'
import * as yup from 'yup'
import type { FormProps } from 'src/modules/workflows/types'
import PrimaryButton from 'src/components/buttons/primary'
import { TextField } from 'src/components/forms/fields/text'
import { useNotifications } from 'src/context/notifications'
import CenteredLoader from 'src/components/loaders/centered'
import InfoIcon from '@mui/icons-material/Info'
import useHealthMetricsData from 'src/modules/conditions/hooks/health-metrics-data'
import { DateTimeField } from 'src/components/forms/fields/date-field'

type InitialValues = {
  healthMetrics: HealthMetric[]
  metricsCreatedDate?: string
  [key: string]: string | HealthMetric[] | undefined
}

const presets: InitialValues = {
  healthMetrics: [],
  metricsCreatedDate: '',
}

interface HealthMetric {
  name: string
  label: string
  helperText: string | null
  value: string
}

const customValidation = (options: any) => {
  const { initialValues } = options

  const dynamicSchema = initialValues.healthMetrics.reduce(
    (acc: any, metric: any) => {
      acc[metric.value] = yup
        .number()
        .min(0, 'Value must be 0 or higher')
        .required(`${metric.label} is required`)
      return acc
    },
    {}
  )

  return yup.object().shape({
    healthMetrics: yup
      .array()
      .min(1, 'Please select at least one health metric.'),
    metricsCreatedDate: yup.date().typeError('Please select date and time'),
    ...dynamicSchema,
  })
}

export function HealthMetricsForm({
  handleSubmissionError,
  handleSubmissionSuccess,
  upsertDraft: saveDraft,
  isWorkflowComplete,
  form,
}: FormProps) {
  const [initialValues, setInitialValues] = useState<InitialValues>(presets)

  const { notify } = useNotifications()
  const {
    handleUpdateMetrics,
    error,
    loadingHealthMetrics: loading,
    healthMetricsOptions,
  } = useHealthMetricsData()
  const [submitting, setSubmitting] = React.useState(false)

  const transformLabel = (label: string) => {
    return `Enter the ${label.toLowerCase()}`
  }

  const handleSubmit = async (values: any) => {
    if (saveDraft) {
      await saveDraft()
    }
    setSubmitting(true)

    try {
      await handleUpdateMetrics(values)

      await form.markAsCompleted()
      notify('Health metrics added successfully')
      handleSubmissionSuccess(false)
    } catch (err: any) {
      notify(err?.message ?? 'Error adding health metrics')
      handleSubmissionError(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleMetricChange = (
    fieldName: string,
    selectedMetrics: HealthMetric[]
  ) => {
    setInitialValues((prevState) => {
      const updatedState: InitialValues = {
        ...prevState,
        healthMetrics: selectedMetrics,
      }

      selectedMetrics.forEach((metric) => {
        if (!updatedState[metric.value]) {
          updatedState[metric.value] = ''
        }
      })
      prevState.healthMetrics.forEach((metric) => {
        if (!selectedMetrics.find((m) => m.value === metric.value)) {
          delete updatedState[metric.value]
        }
      })

      return updatedState
    })
  }

  const handleInputChange = (fieldName: string, value: any) => {
    setInitialValues((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }))
  }

  const disabled = !form?.data?.isDraft || isWorkflowComplete

  const validationSchema = customValidation({
    initialValues,
  })

  return (
    <div className="p-2 relative overflow-auto">
      {loading && (
        <div className="flex items-center justify-center w-full mt-[20%]">
          <CenteredLoader message="Fetching health metrics..." />
        </div>
      )}
      {error && <div>{error} </div>}
      {!loading && (
        <PrimaryForm
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        >
          {({ values, errors }) => (
            <Form>
              <MultiselectField
                name="healthMetrics"
                options={healthMetricsOptions}
                fullWidth
                label="Select health metric(s) to add to the form"
                saveInput={handleMetricChange}
                required={false}
                disabled={disabled}
              />
              {!values.healthMetrics.length && (
                <div className="bg-[#FFFFE0] border border-solid border-[#FFFFE0] p-2 flex rounded-lg items-center">
                  <InfoIcon className="mr-2 text-orange-100" />
                  Please select a health metric first. The respective score
                  field will be generated automatically.
                </div>
              )}
              <div className="flex flex-col gap-2 mt-3 mb-3">
                <DateTimeField
                  label="Select Date and Time"
                  name="metricsCreatedDate"
                  placeholder="dd/mm/yyyy"
                  openToYear={false}
                  saveInput={handleInputChange}
                  maxDate={new Date()}
                />
              </div>

              <FieldArray name="metrics">
                {() => (
                  <div className="flex flex-col gap-2">
                    {values?.healthMetrics &&
                      !!values?.healthMetrics?.length &&
                      values?.healthMetrics.map((p: any, index: number) => (
                        <TextField
                          name={p.value}
                          label={transformLabel(p.label)}
                          placeholder="Please input a number..."
                          key={index}
                          helperText={p?.helperText}
                          saveInput={handleInputChange}
                          required={false}
                          disabled={disabled}
                        />
                      ))}
                  </div>
                )}
              </FieldArray>

              {Object.keys(errors).length > 0 && (
                <div className="flex flex-col gap-1">
                  {Object.keys(errors).map((key: string) => (
                    <div key={key} className="text-red-500 text-xs">
                      {`${key}: ${errors[key]}`}
                    </div>
                  ))}
                </div>
              )}

              <div className="sticky bottom-0 mt-4">
                <PrimaryButton
                  fullWidth
                  type="submit"
                  disabled={disabled}
                  loading={submitting}
                >
                  {submitting ? 'Submitting' : 'Submit Form'}
                </PrimaryButton>
              </div>
            </Form>
          )}
        </PrimaryForm>
      )}
    </div>
  )
}

export default HealthMetricsForm
