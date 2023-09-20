import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'
import { useCreateInteractionLog } from 'src/modules/interactions/services/interactions.api'
import type { Forms } from 'src/modules/workflows/db/models'
import type { InteractionLogFormData } from 'src/modules/interactions/types'
import { transformInteractionLogData } from 'src/modules/interactions/utils/data-transforms/input-transforms'
import { removeEmptyValues } from 'src/utils/data-transform'
import { logError } from 'src/utils/logging/logger'

export const useInteractionsData = () => {
  const { member } = useMember()
  const user = useUser()
  const { createInteractionLog, loading } = useCreateInteractionLog()

  const handleCreateInteraction = async (
    form: Forms,
    data: InteractionLogFormData
  ) => {
    if (member && user) {
      try {
        const variables = removeEmptyValues(
          transformInteractionLogData(data, member.antaraId, user.email)
        )
        await createInteractionLog(variables)
        return form.markAsCompleted()
      } catch (e) {
        logError(e)
        throw new Error('Failed to create interaction log')
      }
    } else {
      throw new Error('Member or user not found')
    }
  }

  return {
    handleCreateInteraction,
    loading,
  }
}
