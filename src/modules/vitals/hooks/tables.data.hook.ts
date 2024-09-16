import dayjs from 'dayjs'
import { useMember } from 'src/context/member'
import {
  useGetVitalsReadingApi,
  useGetLabsRanges,
} from 'src/modules/vitals/services/vitals.api'
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
  'bone_density',
  'water_content',
]
const OTHER_VITALS_KEYS = [
  'temperature',
  'respiratory_rate',
  'oxygen_saturation',
  'six_lead_ecg_findings',
]

export const useTablesData = () => {
  const { getVitalsReadings, getBPReadings, getBsReadings } =
    useGetVitalsReadingApi()
  const { member } = useMember()

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

  const getBsData = async (refetch: boolean = false) => {
    if (!member?.antaraId) return
    const tableData = await getBsReadings(member.antaraId, refetch)

    return processBsData(tableData)
  }

  const processVitalsData = (vitalsData: any) => {
    const isVitalRecordNonNull = (record: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { timestamp, ...rest } = record

      return Object.values(rest).some((v: any) => !!v?.value)
    }
    if (vitalsData) {
      // we need to group all vitals into three categories: BMI, Body Composition and Other Vitals
      const bmiData = vitalsData.map((vital: any) => {
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

      const bodyCompositionData = vitalsData.map((vital: any) => {
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

      const otherVitalsData = vitalsData.map((vital: any) => {
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

  const getVitalsData = async (refetch: boolean = false) => {
    if (!member?.antaraId) return
    const tableData = await getVitalsReadings(member.antaraId, refetch)
    return processVitalsData(tableData)
  }

  const getBpData = async (refetch: boolean = false) => {
    if (!member?.antaraId) return []

    const bpData = await getBPReadings(member.antaraId, refetch)
    return processBpData(bpData)
  }

  return {
    loadingRanges,
    getRanges,
    getBpData,
    getBsData,
    getVitalsData,
  }
}
