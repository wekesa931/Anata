import airtableFetch from 'src/services/airtable/fetch'
import { UpdateLabRequest } from 'src/modules/labs/types'
import { logError } from 'src/utils/logging/logger'
import { useState } from 'react'
import { filterFields } from 'src/utils/airtable/field-utils'

const LabTypesFields = ['Record ID', 'Name']

export const useLabManagementAPI = () => {
  const getAllLabRequests = async (antaraId: string) => {
    const url = `labs/list?&filterByFormula=FIND("${antaraId}", {Antara ID (from Members)})`
    const response = await airtableFetch(url)

    return response
  }

  const [updating, setUpdating] = useState(false)

  const update = async (rawUpdate: UpdateLabRequest, create?: boolean) => {
    setUpdating(true)
    const url = create ? 'create/labs' : 'labs'
    const res = await airtableFetch(url, 'post', rawUpdate)
    setUpdating(false)

    if (typeof res === 'string') {
      logError(res)
      throw new Error(res)
    }

    if (Array.isArray(res)) {
      throw new Error(res[0].error)
    }

    return res
  }

  const getAllLabsTypes = async () => {
    const url = `routine_labs/list?${filterFields(LabTypesFields)}`
    const response = airtableFetch(url)

    return response
  }

  return {
    getAllLabRequests,
    update,
    updating,
    getAllLabsTypes,
  }
}
