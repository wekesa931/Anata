import * as Yup from 'yup'

const validationRules = (formMeta: any, template: any) => {
  let dateFields: string[] = []
  let numberFields: any[] = []
  let schema = {}
  formMeta?.fields &&
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
                    is: (val: any) => {
                      if (fl?.conditionType === '!') {
                        return !fl.parentValues.includes(val)
                      }
                      return fl?.parentValues?.includes(val)
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
        case 'richText':
          if (fl.parentKey) {
            if (fl.required) {
              schema = {
                ...schema,
                [fieldName]: Yup.string().when(`${fl.parentKey}`, {
                  is: (val) => {
                    let res = fl?.parentValues?.includes(val)
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
                      return fl?.parentValues?.includes(val)
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
  return {
    validationObject: Yup.object().shape(schema).required(),
    dateFields,
    numberFields,
  }
}

export default validationRules
