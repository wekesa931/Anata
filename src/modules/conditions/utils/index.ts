import { Options } from 'src/components/forms/fields/select-field'
import {
  Condition,
  ConditionDefinition,
  Filters,
} from 'src/modules/conditions/types'

export {
  transformRawConditions,
  transformRawConditionDefinitions,
  mapCreateConditionFormValues,
} from './transforms'

const sortConditionByDate = (conditions: Condition[]) =>
  conditions.sort(
    (a, b) =>
      new Date(b.modifiedBy).getTime() - new Date(a.modifiedBy).getTime()
  )

export const sortDefinitionsByName = (definitions: ConditionDefinition[]) =>
  definitions.sort((a, b) => a.label.localeCompare(b.label))

const ACTIVE_STATUS = 'Active'

export const FILTER_TABLE = {
  [Filters.ALL]: (conditions: Condition[]) => sortConditionByDate(conditions),
  [Filters.ACTIVE]: (conditions: Condition[]) =>
    sortConditionByDate(
      conditions.filter(
        (condition) => condition.clinicalStatus.label === ACTIVE_STATUS
      )
    ),
  [Filters.CHRONIC]: (conditions: Condition[]) =>
    sortConditionByDate(
      conditions.filter((condition) => !!condition.isChronic)
    ),
  [Filters.ACUTE]: (conditions: Condition[]) =>
    sortConditionByDate(conditions.filter((condition) => !condition.isChronic)),
}

export const dedupOptions = (options: any[]): Options[] => {
  // create unique options based on the label
  const uniqueOptions = options.reduce((acc, curr) => {
    if (acc[curr.label]) {
      return acc
    }
    acc[curr.label] = curr
    return acc
  }, {} as any)

  return Object.values(uniqueOptions)
}

export const addNoneToKey = (
  options: any[],
  value: number = -1,
  checkLength: boolean = true
) => {
  if (checkLength)
    return options.length > 0 ? options : [{ label: 'None', value }]

  return [...options, { label: 'None', value }]
}

export const shouldShowReasonForStatusChange = (
  initialValues: any,
  values: any
) => {
  const { clinicalStatus } = initialValues
  const currentClinicalStatus = values?.clinicalStatus

  const show =
    clinicalStatus?.value !==
    (currentClinicalStatus?.value ?? currentClinicalStatus)

  return show
}
