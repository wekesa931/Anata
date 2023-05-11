import { gql } from '@apollo/client'

export const GLOBAL_SEARCH = gql`
  query globalSearch(
    $table: String!
    $field: String!
    $searchParam: String!
    $antaraIdKey: String!
    $antaraIdValue: String!
  ) {
    globalSearch(
      table: $table
      field: $field
      searchParam: $searchParam
      antaraIdKey: $antaraIdKey
      antaraIdValue: $antaraIdValue
    )
  }
`

export const OPTIMIZED_SEARCH = gql`
  query optimizedSearch($keyword: String!, $table: String!) {
    optimizedSearch(keyword: $keyword, table: $table)
  }
`

export const GET_DOCUMENT_OPENSEARCH = gql`
  query docDetails($index: String!, $docId: String!) {
    docDetails(index: $index, docId: $docId) {
      message
      data {
        id
        name
      }
      status
    }
  }
`

export const SEARCH_MEMBERS = gql`
  query memberSearch($query: String!) {
    membersSearch(query: $query) {
      edges {
        node {
          antaraId
          birthDate
          details {
            fullName
            airtableRecordId
            sex {
              sex
            }
          }
          status {
            employer {
              name
            }
          }
        }
      }
    }
  }
`
