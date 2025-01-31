import React, { useEffect, useState } from 'react'
import PrimaryButton from 'src/components/buttons/primary'
import numberWithCommas from 'src/components/utils/number-format'
import HorizontalPairButton from 'src/components/buttons/pair-button'
import { BenefitsType, useAppointmentsApi } from '../services/appointments.api'

function Benefits({
  benefits,
  bookingUrl,
  visitCode,
  onCancel,
}: {
  benefits: BenefitsType
  bookingUrl: string
  visitCode: string
  onCancel: () => void
}) {
  const [time, setTime] = useState(120)
  const [counterInitiator, setCounterInitiator] = useState(0)
  const [billingCode, setBillingCode] = useState<string>('')
  const {
    openCalendar,
    postClaim,
    resendSmartOtp,
    postingClaim,
    billingCodeError,
    resendingOtp,
  } = useAppointmentsApi()
  const title = benefits?.checkVisitBenefits.message.message
  const hasInadequateBalance =
    benefits?.checkVisitBenefits?.message?.code === 'INADEQUATE_OP_BALANCE'

  const onBillingCodeChange = (e) => {
    setBillingCode(e.target.value)
  }

  const initiateResendOtp = () => {
    if (time > 0) return
    setTime(120)
    resendSmartOtp(visitCode, 'BILLING')
    const newCount = counterInitiator + 1
    setCounterInitiator(newCount)
  }

  const onClaimPosting = () => {
    if (billingCode) {
      postClaim(visitCode, billingCode).then((res) => {
        if (res?.data?.postVisitClaim?.visit?.visitCode) {
          bookingUrl && openCalendar(bookingUrl)
          onCancel()
        }
      })
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => {
        if (t === 0) {
          clearInterval(timer)
          return 0
        }
        return t - 1
      })
    }, 1000)
  }, [counterInitiator])

  return (
    <div>
      <div
        className={`flex justify-center mt-4 mb-4 py-1 rounded ${
          hasInadequateBalance
            ? 'bg-red-10 border border-red-100'
            : 'bg-green-10 border border-green-100'
        }`}
      >
        <p
          className={`font-normal font-rubik text-xs ${
            hasInadequateBalance ? 'text-red-100' : 'text-green-100'
          }`}
        >
          {title}
        </p>
      </div>
      {hasInadequateBalance ? (
        <>
          <div className="flex justify-between">
            <p className="text-sm font-normal text-dark-blue-50">Benefits</p>
            <p className="text-sm font-normal text-dark-blue-50">
              Balance, KES
            </p>
          </div>
          <div className="max-h-80 overflow-scroll">
            {benefits?.checkVisitBenefits?.visit?.benefits?.map((b, i) => (
              <div className="flex justify-between my-3" key={i}>
                <p className="text-xs font-normal text-dark-blue-70">
                  {b.name}
                </p>
                <p className="text-xs font-normal text-dark-blue-100 capitalize">
                  {numberWithCommas(b.availableAmount)}
                  <span className="text-dark-blue-50">.00</span>
                </p>
              </div>
            ))}
          </div>
          <p className="my-2 text-sm font-normal text-dark-blue-50">
            Please inform the member
          </p>
          <HorizontalPairButton
            leftButton={{
              text: 'Exit',
              onClick: onCancel,
              variant: 'contained',
              className:
                'text-xs capitalize bg-dark-blue-10 text-dark-blue-50 shadow-none',
            }}
            rightButton={{
              text: 'Continue Anyway',
              onClick: onClaimPosting,
              variant: 'contained',
              className: `text-xs capitalize text-white ${
                postingClaim ? 'bg-dark-blue-10' : 'bg-blue-btn'
              }`,
              loading: postingClaim,
            }}
          />
        </>
      ) : (
        <>
          <p className="text-sm text-dark-blue-70 font-rubik text-xs">
            Now enter the SMART OTP code to successfully bill member
          </p>
          <p className="my-2 font-medium text-sm text-dark-blue-50 font-rubik text-xs">
            SMART OTP Code for billing{' '}
          </p>
          <input
            className={`text-sm border w-full h-8 rounded pl-2 ${
              billingCodeError ? 'border-red-100 bg-red-10 text-red-100' : ''
            }`}
            placeholder="Enter Otp"
            type="text"
            onChange={onBillingCodeChange}
          />
          {billingCodeError && (
            <p className="font-normal font-rubik text-xs text-red-100 mt-1">
              {billingCodeError}
            </p>
          )}
          <PrimaryButton
            disabled={resendingOtp}
            loading={resendingOtp}
            className="w-full border-dark-blue-10 capitalize text-dark-blue-50 mt-4"
            variant="outlined"
            onClick={initiateResendOtp}
          >
            Resend OTP{' '}
            {time > 0 && (
              <span className="text-dark-blue-100 ml-1 lowercase">
                in {time}
              </span>
            )}{' '}
          </PrimaryButton>
          <HorizontalPairButton
            leftButton={{
              text: 'Cancel',
              onClick: onCancel,
              variant: 'contained',
              className:
                'text-xs capitalize bg-dark-blue-10 text-dark-blue-50 shadow-none',
            }}
            rightButton={{
              text: 'Proceed',
              onClick: onClaimPosting,
              variant: 'contained',
              className: `text-xs capitalize text-white ${
                postingClaim ? 'bg-dark-blue-10' : 'bg-blue-btn'
              }`,
              loading: postingClaim,
            }}
          />
        </>
      )}
    </div>
  )
}

export default Benefits
