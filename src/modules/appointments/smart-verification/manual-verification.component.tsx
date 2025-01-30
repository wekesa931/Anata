import React, { useEffect, useState } from 'react'
import { ServicePricingType } from 'src/modules/member/types'
import PrimaryButton from 'src/components/buttons/primary'
import { useAppointmentsApi } from '../services/appointments.api'
import Benefits from './benefits.component'
import HorizontalPairButton from 'src/components/buttons/pair-button'

function ManualVerification({
  selectedService,
  cancelSmartBilling,
}: {
  selectedService: ServicePricingType
  cancelSmartBilling: () => void
}) {
  const [time, setTime] = useState(120)
  const [counterInitiator, setCounterInitiator] = useState(0)
  const [visitCode, setVisitCode] = React.useState<string>('')
  const [visitCodeVerified, setVisitCodeVerified] =
    React.useState<boolean>(false)
  const [smartOtpCode, setSmartOtpCode] = React.useState<string>('')

  const {
    startVisit,
    checkMemberBenefits,
    resendSmartOtp,
    checkingMemberBenefits,
    resendingOtp,
    memberBenefits,
    submittingVisitCode,
    visitCodeError,
    otpError,
  } = useAppointmentsApi()

  const verifyVisitCode = () => {
    return startVisit(visitCode, selectedService?.servicePricingId).then(
      (res) => {
        if (res?.data?.startVisit?.visit?.visitCode) {
          setVisitCodeVerified(true)
        }
      }
    )
  }

  const verifyMemberBenefits = () => {
    if (smartOtpCode) {
      checkMemberBenefits(visitCode, smartOtpCode)
    }
  }

  const initiateResendOtp = () => {
    if (time > 0) return
    setTime(120)
    resendSmartOtp(visitCode, 'BALANCES').then(() => {
      const newCount = counterInitiator + 1
      setCounterInitiator(newCount)
    })
  }

  const onCancel = () => cancelSmartBilling()

  useEffect(() => {
    if (visitCodeVerified) {
      const timer = setInterval(() => {
        setTime((t) => {
          if (t === 0) {
            clearInterval(timer)
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
  }, [visitCodeVerified, counterInitiator])

  let Content = (
    <div>
      <p className="font-normal font-rubik text-xs text-dark-blue-70 mt-4 mb-4">
        Request the member to generate their visit code on the SMART app then
        enter it below
      </p>
      <p className="font-medium font-rubik text-sm text-dark-blue-70 mb-1">
        SMART Visit Code
      </p>
      <input
        value={visitCode}
        className={`text-sm border w-full h-8 rounded pl-2 ${
          visitCodeError ? 'border-red-100 bg-red-10 text-red-100' : ''
        }`}
        placeholder="Enter the code"
        type="text"
        onChange={(e) => setVisitCode(e.target.value)}
      />
      {visitCodeError && (
        <p className="font-normal font-rubik text-xs text-red-100 mt-1">
          {visitCodeError}
        </p>
      )}
      <HorizontalPairButton
        leftButton={{
          text: 'Cancel',
          onClick: onCancel,
          variant: 'contained',
          className:
            'text-xs capitalize bg-dark-blue-10 text-dark-blue-50 shadow-none',
        }}
        rightButton={{
          text: 'Validate Code',
          onClick: verifyVisitCode,
          variant: 'contained',
          className: `text-xs capitalize text-white ${
            submittingVisitCode ? 'bg-dark-blue-10' : 'bg-blue-btn'
          }`,
          loading: submittingVisitCode,
        }}
      />
    </div>
  )

  if (visitCodeVerified) {
    Content = (
      <div>
        <div className="bg-green-10 flex justify-center mt-4 mb-4 py-1 rounded">
          <p className="font-normal font-rubik text-xs text-green-100">
            Visit code validated successfully
          </p>
        </div>
        <p className="font-normal font-rubik text-xs text-dark-blue-70 mb-4">
          Now enter the SMART OTP code sent to the member
        </p>
        <p className="font-medium font-rubik text-sm text-dark-blue-70 mb-1">
          SMART OTP Code
        </p>
        <input
          value={smartOtpCode}
          className={`text-sm border w-full h-8 rounded pl-2 ${
            otpError ? 'border-red-100 bg-red-10 text-red-100' : ''
          }`}
          placeholder="Enter the code"
          type="text"
          onChange={(e) => setSmartOtpCode(e.target.value)}
        />
        {otpError && (
          <p className="font-normal font-rubik text-xs text-red-100 mt-1">
            This code doesn&apos;t match. Click &apos;Resend OTP&apos; to get a
            new code
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
            <span className="text-dark-blue-100 ml-1 lowercase">in {time}</span>
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
            onClick: verifyMemberBenefits,
            variant: 'contained',
            className: `text-xs capitalize text-white ${
              submittingVisitCode ? 'bg-dark-blue-10' : 'bg-blue-btn'
            }`,
            loading: checkingMemberBenefits,
          }}
        />
      </div>
    )
  }
  if (memberBenefits) {
    Content = (
      <Benefits
        benefits={memberBenefits}
        bookingUrl={selectedService?.service?.bookingUrl}
        visitCode={visitCode}
        onCancel={onCancel}
      />
    )
  }
  return <>{Content}</>
}

export default ManualVerification
