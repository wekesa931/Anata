import { MEMBER_CONTACT_DETAILS } from '../src/gql/comms'
import { createMockClient } from 'mock-apollo-client'

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

export default mockClient
