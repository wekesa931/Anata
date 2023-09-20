import { transformFeedbackInput } from 'src/modules/feedback/utils/data-transforms/input-transforms'

describe('transformFeedbackInput', () => {
  // Tests that the function returns the expected object with valid input
  it('test_happy_path', () => {
    const data = {
      'Did the member provide any feedback?': 'Yes',
      'Type of feedback': ['Type 1', 'Type 2'],
      'What did the member provide feedback for?': ['Reason 1', 'Reason 2'],
      Testimonial: 'Testimonial',
      Other: 'Other Feedback',
      Feedback: 'Feedback from member',
      Member: ['Member'] as [string],
      Source: ['Source'],
    }
    const antaraId = '123'
    const userEmail = 'test@test.com'

    const expectedOutput = {
      feedback: true,
      typeOfFeedback: ['Type 1', 'Type 2'],
      reasonForFeedback: ['Reason 1', 'Reason 2'],
      testimonial: 'Testimonial',
      otherFeedback: 'Other Feedback',
      feedbackFromMember: 'Feedback from member',
      memberAntaraId: antaraId,
      source: 'Source',
      createdBy: userEmail,
    }

    expect(transformFeedbackInput(data, antaraId, userEmail)).toEqual(
      expectedOutput
    )
  })

  // Throws an error if required data is missing
  it('test_missing_required_data', () => {
    const data = {
      'Did the member provide any feedback?': 'Yes',
      'Type of feedback': ['Type 1', 'Type 2'],
      'What did the member provide feedback for?': ['Reason 1', 'Reason 2'],
      Testimonial: 'Testimonial',
      Other: 'Other Feedback',
      Feedback: 'Feedback from member',
      Member: ['Member'] as [string],
      Source: ['Source'],
    }
    const antaraId = '123'
    const userEmail = 'test@test.com'

    expect(() => transformFeedbackInput(null, antaraId, userEmail)).toThrow(
      'Missing required data or antaraId'
    )
    expect(() => transformFeedbackInput(data, undefined, userEmail)).toThrow(
      'Missing required data or antaraId'
    )
    expect(() => transformFeedbackInput(data, antaraId, undefined)).toThrow(
      'Missing required data or antaraId'
    )
  })

  // Handles empty input gracefully
  it('test_empty_input', () => {
    const antaraId = '123'
    const userEmail = 'test@test.com'

    const expectedOutput = {
      feedback: false,
      memberAntaraId: antaraId,
      createdBy: userEmail,
    }

    expect(
      transformFeedbackInput({} as unknown as any, antaraId, userEmail)
    ).toEqual(expectedOutput)
  })

  // Handles feedbackRaw value of 'No'
  it('test_feedback_raw_no', () => {
    const data = {
      'Did the member provide any feedback?': 'No',
      'Type of feedback': ['Type 1', 'Type 2'],
      'What did the member provide feedback for?': ['Reason 1', 'Reason 2'],
      Testimonial: 'Testimonial',
      Other: 'Other Feedback',
      Feedback: 'Feedback from member',
      Member: ['Member'] as [string],
      Source: ['Source'],
    }
    const antaraId = '123'
    const userEmail = 'test@test.com'

    const expectedOutput = {
      feedback: false,
      typeOfFeedback: ['Type 1', 'Type 2'],
      reasonForFeedback: ['Reason 1', 'Reason 2'],
      testimonial: 'Testimonial',
      otherFeedback: 'Other Feedback',
      feedbackFromMember: 'Feedback from member',
      memberAntaraId: antaraId,
      source: 'Source',
      createdBy: userEmail,
    }

    expect(transformFeedbackInput(data, antaraId, userEmail)).toEqual(
      expectedOutput
    )
  })

  // Handles feedbackSource array with multiple values
  it('test_feedback_source_multiple_values', () => {
    const data = {
      'Did the member provide any feedback?': 'Yes',
      'Type of feedback': ['Type 1', 'Type 2'],
      'What did the member provide feedback for?': ['Reason 1', 'Reason 2'],
      Testimonial: 'Testimonial',
      Other: 'Other Feedback',
      Feedback: 'Feedback from member',
      Member: ['Member'] as [string],
      Source: ['Source 1', 'Source 2'],
    }
    const antaraId = '123'
    const userEmail = 'test@test.com'

    const expectedOutput = {
      feedback: true,
      typeOfFeedback: ['Type 1', 'Type 2'],
      reasonForFeedback: ['Reason 1', 'Reason 2'],
      testimonial: 'Testimonial',
      otherFeedback: 'Other Feedback',
      feedbackFromMember: 'Feedback from member',
      memberAntaraId: antaraId,
      source: 'Source 1',
      createdBy: userEmail,
    }

    expect(transformFeedbackInput(data, antaraId, userEmail)).toEqual(
      expectedOutput
    )
  })
})
