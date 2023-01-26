import {
  MEMBER_CONTACT_DETAILS,
  LOOKUP_ENTRIES_QUERY,
  GET_INSURANCE_COMPANIES,
  MEMBER_DETAILS_QUERY,
  UPDATE_MEMBER_DETAILS,
} from '../src/gql/comms'
import { GET_ANTARA_STAFF } from '../src/gql/staff'
import { createMockClient } from 'mock-apollo-client'
import { SEARCH_MEMBERS } from '../src/gql/members'
import {
  mockInsuranceCompanies,
  mockLookups,
  mockStaff,
  mockv2Member,
  mockMutationSuccess,
  mockMutationError,
} from './comms.mock'

const mockClient = createMockClient()
mockClient.setRequestHandler(MEMBER_CONTACT_DETAILS, () =>
  Promise.resolve({
    data: {
      beneficiary: {
        edges: [
          {
            node: {
              status: 'ACTIVE',
              fullName: 'Julius Kuangrules Muithi',
              contactPhone1: '+254723731241',
              contactPhone2: '+254717579610',
              emergencyContactName: null,
              emergencyContactPhone1: null,
              emergencyContactPhone2: null,
              emergencyContactRelationship: null,
              dependents: [],
            },
          },
        ],
      },
    },
  })
)

mockClient.setRequestHandler(LOOKUP_ENTRIES_QUERY, () =>
  Promise.resolve({
    data: {
      ...mockLookups,
    },
  })
)

mockClient.setRequestHandler(GET_INSURANCE_COMPANIES, () =>
  Promise.resolve({
    data: {
      insuranceCompanies: {
        edges: mockInsuranceCompanies,
      },
    },
  })
)

mockClient.setRequestHandler(MEMBER_DETAILS_QUERY, () =>
  Promise.resolve({
    data: {
      members: {
        edges: [mockv2Member],
      },
    },
  })
)

mockClient.setRequestHandler(GET_ANTARA_STAFF, () =>
  Promise.resolve({
    data: {
      antaraStaff: {
        edges: mockStaff,
      },
    },
  })
)

const mutationHandler = jest
  .fn()
  .mockResolvedValueOnce(mockMutationError)
  .mockResolvedValueOnce(mockMutationSuccess)
  .mockResolvedValue(mockMutationSuccess)

mockClient.setRequestHandler(UPDATE_MEMBER_DETAILS, mutationHandler)

mockClient.setRequestHandler(SEARCH_MEMBERS, () =>
  Promise.resolve({
    data: {
      membersSearch: {
        edges: [
          {
            node: {
              antaraId: 'AAA-001',
              birthDate: '1990-01-01',
              details: {
                fullName: 'John Doe',
                airtableRecordId: 'rec123456789',
                sex: {
                  sex: 'Male',
                },
              },
              status: {
                employer: {
                  name: 'Employer',
                },
              }
            },
          },
        ],
      },
    },
  })
)

export default mockClient
