import { useMutation } from '@apollo/client'
import { useMember } from 'src/context/member'
import { useState } from 'react'
import { useUser } from 'src/context/user'
import {
  CHECK_BENEFITS,
  POST_CLAIM,
  RESEND_OTP,
  START_VISIT,
} from './gql/mutations'

export type BenefitsType = {
  checkVisitBenefits: {
    message: {
      message: string
      code: 'ADEQUATE_OP_BALANCE' | 'INADEQUATE_OP_BALANCE'
    }
    visit: {
      visitCode: string
      benefits: {
        name: string
        type: string
        availableAmount: number
        limit: number
        utilization: number
      }[]
    }
  }
}

export const useAppointmentsApi = () => {
  const { member } = useMember()
  const user = useUser()

  const [memberBenefits, setMemberBenefits] = useState<BenefitsType | null>(
    null
  )
  const [visitCodeError, setVisitCodeError] = useState<string | null>(null)
  const [otpError, setOtpError] = useState<string | null>(null)
  const [billingCodeError, setBillingCodeError] = useState<string | null>(null)
  const [startVisitMutation, { loading: submittingVisitCode }] = useMutation(
    START_VISIT,
    {
      context: { clientName: 'v2' },
    }
  )
  const [resendOtp, { loading: resendingOtp }] = useMutation(RESEND_OTP, {
    context: { clientName: 'v2' },
  })

  const [checkBenefits, { loading: checkingMemberBenefits }] = useMutation(
    CHECK_BENEFITS,
    {
      context: { clientName: 'v2' },
    }
  )

  const [postVisitClaim, { loading: postingClaim }] = useMutation(POST_CLAIM, {
    context: { clientName: 'v2' },
  })

  const startVisit = (visitCode: string, servicePricingId: number) => {
    return startVisitMutation({
      variables: {
        input: {
          antaraId: member?.antaraId,
          visitCode,
          servicePricingId,
        },
      },
    })
      .then((res) => {
        return res
      })
      .catch((e) => {
        if (e.graphQLErrors[0]?.extensions?.fields) {
          setVisitCodeError(e.message)
        } else {
          throw new Error(e.message)
        }
      })
  }

  const postClaim = (visitCode: string, otp: string) => {
    return postVisitClaim({
      variables: {
        input: {
          antaraId: member?.antaraId,
          visitCode,
          otp,
        },
      },
    })
      .then((res) => {
        if (res?.data?.postVisitClaim?.visit?.visitCode) {
          return res
        }
        throw Error('Invalid code entered')
      })
      .catch((e) => {
        if (e.graphQLErrors[0]?.extensions?.fields) {
          setBillingCodeError(e.message)
        } else {
          throw new Error(e.message)
        }
      })
  }

  const checkMemberBenefits = (visitCode: string, otp: string) => {
    return checkBenefits({
      variables: {
        input: {
          antaraId: member?.antaraId,
          visitCode,
          otp,
        },
      },
    })
      .then((res) => {
        if (res?.data?.checkVisitBenefits?.visit?.visitCode) {
          setMemberBenefits(res?.data)
        } else {
          throw Error(
            "This code doesn't match. Click 'Resend OTP' to get a new code"
          )
        }
      })
      .catch((e) => {
        if (e.graphQLErrors[0]?.extensions?.fields) {
          setOtpError(e.message)
        } else {
          throw new Error(e.message)
        }
      })
  }

  const resendSmartOtp = (
    visitCode: string,
    otpType: 'BALANCES' | 'BILLING'
  ) => {
    return resendOtp({
      variables: {
        input: {
          antaraId: member?.antaraId,
          visitCode,
          otpType,
        },
      },
    }).catch((e) => {
      throw new Error(e.message)
    })
  }

  const openCalendar = (bookingUrl: string) => {
    const calendarUrl = bookingUrl || 'https://calendly.com/antara-health'
    if (member) {
      const fullName = member?.fullName || ''
      const urlName = fullName?.replace(' ', '%20')
      const email = member?.email || ''
      const memberEmail = email || 'navigation@antarahealth.com'
      const memberPhone = member?.phone
      const antaraId = member?.antaraId
      const link = `${calendarUrl}?name=${urlName}&email=${memberEmail}&a1=${memberPhone}&utm_source=src-${user?.name}&utm_content=${antaraId}`
      const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }
  }
  return {
    startVisit,
    checkMemberBenefits,
    submittingVisitCode,
    visitCodeError,
    memberBenefits,
    otpError,
    checkingMemberBenefits,
    resendingOtp,
    postingClaim,
    billingCodeError,
    postClaim,
    resendSmartOtp,
    openCalendar,
  }
}
