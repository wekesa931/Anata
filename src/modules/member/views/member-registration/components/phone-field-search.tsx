import React, { useState } from 'react'
import PhoneField from 'src/components/forms/fields/phone-field'
import { useFormikContext } from 'formik'
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
}

export function PhoneNumberSearch({
  setResponse,
  setIsEdited,
  showForm,
  setShowForm,
  isFetching,
  setIsFetching,
}: PhoneNumberSearchProps) {
  const { values }: { values: any } = useFormikContext()
  const [phoneFound, setPhoneFound] = useState<boolean | undefined>()
  const { getMemberByPhone } = useGetMemberByPhone()
  const [hasError, setHasError] = useState<boolean>(false)

  const isValid = isPhoneValid(values.phone)

  const searchMemberByPhone = React.useCallback(async () => {
    setIsFetching(true)
    setHasError(false)
    if (isValid) {
      getMemberByPhone(values.phone)
        .then((member) => {
          if (member) {
            setResponse(member, values.phone)
            setPhoneFound(true)
          } else {
            setPhoneFound(false)
            setResponse(null, values.phone)
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
  }, [values.phone])

  return (
    <div className="flex flex-col gap-4 w-full">
      <PhoneField
        name="phone"
        label="Phone Number"
        required
        handleBlur={searchMemberByPhone}
        handleChange={() => {
          setIsEdited(true)
          setPhoneFound(undefined)
        }}
      />
      {isFetching ? (
        <VerificationLoader message="Please wait while we check if this phone number already exists in our database..." />
      ) : (
        <>
          {hasError ? (
            <ErrorFeedback message="Could not verify phone details. Please try again" />
          ) : (
            <div className="mb-4">
              {phoneFound === false && isValid && showForm && (
                <div className="p-2 bg-green-10 flex justify-start items-center rounded-lg mb-4 gap-4">
                  <Check className="w-[20px] text-green-100" />
                  <div className="text-dark-blue-100 text-base font-rubik">
                    <h3 className=" font-medium">All Good!</h3>
                    <p>Please proceed with the rest of the member details</p>
                  </div>
                </div>
              )}

              {!!phoneFound && isValid && showForm && (
                <div className="p-2 bg-red-10 flex justify-start items-center rounded-lg mb-4 gap-4">
                  <X className="w-[20px] text-red-100" />
                  <div className="text-dark-blue-100 text-base font-rubik">
                    <h3 className=" font-medium">Heads up!</h3>
                    <p>
                      We have a member with this phone number. Please check
                      their details below and update them if need be.
                    </p>
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
