import { transformFeedbackInput } from 'src/modules/feedback/utils/data-transforms/input-transforms'
import { logError } from 'src/utils/logging/logger'
import type { Forms } from 'src/modules/workflows/db/models'
import { removeEmptyValues } from 'src/utils/data-transform'
import { useMemberFeedbackData } from 'src/modules/feedback/hooks/feedback.hook'

class MockModel {
  // eslint-disable-next-line class-methods-use-this
  async markAsCompleted() {
    return true
  }
}

jest.spyOn(MockModel.prototype, 'markAsCompleted')
MockModel.prototype.markAsCompleted = jest.fn()

const mockUseMember = jest.fn()
mockUseMember.mockReturnValue({ member: { antaraId: '123' } })
jest.mock('src/context/member', () => ({
  useMember: () => mockUseMember(),
}))

jest.mock('src/utils/logging/logger', () => ({
  logError: jest.fn(),
}))

jest.mock('src/utils/data-transform', () => ({
  removeEmptyValues: jest.fn().mockImplementation((data) => data),
}))

jest.mock(
  'src/modules/feedback/utils/data-transforms/input-transforms',
  () => ({
    transformFeedbackInput: jest.fn().mockImplementation((data) => data),
  })
)

const mockUseUser = jest.fn()
mockUseUser.mockReturnValue({ email: 'test@mail.com' })
jest.mock('src/context/user', () => ({
  useUser: () => mockUseUser(),
}))

const mockCreateFeedback = jest.fn()
jest.mock('src/modules/feedback/services/feedback.api', () => ({
  useCreateMemberFeedbackApi: () => ({
    createFeedback: mockCreateFeedback,
    loading: false,
  }),
}))

const cleanup = () => {
  jest.clearAllMocks()
}

afterEach(() => {
  cleanup()
})

describe('useMemberFeedbackData test suite', () => {
  const form = new MockModel() as unknown as Forms
  const formData = {
    'Did member provide any feedback': 'Yes',
    Source: ['Baseline'],
    'What did the member provide feedback for?': ['App'],
    Feedback: 'Hey',
  }

  it('test_happy_path', async () => {
    const { handleCreateMemberFeedback } = useMemberFeedbackData()
    await handleCreateMemberFeedback(form, formData as any)
    expect(transformFeedbackInput).toHaveBeenCalledTimes(1)
    expect(transformFeedbackInput).toHaveBeenCalledWith(
      formData,
      '123',
      'test@mail.com'
    )
    expect(removeEmptyValues).toHaveBeenCalledTimes(1)
    expect(mockCreateFeedback).toHaveBeenCalledTimes(1)
    expect(mockCreateFeedback).toHaveBeenCalledWith(formData)
    expect(MockModel.prototype.markAsCompleted).toHaveBeenCalledTimes(1)
  })

  it('test_missing_member_or_user_data', async () => {
    mockUseMember.mockReturnValueOnce({ member: null })
    mockUseUser.mockReturnValueOnce({ email: null })
    const { handleCreateMemberFeedback } = useMemberFeedbackData()

    await expect(
      handleCreateMemberFeedback(form, formData as any)
    ).rejects.toThrow('Missing member or user data')
    expect(transformFeedbackInput).toHaveBeenCalledTimes(0)
    expect(removeEmptyValues).toHaveBeenCalledTimes(0)
    expect(mockCreateFeedback).toHaveBeenCalledTimes(0)
    expect(MockModel.prototype.markAsCompleted).toHaveBeenCalledTimes(0)
  })

  it('test_error', async () => {
    mockCreateFeedback.mockRejectedValue(new Error('Test Error'))
    const { handleCreateMemberFeedback } = useMemberFeedbackData()
    await expect(
      handleCreateMemberFeedback(form, formData as any)
    ).rejects.toThrow('Test Error')
    expect(transformFeedbackInput).toHaveBeenCalledTimes(1)
    expect(transformFeedbackInput).toHaveBeenCalledWith(
      formData,
      '123',
      'test@mail.com'
    )
    expect(removeEmptyValues).toHaveBeenCalledTimes(1)
    expect(mockCreateFeedback).toHaveBeenCalledTimes(1)
    expect(mockCreateFeedback).toHaveBeenCalledWith(formData)
    expect(MockModel.prototype.markAsCompleted).toHaveBeenCalledTimes(0)
    expect(logError).toHaveBeenCalledTimes(1)
  })
})
