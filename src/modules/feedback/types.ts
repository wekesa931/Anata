export interface FeedbackVariables {
  feedback: boolean
  typeOfFeedback?: string[]
  reasonForFeedback?: string[]
  testimonial?: string
  otherFeedback?: string
  feedbackFromMember?: string
  memberAntaraId?: string
  source?: string
  createdBy: string
}

export interface FeedbackPayload {
  'Did the member provide any feedback?': string
  'Type of feedback': string[]
  'What did the member provide feedback for?': string[]
  Testimonial: string
  Other: string
  Feedback: string
  Member: [string]
  Source: string[]
}
