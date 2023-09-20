import { logError } from 'src/utils/logging/logger'
import { removeEmptyValues } from 'src/utils/data-transform'
import { useVitalsUpdate } from './vitals.update.hook'

const mockUseMember = jest.fn()
mockUseMember.mockReturnValue({ member: { antaraId: '123' } })
jest.mock('src/context/member', () => ({
  useMember: () => mockUseMember(),
}))

const mockCreateVitalReadings = jest.fn()
const mockCreateBloodPressureReadings = jest.fn()
const mockCreateCholesterolReadings = jest.fn()
const mockCreateDmReadings = jest.fn()

jest.mock('src/modules/vitals/services/vitals.api', () => ({
  useCreateVitalsReadingApi: () => ({
    createVitalReadings: mockCreateVitalReadings,
    loading: false,
  }),
  useCreateBloodPressureReadingApi: () => ({
    createBloodPressureReadings: mockCreateBloodPressureReadings,
    loading: false,
  }),
  useCreateCholesterolReadingApi: () => ({
    createCholesterolReadings: mockCreateCholesterolReadings,
    loading: false,
  }),
  useCreateDMReadingApi: () => ({
    createDMReadings: mockCreateDmReadings,
    loading: false,
  }),
}))

jest.mock('src/utils/logging/logger', () => ({
  logError: jest.fn(),
}))

jest.mock('src/utils/data-transform', () => ({
  removeEmptyValues: jest.fn().mockImplementation((data) => data),
}))

jest.mock('src/modules/vitals/utils/data-transforms/input-transforms', () => ({
  mapFormInputToVitalReadings: jest.fn().mockImplementation((data) => data),
  mapFormInputToBpReadings: jest.fn().mockImplementation((data) => data),
  mapFormInputToCholesterolReadings: jest
    .fn()
    .mockImplementation((data) => data),
}))

const cleanup = () => {
  jest.clearAllMocks()
}

afterEach(() => {
  cleanup()
})

/**
 * UseVitalsData static code analysis
 *
 * handleCreateVitalsReading
 * - takes in a form and form data
 * - transforms empty values into variables for the mutation
 * - removes any undefined values from the mutation variables
 * - calls the createVitalReadings mutation with the variables
 * - marks the form as completed
 * - if there is an error, logs the error and throws it back to the caller
 */
describe('useVitalsData test suite', () => {
  const formData = {
    temperature: 36.5,
    bloodPressure: '120/80',
    pulseRate: 80,
    antaraId: '123',
  }

  test('it handles creation of vitals reading', async () => {
    const { handleCreateVitalsReading } = useVitalsUpdate()
    await handleCreateVitalsReading(formData as any)

    expect(removeEmptyValues).toHaveBeenCalledWith(formData)
    expect(mockCreateVitalReadings).toHaveBeenCalledWith(formData)
  })

  test('it handles API error', async () => {
    const { handleCreateVitalsReading } = useVitalsUpdate()
    const error = new Error('API error')
    mockCreateVitalReadings.mockRejectedValue(error)

    await expect(handleCreateVitalsReading(formData as any)).rejects.toThrow(
      error
    )
    expect(logError).toHaveBeenCalledWith(error)
  })

  test('it handles missing member', async () => {
    mockUseMember.mockReturnValue({ member: null })
    const { handleCreateVitalsReading } = useVitalsUpdate()

    await expect(handleCreateVitalsReading(formData as any)).rejects.toThrow(
      'No member found'
    )

    // reset mock to restore original behavior
    mockUseMember.mockReturnValue({ member: { antaraId: '123' } })
  })

  test(' it handles creating bp reading', async () => {
    const { handleCreateBloodPressureReading } = useVitalsUpdate()
    await handleCreateBloodPressureReading(formData as any)

    expect(removeEmptyValues).toHaveBeenCalledWith(formData)
    expect(mockCreateBloodPressureReadings).toHaveBeenCalledWith(formData)
  })

  test('it creates cholesterol reading', async () => {
    const { handleCreateCholesterolReading } = useVitalsUpdate()
    await handleCreateCholesterolReading(formData as any)

    expect(removeEmptyValues).toHaveBeenCalledWith(formData)
    expect(mockCreateCholesterolReadings).toHaveBeenCalledWith(formData)
  })
})
