import { gql } from '@apollo/client'

export const MEMBER_DETAILS_QUERY = gql`
  query members($antaraId: String) {
    members(antaraId: $antaraId) {
      edges {
        node {
          antaraId
          birthDate
          details {
            fullName
            firstName
            middleName
            lastName
            intercomUrl
            intercomRecordId
            intercomUserId
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
            assignedHn
            assignedHnFullName
            readyForCompanyOnboarding
            readyForIndividualOnboarding
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
              poBoxNumber
              postCode
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
      }
    }
  }
`

export const UPDATE_MEMBER_DETAILS = gql`
  mutation UpdateMemberDetails(
    $memberDetails: UpdateMemberDetailsInput
    $memberContact: UpdateMemberContactInput
    $memberInsurance: UpdateMemberInsuranceInput
    $memberPhones: UpdateMemberPhonesInput
    $memberStaff: UpdateMemberStaffInput
    $memberStatus: MemberStatusUpdateInput
    $memberAddress: UpdateMemberAddressesInput
  ) {
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
      }
      errors
      message
      status
    }
    updateMemberStaff(input: $memberStaff) {
      data {
        assignedHn
        assignedMe
      }
      errors
      message
      status
    }
    updateMemberDetails(input: $memberDetails) {
      data {
        member {
          id
        }
        details {
          firstName
          lastName
        }
      }
      errors
      message
      status
    }

    updateMemberContact(input: $memberContact) {
      data {
        email
        emergencyContactName
        emergencyContactPhone
        emergencyContactRelationship
      }
      errors
      status
      message
    }

    updateMemberInsurance(input: $memberInsurance) {
      data {
        insuranceDetails {
          insuranceCompany {
            name
          }
          insuranceId
          priority
          memberPolicy {
            healthPolicy {
              name
            }
          }
        }
      }
      message
      errors
      status
    }

    updateMemberPhones(input: $memberPhones) {
      data {
        phones {
          priority
          phoneType {
            phoneType
          }
          phone
        }
      }
      errors
      message
      status
    }
  }
`

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
