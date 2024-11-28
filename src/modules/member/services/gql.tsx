import { MEMBERS_DETAILS_FRAGMENT } from 'src/gql/search'
import { composeMutations } from 'src/modules/member/utils/apollo-compose'
import { gql } from '@apollo/client'

export const MEMBER_DETAILS_QUERY = gql`
  query members($antaraId: String) {
    members(antaraId: $antaraId) {
      edges {
        node {
          ...MemberDetailsFragment
        }
      }
    }
  }
  ${MEMBERS_DETAILS_FRAGMENT}
`

export const GET_MEMBER_BY_PHONE = gql`
  query membersWithPhone($phoneNumber: String!) {
    membersWithPhone(phoneNumber: $phoneNumber) {
      edges {
        node {
          ...MemberDetailsFragment
        }
      }
    }
  }
  ${MEMBERS_DETAILS_FRAGMENT}
`

export const UPDATE_MEMBER_ADDRESSES = gql`
  mutation UpdateMemberAddresses($memberAddress: UpdateMemberAddressesInput) {
    updateMemberAddress(input: $memberAddress) {
      data {
        addresses {
          constituency
          geolocation
          residentialAddress
          label
          deliveryInstructions
        }
      }
      message
      errors
      status
    }
  }
`

export const UPDATE_MEMBER_STATUS = gql`
  mutation UpdateMemberStatus($memberStatus: MemberStatusUpdateInput) {
    updateMemberStatus(input: $memberStatus) {
      data {
        employer {
          name
        }
        status {
          status
        }
        onboardStage {
          onboardStage
        }
        tags
        refusedServices
      }
      errors
      message
      status
    }
  }
`

export const UPDATE_MEMBER_STAFF = gql`
  mutation UpdateMemberStaff($memberStaff: UpdateMemberStaffInput) {
    updateMemberStaff(input: $memberStaff) {
      data {
        assignedHn
        assignedMe
      }
      errors
      message
      status
    }
  }
`

export const UPDATE_MEMBER_DETAILS = gql`
  mutation UpdateMemberDetails($memberDetails: UpdateMemberDetailsInput) {
    updateMemberDetails(input: $memberDetails) {
      data {
        member {
          id
        }
        details {
          firstName
          lastName
          middleName
          kenyaNationalId
          nhifNumber
        }
      }
      errors
      message
      status
    }
  }
`

export const UPDATE_MEMBER_CONTACT = gql`
  mutation UpdateMemberContact($memberContact: UpdateMemberContactInput) {
    updateMemberContact(input: $memberContact) {
      data {
        email
        emergencyContactName
        emergencyContactPhone
        emergencyContactRelationship
        caregiverName
        caregiverNumber
      }
      errors
      status
      message
    }
  }
`

export const UPDATE_MEMBER_INSURANCE = gql`
  mutation UpdateMemberInsurance($memberInsurance: UpdateMemberInsuranceInput) {
    updateMemberInsurance(input: $memberInsurance) {
      data {
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
      message
      errors
      status
    }
  }
`

export const UPDATE_MEMBER_PHONES = gql`
  mutation UpdateMemberPhones($memberPhones: UpdateMemberPhonesInput) {
    updateMemberPhones(input: $memberPhones) {
      data {
        phones {
          priority
          phoneType {
            phoneType
          }
          phone
          lastUsedToAccessApp
        }
      }
      errors
      message
      status
    }
  }
`
export const CREATE_COMPANY = gql`
  mutation createCompany($input: CompanyInput!) {
    createCompany(input: $input) {
      data {
        companyCategory {
          category
        }
        name
      }
      message
      status
      errors
    }
  }
`

export const UPDATE_MEMBER = composeMutations(
  UPDATE_MEMBER_ADDRESSES,
  UPDATE_MEMBER_STATUS,
  UPDATE_MEMBER_STAFF,
  UPDATE_MEMBER_DETAILS,
  UPDATE_MEMBER_CONTACT,
  UPDATE_MEMBER_INSURANCE,
  UPDATE_MEMBER_PHONES
)

export const MEMBER_CONTACT_DETAILS = gql`
  query beneficiary($antaraId: String!) {
    beneficiary(antaraId: $antaraId) {
      edges {
        node {
          status
          fullName
          contactPhone1
          contactPhone2
          emergencyContactName
          emergencyContactPhone1
          emergencyContactPhone2
          emergencyContactRelationship
          caregiverName
          caregiverNumber
          memberType
          primary {
            fullName
            airtableRecordId
            status
            contactPhone1
            contactPhone2
            relationshipToPrimary
            birthDate
            sex
          }
          dependents {
            airtableRecordId
            fullName
            status
            contactPhone1
            contactPhone2
            relationshipToPrimary
            birthDate
            sex
          }
          kenyaNationalId
          nhifNumber
          employerName
          intercomUrl
          lastConsentReminder
        }
      }
    }
  }
`

export const GET_TERMS_CONDITIONS = gql`
  query termsAndConditions($antaraId: String!) {
    termsAndConditions(antaraId: $antaraId) {
      edges {
        node {
          id
          summary
          version
          policyLink
          websiteLink
          accepted
          type
        }
      }
    }
  }
`

export const CREATE_MEMBER = gql`
  mutation createMember($memberRosterId: Int) {
    createMember(memberRosterId: $memberRosterId) {
      message
      status
      data {
        antaraId
      }
    }
  }
`

export const MEMBER_COHORT = gql`
  query memberCohorts($antaraId: String!) {
    memberCohorts(antaraId: $antaraId) {
      edges {
        node {
          id
          billingStartedAt
          name
          optedInAt
          optedOutAt
          isOptInRequired
          subscriptionStatus
          skuRate
          nextBilledAt
          billingFrequency
          billingMethod {
            name
            description
          }
          servicePricing {
            price
            service {
              name
            }
          }
          activatedAt
          activatedBy
          pausedAt
          pausedBy
          cancelledAt
          cancelledBy
          remarks {
            remark
          }
          billingEvents {
            amount
            billingPeriodStartDate
            billingPeriodEndDate
            createdAt
          }
          cohortId
          uuid
          revenueModelName
          billingPackage {
            name
            billingPackageId
            isFfs
            isOneDayHealthCamp
            isUnlimitedMembership
          }
          payor {
            payorName
          }
        }
      }
    }
  }
`
export const PROSPECTIVE_MEMBER_COHORT = gql`
  query prospectiveBillingSchemesForMember($antaraId: String!) {
    prospectiveBillingSchemesForMember(antaraId: $antaraId) {
      edges {
        node {
          id
          name
          billingSchemeId
          billingPackage {
            name
            billingPackageId
            isFfs
            isOneDayHealthCamp
            isUnlimitedMembership
          }
          servicePricing {
            price
            service {
              name
            }
          }
          billingMethod {
            name
            description
          }
        }
      }
    }
  }
`
export const ADD_MEMBER_COHORT = gql`
  mutation addMemberCohortAssignment($input: MemberCohortAssignmentInput!) {
    addMemberCohortAssignment(input: $input) {
      memberCohort {
        id
        name
        memberAntaraId
        subscriptionStatus
        cohortId
      }
      errors
      status
      message
    }
  }
`

export const UPDATE_MEMBER_COHORT = gql`
  mutation updateMemberCohortAssignment($input: MemberCohortUpdateInput!) {
    updateMemberCohortAssignment(input: $input) {
      memberCohort {
        id
        name
        memberAntaraId
        subscriptionStatus
        cohortId
      }
      errors
      status
      message
    }
  }
`
export const ACCEPT_BILLING_PACKAGE_ENROLLMENT = gql`
  mutation acceptBillingPackageEnrollment(
    $input: BillingPackageEnrollmentAcceptanceInput!
  ) {
    acceptBillingPackageEnrollment(input: $input) {
      data {
        billingPackage {
          id
          name
          isFfs
          isUnlimitedMembership
          isOneDayHealthCamp
          billingPackageId
        }
      }
      errors
      status
      message
    }
  }
`
export const DECLINE_BILLING_PACKAGE_ENROLLMENT = gql`
  mutation declineBillingPackageEnrollment(
    $input: BillingPackageEnrollmentRefusalInput!
  ) {
    declineBillingPackageEnrollment(input: $input) {
      data {
        billingPackage {
          id
          name
          isFfs
          isUnlimitedMembership
          isOneDayHealthCamp
          billingPackageId
        }
      }
      errors
      status
      message
    }
  }
`

export const SWITCH_BILLING_PACKAGE = gql`
  mutation switchBillingPackage($input: BillingPackageSwitchingInput!) {
    switchBillingPackage(input: $input) {
      data {
        billingPackage {
          id
          name
          isFfs
          isUnlimitedMembership
          isOneDayHealthCamp
          billingPackageId
        }
      }
      errors
      status
      message
    }
  }
`
