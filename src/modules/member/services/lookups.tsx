/** Hook to pull up lookups */
import { useLazyQuery } from '@apollo/client'
import { GET_INSURANCE_COMPANIES, LOOKUP_ENTRIES_QUERY } from 'src/gql/lookups'
import {
  parseDataToOptions,
  parseLookupEntries,
} from 'src/modules/member/utils/data-transforms'

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

  return {
    isLoading: loading || loadingEntries,
    getInsuranceCompanies: async () => {
      const res = await loadInsuranceCompanies()
      return parseDataToOptions(res?.data?.insuranceCompanies, 'name')
    },
    getLookupEntries: async () => {
      const res = await loadLookupEntries()
      return parseLookupEntries(res?.data)
    },
  }
}
