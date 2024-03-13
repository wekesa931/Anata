import { useEffect, useState } from 'react'
import { useMember } from 'src/context/member'
import { useLabManagementAPI } from 'src/modules/labs/services'
import { logError } from 'src/utils/logging/logger'
import { transformRawLabRequest } from 'src/modules/labs/utils'
import { LabRequest, UpdateLabRequest } from 'src/modules/labs/types'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import type { LabTypes } from 'src/modules/labs/types'
import dayjs from 'dayjs'

export type LabRequestHook = ReturnType<typeof useLabsData>

export const useLabsData = () => {
  const { getAllLabRequests, update, getAllLabsTypes } = useLabManagementAPI()
  const { member } = useMember()

  const [labRequests, setLabRequests] = useState<LabRequest[]>([])
  const [labTypes, setLabTypes] = useState<LabTypes[]>([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { promiseInProgress: updating } = usePromiseTracker({ area: 'update' })

  useEffect(() => {
    getAllLabsTypes()
      .then((response) => {
        setLabTypes(
          response.map((labType: any) => ({
            name: labType?.Name,
            recordId: labType?.['Record ID'],
          }))
        )
      })
      .catch((err) => {
        logError(err)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const createLabRequests = async (labRequestTypes: LabTypes[]) => {
    if (!member?.airtableRecordId) return
    const prefills = {
      Status: 'Results received by Antara',
      Type: 'Lab',
      Notes:
        'Lab request created when we received the document, from scribe directly',
      'Result Date': dayjs().format('YYYY-MM-DD'),
      Source: 'Scribe: Document upload',
      'Data Source': 'Scribe: Document upload',
      Members: [member?.airtableRecordId],
    }

    const newLabs = labRequestTypes.map((labType) => ({
      fields: {
        ...prefills,
        'Routine lab (from Lab synced view)': [labType.recordId],
      },
    }))

    const createdLabs = await Promise.all(
      newLabs.map((lab) => update(lab, true))
    )
    setLabRequests((prev) => [
      ...prev,
      ...createdLabs.map(transformRawLabRequest),
    ])

    return createdLabs.map(transformRawLabRequest)
  }

  return {
    labRequests,
    error,
    loading,
    refetch,
    updateLabRequest,
    markLabRequestAsReceived,
    updating,
    labTypes,
    createLabRequests,
  }
}
