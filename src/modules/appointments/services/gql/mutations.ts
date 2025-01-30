import { gql } from '@apollo/client'

const SMART_RESULTS = gql`
  fragment SmartDetailsFragment on SmartVisitType {
    visitCode

    visitCodeVerifiedAt
    benefitsVerifiedAt
    claimSubmittedAt

    benefits {
      name
      type
      availableAmount
      limit
      utilization
    }

    policy {
      memberNumber
      otherNumber
      policyName
      insurerName
      memberType
    }

    claim
  }
`

const START_VISIT = gql`
  mutation StartVisit($input: StartVisitInput!) {
    startVisit(input: $input) {
      visit {
        ...SmartDetailsFragment
      }
    }
  }
  ${SMART_RESULTS}
`

const POST_CLAIM = gql`
  mutation PostVisitClaim($input: PostVisitClaimInput!) {
    postVisitClaim(input: $input) {
      visit {
        ...SmartDetailsFragment
      }
    }
  }
  ${SMART_RESULTS}
`

const RESEND_OTP = gql`
  mutation SendSmartOTP($input: SendOtpInput!) {
    sendOtp(input: $input) {
      visit {
        ...SmartDetailsFragment
      }
    }
  }
  ${SMART_RESULTS}
`

const CHECK_BENEFITS = gql`
  mutation CheckVisitBenefits($input: CheckVisitBenefitsInput!) {
    checkVisitBenefits(input: $input) {
      message {
        message
        code
      }
      visit {
        ...SmartDetailsFragment
      }
    }
  }
  ${SMART_RESULTS}
`

export { START_VISIT, CHECK_BENEFITS, RESEND_OTP, POST_CLAIM }
