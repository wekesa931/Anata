import { gql } from '@apollo/client'

export const SAVE_FCM_TOKEN = gql`
  mutation registerToken($identifier: String!, $token: String!) {
    registerToken(identifier: $identifier, token: $token) {
      status
    }
  }
`
