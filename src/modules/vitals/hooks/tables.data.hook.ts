import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useMember } from 'src/context/member'
import {
  useGetVitalsReadingApi,
  useGetLabsRanges,
} from 'src/modules/vitals/services/vitals.api'
import { logError } from 'src/utils/logging/logger'
import { ReportGenNormalRangeVariables } from '../types'

const BMI_TABLE_KEYS = ['bmi', 'height', 'weight', 'bmi_percentile']
const BODY_COMPOSITION_KEYS = [
  'muscle_mass',
  'body_fat',
  'visceral_fat',
  'waisthip_ratio',
  'hip_circumference',
  'waist_circumference',
  'mid_upper_arm_circumference',
  'muscle_mass_weight_ratio',
  'waisthip_ratio',
]
const OTHER_VITALS_KEYS = [
  'temperature',
  'respiratory_rate',
  'oxygen_saturation',
  'six_lead_ecg_findings',
  'bone_density',
  'water_content',
]

export const useTablesData = () => {
  const {
    getVitalsReadings,
    vitalsLoading,
    vitalsError,
    refetchVitalsReadings,
    getBPReadings,
    bpLoading,
    bpError,
    refetchBPReadings,
    getBsReadings,
    refetchBsReadings,
    bsLoading,
    bsError,
  } = useGetVitalsReadingApi()
  const { member } = useMember()

  const [vitals, setVitals] = useState<any>({})
  const [bloodPressure, setBloodPressure] = useState<any>([])
  const [vitalError, setVitalsError] = useState<any>(null)
  const [bloodPressureError, setBloodPressureError] = useState<any>(null)
  const [bloodSugar, setBloodSugar] = useState<any>([])
  const [bloodSugarError, setBloodSugarError] = useState<any>(null)
  const { getReportGenMeasurementsRangesData, loading: loadingRanges } =
    useGetLabsRanges()

  const getRanges = async (currMember: any) => {
    if (currMember) {
      const sex = currMember?.sex || 'Unknown'
      const ageInMonths = dayjs().diff(currMember?.birthDate, 'month')
      const variables: ReportGenNormalRangeVariables = {
        sex,
        ageInMonths,
      }
      return getReportGenMeasurementsRangesData(variables)
    }
    throw new Error('Member is required to get ranges.')
  }

  const processBsData = (bsData: any) => {
    return bsData?.map((bs: any) => {
      const { timestamp, ...rest } = bs
      return {
        timestamp,
        ...Object.keys(rest).reduce((acc: any, key) => {
          return {
            ...acc,
            [key]: {
              ...rest[key],
              textColor: rest[key]?.reference_range?.text_color,
            },
          }
        }, {}),
      }
    })
  }

  const getBsData = async () => {
    if (!member?.antaraId) return
    setBloodSugarError(null)
    const tableData = await getBsReadings(member.antaraId)

    return processBsData(tableData)
  }

  const refetchBsData = async () => {
    if (!member?.antaraId) return
    setBloodSugarError(null)
    const tableData = await refetchBsReadings(member.antaraId)

    return processBsData(tableData)
  }

  const processVitalsData = (vitals: any) => {
    const isVitalRecordNonNull = (record: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { timestamp, ...rest } = record

      return Object.values(rest).some((v: any) => !!v?.value)
    }
    if (vitals) {
      // we need to group all vitals into three categories: BMI, Body Composition and Other Vitals
      const bmiData = vitals.map((vital: any) => {
        const time = dayjs(vital?.timestamp).format('DD MMM YYYY')
        const data = vital?.data
        const bmi = BMI_TABLE_KEYS.reduce((acc: any, key) => {
          return {
            ...acc,
            [key]: {
              ...data[key],
              textColor: data[key]?.reference_range?.text_color,
            },
          }
        }, {})

        return {
          timestamp: time,
          ...bmi,
        }
      })

      const bodyCompositionData = vitals.map((vital: any) => {
        const data = vital?.data
        const time = dayjs(vital?.timestamp).format('DD MMM YYYY')
        const bodyComposition = BODY_COMPOSITION_KEYS.reduce(
          (acc: any, key) => {
            return {
              ...acc,
              [key]: {
                ...data[key],
                textColor: data[key]?.reference_range?.text_color,
              },
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
        const data = vital?.data
        const time = dayjs(vital?.timestamp).format('DD MMM YYYY')
        const otherVitals = OTHER_VITALS_KEYS.reduce((acc: any, key) => {
          return {
            ...acc,
            [key]: {
              ...data[key],
              textColor: data[key]?.reference_range?.text_color,
            },
          }
        }, {})

        return {
          timestamp: time,
          ...otherVitals,
        }
      })

      return {
        bmiData: bmiData.filter(isVitalRecordNonNull),
        bodyCompositionData: bodyCompositionData.filter(isVitalRecordNonNull),
        otherVitalsData: otherVitalsData.filter(isVitalRecordNonNull),
      }
    }

    return {}
  }

  const processBpData = (bpData: any) => {
    return bpData?.map((bp: any) => {
      return {
        timestamp: bp?.timestamp,
        average: {
          value: `${bp?.data?.systolic?.value || '-'}/${
            bp?.data?.diastolic?.value || '-'
          }`,
          textColor: bp?.data?.systolic?.reference_range?.text_color,
        },
        ...Object.keys(bp?.data).reduce((acc: any, key) => {
          return {
            ...acc,
            [key]: {
              ...bp?.data[key],
              textColor: bp?.data[key]?.reference_range?.text_color,
            },
          }
        }, {}),
      }
    })
  }

  const getVitalsData = async () => {
    if (!member?.antaraId) return
    setVitalsError(null)

    const tableData = await getVitalsReadings(member.antaraId)
    return processVitalsData(tableData)
  }

  const refetchVitalsData = async () => {
    if (!member?.antaraId) return
    setVitalsError(null)

    const tableData = await refetchVitalsReadings(member.antaraId)
    return processVitalsData(tableData)
  }

  const getBpData = async () => {
    if (!member?.antaraId) return []
    setBloodPressureError(null)

    const bpData = await getBPReadings(member.antaraId)
    return processBpData(bpData)
  }

  const refetchBpData = async () => {
    if (!member?.antaraId) return []
    setBloodPressureError(null)

    const bpData = await refetchBPReadings(member.antaraId)
    return processBpData(bpData)
  }

  useEffect(() => {
    getBpData()
      .then(setBloodPressure)
      .catch((err) => {
        logError(err)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.antaraId])

  const getTableData = async () => {
    const [vitalsData, bloodPressureData, bloodSugarData] =
      await Promise.allSettled([getVitalsData(), getBpData(), getBsData()])

    if (vitalsData.status === 'fulfilled') {
      setVitals(vitalsData.value)
    } else {
      setVitalsError(vitalsData.reason)
    }

    if (bloodPressureData.status === 'fulfilled') {
      setBloodPressure(bloodPressureData.value)
    } else {
      setBloodPressureError(bloodPressureData.reason)
    }

    if (bloodSugarData.status === 'fulfilled') {
      setBloodSugar(bloodSugarData.value)
    } else {
      setBloodSugarError(bloodSugarData.reason)
    }
  }

  useEffect(() => {
    getTableData().catch((err) => {
      logError(err)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.antaraId])

  return {
    loading: vitalsLoading || loadingRanges,
    vitalsError: vitalsError || vitalError,
    bpError: bpError || bloodPressureError,
    refetchVitalsData,
    vitals,
    bloodPressure,
    bpLoading: bpLoading || loadingRanges,
    refetchBpData,
    refetchBsData,
    bloodSugar,
    bloodSugarLoading: bsLoading || loadingRanges,
    bloodSugarError: bsError || bloodSugarError,
    loadingRanges,
    getRanges,
  }
}
