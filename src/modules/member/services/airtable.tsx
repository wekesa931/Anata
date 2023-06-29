import { useMember } from 'src/context/member'
import airtableFetch from 'src/services/airtable/fetch'

function useMemberAirtableHook() {
  const { member } = useMember()

  const optToChronicCare = (isOptedIn: boolean) => {
    return airtableFetch('members', 'post', {
      id: member?.airtableRecordId,
      fields: {
        'Chronic Care Consent': isOptedIn ? 'Opted In' : 'Opted Out',
      },
    })
  }

  return {
    optToChronicCare,
  }
}

export default useMemberAirtableHook
