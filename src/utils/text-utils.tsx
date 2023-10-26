import { startCase, toLower } from 'lodash'

export const toTitleCase = (str?: string) => {
  if (!str) return str
  const trimmedStr = str.trim()
  return startCase(toLower(trimmedStr))
}
