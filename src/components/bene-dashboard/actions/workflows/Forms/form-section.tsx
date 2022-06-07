import React, { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { every, isEmpty } from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import Snackbar from '@mui/material/Snackbar'
import WorkflowFormsInput from './workflow-forms-input'
import styles from '../guided-workflows.component.css'
import { FormSectionInput } from '../workflow-types'
import validationRules from './validation-schema'

const FormSection = ({
  index,
  modId,
  shouldSaveModule,
  formPayload,
  formMeta,
  disabled,
  formError,
  activeModule,
  activeModuleName,
  isToastOpen,
  template,
  airtableMeta,
  setfinalPayload,
  resetActiveModule,
  setFormPayload,
  setIsFormEdited,
  setFormError,
  setShouldSaveModule,
}: FormSectionInput) => {
  const { validationObject, dateFields, numberFields } = validationRules(
    formMeta,
    template
  )
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: formPayload,
    resolver: yupResolver(validationObject),
  })
  const canSubmit = every(errors, isEmpty)
  useEffect(() => {
    if (!canSubmit) {
      setShouldSaveModule(false)
      setfinalPayload([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSubmit])
  useEffect(() => {
    if (formPayload && formPayload.length > 0) {
      const currentData = formPayload[index]
      reset(currentData)
    } else {
      reset({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModuleName])
  useEffect(() => {
    if (canSubmit) {
      if (shouldSaveModule) {
        // eslint-disable-next-line
        handleSubmit((data: any, e?: any) => {
          if (data) {
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
              formattedPayload = {
                ...formattedPayload,
                [dt]: formPayload[index][dt],
              }
            })
            setfinalPayload((dat) => [...dat, formattedPayload])
          } else {
            setfinalPayload([])
            setShouldSaveModule(false)
          }
        })()
      }
    } else {
      setShouldSaveModule(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSaveModule])
  useEffect(() => {
    const allErrors = {
      ...formError,
      [`${modId}`]: {
        ...errors,
      },
    }
    setFormError(allErrors)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formPayload, Object.keys(errors).length])
  const renderFormState = () => {
    return (
      <div className={styles.formFieldsContainer}>
        {formMeta.fields.map((field) => {
          const fieldName = field.name
          if (!field.condition || field.condition(getValues())) {
            let fieldValue: any = null
            if (activeModule) {
              fieldValue = formPayload[index][`${field.name}`] || null
            } else {
              resetActiveModule()
            }
            return (
              <Fragment key={field.id}>
                <WorkflowFormsInput
                  control={control}
                  error={errors[fieldName]}
                  disabled={disabled || !activeModule?.isDraft}
                  value={fieldValue}
                  helperText={field.helper}
                  field={{ ...field, parentTableId: formMeta.id }}
                  template={template}
                  airtableMeta={airtableMeta}
                  fieldName={fieldName}
                  saveInput={(name: string, value: any) => {
                    setIsFormEdited(true)
                    const newPayload = {
                      ...formPayload[index],
                      [name]: value,
                      isDraft: true,
                    }
                    if (!value || value?.length === 0) {
                      delete newPayload[name]
                    }
                    const newFormPayload = [...formPayload]
                    newFormPayload.splice(index, 1, newPayload)
                    setFormPayload(newFormPayload)
                  }}
                />
              </Fragment>
            )
          }
          return null
        })}
      </div>
    )
  }

  return (
    <>
      {formMeta.fields && <form>{renderFormState()}</form>}
      <Snackbar
        className={styles.errorAnchor}
        sx={{ width: 150 }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!every(errors, isEmpty) && !isToastOpen}
        autoHideDuration={5000}
        message="The form contains errors"
        key="bottomcenter"
      />
    </>
  )
}

export default FormSection
