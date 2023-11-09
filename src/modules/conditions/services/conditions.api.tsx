import airtableFetch from 'src/services/airtable/fetch'
import type { Condition } from 'src/modules/conditions/types'
import type { Member } from 'src/modules/member/db/models'
import { useMember } from 'src/context/member'
import { useState } from 'react'

const transformConditionData = (
  currentCondition: any,
  member: Member | null
): Condition => {
  return {
    condition: currentCondition.Condition?.toString(),
    conditionStatus: currentCondition['Condition Status']?.toString(),
    acuteVsChronic: currentCondition['Acute vs Chronic']?.toString(),
    dateOfDiagnosis:
      currentCondition['Date of Diagnosis/Condition']?.toString(),
    id: currentCondition['Record ID'],
    antaraId: member?.antaraId || '',
    icd10Code: currentCondition['ICD10 code'],
    keyGoal: currentCondition['Key goal - all conditions'],
    diagnosisStage: currentCondition['Diagnosis Stage'],
    startingStage: currentCondition['Starting Stage'],
    startingClinicalStatus: currentCondition['Starting clinical status'],
    engagementLevel: currentCondition['Engagement Level'],
    currentStage: currentCondition['Current stage'],
    currentClinicalStatus: currentCondition['Current clinical status'],
    medication:
      currentCondition[
        'Medication Name (from Medication Base) (from Prescriptions)'
      ],
    interventions: currentCondition['Interventions Table'],
    healthStatus: currentCondition['Health Status (from Member)'],
    asthmaStartingScore: currentCondition['Asthma Starting Score'],
    lowerBackPainScore: currentCondition['Lower back pain score'],
    lowerBackPainStartingScore:
      currentCondition['Lower back pain starting score'],
    osteoarthritisStartingScore:
      currentCondition['Osteoarthritis Starting Score'],
  }
}

export const useConditionsApi = () => {
  const { member } = useMember()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const getConditions = async () => {
    setIsLoading(true)
    try {
      const conditionUrl = `conditions/list?filterByFormula=FIND("${member?.airtableRecordId}", {Member Record ID})`
      const response = await airtableFetch(conditionUrl)
      if (response && Array.isArray(response)) {
        return response.map((r: any) => transformConditionData(r, member))
      }

      return []
    } finally {
      setIsLoading(false)
    }
  }
  const getById = async (conditionId: string) => {
    setIsLoading(true)
    try {
      const conditionUrl = `conditions/${conditionId}`
      const response = await airtableFetch(conditionUrl)

      if (response) {
        return transformConditionData(response, member)
      }
      throw new Error('Condition not found')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getConditions,
    getById,
    isLoading,
  }
}
