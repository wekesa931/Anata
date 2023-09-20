import { useMutation } from '@apollo/client'
import { CREATE_INTERACTION } from 'src/modules/interactions/services/gql'
import { InteractionLog } from 'src/modules/interactions/types'
import { logError } from 'src/utils/logging/logger'

export const useCreateInteractionLog = () => {
  const [mutate, { loading }] = useMutation(CREATE_INTERACTION)

  const createInteractionLog = async (input: InteractionLog) => {
    const res = await mutate({
      variables: {
        input,
      },
    })

    if (res?.data?.createInteraction?.status !== 200) {
      const errorMessage = 'Failed to save interaction log data'
      logError(res)
      throw new Error(errorMessage)
    }

    return res?.data?.createInteraction
  }

  return {
    createInteractionLog,
    loading,
  }
}
