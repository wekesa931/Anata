import _ from 'lodash'

export const pascalToTitle = (str: string) => {
  return _.startCase(_.toLower(str))
}

export const isObject = (value: any): value is Record<string, any> =>
  typeof value === 'object' && value !== null

export const extractValueFromObject = (obj: Record<string, any>): any => {
  if ('value' in obj) {
    return obj.value
  }
  return JSON.stringify(obj)
}

export const getValueFromKey = (data: any, key: string) => {
  const entry = data[key]
  let value = entry ?? '-'

  if (entry === null) return value

  if (isObject(entry)) {
    value = extractValueFromObject(entry)
  }

  return value
}

export const extractLinksFromObject = (data: any, keys: string[]) => {
  const docWithKeys: any = {}
  const docWithoutKeys: any = {}

  Object.keys(data).forEach((key) => {
    if (keys.includes(key)) {
      docWithKeys[key] = data[key]
    } else {
      docWithoutKeys[key] = data[key]
    }
  })

  return {
    links: docWithKeys,
    info: docWithoutKeys,
  }
}
