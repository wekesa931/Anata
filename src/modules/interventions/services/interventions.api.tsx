import airtableFetch from 'src/services/airtable/fetch'
import type { Intervention } from 'src/modules/interventions/types'
import { useMember } from 'src/context/member'
import { Member } from 'src/modules/member/db/models'

const transformInterventionData = (
  currentIntervention: any,
  member: Member | null
): Intervention => {
  return {
    interventionType: currentIntervention.Intervention,
    interventionStatus: currentIntervention.Status?.toString(),
    attainment:
      currentIntervention['last recorded milestone attainment']?.toString(),
    id: currentIntervention['Record ID'],
    antaraId: member?.antaraId || '',
    startingMeasurement:
      currentIntervention['Starting Measurement - all interventions'],
    currentMeasurement: currentIntervention['Current Measurement'],
    startingLevel: currentIntervention['Starting Level - all interventions'],
    currentLevel: currentIntervention['current level'],
    startingMilestone:
      currentIntervention['Milestone Target - all interventions'],
    currentMilestone: currentIntervention['Current Milestone'],
    result: currentIntervention["Intervention's final result"],
    persona: currentIntervention['Last recorded persona'],
  }
}

export const useInterventionsApi = () => {
  const { member } = useMember()
  const getInterventions = async () => {
    const interventionUrl = `interventions/list?filterByFormula=FIND("${member?.airtableRecordId}", {Member Record ID})`
    const response = await airtableFetch(interventionUrl)
    if (response && Array.isArray(response)) {
      return response.map((r: any) => transformInterventionData(r, member))
    }

    return []
  }

  const getById = async (interventionId: string) => {
    const interventionUrl = `interventions/${interventionId}`
    const response = await airtableFetch(interventionUrl)

    if (response) {
      return transformInterventionData(response, member)
    }
    throw new Error('Intervention not found')
  }

  return {
    getInterventions,
    getById,
  }
}
