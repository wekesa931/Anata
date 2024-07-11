import { startCase, toLower } from 'lodash'

export const toTitleCase = (str?: string) => {
  if (!str) return str
  const trimmedStr = str.trim()
  return startCase(toLower(trimmedStr))
}

export const camelToTitleCase = (camelCaseString: string) => {
  if (!camelCaseString) return camelCaseString
  // Insert a space before each uppercase letter
  const spacedString = camelCaseString.replace(/([A-Z])/g, ' $1')
  // Use Lodash's startCase to capitalize the first letter of each word
  return startCase(toLower(spacedString))
}
