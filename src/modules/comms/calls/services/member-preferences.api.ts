import airtableFetch from 'src/services/airtable/fetch'
import filterFields from 'src/utils/airtable'
import { GET_CALL_LOGS } from 'src/modules/comms/services/gql'
import { useLazyQuery } from '@apollo/client'

const preferencesFields = [
  'What is your preferred channel of communication?',
  'What is your secondary channel of communication?',
  'What would be the ideal frequency of communication?',
  'What is your preferred day for communication',
  'What is your preferred time for communication',
]

export const useMemberPreferencesAPI = () => {
  const [getLastCallLog, { loading: loadingLastCall }] =
    useLazyQuery(GET_CALL_LOGS)

  const loadLastCallLog = async (antaraId: string) => {
    const res = await getLastCallLog({
      variables: {
        antaraId,
        last: 1,
      },
    })

    const calls = res?.data?.conferenceSessions?.edges || []
    if (calls.length > 0) {
      return calls[0].node
    }
  }

  const getMemberPreferences = async (antaraId: string) => {
    const filterArgs = `filterByFormula=FIND("${antaraId}", {Antara ID})&${filterFields(
      preferencesFields
    )}&maxRecords=1&sort=[{"field":"created_at", "direction":"desc"}]`

    const response = await airtableFetch(`baseline/list?${filterArgs}`)

    if (Array.isArray(response) && response.length > 0) {
      return response[0]
    }

    return null
  }

  return {
    getMemberPreferences,
    loadLastCallLog,
    loadingLastCall,
  }
}
