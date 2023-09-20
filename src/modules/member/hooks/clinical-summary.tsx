import { useEffect, useMemo, useState, useCallback } from 'react'
import { useMember } from 'src/context/member'
import airtableFetch from 'src/services/airtable/fetch'
import { logError } from 'src/utils/logging/logger'

const HIF_ALERGY_KEYS = {
  'Food allergies': 'Which food are you allergic to?',
  'Medication allergies': 'Which medications are you allergic to?',
}

const HIF_PMH_KEYS = {
  'Significant past medical history':
    'Do you have any significant past medical history not listed above?',
  'Other significant past health conditions':
    'Do you have any other significant past health conditions?',
  'Other past conditions': 'Other past conditions',
}

const HIF_FH_KEYS = {
  Diabetes:
    'Does anyone in your immediate family (Grandparents, Parents, Siblings) have Diabetes?',
  'High blood pressure':
    'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Blood Pressure?',
  'High cholestrol levels':
    'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Cholesterol Levels?',
  'Cardiovascular disease':
    'Is there anyone in your immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack or stroke) before age 55?',
  Osteoarthritis:
    'Does anyone in your immediate family (Grandparents, Parents, Siblings) Osteoarthritis?',
  Asthma:
    'Does anyone in your immediate family (Grandparents, Parents, Siblings) have Asthma?',
  Overweight:
    'Is anyone in your immediate family (Grandparents, Parents, Siblings) Overweight?',
  Cancer:
    'Does anyone in your immediate family (Grandparents, Parents, Siblings) have Cancer?',
}

function useClinicalSummary() {
  const { member } = useMember()
  const [alergies, setAlergies] = useState<any[]>([])
  const [riskScore, setRiskScore] = useState<number | string>('')
  const [healthGoals, setHealthGoals] = useState<any[]>([])
  const [healthStatus, setHealthStatus] = useState<string>('')
  const [pmh, setPmh] = useState<any[]>([])
  const [fh, setFh] = useState<any[]>([])
  const [surgeries, setSurgeries] = useState<''>('')
  const [loadingHif, setLoadingHif] = useState<boolean>(false)

  const getSummaryFormHIF = useCallback(async () => {
    const hifURL = `hif/list?filterByFormula=FIND("${member?.airtableRecordId}", {Member Record ID})`

    try {
      setLoadingHif(true)
      const response = await airtableFetch(hifURL)
      if (response) {
        const hifRecord = response.length ? response[0] : {}

        const allergies = Object.entries(HIF_ALERGY_KEYS).map(
          ([key, value]) => {
            if (hifRecord[value] === 'Yes') {
              return key
            }
            return null
          }
        )
        setAlergies(allergies.filter((allergy) => allergy !== null))

        const pmhData = Object.entries(HIF_PMH_KEYS).map(([key, value]) => {
          if (hifRecord[value] === 'Yes') {
            return key
          }
          return null
        })
        setPmh(pmhData.filter((p) => p !== null))

        const fhData = Object.entries(HIF_FH_KEYS).map(([key, value]) => {
          if (hifRecord[value] === 'Yes') {
            return key
          }
          return null
        })
        setFh(fhData.filter((f) => f !== null))

        setSurgeries(
          hifRecord['Please describe any surgeries you may have had']
        )
      }
    } catch (error) {
      logError(error)
    } finally {
      setLoadingHif(false)
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
      riskScore,
      healthStatus,
      healthGoals,
      pmh,
      fh,
      surgeries,
      loadingHif,
    }
    return summary
  }, [
    riskScore,
    healthStatus,
    healthGoals,
    alergies,
    pmh,
    fh,
    surgeries,
    loadingHif,
  ])

  return clinicalSummary
}

export default useClinicalSummary
