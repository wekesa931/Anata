export enum CACHE_KEYS {
  LOOKUPS = 'LOOKUPS',
  INSURANCES = 'INSURANCES',
  CONDITION_DEFINITIONS = 'CONDITION_DEFINITIONS',
  CONDITION_LOOKUPS = 'CONDITION_LOOKUPS',
}
const getCachedData = (cached: string | null) => {
  try {
    return cached ? JSON.parse(cached) : null
  } catch (error) {
    return null
  }
}
const isValidData = (data: any) =>
  data && typeof data === 'object' && Object.keys(data).length > 0
export const getFromCache = async (key: CACHE_KEYS, fn: () => Promise<any>) => {
  const cached = localStorage.getItem(key)

  const parsed = getCachedData(cached)
  if (isValidData(parsed)) {
    return parsed
  }
  const data = await fn()
  localStorage.setItem(key, JSON.stringify(data))
  return data
}
