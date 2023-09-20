import { useMember } from 'src/context/member'
import {
  useCreateVitalsReadingApi,
  useCreateBloodPressureReadingApi,
  useCreateCholesterolReadingApi,
  useCreateDMReadingApi,
} from 'src/modules/vitals/services/vitals.api'
import {
  VitalsReading,
  BloodPressureFormInputs,
  CholesterolFormInputs,
  DMMonitoringFormInputs,
} from 'src/modules/vitals/types'
import { logError } from 'src/utils/logging/logger'
import { removeEmptyValues } from 'src/utils/data-transform'
import { transformFormData } from 'src/modules/vitals/utils'

export const useVitalsUpdate = () => {
  const { member } = useMember()
  const { createVitalReadings, loading: creatingVitals } =
    useCreateVitalsReadingApi()
  const { createBloodPressureReadings, loading: creatingBp } =
    useCreateBloodPressureReadingApi()
  const { createCholesterolReadings, loading: creatingCholesterol } =
    useCreateCholesterolReadingApi()

  const { createDMReadings, loading: creatingDm } = useCreateDMReadingApi()

  const handleCreateVitalsReading = async (formData: VitalsReading) => {
    if (member) {
      try {
        const { timestamp, ...rest } = formData
        const variables = transformFormData(
          removeEmptyValues({
            ...rest,
          })
        )

        return await createVitalReadings({
          ...variables,
          antaraId: member.antaraId,
          timestamp,
        })
      } catch (e: any) {
        logError(e)
        throw e
      }
    } else {
      throw new Error('No member found')
    }
  }

  const handleCreateBloodPressureReading = async (
    formData: BloodPressureFormInputs
  ) => {
    if (member) {
      try {
        const { timestamp, ...rest } = formData
        const variables = transformFormData(
          removeEmptyValues({
            ...rest,
          })
        )

        return createBloodPressureReadings({
          ...variables,
          antaraId: member.antaraId,
          timestamp,
        })
      } catch (e: any) {
        logError(e)
        throw e
      }
    } else {
      throw new Error('No member found')
    }
  }

  const handleCreateCholesterolReading = async (
    formData: CholesterolFormInputs
  ) => {
    if (member) {
      try {
        const { timestamp, ...rest } = formData
        const variables = transformFormData(
          removeEmptyValues({
            ...rest,
          })
        )

        return createCholesterolReadings({
          ...variables,

          timestamp,
          antaraId: member.antaraId,
        })
      } catch (e: any) {
        logError(e)
        throw e
      }
    } else {
      throw new Error('No member found')
    }
  }

  const handleCreateDMReading = async (formData: DMMonitoringFormInputs) => {
    if (member) {
      try {
        const { timestamp, ...rest } = formData
        const variables = transformFormData(
          removeEmptyValues({
            ...rest,
          })
        )

        return await createDMReadings({
          ...variables,
          timestamp,
          antaraId: member.antaraId,
        })
      } catch (e: any) {
        logError(e)
        throw e
      }
    } else {
      throw new Error('No member found')
    }
  }

  return {
    handleCreateVitalsReading,
    handleCreateBloodPressureReading,
    handleCreateCholesterolReading,
    handleCreateDMReading,
    loading: creatingVitals || creatingBp || creatingCholesterol || creatingDm,
  }
}
