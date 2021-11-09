import { gql } from '@apollo/client'

const GET_FILES = gql`
  query ($antaraId: String!) {
    files(antaraId: $antaraId) {
      edges {
        node {
          id
          driveUrl
          title
          updatedAt
          category
          storageKey
          antaraId
          description
          addedBy
          mimeType
          fileSize
          otherMetadata
        }
      }
    }
  }
`

const ENCRYPT_FILE = gql`
  mutation encryptFile($fileId: String!, $password: String!) {
    encryptFile(fileId: $fileId, password: $password) {
      status
      message
      errors
      link
    }
  }
`

const GENERATE_FILE_LINK = gql`
  mutation generateLink($fileId: String!, $duration: Int!) {
    generateLink(fileId: $fileId, duration: $duration) {
      status
      message
      errors
      link
    }
  }
`

export { GET_FILES, ENCRYPT_FILE, GENERATE_FILE_LINK }
