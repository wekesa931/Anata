import React, { useState } from 'react'
import PhoneField from 'src/components/forms/fields/phone-field'
import { Check, X } from 'react-feather'
import { isPhoneValid } from 'src/utils/form-validation-methods'
import { useGetMemberByPhone } from 'src/modules/member/services/member.api'
import { logError } from 'src/utils/logging/logger'
import VerificationLoader from 'src/components/loaders/verification-loader'
import ErrorFeedback from 'src/components/feedbacks/error'

type PhoneNumberSearchProps = {
  setResponse: (response: any, phone: string) => void
  setIsEdited: (isEdited: boolean) => void
  showForm: boolean
  setShowForm: (showForm: boolean) => void
  isFetching: boolean
  setIsFetching: (isFetching: boolean) => void
  name?: string
  phone: string
  fullWidth?: boolean
  required?: boolean
  currentPhones?: string[]
}

export function PhoneNumberSearch({
  setResponse,
  setIsEdited,
  showForm,
  setShowForm,
  isFetching,
  setIsFetching,
  name = 'phone',
  phone,
  fullWidth = false,
  required = true,
  currentPhones = [],
}: PhoneNumberSearchProps) {
  const [phoneFound, setPhoneFound] = useState<boolean | undefined>()
  const { getMemberByPhone } = useGetMemberByPhone()
  const [hasError, setHasError] = useState<boolean>(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string>('')

  const isValid = isPhoneValid(phone)

  const searchMemberByPhone = React.useCallback(async () => {
    setIsFetching(true)
    setHasError(false)
    setFeedbackMessage('')
    if (isValid) {
      const phoneExists = currentPhones.some((p) => p === phone)
      if (phoneExists) {
        setPhoneFound(true)
        setFeedbackMessage('We have this phone number in the current form.')
        setResponse(null, phone)
        setShowForm(true)
        setIsFetching(false)
        return
      }
      getMemberByPhone(phone)
        .then((member) => {
          if (member) {
            setResponse(member, phone)
            setPhoneFound(true)
            setFeedbackMessage('We have a member with this phone number.')
          } else {
            setPhoneFound(false)
            setResponse(null, phone)
          }

          setShowForm(true)
        })
        .catch((err) => {
          setHasError(true)
          logError(err)
          setShowForm(false)
        })
        .finally(() => {
          setIsFetching(false)
        })
    } else {
      setIsFetching(false)
      setPhoneFound(false)
      setShowForm(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone])

  return (
    <div className="flex flex-col gap-4 w-full">
      <PhoneField
        name={name}
        label="Phone Number"
        required={required}
        handleBlur={searchMemberByPhone}
        handleChange={() => {
          setIsEdited(true)
          setPhoneFound(undefined)
        }}
        autoFocus
      />
      {isFetching ? (
        <VerificationLoader
          fullwidth={fullWidth}
          message="Please wait while we check if this phone number already exists in our database..."
        />
      ) : (
        <>
          {hasError ? (
            <ErrorFeedback message="Could not verify phone details. Please try again" />
          ) : (
            <div className={`mb-4 ${fullWidth ? ' w-[200%]' : 'w-full'}`}>
              {phoneFound === false && isValid && showForm && (
                <div className="p-2 bg-green-10 flex justify-start items-center rounded-lg mb-4 gap-4">
                  <Check className="w-[20px] text-green-100" />
                  <div className="text-dark-blue-100 text-base font-rubik">
                    <h3 className=" font-medium">All Good!</h3>
                    <p>Please proceed.</p>
                  </div>
                </div>
              )}

              {!!phoneFound && isValid && showForm && (
                <div className="p-2 bg-red-10 flex justify-start items-center rounded-lg mb-4 gap-4">
                  <X className="w-[20px] text-red-100" />
                  <div className="text-dark-blue-100 text-base font-rubik">
                    <h3 className=" font-medium">Heads up!</h3>
                    <p>{feedbackMessage}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PhoneNumberSearch
