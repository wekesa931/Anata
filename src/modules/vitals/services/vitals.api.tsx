import { useMutation, useLazyQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'
import { useMember } from 'src/context/member'
import {
  CREATE_VITALS_READING,
  CREATE_BLOOD_PRESSURE_READING,
  CREATE_CHOLESTROL_READING,
  CREATE_DM_READING,
  GET_ALL_VITALS,
  CREATE_BLOOD_GLUCOSE_READING,
  CREATE_HBA1C_READING,
  GET_VITALS,
  GET_BP_PANEL,
  GET_BS_PANEL,
  GET_HEALTH_METRICS,
} from 'src/modules/vitals/services/gql'
import { GET_REPORT_GEN_MEASUREMENTS_RANGES } from 'src/modules/vitals/services/report-generation.gql'
import {
  VitalsReading,
  CholesterolFormInputs,
  BloodPressureFormInputs,
  DMMonitoringFormInputs,
  ReportGenNormalRangeVariables,
} from 'src/modules/vitals/types'

export const useGetVitalsReadingApi = () => {
  const context = {
    clientName: 'v2',
  }
  const [getData, { loading, error }] = useLazyQuery(GET_ALL_VITALS, {
    context,
  })

  const [
    getVitalsData,
    { loading: vitalsLoading, error: vitalsError, refetch: refetchVitals },
  ] = useLazyQuery(GET_VITALS, {
    context,
  })
  const [
    getBPData,
    { loading: bpLoading, error: bpError, refetch: refetchBp },
  ] = useLazyQuery(GET_BP_PANEL, {
    context,
  })

  const [
    getBsData,
    { loading: bsLoading, error: bsError, refetch: refetchBs },
  ] = useLazyQuery(GET_BS_PANEL, {
    context,
  })

  const parseBsReadings = (input: any = {}) => {
    const bsEdges = input?.bs?.edges?.map((item: any) => item.node)
    const hbEdges = input?.hba1c?.edges?.map((item: any) => item.node)

    const allEdges = [...bsEdges, ...hbEdges]
    // group by timestamp day wise
    const grouped = groupBy(allEdges, 'timestamp')
    const returnData: any = []
    Object.keys(grouped).forEach((timestamp) => {
      const group = grouped[timestamp]
      // group is an array of objects with {data, timestamp}
      // I want to merge all data into one object
      const merged = group.reduce((acc, curr) => {
        return {
          ...acc,
          ...curr.data,
        }
      }, {})

      const mergedData = {
        ...merged,
        timestamp,
      }

      returnData.push(mergedData)
    })

    return returnData
  }

  const getBsReadings = async (antaraId: string, refetch: boolean = false) => {
    if (!antaraId) throw new Error('Antara ID is required')
    let data: any

    if (refetch) {
      data = (await refetchBs()).data
    }

    data = (
      await getBsData({
        variables: {
          antaraId,
        },
      })
    ).data

    return parseBsReadings(data)
  }

  const getBPReadings = async (antaraId: string, refetch: boolean = false) => {
    if (!antaraId) throw new Error('Antara ID is required')

    let data: any

    if (refetch) {
      data = (await refetchBp()).data
    }

    data = (
      await getBPData({
        variables: {
          antaraId,
        },
      })
    ).data

    return data?.bloodPressureMonitoring?.edges?.map((item: any) => item.node)
  }

  const getVitalsReadings = async (
    antaraId: string,
    refetch: boolean = false
  ) => {
    if (!antaraId) throw new Error('Antara ID is required')

    let data: any

    if (refetch) {
      data = (await refetchVitals()).data
    }

    data = (
      await getVitalsData({
        variables: {
          antaraId,
        },
      })
    ).data

    return data?.vitals?.edges?.map((item: any) => item?.node)
  }

  const getAllVitalsReadings = async (antaraId: string) => {
    if (antaraId) {
      const { data } = await getData({
        variables: {
          antaraId,
        },
      })

      const {
        vitals,
        cholesterolMonitoring,
        bloodPressureMonitoring,
        bloodGlucoseMonitoring,
        hba1cMonitoring,
      } = data

      const results: any = {
        vitals: vitals?.edges?.map((item: any) => ({ ...item.node, antaraId })),
        cholesterolMonitoring: cholesterolMonitoring?.edges?.map(
          (item: any) => ({ ...item.node, antaraId })
        ),
        bloodPressureMonitoring: bloodPressureMonitoring?.edges?.map(
          (item: any) => ({ ...item.node, antaraId })
        ),
        bloodGlucoseMonitoring: bloodGlucoseMonitoring?.edges?.map(
          (item: any) => ({ ...item.node, antaraId })
        ),
        hba1cMonitoring: hba1cMonitoring?.edges?.map((item: any) => ({
          ...item.node,
          antaraId,
        })),
      }

      return results
    }
    throw new Error('Antara ID is required')
  }

  return {
    getVitalsReadings,
    loading,
    error,
    getAllVitalsReadings,
    vitalsLoading,
    vitalsError,
    getBPReadings,
    bpLoading,
    bpError,
    getBsReadings,
    bsLoading,
    bsError,
  }
}
export const useCreateVitalsReadingApi = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_VITALS_READING, {
    context: {
      clientName: 'v2',
    },
  })

  const createVitalReadings = async (input: VitalsReading) => {
    const { data } = await mutate({
      variables: {
        input,
      },
    })

    if (
      data?.uploadVitalsReading?.errors ||
      data?.uploadVitalsReading?.status !== 200
    ) {
      throw new Error(
        data?.uploadVitalsReading?.errors || 'Failed to create vitals reading'
      )
    }

    return data?.uploadVitalsReading
  }

  return {
    createVitalReadings,
    loading,
    error,
  }
}

export const useCreateCholesterolReadingApi = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_CHOLESTROL_READING, {
    context: {
      clientName: 'v2',
    },
  })

  const createCholesterolReadings = async (input: CholesterolFormInputs) => {
    const { data } = await mutate({
      variables: {
        input,
      },
    })

    if (
      data?.uploadCholesterolReading?.errors ||
      data?.uploadCholesterolReading?.status !== 200
    ) {
      throw new Error(
        data?.uploadCholesterolReading?.errors ||
          'Failed to create cholesterol reading'
      )
    }

    return data?.uploadCholesterolReading
  }

  return {
    createCholesterolReadings,
    loading,
    error,
  }
}

export const useCreateBloodPressureReadingApi = () => {
  const [mutate, { loading, error }] = useMutation(
    CREATE_BLOOD_PRESSURE_READING,
    {
      context: {
        clientName: 'v2',
      },
    }
  )

  const createBloodPressureReadings = async (
    input: BloodPressureFormInputs
  ) => {
    const { data } = await mutate({
      variables: {
        input,
      },
    })

    if (
      data?.uploadBloodPressureReading?.errors ||
      data?.uploadBloodPressureReading?.status !== 200
    ) {
      throw new Error(
        data?.uploadBloodPressureReading?.errors ||
          'Failed to create blood pressure reading'
      )
    }

    return data?.uploadBloodPressureReading
  }

  return {
    createBloodPressureReadings,
    loading,
    error,
  }
}

export const useCreateDMReadingApi = () => {
  const [mutate, { loading }] = useMutation(CREATE_DM_READING, {
    context: {
      clientName: 'v2',
    },
  })

  const isObjectEmpty = (obj: any) => {
    return Object.keys(obj).length === 0
  }

  const parseDMReadings = (input: DMMonitoringFormInputs) => {
    const { antaraId, hba1c, timestamp, ...bloodGlucose } = input
    return {
      ...(!isObjectEmpty(bloodGlucose) && {
        bloodGlucose: {
          ...bloodGlucose,
          antaraId,
          timestamp,
        },
      }),
      ...(hba1c && {
        hba1c: {
          hba1c,
          antaraId,
          timestamp,
        },
      }),
    }
  }

  const selectMutation = (input: { bloodGlucose?: any; hba1c?: any }) => {
    if (input.bloodGlucose && input.hba1c) {
      return CREATE_DM_READING
    }
    if (input.bloodGlucose) {
      return CREATE_BLOOD_GLUCOSE_READING
    }
    if (input.hba1c) {
      return CREATE_HBA1C_READING
    }

    throw new Error('Neither blood glucose nor hba1c is present')
  }

  const selectVariables = (input: { bloodGlucose?: any; hba1c?: any }) => {
    if (input.bloodGlucose && input.hba1c) {
      return input
    }
    if (input.bloodGlucose) {
      return {
        input: input.bloodGlucose,
      }
    }
    if (input.hba1c) {
      return {
        input: input.hba1c,
      }
    }

    throw new Error('Neither blood glucose nor hba1c is present')
  }

  const parseDmErrors = (data: any = {}) => {
    const { uploadBloodGlucoseReading, uploadHba1cReading } = data
    const errors = []
    const successMessage = []
    if (uploadBloodGlucoseReading?.errors) {
      errors.push(uploadBloodGlucoseReading?.errors)
    } else {
      successMessage.push('Blood Glucose Reading Uploaded Successfully')
    }

    if (uploadHba1cReading?.errors) {
      errors.push(uploadHba1cReading?.errors)
    } else {
      successMessage.push('HBA1C Reading Uploaded Successfully')
    }

    return {
      errors,
      successMessage,
    }
  }

  const createDMReadings = async (input: DMMonitoringFormInputs) => {
    const variables = parseDMReadings(input)
    if (isObjectEmpty(variables)) {
      throw new Error('No data to upload')
    }

    const { data } = await mutate({
      mutation: selectMutation(variables),
      variables: selectVariables(variables),
    })

    return parseDmErrors(data)
  }

  return {
    createDMReadings,
    loading,
  }
}

export const useGetLabsRanges = () => {
  const context = {
    clientName: 'v2',
  }

  const [getReportGenMeasurementsRanges, { loading }] = useLazyQuery(
    GET_REPORT_GEN_MEASUREMENTS_RANGES(false),
    {
      context,
    }
  )

  const getReportGenMeasurementsRangesData = async (
    variables: ReportGenNormalRangeVariables
  ) => {
    const { data } = await getReportGenMeasurementsRanges({
      variables,
    })

    return Object.keys(data).reduce((acc, key) => {
      const { edges } = data[key]

      return {
        ...acc,
        [key]: edges?.map((item: any) => item.node),
      }
    }, {})
  }

  return {
    loading,
    getReportGenMeasurementsRangesData,
  }
}

export const useGetHealthMetrics = () => {
  const [load] = useLazyQuery(GET_HEALTH_METRICS, {
    context: {
      clientName: 'v2',
    },
  })
  const { member } = useMember()

  const getHealthMetrics = async () => {
    if (!member) return { references: [], metrics: [] }
    const sex = member?.sex || 'Unknown'
    const ageInMonths = dayjs().diff(member?.birthDate, 'month')
    const variables = {
      sex,
      ageInMonths,
    }

    const { data } = await load({
      variables,
    })

    const { references, metrics } = data
    const b = references?.edges?.map(({ node }: any) => ({
      ...node,
      healthMetric: node?.healthMetric.name,
    }))

    const m = metrics?.edges?.map(({ node }: any) => ({
      ...node,
      isInPanel: !!node?.measurementPanelType?.edges?.length,
      measurementUnit: node?.measurementUnit?.name,
    }))

    return {
      references: b,
      metrics: m,
    }
  }

  return {
    getHealthMetrics,
  }
}
