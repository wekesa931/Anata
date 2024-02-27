import * as Yup from 'yup'

/**
 * a utility function to check if a value is included in a source (mainly for conditional validation)
 * @param val the value to check
 * @param source the source to check against
 * @param constraint the condition type to flip the result of the check
 * @returns  boolean
 */
const is = (val: any, source: any, constraint: boolean) => {
  const isIncluded = Array.isArray(val)
    ? val.some((item) => source.includes(item))
    : source?.includes(val)

  if (constraint) {
    return isIncluded
  }

  return !isIncluded
}

// a function to update the schema based on the condition - if any
const updateOnCondition = (
  fl: any,
  dataType: any = Yup.string /** datatype */
) => {
  return {
    [fl.name]: dataType().when(`${fl.parentKey}`, {
      is: (val: any) => is(val, fl?.parentValues, fl?.conditionType !== '!'),
      then: dataType().required(),
      otherwise: dataType().nullable().notRequired(),
    }),
  }
}

// a function to update the schema based on the conditional required
// NB conditional required is different from condition in that it only updates the requirement
// of the field and does not hide the field from the UI
const updateOnConditionalRequired = (fl: any, dataType: any = Yup.string) => {
  /**
   * We want to handle cases where a field is marked as optional but has optional requirements condition
   * e.g require appts field if the consultation type has has `Refillable medication prescription` selected
   */
  if (fl?.parentKey && !!fl?.requirementCondition) {
    return updateOnCondition(fl, dataType)
  }
  return {
    [fl.name]: dataType().nullable().notRequired(),
  }
}

const validationRules = (formMeta: any, isWorkflow: boolean) => {
  let dateFields: string[] = []
  let numberFields: any[] = []
  let schema = {}
  formMeta?.fields &&
    formMeta.fields.forEach((fl: any) => {
      // eslint-disable-next-line no-underscore-dangle
      const isWorkflowForm = fl.name !== 'Member' && isWorkflow
      const isNormalForm =
        fl.name !== 'Case ID' &&
        fl.name !== 'Member' &&
        // eslint-disable-next-line no-underscore-dangle
        !isWorkflow
      const fieldName = fl.name
      switch (fl.type) {
        case 'foreignKey':
          if (isWorkflowForm || isNormalForm) {
            if (fl.parentKey) {
              if (fl.required) {
                schema = {
                  ...schema,
                  ...updateOnCondition(fl, Yup.mixed),
                }
              } else {
                schema = {
                  ...schema,
                  ...updateOnConditionalRequired(fl, Yup.mixed),
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
                    return fl?.parentValues?.includes(val)
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
                      return fl?.parentValues?.includes(val)
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
                    return fl?.parentValues?.includes(val)
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
                      return fl?.parentValues?.includes(val)
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
                      return fl?.parentValues?.includes(val)
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
        case 'checkbox':
          schema = {
            ...schema,
            [fieldName]: Yup.boolean(),
          }
          break
        case 'select':
        case 'singleSelect':
        case 'url':
        case 'text':
        case 'multilineText':
        case 'singleLineText':
        case 'richText': {
          if (fl.parentKey) {
            if (fl.required) {
              schema = {
                ...schema,
                ...updateOnCondition(fl),
              }
            } else {
              schema = {
                ...schema,
                ...updateOnConditionalRequired(fl),
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
        }

        default:
          schema = { ...schema }
      }
    })
  return {
    validationObject: Yup.object().shape(schema).required(),
    dateFields,
    numberFields,
  }
}

export default validationRules
