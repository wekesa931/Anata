export enum CACHE_KEYS {
  LOOKUPS = 'LOOKUPS',
  INSURANCES = 'INSURANCES',
  CONDITION_DEFINITIONS = 'CONDITION_DEFINITIONS',
  CONDITION_LOOKUPS = 'CONDITION_LOOKUPS'
}

export const getFromCache = async (key: CACHE_KEYS, fn: () => Promise<any>) => {
  const cached = localStorage.getItem(key)

  if (cached) {
    return JSON.parse(cached)
  }

  const data = await fn()
  localStorage.setItem(key, JSON.stringify(data))
  return data
}
