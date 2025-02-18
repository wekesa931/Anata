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

export const MEMBER_SEARCH_RESULTS = gql`
  fragment MemberSearchFragment on MemberType {
    antaraId
    birthDate
    details {
      fullName
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
`

export const MEMBERS_DETAILS_FRAGMENT = gql`
  fragment MemberDetailsFragment on MemberType {
    antaraId
    birthDate
    lastSeen
    healthStatus
    eligibleForServices
    activeBillingPackageEnrollment {
      billingPackage {
        name
        billingPackageId
        isFfs
        isOneDayHealthCamp
        isUnlimitedMembership
      }
      billingSchemeSubscription {
        nextBilledAt
        subscriptionStatus
        billingScheme {
          billingSchemeId
          name
          status
          billingFrequency
          billingMethod {
            name
            description
            memberFacingText
          }
          billingPackage {
            billingPackageId
            name
            isFfs
            isUnlimitedMembership
            isOneDayHealthCamp
          }
          payor {
            hasFfsBillingSchemes
            hasUnlimitedMembershipBillingSchemes
            payorName
          }
          skuRate
          servicePricing {
            servicePricingId
            service {
              name
              userFriendlyName
              bookingUrl
              appointmentType
              initials
              eligibleForFfs
            }
            price
          }
          claimMethod {
            claimMethodId
            name
          }
        }
      }
    }
    pendingBillingPackageEnrollment {
      name
      billingPackageId
      isFfs
      isOneDayHealthCamp
      isUnlimitedMembership
    }
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
      referralSource
      registrationChannel {
        name
      }
      kenyaNationalId
      nhifNumber
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
        kenyaNationalId
        nhifNumber
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
      lastUsedToAccessApp
    }
    status {
      startDate
      onboardStage {
        onboardStage
      }
      verificationStatus
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
      assignedMeObject {
        fullName
        emailUsername
        atRecordId
      }
      assignedHnObject {
        fullName
        emailUsername
        atRecordId
      }
      assignedNutritionistObject {
        fullName
        emailUsername
        atRecordId
      }
      tags
      status {
        status
      }
      refusedServices
      otherRefusedService
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
      caregiverName
      caregiverNumber
    }
    insuranceDetails {
      id
      insuranceId
      priority
      principalMemberInsuranceId
      relationshipToPrincipalMember
      verificationStatus
      reasonForVerificationFailure
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
    payor {
      payorName
      payorKey
      payorPhone
      payorType {
        payorType
      }
      payorStatus {
        payorStatus
      }
    }
    rosterMember {
      rosterMemberId
      antaraStatus
      birthDate
      corporateId
      dependents {
        rosterMemberId
        antaraStatus
        birthDate
        email
        fullName
        relationshipToPrinciple
        emergencyContactName
        emergencyContactPhone
        emergencyContactRelationship
        principalMemberBranch
        principalMemberDepartment
        employer {
          name
        }
        insuranceId
        insuranceCompany {
          name
        }
        onboardingStage
        phoneNumber
        principalMember {
          insuranceId
        }
        tags
        v2Member {
          antaraId
          birthDate
        }
        sex
      }
      email
      v2Member {
        antaraId
        birthDate
      }
      insuranceCompany {
        code
        name
      }
      relationshipToPrinciple
    }
  }
`

export const SEARCH_MEMBERS_FULL = gql`
  query memberSearch($query: String!) {
    membersSearch(query: $query, first: 10) {
      edges {
        node {
          ...MemberDetailsFragment
        }
      }
    }
  }
  ${MEMBERS_DETAILS_FRAGMENT}
`

export const SEARCH_MEMBERS = gql`
  query memberSearch($query: String!) {
    membersSearch(query: $query, first: 10) {
      edges {
        node {
          ...MemberSearchFragment
        }
      }
    }
  }
  ${MEMBER_SEARCH_RESULTS}
`
