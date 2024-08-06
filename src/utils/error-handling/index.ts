const isString = (value: any) =>
  typeof value === 'string' || value instanceof String
function isObject(obj: any) {
  return obj === Object(obj)
}

export const getGraphQlErrors = (error: any): any[] => {
  const allErrors = error?.graphQLErrors?.map((e: any) => {
    const { extensions } = e

    if (extensions?.fields) {
      const eValues = Object.values(extensions?.fields)

      if (Array.isArray(eValues)) {
        return eValues.map((e: any) => {
          if (isString(e)) return e
          if (isObject(e)) return Object.values(e)
          return e
        })
      }

      return eValues
    }

    return [extensions?.message]
  })

  return allErrors
}

export const throwGraphErrors = (error: any) => {
  const errors = getGraphQlErrors(error).flat()
  throw new Error(errors.join(';'))
}
