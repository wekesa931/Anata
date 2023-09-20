import { FeedbackPayload, FeedbackVariables } from 'src/modules/feedback/types'

export const transformFeedbackInput = (
  data: FeedbackPayload,
  antaraId?: string | null,
  userEmail?: string | null
): FeedbackVariables => {
  if (!data || !antaraId || !userEmail)
    throw new Error('Missing required data or antaraId')

  const {
    'Type of feedback': typeOfFeedback,
    'What did the member provide feedback for?': reasonForFeedback,
    Testimonial: testimonial,
    Other: otherFeedback,
    Feedback: feedbackFromMember,
    Source: feedbackSource,
  } = data

  const feedbackRaw = data['Did the member provide any feedback?']
  const feedback = feedbackRaw === 'Yes'
  const source =
    Array.isArray(feedbackSource) && feedbackSource.length
      ? feedbackSource[0]
      : undefined

  return {
    typeOfFeedback,
    reasonForFeedback,
    testimonial,
    otherFeedback,
    feedbackFromMember,
    memberAntaraId: antaraId,
    source,
    feedback,
    createdBy: userEmail,
  }
}
