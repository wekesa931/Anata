import { FeedbackPayload } from 'src/modules/feedback/types'
import { useCreateMemberFeedbackApi } from 'src/modules/feedback/services/feedback.api'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'
import type { Forms } from 'src/modules/workflows/db/models'
import { removeEmptyValues } from 'src/utils/data-transform'
import { transformFeedbackInput } from 'src/modules/feedback/utils/data-transforms/input-transforms'
import { logError } from 'src/utils/logging/logger'

export const useMemberFeedbackData = () => {
  const { member } = useMember()
  const user = useUser()
  const { createFeedback, loading } = useCreateMemberFeedbackApi()

  const handleCreateMemberFeedback = async (
    form: Forms,
    data: FeedbackPayload
  ) => {
    if (member?.antaraId && user?.email) {
      try {
        const input = removeEmptyValues(
          transformFeedbackInput(data, member.antaraId, user.email)
        )

        await createFeedback(input)

        return form.markAsCompleted()
      } catch (error) {
        logError(error)
        throw error
      }
    } else {
      throw new Error('Missing member or user data')
    }
  }

  return {
    handleCreateMemberFeedback,
    loading,
  }
}
