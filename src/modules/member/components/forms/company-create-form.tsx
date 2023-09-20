import { Check, AlertCircle } from 'react-feather'
import { useCreateCompany } from 'src/modules/member/services/member.api'
import React, { useState } from 'react'
import ErrorFeedback from 'src/components/feedbacks/error'
import PrimaryButton from 'src/components/buttons/primary'
import VerificationLoader from 'src/components/loaders/verification-loader'

type ReturnEmptyProps = {
  onMissingCompanySaved: (companyName: string) => void
  missingEmployer: string
}

function CreateMissingCompany({
  onMissingCompanySaved,
  missingEmployer,
}: ReturnEmptyProps) {
  const { createCompany, loading: creatingCompany } = useCreateCompany()

  const [visibleCreateError, setVisibleCreateError] = useState<boolean>(false)
  const [successVisible, setSuccessVisible] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const [createCompanyLoading, setCreateCompanyLoading] =
    useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const [submitting, setSubmitting] = useState<boolean>(false)

  function DefaultComponent() {
    return (
      <>
        <HeadsUp />
        <PrimaryButton
          type="submit"
          fullWidth
          className="bg-orange-100 hover:bg-orange-100"
          loading={submitting || createCompanyLoading || creatingCompany}
          onClick={() => {
            setSubmitting(true)
            handleSubmitData()
          }}
        >
          Add Employer
        </PrimaryButton>
      </>
    )
  }

  function SuccessMessage() {
    return (
      <div className="bg-green-10 rounded-lg p-2 flex justify-start items-center gap-4 mb-2">
        <Check size={24} className="text-green-100" />
        <div className="font-rubik text-dark-blue-100 text-base">
          <h2 className="font-medium">Success!</h2>
          <p>The employer was successfully added</p>
        </div>
      </div>
    )
  }

  function HeadsUp() {
    return (
      <div className="p-2 bg-red-10 flex justify-start items-center rounded-lg mb-4 gap-4 border-black">
        <AlertCircle className="w-[20px] text-black-100" />
        <div className="text-dark-blue-100 text-base font-rubik">
          <h3 className=" font-medium">Employer not found</h3>
          <p>
            Make sure you enter full official name correctly so that your
            colleagues can easily find the employer
          </p>
        </div>
      </div>
    )
  }

  const handleSubmitData = async () => {
    setSubmitting(true)
    setError('')
    setCreateCompanyLoading(true)
    return createCompany(missingEmployer)
      .then((res: any) => {
        setCreateCompanyLoading(false)
        setSuccess(true)
        setTimeout(() => {
          onMissingCompanySaved(res?.data?.createCompany?.data?.name)
          setSuccess(false)
        }, 3000)
        setSuccessVisible(true)
      })
      .catch((err: any) => {
        setError(err.message)
        setVisibleCreateError(true)
      })
      .finally(() => {
        setSubmitting(false)
        setCreateCompanyLoading(false)
      })
  }

  return (
    <div className="flex flex-col">
      {!submitting && !visibleCreateError && !successVisible && (
        <DefaultComponent />
      )}
      {submitting && (
        <VerificationLoader
          fullwidth={false}
          message="Please wait as we add the employer"
        />
      )}
      {visibleCreateError && <ErrorFeedback message={error} />}
      {success && <SuccessMessage />}
    </div>
  )
}

export default CreateMissingCompany
