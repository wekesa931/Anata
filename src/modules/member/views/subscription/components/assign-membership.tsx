import React, { useState, useEffect } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import BillingFormComponent from 'src/modules/member/components/forms/billing/components/billing-method-form'
import type { DbValueTypes } from 'src/modules/member/types'
import { useMember } from 'src/context/member'

type InsuranceDetailsValues = DbValueTypes.InsuranceDetailsValues

type ViewProps = {
  setUnlimitedMembershipMode: (values: any) => void
  type: 'fee-for-service' | 'unlimited'
}
function AssignMembershipView({ setUnlimitedMembershipMode, type }: ViewProps) {
  const [initialValues, setInitialValues] = useState<InsuranceDetailsValues>(
    {} as InsuranceDetailsValues
  )
  const [successAlert, setSuccessAlert] = useState(false)
  const [billingMethod, setBillingMethod] = useState('')
  const { member } = useMember()

  const handleFormCompletion = () => {
    setSuccessAlert(true)
  }

  useEffect(() => {
    const values = member?.insurances
    setInitialValues(values as InsuranceDetailsValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  return (
    <div>
      {successAlert ? (
        <div className="bg-[#D6F7DB] rounded-md p-6 ">
          <h1 className="text-[#34C759] font-medium"> Consent Request sent </h1>
          <p>
            Please ask the member to provide consent for the new billing method{' '}
            <strong>{billingMethod}</strong>
          </p>
        </div>
      ) : (
        <div>
          <button
            className="mt-3 hover:bg-none flex items-center bg-none text-[#5D6B82] h-9 p-[5px] rounded capitalize font-medium"
            type="button"
            onClick={() => {
              setUnlimitedMembershipMode('benefits')
            }}
          >
            <ArrowBackIosIcon className="text-[#D1D5DB]" />
            Back
          </button>
          {Object.keys(initialValues).length > 0 && (
            <BillingFormComponent
              insuranceData={initialValues}
              member={member}
              handleFormCompletion={handleFormCompletion}
              type={type}
              setBillingMethod={setBillingMethod}
              setUnlimitedMembershipMode={setUnlimitedMembershipMode}
              primaryMember={undefined}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default AssignMembershipView
