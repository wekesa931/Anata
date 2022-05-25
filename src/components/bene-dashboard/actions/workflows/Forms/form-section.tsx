import React, { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { every, isEmpty } from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import Snackbar from '@mui/material/Snackbar'
import WorkflowFormsInput from './workflow-forms-input'
import styles from '../guided-workflows.component.css'
import { FormSectionInput } from '../workflow-types'

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
  let dateFields: string[] = []
  let numberFields: any[] = []
  const validationRules = () => {
    let schema = {}
    formMeta.fields &&
      formMeta.fields.forEach((fl: any) => {
        const isWorkflowForm =
          fl.name !== 'Case ID' && fl.name !== 'Member' && template?.workflowId
        const isNormalForm = fl.name !== 'Member' && !template?.workflowId
        const fieldName = fl.name
        switch (fl.type) {
          case 'foreignKey':
            if (isWorkflowForm || isNormalForm) {
              if (fl.parentKey) {
                if (fl.required) {
                  schema = {
                    ...schema,
                    [fieldName]: Yup.mixed().when(`${fl.parentKey}`, {
                      is: (val) => {
                        if (fl?.conditionType === '!') {
                          return !fl.parentValues.includes(val)
                        }
                        return fl.parentValues.includes(val)
                      },
                      then: Yup.mixed().required(),
                      otherwise: Yup.mixed().nullable().notRequired(),
                    }),
                  }
                } else {
                  schema = {
                    ...schema,
                    [fieldName]: Yup.mixed()
                      .when(`${fl.parentKey}`, {
                        is: (val) => {
                          if (fl?.conditionType === '!') {
                            return !fl.parentValues.includes(val)
                          }
                          return fl.parentValues.includes(val)
                        },
                        then: Yup.mixed().nullable().notRequired(),
                      })
                      .nullable(),
                  }
                }
              } else if (fl.required) {
                schema = {
                  ...schema,
                  [fieldName]: Yup.mixed().required(),
                }
              } else {
                schema = {
                  ...schema,
                  [fieldName]: Yup.mixed().nullable().notRequired(),
                }
              }
            }
            break
          case 'multiSelect':
          case 'multipleSelects':
            if (fl.parentKey) {
              if (fl.required) {
                schema = {
                  ...schema,
                  [fieldName]: Yup.array().when(`${fl.parentKey}`, {
                    is: (val) => {
                      if (fl?.conditionType === '!') {
                        return !fl.parentValues.includes(val)
                      }
                      return fl.parentValues.includes(val)
                    },
                    then: Yup.array().required(),
                    otherwise: Yup.array().notRequired(),
                  }),
                }
              } else {
                schema = {
                  ...schema,
                  [fieldName]: Yup.array()
                    .when(`${fl.parentKey}`, {
                      is: (val) => {
                        if (fl?.conditionType === '!') {
                          return !fl.parentValues.includes(val)
                        }
                        return fl.parentValues.includes(val)
                      },
                      then: Yup.array().nullable(),
                    })
                    .nullable(),
                }
              }
            } else if (fl.required) {
              schema = {
                ...schema,
                [fieldName]: Yup.array()
                  .min(1, 'You must select atleast one item from the list')
                  .required(),
              }
            } else {
              schema = {
                ...schema,
                [fieldName]: Yup.array().nullable(),
              }
            }
            break
          case 'date':
            dateFields = [...dateFields, fl.name]
            if (fl.parentKey) {
              if (fl.required) {
                schema = {
                  ...schema,
                  [fl.name]: Yup.date().when(`${fl.parentKey}`, {
                    is: (val) => {
                      if (fl?.conditionType === '!') {
                        return !fl.parentValues.includes(val)
                      }
                      return fl.parentValues.includes(val)
                    },
                    then: Yup.date().required(),
                    otherwise: Yup.date().notRequired(),
                  }),
                }
              } else {
                schema = {
                  ...schema,
                  [fl.name]: Yup.date()
                    .when(`${fl.parentKey}`, {
                      is: (val) => {
                        if (fl?.conditionType === '!') {
                          return !fl.parentValues.includes(val)
                        }
                        return fl.parentValues.includes(val)
                      },
                      then: Yup.date().nullable().notRequired(),
                    })
                    .nullable(),
                }
              }
            } else if (fl.required) {
              schema = {
                ...schema,
                [fl.name]: Yup.date().required(),
              }
            } else {
              schema = {
                ...schema,
                [fl.name]: Yup.date().nullable().notRequired(),
              }
            }
            break
          case 'number':
            numberFields = [
              ...numberFields,
              {
                name: fl.name,
                isPercent: fl.format.includes('percent'),
              },
            ]
            if (fl.parentKey) {
              if (fl.required) {
                schema = {
                  ...schema,
                  [fieldName]: Yup.number().when(`${fl.parentKey}`, {
                    is: (val) => {
                      if (fl?.conditionType === '!') {
                        return !fl.parentValues.includes(val)
                      }
                      return fl.parentValues.includes(val)
                    },
                    then: Yup.number().required(),
                    otherwise: Yup.number().notRequired(),
                  }),
                }
              } else {
                schema = {
                  ...schema,
                  [fieldName]: Yup.number()
                    .when(`${fl.parentKey}`, {
                      is: (val) => {
                        if (fl?.conditionType === '!') {
                          return !fl.parentValues.includes(val)
                        }
                        return fl.parentValues.includes(val)
                      },
                      then: Yup.number().nullable().notRequired(),
                    })
                    .nullable(),
                }
              }
            } else if (fl.required) {
              schema = {
                ...schema,
                [fieldName]: Yup.number().required(),
              }
            } else {
              schema = {
                ...schema,
                [fieldName]: Yup.number().nullable().notRequired(),
              }
            }
            break
          case 'select':
          case 'singleSelect':
          case 'url':
          case 'text':
          case 'multilineText':
          case 'singleLineText':
          case 'richText':
            if (fl.parentKey) {
              if (fl.required) {
                schema = {
                  ...schema,
                  [fieldName]: Yup.string().when(`${fl.parentKey}`, {
                    is: (val) => {
                      let res = fl.parentValues.includes(val)
                      if (fl?.conditionType === '!') {
                        res = !fl.parentValues.includes(val)
                      }
                      return res
                    },
                    then: Yup.string().required(),
                    otherwise: Yup.string().nullable().notRequired(),
                  }),
                }
              } else {
                schema = {
                  ...schema,
                  [fieldName]: Yup.string()
                    .when(`${fl.parentKey}`, {
                      is: (val) => {
                        if (fl?.conditionType === '!') {
                          return !fl.parentValues.includes(val)
                        }
                        return fl.parentValues.includes(val)
                      },
                      then: Yup.string().nullable().notRequired(),
                      otherwise: Yup.string().nullable().notRequired(),
                    })
                    .nullable(),
                }
              }
            } else if (fl.required) {
              schema = {
                ...schema,
                [fieldName]: Yup.string().required(),
              }
            } else {
              schema = {
                ...schema,
                [fieldName]: Yup.string().nullable().notRequired(),
              }
            }
            break
          default:
            schema = { ...schema }
        }
      })
    return Yup.object().shape(schema).required()
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: formPayload,
    resolver: yupResolver(validationRules()),
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
            let formattedPayload = formPayload[index]
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
                  field={field}
                  template={template}
                  airtableMeta={airtableMeta}
                  fieldName={fieldName}
                  saveInput={(name: string, value: any) => {
                    template?.workflowId && setIsFormEdited(true)
                    const newPayload = {
                      ...formPayload[index],
                      [name]: value,
                      isDraft: true,
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
