import { gql } from '@apollo/client'

const GET_FILES = gql`
  query files(
    $antaraId: String!
    $category: String
    $updatedAt_Gte: DateTime
    $search: String
    $fileCategory_Name: String
    $mimeType: String
  ) {
    files(
      antaraId: $antaraId
      category: $category
      updatedAt_Gte: $updatedAt_Gte
      search: $search
      fileCategory_Name: $fileCategory_Name
      mimeType: $mimeType
    ) {
      edges {
        node {
          id
          driveUrl
          category
          title
          storageKey
          antaraId
          description
          addedBy
          mimeType
          fileSize
          otherMetadata
          fileCategory {
            name
          }
          createdAt
          updatedAt
          sharedfileSet {
            edges {
              node {
                createdAt
                updatedAt
                member {
                  antaraId
                  fullName
                }
                sharedBy
                folder {
                  name
                }
                read
                readAt
              }
            }
          }
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

const GET_FOLDERS = gql`
  query folders {
    folders {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

const SHARE_FILE = gql`
  mutation shareFile($antaraId: String!, $fileId: ID!, $folderId: ID!) {
    shareFile(antaraId: $antaraId, fileId: $fileId, folderId: $folderId) {
      errors
      message
      status
      sharedFile
    }
  }
`

const GET_FILE_CATEGORIES = gql`
  query fileCategories {
    fileCategories {
      edges {
        node {
          name
          description
          id
        }
      }
    }
  }
`

export {
  GET_FILES,
  ENCRYPT_FILE,
  GENERATE_FILE_LINK,
  UPLOAD_LINK,
  SAVE_FILE,
  GET_FOLDERS,
  SHARE_FILE,
  GET_FILE_CATEGORIES,
}
