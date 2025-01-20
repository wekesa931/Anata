import airtableFetch from 'src/services/airtable/fetch'
import type { Intervention } from 'src/modules/interventions/types'
import { useMember } from 'src/context/member'
import { Member } from 'src/modules/member/db/models'
import { useState } from 'react'

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
    currentMeasurement:
      currentIntervention[
        'Current measurement - all interventions (from Intervention data tracking)'
      ],
    startingLevel: currentIntervention['Starting Level - all interventions'],
    currentLevel: currentIntervention['current level'],
    startingMilestone:
      currentIntervention['Milestone Target - all interventions'],
    currentMilestone:
      currentIntervention[
        'Next Milestone Target (from Intervention data tracking)'
      ],
    result: currentIntervention["Intervention's final result"],
    persona: currentIntervention['Last recorded persona'],
    notes: currentIntervention.Notes,
    condition: currentIntervention['Condition (from memberDB)'],
  }
}

export const useInterventionsApi = () => {
  const { member } = useMember()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getInterventions = async () => {
    setIsLoading(true)
    try {
      const interventionUrl = `interventions/list?filterByFormula=FIND("${member?.airtableRecordId}", {Member Record ID})`
      const response = await airtableFetch(interventionUrl)
      if (response && Array.isArray(response)) {
        return response.map((r: any) => transformInterventionData(r, member))
      }

      return []
    } finally {
      setIsLoading(false)
    }
  }

  const getById = async (interventionId: string) => {
    setIsLoading(true)
    try {
      const interventionUrl = `interventions/${interventionId}`
      const response = await airtableFetch(interventionUrl)

      if (response) {
        return transformInterventionData(response, member)
      }
      throw new Error('Intervention not found')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getInterventions,
    getById,
    isLoading,
  }
}
