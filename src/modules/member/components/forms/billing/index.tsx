import React, { useEffect, useState } from 'react'
import { useWizardContext } from 'src/components/wizard'
import type { Member } from 'src/modules/member/db/models'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import type { DbValueTypes, LookupOption } from 'src/modules/member/types'
import { logError } from 'src/utils/logging/logger'
import { useNotifications } from 'src/context/notifications'
import { useRegistrationForm } from 'src/context/member-registration'
import { getChanges, isDirty } from 'src/utils/form-validation-methods'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'
import FadeLoader from 'react-spinners/FadeLoader'
import InsuranceFormComponent from './components/insurance-form'
import BillingFormComponent from './components/billing-method-form'
import UserDetailsForm from './components/user-details-form'

type InsuranceDetailsValues = DbValueTypes.InsuranceDetailsValues

type InsuranceSectionProps = {
  setCompleted?: (completed: any, primaryMember?: any) => void
  member: Member | null
  primaryMember: Member | undefined
  showWizardControls?: boolean
  hasOnPrev?: boolean
  setProcessLoader?: (value: boolean) => void
  type?: string
  inEligibilityReasons?: Array<{ tag: string }>
  isRestrictedUser?: boolean
  setNextResctrictedPhase?: (value: boolean) => void
}

const defaultInsurance = (primaryMember: Member | undefined) => ({
  employer: {
    isPrimaryMember: !primaryMember,
    name: '',
    department: {
      departmentId: '',
      name: '',
    },
    businessLocation: {
      businessLocationId: '',
      name: '',
    },
  },
  insurances: [
    {
      insuranceCompany: primaryMember?.primaryInsuranceCompany || '',
      insuranceId: '',
      isPrincipalMember: primaryMember ? 'no' : 'yes',
      principalMemberInsuranceId: primaryMember?.primaryInsuranceId,
      relationshipToPrincipalMember: '',
      priority: 0,
      verificationStatus: 'rejected',
    },
  ],
  antaraId: '',
})

export default function InsuranceSectionForm(props: InsuranceSectionProps) {
  const { onPrev, onNext } = useWizardContext()

  return <InsuranceForm {...props} onPrev={onPrev} onNext={onNext} />
}

type InsuranceFormProps = InsuranceSectionProps & {
  onPrev?: () => void
  onNext: () => void
}

export function InsuranceForm({
  setCompleted,
  member,
  primaryMember,
  onPrev,
  onNext,
  showWizardControls = false,
  hasOnPrev = true,
  type = 'insurance-form',
  setProcessLoader,
  inEligibilityReasons = [],
  isRestrictedUser = false,
  setNextResctrictedPhase,
}: InsuranceFormProps) {
  const { handleUpdateInsuranceDetails, loading } = useRegistrationData()
  const { notify } = useNotifications()
  const { lookupOptions } = useRegistrationForm()
  const [initialValues, setInitialValues] = useState<InsuranceDetailsValues>(
    {} as InsuranceDetailsValues
  )
  const [businessLocations, setBusinessLocations] = useState<LookupOption[]>([])
  const [departments, setDepartments] = useState<LookupOption[]>([])
  const [userError, setUserError] = useState<string | null>(null)
  const analytics = useMemberAnalytics()
  const [billingEditMode, setBillingEditMode] = useState(false)
  const [alertState, setAlertState] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const [layoutName, setLayoutName] = useState(type)

  useEffect(() => {
    const values = member?.needsInsurancePreffil
      ? defaultInsurance(primaryMember)
      : member?.insurances
    setInitialValues(values as InsuranceDetailsValues)
    const employerName = values?.employer?.name
    setBusinessLookups(employerName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member, primaryMember])

  const checkBizAndInsuranceInfo = () => {
    const isInsuranceProvided = initialValues?.insurances?.some(
      (insurance: any) =>
        insurance?.insuranceCompany?.trim() && insurance?.insuranceId?.trim()
    )
    return initialValues?.employer?.name && isInsuranceProvided
  }

  const hasStatusOrAgeTag = () => {
    if (!inEligibilityReasons) {
      return false
    }
    return inEligibilityReasons.some((reason: any) =>
      ['status', 'age'].includes(reason.tag)
    )
  }

  const determineLayoutName = () => {
    if (hasStatusOrAgeTag()) {
      return 'user-details-form'
    }
    if (type === 'assign-billing' && !checkBizAndInsuranceInfo()) {
      return 'insurance-form'
    }
    return type
  }

  useEffect(() => {
    setLayoutName(determineLayoutName())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, initialValues, inEligibilityReasons])

  const needToUpdateBillingMethod = (values: any) => {
    const changes = getChanges(initialValues, values)
    return 'employer' in changes || 'insurances' in changes
  }

  const handleFormCompletion = () => {
    if (setCompleted && !showWizardControls) {
      return setCompleted(member, primaryMember)
    }

    if (isRestrictedUser && setNextResctrictedPhase) {
      setNextResctrictedPhase(true)
    }
    onNext()
  }

  const handleSubmit = (values: any, formikBag: any) => {
    const completeSubmission = () => {
      setShowLoader(false)
      notify('Details saved successfully', 'success')
      if (
        !showWizardControls &&
        (needToUpdateBillingMethod(values) || layoutName !== 'insurance-form')
      ) {
        setInitialValues(values)
        setBillingEditMode(false)
        setLayoutName('assign-billing')
        return
      }
      handleFormCompletion()
    }

    const parseInsuranceData = (insurances: any[]) => {
      // remove empty insurances or insurances whose insuranceCompany and insuranceId fields are empty
      const filteredInsurances = insurances.filter((insurance: any) => {
        const { insuranceCompany, insuranceId } = insurance
        return insuranceCompany && insuranceId
      })
      return filteredInsurances
    }

    setShowLoader(true)

    if (!isDirty(initialValues, values)) {
      completeSubmission()
      return
    }

    if (member) {
      handleUpdateInsuranceDetails(member, {
        ...values,
        insurances: parseInsuranceData(values.insurances),
      })
        .then(() => {
          analytics.trackProfileEdited(
            'Insurance and employer details updated',
            getChanges(initialValues, values)
          )
          completeSubmission()
        })
        .catch((e) => {
          logError(e)
          setUserError(e?.message)
          notify('An error occurred while updating insurance details', 'error')
          setShowLoader(false)
        })
        .finally(() => {
          formikBag.setSubmitting(false)
        })
    }
  }

  const getBusinessLocations = (
    companies: LookupOption[],
    companyName?: string
  ) => {
    if (companyName) {
      const company = companies.find((c) => c.value === companyName)
      return (company?.businessLocations || []) as LookupOption[]
    }
    return []
  }

  const getBusinessDepartments = (
    companies: LookupOption[],
    companyName?: string
  ) => {
    if (companyName) {
      const company = companies.find((c) => c.value === companyName)
      return (company?.departments || []) as LookupOption[]
    }
    return []
  }

  const setBusinessLookups = (v?: string) => {
    const b = getBusinessLocations(lookupOptions?.employers || [], v) || []
    const d = getBusinessDepartments(lookupOptions?.employers || [], v) || []
    setBusinessLocations(b)
    setDepartments(d)
  }

  useEffect(() => {
    setProcessLoader?.(showLoader)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLoader])

  return (
    <div className="overflow-scroll">
      {Object.keys(initialValues).length > 0 && (
        <>
          {showLoader ? (
            <div className="bg-[#e0ddf1] rounded-md p-4 mb-4 flex flex-col items-center justify-center">
              <FadeLoader color="#222222" loading data-testid="loader" />
              <div className="mt-4 text-center">Saving details</div>
            </div>
          ) : (
            <>
              {layoutName === 'user-details-form' ? (
                <UserDetailsForm
                  member={member}
                  isChildRegistration={member?.isMinor || false}
                  inEligibilityReasons={inEligibilityReasons}
                  handleFormCompletion={handleFormCompletion}
                />
              ) : layoutName === 'assign-billing' && !billingEditMode ? (
                <BillingFormComponent
                  insuranceData={initialValues}
                  setBillingEditMode={setBillingEditMode}
                  member={member}
                  handleFormCompletion={handleFormCompletion}
                  primaryMember={undefined}
                  type="billing-method"
                  showWizardControls={showWizardControls}
                />
              ) : (
                <InsuranceFormComponent
                  initialValues={initialValues}
                  alertState={alertState}
                  type={layoutName}
                  setBusinessLookups={setBusinessLookups}
                  primaryMember={primaryMember}
                  businessLocations={businessLocations}
                  departments={departments}
                  showWizardControls={showWizardControls}
                  defaultInsurance={defaultInsurance}
                  userError={userError}
                  setUserError={setUserError}
                  onPrev={onPrev}
                  hasOnPrev={hasOnPrev}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  setAlertState={setAlertState}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
