import { useFormHandlers } from 'src/modules/workflows/hooks/form-handlers'

const mockHandleCreateInteraction = jest
  .fn()
  .mockName('mockHandleCreateInteraction')
jest.mock('src/modules/interactions/hooks/interactions.hook', () => ({
  useInteractionsData: jest.fn(() => ({
    handleCreateInteraction: mockHandleCreateInteraction,
  })),
}))

const mockHandleHNOSFormSubmission = jest
  .fn()
  .mockName('mockHandleHNOSFormSubmission')
jest.mock('src/modules/workflows/hooks/hnos-form-handler', () => ({
  useHNOSFormHandler: jest.fn(() => ({
    handleHNOSFormSubmission: mockHandleHNOSFormSubmission,
  })),
}))

const mockHandleCreateVitalsReading = jest
  .fn()
  .mockName('mockHandleCreateVitalsReading')
const mockHandleCreateBloodPressureReading = jest
  .fn()
  .mockName('mockHandleCreateBloodPressureReading')
const mockHandleCreateCholesterolReading = jest
  .fn()
  .mockName('mockHandleCreateCholesterolReading')
const mockHandleCreateDMReading = jest
  .fn()
  .mockName('mockHandleCreateDMReading')
jest.mock('src/modules/vitals/hooks/vitals.update.hook', () => ({
  useVitalsUpdate: jest.fn(() => ({
    handleCreateVitalsReading: mockHandleCreateVitalsReading,
    handleCreateBloodPressureReading: mockHandleCreateBloodPressureReading,
    handleCreateCholesterolReading: mockHandleCreateCholesterolReading,
    handleCreateDMReading: mockHandleCreateDMReading,
  })),
}))

const mockHandleCreateMemberFeedback = jest
  .fn()
  .mockName('mockHandleCreateMemberFeedback')
jest.mock('src/modules/feedback/hooks/feedback.hook', () => ({
  useMemberFeedbackData: jest.fn(() => ({
    handleCreateMemberFeedback: mockHandleCreateMemberFeedback,
  })),
}))

jest.mock('src/context/member', () => ({
  useMember: jest.fn(() => ({
    member: {
      antaraId: '123',
      airtableRecordId: '123',
    },
  })),
}))

jest.mock('src/context/user', () => ({
  useUser: jest.fn(() => ({
    user: {
      id: '123',
    },
  })),
}))

// mock useState
const mockSetLoading = jest.fn()
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(() => [false, mockSetLoading]),
}))

jest.mock('src/context/airtable-meta', () => ({
  useAirtableMeta: jest.fn(() => ({
    airtableMeta: {
      getAirtableRecord: jest.fn(),
    },
  })),
}))

describe('useFormHandlers', () => {
  it('Returns interaction log handler form given interaction log form', () => {
    const { getFormHandler } = useFormHandlers()
    const mockForm = { name: 'Interaction log' }
    const handler = getFormHandler(mockForm as any)
    expect(handler.getMockName()).toEqual(
      mockHandleCreateInteraction.getMockName()
    )
  })

  it('Returns hnos form handler form given hnos form', () => {
    const { getFormHandler } = useFormHandlers()
    const mockForm = { name: 'Appointments' }
    const handler = getFormHandler(mockForm as any)
    expect(handler.getMockName()).toEqual(
      mockHandleHNOSFormSubmission.getMockName()
    )
  })

  it('Returns vitals form handler form given vitals form', () => {
    const { getFormHandler } = useFormHandlers()
    const mockForm = { name: 'Vitals' }
    const handler = getFormHandler(mockForm as any)
    expect(handler.getMockName()).toEqual(
      mockHandleCreateVitalsReading.getMockName()
    )
  })

  it('Returns blood pressure form handler form given blood pressure form', () => {
    const { getFormHandler } = useFormHandlers()
    const mockForm = { name: 'Member Feedback' }
    const handler = getFormHandler(mockForm as any)
    expect(handler.getMockName()).toEqual(
      mockHandleCreateMemberFeedback.getMockName()
    )
  })

  it('Returns member feedback form handler form given member feedback form', () => {
    const { getFormHandler } = useFormHandlers()
    const mockForm = { name: 'Member Feedback' }
    const handler = getFormHandler(mockForm as any)
    expect(handler.getMockName()).toEqual(
      mockHandleCreateMemberFeedback.getMockName()
    )
  })
})
