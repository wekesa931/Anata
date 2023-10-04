import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useMember } from 'src/context/member'
import { useGetVitalsReadingApi } from 'src/modules/vitals/services/vitals.api'
import { logError } from 'src/utils/logging/logger'

const BMI_TABLE_KEYS = ['bmi', 'height', 'weight']
const BODY_COMPOSITION_KEYS = [
  'muscleMass',
  'bodyFat',
  'visceralFat',
  'waisthipRatio',
  'hipCircumference',
  'waistCircumference',
]
const OTHER_VITALS_KEYS = [
  'temperature',
  'respiratoryRate',
  'oxygenSaturation',
  'sixLeadEcgFindings',
]

export const useTablesData = () => {
  const {
    getVitalsReadings,
    vitalsLoading,
    vitalsError,
    refetchVitalsReadings,
  } = useGetVitalsReadingApi()
  const { member } = useMember()
  const [vitalsData, setVitalsData] = useState<any>({})
  const [error, setError] = useState<any>(null)

  const processVitalsData = (vitals: any) => {
    if (vitals) {
      // we need to group all vitals into three categories: BMI, Body Composition and Other Vitals
      const bmiData = vitals.map((vital: any) => {
        const { timestamp, ...rest } = vital
        const time = dayjs(timestamp).format('DD MMM YYYY')
        const bmi = BMI_TABLE_KEYS.reduce((acc: any, key) => {
          return {
            ...acc,
            [key]: rest[key],
          }
        }, {})

        return {
          timestamp: time,
          ...bmi,
        }
      })

      const bodyCompositionData = vitals.map((vital: any) => {
        const { timestamp, ...rest } = vital
        const time = dayjs(timestamp).format('DD MMM YYYY')
        const bodyComposition = BODY_COMPOSITION_KEYS.reduce(
          (acc: any, key) => {
            return {
              ...acc,
              [key]: rest[key],
            }
          },
          {}
        )

        return {
          timestamp: time,
          ...bodyComposition,
        }
      })

      const otherVitalsData = vitals.map((vital: any) => {
        const { timestamp, ...rest } = vital
        const time = dayjs(timestamp).format('DD MMM YYYY')
        const otherVitals = OTHER_VITALS_KEYS.reduce((acc: any, key) => {
          return {
            ...acc,
            [key]: rest[key],
          }
        }, {})

        return {
          timestamp: time,
          ...otherVitals,
        }
      })

      return {
        bmiData,
        bodyCompositionData,
        otherVitalsData,
      }
    }

    return {}
  }

  const getVitalsGroupedData = async () => {
    if (!member?.antaraId) return
    setError(null)

    const vitals = await getVitalsReadings(member.antaraId)
    return processVitalsData(vitals)
  }

  const refetchVitalsData = async () => {
    if (!member?.antaraId) return
    setError(null)

    const vitals = await refetchVitalsReadings(member.antaraId)
    return processVitalsData(vitals)
  }

  useEffect(() => {
    getVitalsGroupedData()
      .then(setVitalsData)
      .catch((err) => {
        setError(err)
        logError(err)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.antaraId])

  return {
    vitalsData,
    loading: vitalsLoading,
    error: vitalsError || error,
    refetchVitalsData,
  }
}
