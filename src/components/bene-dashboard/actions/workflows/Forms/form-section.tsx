import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { every, isEmpty } from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import Snackbar from '@mui/material/Snackbar'
import { Button } from '@mui/material'
import WorkflowFormsInput from './workflow-forms-input'
import styles from '../guided-workflows.component.css'
import FORMS from './FormSchema/form-fields-complete'
import { WorkflowMeta } from '../workflow-types'
import validationRules from './validation-schema'
import CalendlyLink from './CalendlyLink'

const FormSection = ({
  id,
  formPayload,
  moduleId,
  formMeta,
  template,
  activeForm,
  addOpenForm,
  airtableMeta,
  setIsFormEdited,
  setFormPayload,
  shouldSaveModule,
  saveModule,
  setDisplayLoader,
  setShouldSaveModule,
}: any) => {
  const currentIndex = formPayload.findIndex((fm) => fm.moduleId === id)
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
    resolver: yupResolver(validationObject),
  })
  const canSubmit = every(errors, isEmpty)
  useEffect(() => {
    reset(formPayload[currentIndex])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeForm, formPayload])
  const cancelSave = () => {
    setDisplayLoader(false)
    setShouldSaveModule(false)
  }
  useEffect(() => {
    if (!canSubmit) {
      cancelSave()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSubmit])
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
              if (formPayload[currentIndex][dt] !== 'Invalid Date') {
                formattedPayload = {
                  ...formattedPayload,
                  [dt]: formPayload[currentIndex][dt],
                }
              }
            })
            if (moduleId === id) saveModule(false, formattedPayload)
          }
        })()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSaveModule])

  const renderFormState = () => {
    return (
      <div className={styles.formFieldsContainer}>
        {/* {formMeta.helper && <p className={styles.formHelper}>{formMeta.helper}</p>} */}
        {formMeta.fields.map((field) => {
          const openForm = () => {
            const formData = FORMS.find((fm) => fm.formId === field.formId)
            formData &&
              addOpenForm({
                name: formData.name,
                member: template?.member,
              } as WorkflowMeta)
          }
          if (!field.condition || field.condition(getValues())) {
            let fieldValue: any = null
            let disabled = true
            if (formPayload[currentIndex]) {
              fieldValue = formPayload[currentIndex][`${field.name}`] || null
              disabled = formPayload[currentIndex].isDraft
            }
            return (
              <div className={styles.fieldWrapper} key={field.id}>
                {field.formId && (
                  <Button
                    variant="contained"
                    className={`${styles.linkButton} mb-ten`}
                    onClick={openForm}
                  >
                    {field.ctlabel}
                  </Button>
                )}
                <WorkflowFormsInput
                  control={control}
                  error={errors[field.name]}
                  disabled={!disabled}
                  value={fieldValue}
                  field={{ ...field, parentTableId: formMeta.id }}
                  template={template}
                  airtableMeta={airtableMeta}
                  saveInput={(name: string, value: any) => {
                    setIsFormEdited(true)
                    const newPayload = {
                      ...formPayload[currentIndex],
                      [name]: value,
                    }
                    if (!value || value?.length === 0) {
                      delete newPayload[name]
                    }
                    const newFormPayload = [...formPayload]
                    newFormPayload[currentIndex] = newPayload
                    setFormPayload(newFormPayload)
                  }}
                />
                <CalendlyLink
                  field={field}
                  formPayload={formPayload}
                  member={template?.member}
                />
              </div>
            )
          }
          return null
        })}
      </div>
    )
  }
  return (
    <>
      {formMeta?.fields && <form>{renderFormState()}</form>}
      <Snackbar
        className={styles.errorAnchor}
        sx={{ width: 150 }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!every(errors, isEmpty)}
        autoHideDuration={5000}
        message="The form contains errors"
        key="bottomcenter"
      />
    </>
  )
}

export default FormSection
