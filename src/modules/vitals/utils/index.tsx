/**
 * @description evaluate an equation based on a partial input object of type T and return the result as a number or undefined if any of the input object's keys are undefined.
 * @param input a partial input object of type T
 * @param evalEquation a function that takes a Pick of T and returns a number
 * @returns - A number if all keys in the input object are defined and the equation is evaluated successfully
 *         - Undefined if any key in the input object is undefined
 *       - Undefined if the equation throws an error
 * @example
 * const input = {
 *  "Waist circumference": 10,
 * "Hip circumference": 5,
 * "Weight": 20
 * }
 * const waistToHipRatio = possiblyUndefinedEval(input, (input) => input["Waist circumference"] / input["Hip circumference"])
 * console.log(waistToHipRatio) // 2
 *
 * const input = {
 * "Waist circumference": 10,
 * "Weight": 20
 * }
 *
 * const waistToHipRatio = possiblyUndefinedEval(input, (input) => input["Waist circumference"] / input["Hip circumference"])
 * console.log(waistToHipRatio) // undefined
 *
 * */

import dayjs from 'dayjs'
import { TimeFilters } from '../types'

export const possiblyUndefinedEval = <T extends object, K extends keyof T>(
  input: T,
  evalEquation: (input: Pick<T, K>) => number
): number | undefined => {
  try {
    const result = evalEquation(input as Pick<T, K>)
    // if result is NaN, return undefined
    if (isNaN(result)) {
      return undefined
    }

    return result
  } catch (error) {
    return undefined
  }
}

export const convertToNumberIfDefined = (value: any): number | undefined => {
  if (!value || value === '' || value === undefined) return undefined
  const numericValue = Number(value)
  return isNaN(numericValue) ? undefined : numericValue
}

export const getTickCount = (
  currentTimeFilter: TimeFilters,
  range: [number, number]
) => {
  if (currentTimeFilter === TimeFilters.ONE_MONTH)
    return dayjs(range[1]).diff(dayjs(range[0]), 'day')
  return 12
}

export const getTimeFormat =
  (currentTimeFilter: TimeFilters) => (value: any) => {
    switch (currentTimeFilter) {
      case TimeFilters.TWELVE_MONTHS:
        return dayjs(value).format('MMM')
      case TimeFilters.THREE_MONTHS:
        return dayjs(value).format('Do, MMM')
      default:
        return dayjs(value).format('Do')
    }
  }

export const convertToNumberOrReturn = (value: any): number | any => {
  if (!value || value === '' || value === undefined) return value
  const numericValue = Number(value)
  return isNaN(numericValue) ? value : numericValue
}

export const transformFormData = (formData: any) => {
  const transformedFormData: any = {}
  Object.entries(formData).forEach(([key, value]) => {
    transformedFormData[key] = convertToNumberIfDefined(value)
  })
  return transformedFormData
}
