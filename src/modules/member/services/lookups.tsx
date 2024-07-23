/** Hook to pull up lookups */
import { useLazyQuery } from '@apollo/client'
import { GET_INSURANCE_COMPANIES, LOOKUP_ENTRIES_QUERY } from 'src/gql/lookups'
import {
  parseDataToOptions,
  parseLookupEntries,
} from 'src/modules/member/utils/data-transforms'

enum CACHE_KEYS {
  LOOKUPS = 'LOOKUPS',
  INSURANCES = 'INSURANCES',
}

export const useGetLookupEntries = () => {
  const [loadLookupEntries, { loading: loadingEntries }] = useLazyQuery(
    LOOKUP_ENTRIES_QUERY,
    {
      context: {
        clientName: 'v2',
      },
    }
  )
  const [loadInsuranceCompanies, { loading }] = useLazyQuery(
    GET_INSURANCE_COMPANIES
  )

  const getFromCache = async (key: CACHE_KEYS, fn: () => Promise<any>) => {
    const cached = localStorage.getItem(key)

    if (cached) {
      return JSON.parse(cached)
    }

    const data = await fn()
    localStorage.setItem(key, JSON.stringify(data))
    return data
  }

  const getInsuranceCompaniesAPI = async () => {
    const res = await loadInsuranceCompanies()
    return parseDataToOptions(res?.data?.insuranceCompanies, 'name')
  }

  const getLookupsAPI = async () => {
    const res = await loadLookupEntries()
    return parseLookupEntries(res?.data)
  }
  return {
    isLoading: loading || loadingEntries,
    getInsuranceCompanies: async () =>
      getFromCache(CACHE_KEYS.INSURANCES, getInsuranceCompaniesAPI),
    getLookupEntries: async () =>
      getFromCache(CACHE_KEYS.LOOKUPS, getLookupsAPI),
  }
}
