import React, { useEffect, useState } from 'react'
import FORM_DEFINITIONS from 'src/modules/workflows/components/forms/form-inputs-definitions'
import validationRules from 'src/modules/workflows/components/forms/validation-schema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { every, isEmpty } from 'lodash'
import type { FormProps } from 'src/modules/workflows/types'
import useWorkflowData from 'src/modules/workflows/hooks/workflow-data'
import ButtonField from 'src/modules/workflows/components/forms/button-field'
import WorkflowFormsFields from 'src/modules/workflows/components/forms/form-fields'
import { useAirtableMeta } from 'src/context/airtable-meta'
import CalendlyLink from 'src/modules/workflows/components/forms/calendly-link'
import { LoadingButton } from '@mui/lab'
import { useNotifications } from 'src/context/notifications'

function AirtableBasedForm({
  form,
  handleSubmissionError,
  handleSubmissionSuccess,
  saveInput,
  formData,
  isWorkflowComplete = false,
}: FormProps) {
  const formSchema = (FORM_DEFINITIONS as any).find(
    (f: any) => f?.name === form.name
  )
  if (!formSchema) {
    throw new Error(`Form fields for form:${name} not found`)
  }

  const { validationObject, numberFields, dateFields } = validationRules(
    formSchema,
    !!form?.workflow.id
  )

  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validationObject, { mode: 'async' }),
    defaultValues: form?.data || {},
    mode: 'onBlur',
  })

  useEffect(() => {
    reset(formData)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name, formData])

  const { submitForm, submittingForm } = useWorkflowData()
  const canSubmitForm = every(errors, isEmpty)
  const { airtableMeta } = useAirtableMeta()
  const [isFormDraft, setIsFormDraft] = useState(true)
  const { notify } = useNotifications()

  useEffect(() => {
    setIsFormDraft(form.isDraft)
  }, [form?.isDraft])

  const preProcessInput = (values: any) => {
    let formattedPayload = values
    numberFields.forEach((mt: any) => {
      if (formattedPayload[`${mt.name}`]) {
        if (mt.isPercent) {
          formattedPayload = {
            ...formattedPayload,
            [`${mt.name}`]: parseFloat(formattedPayload[`${mt.name}`]) / 100,
          }
        } else {
          formattedPayload = {
            ...formattedPayload,
            [`${mt.name}`]: parseFloat(formattedPayload[`${mt.name}`]),
          }
        }
      }
    })

    dateFields.forEach((dt: any) => {
      if (form?.data[dt] !== 'Invalid Date') {
        formattedPayload = {
          ...formattedPayload,
          [dt]: form?.data[dt],
        }
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { timestamp, ...rest } = formattedPayload

    return rest
  }

  const onSubmit = () => {
    const formattedPayload = preProcessInput(form?.data)

    submitForm(form, formSchema, formattedPayload)
      .then(() => {
        setIsFormDraft(false)
        handleSubmissionSuccess()
      })
      .catch((e) => {
        setIsFormDraft(true)
        handleSubmissionError(e)
      })
  }

  const disabled =
    isSubmitting ||
    submittingForm ||
    !canSubmitForm ||
    isWorkflowComplete ||
    !isFormDraft

  useEffect(() => {
    if (!canSubmitForm) {
      notify("Can't submit form. Please check for errors and retry")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSubmitForm])

  return (
    <div>
      {!!formSchema?.fields?.length && (
        <form onSubmit={onSubmit}>
          {formSchema?.fields?.map((field: any) => {
            if (!field.condition || field.condition(getValues())) {
              const fieldValue = getValues()[field.name] || null

              return (
                <div className="mt-[40px]" key={field.id}>
                  <div>
                    {field?.formId && <ButtonField field={field} />}
                    <WorkflowFormsFields
                      value={fieldValue}
                      control={control}
                      field={{ ...field, parentTableId: formSchema?.id }}
                      error={errors[field.name]}
                      airtableMeta={airtableMeta}
                      saveInput={saveInput}
                      isWorkflow={!!form.workflow}
                      disabled={!isFormDraft}
                    />
                    <CalendlyLink
                      fieldId={field?.id}
                      formPayload={getValues()}
                    />
                  </div>
                </div>
              )
            }

            return null
          })}
          <div className="flex items-center justify-end">
            <LoadingButton
              className={`rounded-xl font-rubik text-sm font-medium normal-case text-white ${
                !disabled ? 'bg-blue-100 ' : 'bg-disabled-grey'
              }`}
              disabled={disabled}
              onClick={() => {
                if (canSubmitForm) {
                  handleSubmit(onSubmit)()
                } else {
                  notify("Can't submit form. Please check for errors and retry")
                }
              }}
              loading={isSubmitting || submittingForm}
            >
              Submit form
            </LoadingButton>
          </div>
        </form>
      )}
    </div>
  )
}

export default AirtableBasedForm
