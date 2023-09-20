import { transformInteractionLogData } from 'src/modules/interactions/utils/data-transforms/input-transforms'
import { logError } from 'src/utils/logging/logger'
import type { Forms } from 'src/modules/workflows/db/models'
import { removeEmptyValues } from 'src/utils/data-transform'
import { useInteractionsData } from 'src/modules/interactions/hooks/interactions.hook'

class MockModel {
  // eslint-disable-next-line class-methods-use-this
  async markAsCompleted() {
    return true
  }
}

jest.spyOn(MockModel.prototype, 'markAsCompleted')
const mockMarkAsCompleted = jest.fn()
MockModel.prototype.markAsCompleted = mockMarkAsCompleted

const mockUseMember = jest.fn()
mockUseMember.mockReturnValue({ member: { antaraId: '123' } })
jest.mock('src/context/member', () => ({
  useMember: () => mockUseMember(),
}))

const mockUseUser = jest.fn()
mockUseUser.mockReturnValue({ email: 'test@mail.com' })
jest.mock('src/context/user', () => ({
  useUser: () => mockUseUser(),
}))

const mockCreateInteractionLog = jest.fn()
jest.mock('src/modules/interactions/services/interactions.api', () => ({
  useCreateInteractionLog: () => ({
    createInteractionLog: mockCreateInteractionLog,
    loading: false,
  }),
}))

jest.mock('src/utils/logging/logger', () => ({
  logError: jest.fn(),
}))

jest.mock('src/utils/data-transform', () => ({
  removeEmptyValues: jest.fn().mockImplementation((data) => data),
}))

jest.mock(
  'src/modules/interactions/utils/data-transforms/input-transforms',
  () => ({
    transformInteractionLogData: jest.fn().mockImplementation((data) => data),
  })
)

const cleanup = () => {
  jest.clearAllMocks()
}

afterEach(() => {
  cleanup()
})

describe('useInteractionsData suite', () => {
  const form = new MockModel() as unknown as Forms
  const formData = {
    interactionType: 'test',
    interactionDate: '2021-01-01',
    nextSteps: ['test'],
  }

  it('should create interaction', async () => {
    const { handleCreateInteraction } = useInteractionsData()
    await handleCreateInteraction(form, formData as any)

    expect(transformInteractionLogData).toHaveBeenCalledWith(
      formData,
      '123',
      'test@mail.com'
    )
    expect(removeEmptyValues).toHaveBeenCalledWith(formData)
    expect(mockCreateInteractionLog).toHaveBeenCalled()
    expect(mockCreateInteractionLog).toHaveBeenCalledWith(formData)
    expect(mockMarkAsCompleted).toHaveBeenCalled()
  })

  it('should throw error if member or user not found', async () => {
    mockUseMember.mockReturnValueOnce({ member: null })
    const { handleCreateInteraction } = useInteractionsData()

    await expect(
      handleCreateInteraction(form, formData as any)
    ).rejects.toThrow('Member or user not found')
  })

  it('should throw error if failed to create interaction log', async () => {
    mockCreateInteractionLog.mockRejectedValueOnce(
      new Error('Failed to create interaction log')
    )
    const { handleCreateInteraction } = useInteractionsData()

    await expect(
      handleCreateInteraction(form, formData as any)
    ).rejects.toThrow('Failed to create interaction log')
    expect(logError).toHaveBeenCalled()
  })
})
