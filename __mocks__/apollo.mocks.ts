import { MEMBER_DETAILS_QUERY } from 'src/modules/member/services/gql'
import { GET_ALL_VITALS } from 'src/modules/vitals/services/gql'

import { createMockClient } from 'mock-apollo-client'

import { mockMember, mockStaffResponse } from './member.mock'
import { mockVitalsResponse } from './vitals.mock'
import { GET_ANTARA_STAFF } from 'src/gql/staff'

export const mockClient = createMockClient()

mockClient.setRequestHandler(MEMBER_DETAILS_QUERY, () =>
  Promise.resolve(mockMember)
)

mockClient.setRequestHandler(GET_ALL_VITALS, () =>
  Promise.resolve(mockVitalsResponse)
)

mockClient.setRequestHandler(GET_ANTARA_STAFF, () =>
  Promise.resolve(mockStaffResponse)
)

export const cleanup = () => {
  jest.clearAllMocks()
}
