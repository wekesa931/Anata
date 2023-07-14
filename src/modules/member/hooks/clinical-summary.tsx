import { useEffect, useMemo, useState, useCallback } from 'react'
import { useMember } from 'src/context/member'
import airtableFetch from 'src/services/airtable/fetch'
import { logError } from 'src/utils/logging/logger'

const HIF_ALERGY_KEYS = [
  'Which food are you allergic to?',
  'Which medications are you allergic to?',
]

const HIF_RISK_FACTORS_KEYS = [
  'Does anyone in your immediate family (Grandparents, Parents, Siblings) have Diabetes?',
  'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Blood Pressure?',
  'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Cholesterol Levels?',
]

function useClinicalSummary() {
  const { member } = useMember()
  const [alergies, setAlergies] = useState<any[]>([])
  const [riskFactors, setRiskFactors] = useState<any[]>([])
  const [riskScore, setRiskScore] = useState<number | string>('')
  const [healthGoals, setHealthGoals] = useState<any[]>([])
  const [healthStatus, setHealthStatus] = useState<string>('')

  const getSummaryFormHIF = useCallback(async () => {
    const hifURL = `hif/list?filterByFormula=FIND("${member?.airtableRecordId}", {Member Record ID})`

    try {
      const response = await airtableFetch(hifURL)
      if (response && response.length) {
        const hifRecord = response[0]
        const allergies = HIF_ALERGY_KEYS.map((key) => {
          return hifRecord[key]
        })
        setAlergies(allergies)
        const riskFactorData = HIF_RISK_FACTORS_KEYS.map((key) => {
          return hifRecord[key]
        })
        setRiskFactors(riskFactorData)
      }
    } catch (error) {
      logError(error)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.airtableRecordId])

  const getRiskScore = useCallback(() => {
    const riskScoreUrl = `hif/list?filterByFormula=FIND("${member?.airtableRecordId}", {Member Record ID})`
    airtableFetch(riskScoreUrl).then((response) => {
      if (response) {
        const record_id = Object.keys(response)[0]

        if (record_id != null) {
          const riskValue = response[record_id]['Risk score']
          const percenRiskScore = riskValue
            ? (parseFloat(riskValue) * 100).toFixed(2)
            : null
          setRiskScore(
            percenRiskScore ? `${percenRiskScore}%` : 'Not Available'
          )
        }
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.airtableRecordId])

  const getHealthGoalsAndStatus = useCallback(
    () => {
      if (member?.airtableRecordId) {
        const healthGoalsAndStatus = `members/${member?.airtableRecordId}`
        airtableFetch(healthGoalsAndStatus).then((response) => {
          if (response) {
            const healthStatusRaw = response['Health Status']
            // if object type and has error key, set it as error, if it's a string, set it as string
            if (typeof healthStatusRaw === 'object' && healthStatusRaw?.error) {
              setHealthStatus('Error')
            } else if (typeof healthStatusRaw === 'string') {
              setHealthStatus(healthStatusRaw)
            }

            setHealthGoals(response['Health Goals'] || [])
          }
        })
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [member?.airtableRecordId]
  )

  useEffect(() => {
    getSummaryFormHIF()
    getRiskScore()
    getHealthGoalsAndStatus()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const clinicalSummary: any = useMemo(() => {
    const summary = {
      alergies,
      riskFactors,
      riskScore,
      healthStatus,
      healthGoals,
    }
    return summary
  }, [riskScore, healthStatus, healthGoals, alergies, riskFactors])

  return clinicalSummary
}

export default useClinicalSummary
