import { useMutation } from '@apollo/client'
import { CREATE_MEMBER_FEEDBACK } from 'src/modules/feedback/services/gql'
import { FeedbackVariables } from 'src/modules/feedback/types'

export const useCreateMemberFeedbackApi = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_MEMBER_FEEDBACK, {
    context: {
      clientName: 'v2',
    },
  })

  const createFeedback = async (input: FeedbackVariables) => {
    const res = await mutate({
      variables: {
        input,
      },
    })

    if (res?.data?.memberFeedback?.status !== 200) {
      const errorMessage = 'Failed to save feedback data'
      throw new Error(errorMessage)
    }

    return res?.data?.memberFeedback
  }

  return {
    createFeedback,
    loading,
    error,
  }
}
