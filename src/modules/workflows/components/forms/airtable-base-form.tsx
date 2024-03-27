import React, { useEffect, useState } from 'react'
import FORM_DEFINITIONS from 'src/modules/workflows/components/forms/form-inputs-definitions'
import validationRules from 'src/modules/workflows/components/forms/validation-schema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { every, groupBy, isEmpty } from 'lodash'
import type { FormProps } from 'src/modules/workflows/types'
import useWorkflowData from 'src/modules/workflows/hooks/workflow-data'
import ButtonField from 'src/modules/workflows/components/forms/button-field'
import WorkflowFormsFields from 'src/modules/workflows/components/forms/form-fields'
import { useAirtableMeta } from 'src/context/airtable-meta'
import CalendlyLink from 'src/modules/workflows/components/forms/calendly-link'
import { LoadingButton } from '@mui/lab'
import { useNotifications } from 'src/context/notifications'
import { TaskDefinition } from 'src/modules/tasks/types'
import { useModuleAnalytics } from 'src/modules/analytics'

const TASK_DEFINITION_FIELD_ID =
  process.env.PROD === 'true' ? 'fldrJeu9BzF1p0thE' : 'fldwYDHowo9JFzkc7'

const SCRIBE_TAGS_FIELD_ID = 'fldluUjdXcncSqpNk'

function AirtableBasedForm({
  form,
  handleSubmissionError,
  handleSubmissionSuccess,
  saveInput,
  formData,
  isWorkflowComplete = false,
  upsertDraft,
  workflow,
  updatePrefills,
}: FormProps) {
  const formSchema: any = (FORM_DEFINITIONS as any).find(
    (f: any) => f?.name === form.name
  )
  if (!formSchema) {
    throw new Error(`Form fields for form:${name} not found`)
  }

  const { validationObject, numberFields, dateFields } = validationRules(
    formSchema,
    !!workflow
  )

  const { trackFormSaved } = useModuleAnalytics()

  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationObject, { mode: 'async' }),
    defaultValues: form?.data || {},
    mode: 'onBlur',
  })

  useEffect(() => {
    const sub$ = watch((value, { type }) => {
      if (type === 'change') {
        reset(generateFromState())
      }
    })

    return () => sub$.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch])

  useEffect(() => {
    reset(formData)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name, formData])

  const { submitForm, submittingForm } = useWorkflowData()
  const canSubmitForm = every(errors, isEmpty)
  const airtableMetaData = useAirtableMeta()
  const { airtableMeta, taskDefinitions } = airtableMetaData
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

  const onSubmit = async () => {
    const formattedPayload = preProcessInput(form?.data)
    try {
      upsertDraft && (await upsertDraft())

      await submitForm(form, formSchema, formattedPayload, workflow)
      setIsFormDraft(false)
      trackFormSaved(form.name, form.workflow?.workflowId)
      handleSubmissionSuccess(false) // ensures that the draft is saved again post submission
    } catch (e) {
      setIsFormDraft(true)
      handleSubmissionError(e)
    }
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

  const getFieldsToRender = () => {
    const values = getValues()
    const returnFields: any = []
    formSchema?.fields?.forEach((field: any) => {
      if (!field.condition || field.condition(values)) {
        const fieldValue = values[field.name] || null
        returnFields.push({
          field,
          fieldValue,
        })
      }
    })

    return returnFields
  }

  const generateFromState = () => {
    const fieldsToRender = getFieldsToRender()

    return fieldsToRender?.reduce((acc: any, curr: any) => {
      return {
        ...acc,
        [curr?.field?.name]: curr?.fieldValue?.name ?? curr?.fieldValue,
      }
    }, {})
  }
  const handleSaveInput = (fl: any) => (name: string, value: any) => {
    const prefills = {
      [name]: value,
      ...(fl?.prefills && fl.prefills(name, value, airtableMetaData)),
    }
    updatePrefills ? updatePrefills(prefills) : saveInput(name, value)
  }

  /**
   * Enable handling conditional requirements for the field
   * @param field field to get required rules for
   */
  const getRequirements = (field: any) => {
    const prevRequired = field?.required

    if (
      field?.toggleRequriedOnCondition &&
      !!field?.requirementCondition &&
      field?.requirementCondition(getValues())
    ) {
      return !prevRequired
    }

    return prevRequired
  }

  const filterDefinitions = (definitions: any[]) => {
    return definitions.filter(
      (t: any) =>
        t?.fields?.Status === 'Live' && !t?.fields?.['Automated-task-only']
    )
  }

  const taskDefinitionsFilterFn = (field: any, values: any) => {
    const selectedTag = values?.['Scribe Tags']
    let parsedField = field
    if (selectedTag) {
      const definitions = taskDefinitions.filter((taskDefinition: any) =>
        taskDefinition.scribeTags.includes(selectedTag?.name ?? selectedTag)
      )

      if (definitions.length) {
        parsedField = {
          ...field,
          options: definitions.map((t: TaskDefinition) => ({
            id: t.recordId,
            name: t.clinicalPrefferedName,
          })),
          type: 'select',
        }
      }
    } else {
      parsedField = {
        ...field,
        type: 'foreignKey',
        filterResponse: filterDefinitions,
      }
    }

    return parsedField
  }

  const getOptions = (field: any) => {
    if (field.id === TASK_DEFINITION_FIELD_ID && field.conditionalOptions) {
      const fields = taskDefinitionsFilterFn(field, getValues())
      return fields
    }
    if (field.id === SCRIBE_TAGS_FIELD_ID) {
      const definitionOptions = [
        ...new Set( // extract unique tags (from duplicated if any)
          Object.keys(groupBy(taskDefinitions, 'scribeTags')) // group the definitions by scribeTags
            .map((tag: any) => tag.split(',')) // split by , to extract multiple tags in a single string
            .flat() // flatten to obtain a single array (may contain duplicated)
        ),
      ].map((t) => ({
        id: t,
        name: t,
      }))

      const parsedField = {
        ...field,
        options: definitionOptions,
      }
      return parsedField
    }

    return {}
  }

  const getFieldValue = (field: any, fieldValue: any) => {
    if (fieldValue?.id) {
      const parsedField = getOptions(field)
      if (parsedField?.type === 'foreignKey') {
        return [fieldValue?.id]
      }
    }
    return fieldValue?.name ?? fieldValue
  }

  return (
    <div>
      {!!formSchema?.fields?.length && (
        <form onSubmit={onSubmit}>
          {getFieldsToRender()?.map(({ field, fieldValue }: any) => (
            <div className="mt-[40px]" key={field.id}>
              <div>
                {field?.formId && <ButtonField field={field} />}
                <WorkflowFormsFields
                  value={getFieldValue(field, fieldValue)}
                  control={control}
                  field={{
                    ...field,
                    parentTableId: formSchema?.id,
                    required: getRequirements(field),
                    ...getOptions(field),
                  }}
                  error={errors[field.name]}
                  airtableMeta={airtableMeta}
                  saveInput={handleSaveInput(field)}
                  isWorkflow={!!form.workflow}
                  disabled={!isFormDraft}
                />
                <CalendlyLink fieldId={field?.id} formPayload={getValues()} />
              </div>
            </div>
          ))}

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
