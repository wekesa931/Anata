import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useMember } from 'src/context/member'
import { useReportGenerationApi } from 'src/modules/vitals/services/report-generation.api'
import type {
  ReportGenNormalRangeVariables,
  ReportGenVariables,
} from 'src/modules/vitals/types'
import { logError } from 'src/utils/logging/logger'
import {
  transformMedicalCampData,
  transformLabsAndVitalsProgressReport,
} from 'src/modules/vitals/utils/data-transforms/report-generation.query'

export const useReportsGenerationData = () => {
  const {
    getReportGenMeasurementsData,
    getReportGenMeasurementsNormalRangesData,
    loading,
    loadingDiff,
    getLabsAndVitalsDiffData,
  } = useReportGenerationApi()
  const { member } = useMember()
  const [normalRanges, setNormalRanges] = useState<any>()

  useEffect(() => {
    if (member) {
      const sex = member?.sex || 'Unknown'
      const ageInMonths = dayjs().diff(member?.birthDate, 'month')
      const variables: ReportGenNormalRangeVariables = {
        sex,
        ageInMonths,
      }

      getReportGenMeasurementsNormalRangesData(variables)
        .then(setNormalRanges)
        .catch((err) => {
          logError(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const getMedicalCampData = async (date: string | Date) => {
    if (member) {
      const startDateOffset = dayjs(date)
        .subtract(1, 'day')
        .format('YYYY-MM-DD')
      const stopDateOffset = dayjs(date).add(1, 'day').format('YYYY-MM-DD')

      const variables: ReportGenVariables = {
        startDateOffset,
        stopDateOffset,
        antaraId: member?.antaraId,
      }

      const medicalCampData: any = await getReportGenMeasurementsData(variables)
      if (medicalCampData && normalRanges) {
        Object.entries(medicalCampData).forEach(([k, v]: [string, any]) => {
          const normalRange = normalRanges[k]
          medicalCampData[k] = {
            ...(v || {}),
            normalRange,
          }
        })
      }
      return transformMedicalCampData(medicalCampData)
    }

    throw new Error('Member not found')
  }

  const getLabsAndVitalsProgressReport = async () => {
    if (member?.antaraId) {
      const data = await getLabsAndVitalsDiffData(member?.antaraId)

      const transformed = transformLabsAndVitalsProgressReport(data)

      return transformed
    }

    throw new Error('Member not found')
  }

  return {
    getMedicalCampData,
    loading,
    getLabsAndVitalsProgressReport,
    loadingProgressReport: loadingDiff,
  }
}
