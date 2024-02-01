import airtableFetch from 'src/services/airtable/fetch'
import { UpdateLabRequest } from 'src/modules/labs/types'
import { logError } from 'src/utils/logging/logger'
import { useState } from 'react'

export const useLabManagementAPI = () => {
  const getAllLabRequests = async (antaraId: string) => {
    const url = `labs/list?&filterByFormula=FIND("${antaraId}", {Antara ID (from Members)})`
    const response = await airtableFetch(url)

    return response
  }
  const [updating, setUpdating] = useState(false)

  const update = async (rawUpdate: UpdateLabRequest) => {
    setUpdating(true)
    const res = await airtableFetch('labs', 'post', rawUpdate)
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

  return {
    getAllLabRequests,
    update,
    updating,
  }
}
