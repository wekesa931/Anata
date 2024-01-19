import airtableFetch from 'src/services/airtable/fetch'
import { UpdateLabRequest } from 'src/modules/labs/types'
import { useState } from 'react'
import { logError } from 'src/utils/logging/logger'

export const useLabManagementAPI = () => {
  const [updating, setUpdating] = useState(false)

  const getAllLabRequests = async (antaraId: string) => {
    const url = `labs/list?&filterByFormula=FIND("${antaraId}", {Antara ID (from Members)})`
    const response = await airtableFetch(url)

    return response
  }

  const update = async (update: UpdateLabRequest) => {
    setUpdating(true)
    const res = await airtableFetch('labs', 'post', update)
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
