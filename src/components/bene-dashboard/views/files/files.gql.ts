import { gql } from '@apollo/client'

const GET_FILES = gql`
  query files(
    $antaraId: String!
    $category: String
    $updatedAt: DateTime
    $search: String
    $mimeType: String
  ) {
    files(
      antaraId: $antaraId
      category: $category
      updatedAt: $updatedAt
      search: $search
      mimeType: $mimeType
    ) {
      edges {
        node {
          id
          driveUrl
          category
          storageKey
          antaraId
          description
          addedBy
          mimeType
          fileSize
          otherMetadata
          storageKey
          recordId
          updatedAt
          title
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

const UPLOAD_LINK = gql`
  mutation generateUploadLink(
    $storageKey: String!
    $duration: Int!
    $forceReplace: Boolean!
  ) {
    generateUploadLink(
      storageKey: $storageKey
      duration: $duration
      forceReplace: $forceReplace
    ) {
      status
      message
      errors
      link
    }
  }
`

const SAVE_FILE = gql`
  mutation saveFile($input: FileInput!) {
    saveFile(input: $input) {
      message
      status
      data
      errors
    }
  }
`

export { GET_FILES, ENCRYPT_FILE, GENERATE_FILE_LINK, UPLOAD_LINK, SAVE_FILE }
