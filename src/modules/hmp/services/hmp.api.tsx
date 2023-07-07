import airtableFetch from 'src/services/airtable/fetch'
import type { Member } from 'src/modules/member/db/models'
import { useMember } from 'src/context/member'
import { HMPType } from 'src/modules/hmp/types'

const transformHmpData = (currentHmp: any, member: Member | null): HMPType => {
  const hmpDay = currentHmp['HMP Day']
  return {
    hmpSendDate: currentHmp['HMP Send Date']?.toString(),
    hmpNumber: currentHmp['HMP #']?.toString(),
    hmpDay: typeof hmpDay === 'string' ? hmpDay.toString() : null,
    hmpLink: currentHmp['HMP Link']?.toString(),
    hmpState: currentHmp['HMP State']?.toString(),
    hmpLastReviewDate: currentHmp['HMP last review date']?.toString(),
    antaraId: member?.antaraId || '',
    id: currentHmp['Record ID'],
  }
}

export const useHmpApi = () => {
  const { member } = useMember()
  const getHmps = async () => {
    const hmpUrl = `hmp/list?filterByFormula=FIND("${member?.airtableRecordId}", {Member Record ID})`
    const response = await airtableFetch(hmpUrl)
    if (response && Array.isArray(response)) {
      return response.map((r: any) => transformHmpData(r, member))
    }

    return []
  }

  return {
    getHmps,
  }
}
