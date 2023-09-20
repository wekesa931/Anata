import { useMutation, useLazyQuery } from '@apollo/client'
import {
  CREATE_VITALS_READING,
  CREATE_BLOOD_PRESSURE_READING,
  CREATE_CHOLESTROL_READING,
  CREATE_DM_READING,
  GET_ALL_VITALS,
} from 'src/modules/vitals/services/gql'
import {
  VitalsReading,
  CholesterolFormInputs,
  BloodPressureFormInputs,
  DMMonitoringFormInputs,
} from 'src/modules/vitals/types'

export const useGetVitalsReadingApi = () => {
  const [getData, { loading, error }] = useLazyQuery(GET_ALL_VITALS, {
    context: {
      clientName: 'v2',
    },
  })

  const getVitalsReadings = async (antaraId: string) => {
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

  const createDMReadings = async (input: DMMonitoringFormInputs) => {
    const { antaraId, hba1c, timestamp, ...bloodGlucose } = input
    const variables = {
      bloodGlucose: {
        ...bloodGlucose,
        antaraId,
        timestamp,
      },
      hba1c: {
        hba1c,
        antaraId,
        timestamp,
      },
    }
    const { data } = await mutate({
      variables,
    })

    if (
      data?.uploadBloodGlucoseReading?.errors ||
      data?.uploadBloodGlucoseReading?.status !== 200
    ) {
      throw new Error(
        data?.uploadBloodGlucoseReading?.errors ||
          'Failed to create blood glucose reading'
      )
    }

    return data?.uploadBloodGlucoseReading
  }

  return {
    createDMReadings,
    loading,
  }
}
