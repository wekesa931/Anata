import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import { every, isEmpty } from 'lodash'
import { useAirtableMeta } from 'src/context/airtable-meta'
import { useNotifications } from 'src/context/notifications'
import logError from 'src/utils/logging/logger'
import { Forms as TWorkflowForm } from 'src/modules/workflows/db/models'
import validationRules from './validation-schema'
import WorkflowFormsFields from './form-fields'
import CalendlyLink from './calendly-link'
import FORMS from './form-inputs-definitions'

type WorkflowFormProps = {
  form: TWorkflowForm
  formSchema: any
  submissionId: string
  submitForm: (form: TWorkflowForm, formSchema: any) => Promise<any>
  openForm: (formName: string) => void
  saveInput: (name: string, value: string) => void
  formData: any
}

function WorkflowForm({
  form,
  formSchema,
  submissionId,
  submitForm,
  openForm,
  saveInput,
  formData,
}: WorkflowFormProps) {
  const [isFormDraft, setIsFormDraft] = React.useState<boolean>(form.isDraft)
  const { validationObject, numberFields, dateFields } = validationRules(
    formSchema,
    form
  )
  const { airtableMeta } = useAirtableMeta()
  const { notify } = useNotifications()

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validationObject),
  })

  const handleOpenForm = (field: any) => {
    const newFormMeta = (FORMS as Array<Record<string, any>>).find(
      (f: any) => f.formId === field.id
    )
    newFormMeta && openForm(newFormMeta.name)
  }

  useEffect(() => {
    reset(formData)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, form.name])

  const canSubmit = every(errors, isEmpty)

  useEffect(() => {
    if (submissionId && canSubmit && form.id === submissionId) {
      handleSubmit((data: any) => {
        let formattedPayload = data
        numberFields.forEach((mt) => {
          if (formattedPayload[`${mt.name}`]) {
            if (mt.isPercent) {
              formattedPayload = {
                ...formattedPayload,
                [`${mt.name}`]:
                  parseFloat(formattedPayload[`${mt.name}`]) / 100,
              }
            } else {
              formattedPayload = {
                ...formattedPayload,
                [`${mt.name}`]: parseFloat(formattedPayload[`${mt.name}`]),
              }
            }
          }
        })

        dateFields.forEach((dt) => {
          if (form?.data[dt] !== 'Invalid Date') {
            formattedPayload = {
              ...formattedPayload,
              [dt]: form?.data[dt],
            }
          }
        })
        submitForm(form, formSchema)
          .catch((err) => {
            notify('There was an error submitting your form. Please try again.')
            logError(err)
          })
          .then(() => {
            setIsFormDraft(false)
          })
      })()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId])

  return (
    <div>
      {!!formSchema?.fields?.length && (
        <form>
          {formSchema?.fields?.map((field: any) => {
            if (!field.condition || field.condition(getValues())) {
              const fieldValue = formData[field.name] || null
              const disabled = !isFormDraft || !form.isDraft

              return (
                <div className="mt-[40px]" key={field.id}>
                  <div>
                    {field?.formId && (
                      <Button
                        variant="contained"
                        className="absolute bottom-[60px] z-1000 mb-2.5 font-rubik text-xs capitalize"
                        onClick={() => handleOpenForm(field)}
                      >
                        {field?.ctlabel || 'Open Form'}
                      </Button>
                    )}
                    <WorkflowFormsFields
                      disabled={disabled}
                      value={fieldValue}
                      control={control}
                      field={{ ...field, parentTableId: formSchema?.id }}
                      error={errors[field.name]}
                      airtableMeta={airtableMeta}
                      template={form}
                      saveInput={saveInput}
                    />

                    <CalendlyLink field={field} formPayload={[formData]} />
                  </div>
                </div>
              )
            }

            return null
          })}
        </form>
      )}
    </div>
  )
}

export default WorkflowForm
