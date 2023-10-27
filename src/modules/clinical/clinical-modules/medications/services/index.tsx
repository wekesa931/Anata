import { useState } from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import { logError } from 'src/utils/logging/logger'

export const useUpdateMedications = () => {
  const TABLE_NAME = 'medications'
  const [loading, setLoading] = useState(false)

  const updateMedications = async (medicationId: string, values: any) => {
    setLoading(true)
    const res = await airtableFetch(TABLE_NAME, 'post', {
      id: medicationId,
      fields: values,
    })
    setLoading(false)

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
    updateMedications,
    loading,
  }
}
