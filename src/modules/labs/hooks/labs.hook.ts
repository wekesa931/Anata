import { useEffect, useState } from 'react'
import { useMember } from 'src/context/member'
import { useLabManagementAPI } from 'src/modules/labs/services'
import { logError } from 'src/utils/logging/logger'
import { transformRawLabRequest } from 'src/modules/labs/utils'
import { LabRequest, UpdateLabRequest } from 'src/modules/labs/types'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'

export type LabRequestHook = ReturnType<typeof useLabsData>

export const useLabsData = () => {
  const { getAllLabRequests, update } = useLabManagementAPI()
  const { member } = useMember()

  const [labRequests, setLabRequests] = useState<LabRequest[]>([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { promiseInProgress: updating } = usePromiseTracker({ area: 'update' })

  const getLabRequests = async (antaraId: string) => {
    try {
      setError(null)
      setLoading(true)
      const response = await getAllLabRequests(antaraId)
      setLabRequests(response?.map(transformRawLabRequest))
    } catch (e: any) {
      logError(e)
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (member?.antaraId) {
      getLabRequests(member.antaraId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.antaraId])

  const refetch = () => {
    if (member?.antaraId) {
      getLabRequests(member.antaraId)
    }
  }

  const updateLabRequest = async (rawUpdate: UpdateLabRequest) => {
    return trackPromise(update(rawUpdate), 'update')
  }

  const markLabRequestAsReceived = async (labs: LabRequest[]) => {
    const Status = 'Results received by Antara'
    const rawUpdates: UpdateLabRequest[] = labs.map((labRequest) => ({
      id: labRequest.recordId,
      fields: {
        Status,
      },
    }))

    return Promise.all(rawUpdates.map(updateLabRequest))
  }

  return {
    labRequests,
    error,
    loading,
    refetch,
    updateLabRequest,
    markLabRequestAsReceived,
    updating,
  }
}
