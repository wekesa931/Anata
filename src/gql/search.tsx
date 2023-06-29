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

export const MEMBERS_DETAILS_FRAGMENT = gql`
  fragment MemberDetailsFragment on MemberType {
    antaraId
    birthDate
    details {
      fullName
      firstName
      middleName
      lastName
      intercomUrl
      airtableRecordId
      sex {
        sex
      }
      maritalStatus {
        maritalStatus
      }
      relationshipToPrimary
      primaryMemberAntaraId
    }
    primary {
      antaraId
      birthDate
      status {
        status {
          status
        }
      }
      details {
        relationshipToPrimary
        fullName
        airtableRecordId
        sex {
          sex
        }
      }
      phones {
        phone
      }
    }
    phones {
      phone
      phoneType {
        phoneType
      }
      priority
    }
    status {
      startDate
      onboardStage {
        onboardStage
      }
      employer {
        name
      }
      businessLocation {
        businessLocationId
        name
      }
      department {
        departmentId
        name
      }
      assignedHn
      assignedHnFullName
      assignedMe
      assignedHnEmailUsername
      assignedMeEmailUsername
      tags
      status {
        status
      }
    }
    dependents {
      id
      antaraId
      birthDate
      status {
        status {
          status
        }
      }
      details {
        fullName
        sex {
          sex
        }
        relationshipToPrimary
        airtableRecordId
      }
      phones {
        phone
      }
    }
    otherDependents {
      id
      antaraId
      birthDate
      status {
        status {
          status
        }
      }
      details {
        fullName
        sex {
          sex
        }
        relationshipToPrimary
        airtableRecordId
      }
      phones {
        phone
      }
    }
    contact {
      memberAddresses {
        constituency
        residentialAddress
        residentialCountry
        residentialCounty
        subCounty
        residentialTown
        deliveryInstructions
        geolocation
        label
        latitude
        longitude
      }
      email
      emergencyContactName
      emergencyContactPhone
      emergencyContactRelationship
    }
    insuranceDetails {
      id
      insuranceId
      priority
      principalMemberInsuranceId
      relationshipToPrincipalMember
      verificationStatus
      insuranceCompany {
        id
        name
        logo
      }
      memberPolicy {
        healthPolicy {
          name
        }
      }
      benefitUtilizations {
        id
        utilizedPortion
        benefit {
          name
          description
          api
          limit
        }
      }
    }
  }
`

export const SEARCH_MEMBERS = gql`
  query memberSearch($query: String!) {
    membersSearch(query: $query) {
      edges {
        node {
          ...MemberDetailsFragment
        }
      }
    }
  }
  ${MEMBERS_DETAILS_FRAGMENT}
`
