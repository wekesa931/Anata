import { useEffect, useMemo, useState, useCallback } from 'react'
import { useMember } from 'src/context/member'
import airtableFetch from 'src/services/airtable/fetch'
import filterFields from 'src/utils/airtable/field-utils'
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
  const [careConsent, setCareConsent] = useState<string>('')

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
  }, [])

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
  }, [])

  const getHealthGoalsAndStatus = useCallback(
    () => {
      const healthGoalsAndStatus = `members/list?filterByFormula=FIND("${
        member?.airtableRecordId
      }", {recId})&${filterFields([
        'Health Goals',
        'Health Status',
        'Chronic Care Consent',
      ])}`
      airtableFetch(healthGoalsAndStatus).then((response) => {
        if (response) {
          const record = response[0]
          if (record) {
            setHealthGoals(record['Health Goals'] || [])
            setHealthStatus(record['Health Status'])
            setCareConsent(record['Chronic Care Consent'])
          }
        }
      })
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    getSummaryFormHIF()
    getRiskScore()
    getHealthGoalsAndStatus()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clinicalSummary = useMemo(() => {
    const summary = {
      alergies,
      riskFactors,
      riskScore,
      healthStatus,
      healthGoals,
      careConsent,
    }
    return summary
  }, [riskScore, healthStatus, healthGoals, alergies, riskFactors, careConsent])

  return clinicalSummary
}

export default useClinicalSummary
