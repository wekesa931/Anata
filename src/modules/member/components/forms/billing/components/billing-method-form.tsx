import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import PrimaryButton from 'src/components/buttons/primary'
import PrimaryForm from 'src/components/forms/primary-form'
import { Form } from 'formik'
import { useMembersData } from 'src/modules/member/hooks/member-data'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import { isDirty } from 'src/utils/form-validation-methods'
import { useNotifications } from 'src/context/notifications'
import GroupedSearchField from 'src/components/forms/fields/grouped-search-field'
import { sortAlphabetically } from 'src/utils/sort'
import FadeLoader from 'react-spinners/FadeLoader'
import { useWizardContext } from 'src/components/wizard'
import { useNavigate } from 'react-router-dom'
import type { Member } from 'src/modules/member/db/models'

type BillingMethodOption = {
  value: string
  label: string
}

type BillingMethodProps = {
  insuranceData: any
  setBillingEditMode?: (value: boolean) => void
  member: Member | null
  primaryMember: Member | undefined
  handleFormCompletion?: () => void
  type: 'fee-for-service' | 'billing-method' | 'unlimited'
  setBillingMethod?: (value: any) => void
  setUnlimitedMembershipMode?: (value: any) => void
  setCompleted?: (completed: any, primaryMember?: any) => void
  showWizardControls?: boolean
}

function BillingMethodComponent(props: BillingMethodProps) {
  const { onNext } = useWizardContext()
  return <BillingMethodForm {...props} onNext={onNext} />
}

type BillingFormProps = BillingMethodProps & {
  onNext: () => Promise<void> | void
  showPhoneInput?: boolean
  isEditing?: boolean
}

interface BillingMethod {
  label: string
  value: string
  description: string
  billingPackage: any
}

export function BillingMethodForm({
  insuranceData,
  setBillingEditMode,
  member,
  primaryMember,
  handleFormCompletion,
  type = 'billing-method',
  setBillingMethod,
  setUnlimitedMembershipMode,
  showWizardControls = false,
  setCompleted,
}: BillingFormProps) {
  const [billingMethods, setBillingMethods] = useState<BillingMethod[]>([])
  const { prospectiveMemberCohorts } = useMembersData()
  const [loading, setLoading] = useState(false)
  const [initialValues] = React.useState<any>({
    billingMethod: '',
  })
  const [loadingCohorts, setLoadingCohorts] = useState(true)
  const [validation, setValidation] = useState(false)
  const { handleMemberCohortUpdate } = useRegistrationData()
  const { notify } = useNotifications()
  const navigate = useNavigate()

  const activeCohort = member?.activeCohorts[0]

  const handleEditDetails = () => {
    if (setBillingEditMode) {
      setBillingEditMode(true)
    }
  }

  const handleSubmit = async (value: any, formikBag: any) => {
    const completeSubmission = () => {
      if (setCompleted && showWizardControls) {
        setCompleted(member, primaryMember)
      }

      if (handleFormCompletion && !showWizardControls) {
        handleFormCompletion()
      }

      if (member?.antaraId) navigate(`/member/${member.antaraId}`)
    }

    if (isDirty(initialValues, value)) {
      if (member) {
        const activeBillingPackageId = billingMethods.find(
          (item) => item.value === value.billingMethod
        )?.billingPackage.billingPackageId

        const data = {
          cohortId: parseInt(value.billingMethod, 10),
          billingPackageId: activeBillingPackageId,
        }
        setLoading(true)
        try {
          await handleMemberCohortUpdate(member, data)
          notify('Member cohort updated successfully', 'success')
          completeSubmission()
          if (showWizardControls)
            localStorage.removeItem('registration_insurance')
        } catch (error: any) {
          notify(error?.message ?? 'Error updating member cohort', 'error')
          formikBag.setErrors({ submit: error?.message })
        } finally {
          formikBag.setSubmitting(false)
          setLoading(false)
        }
      }
    } else {
      notify('Nothing to update', 'info')
      formikBag.setSubmitting(false)
    }
  }

  const fetchMemberCohorts = async (antaraId: any) => {
    const request = await prospectiveMemberCohorts(antaraId)
    const filteredData = request.filter((item: any) => {
      if (type === 'fee-for-service') {
        return item.billingPackage?.isUnlimitedMembership
      }
      if (type === 'unlimited') {
        return item.billingPackage?.isFfs
      }
      return true
    })
    const formattedCohorts = filteredData.map((cohort: any) => ({
      label: cohort.name?.toUpperCase().split('KES')[0].trim(),
      value: cohort.cohortId,
      description: cohort.billingMethod.name,
      billingPackage: cohort.billingPackage,
    }))

    setBillingMethods(formattedCohorts)
    setLoadingCohorts(false)
  }

  const getNewCohortLabel: (value: string) => string | undefined = (
    value: string
  ) => {
    const option = billingMethods.find(
      (options: BillingMethodOption) => options.value === value
    )
    return option ? option.label : undefined
  }
  const checkSetBillingMethod = (data: any) => {
    if (setBillingMethod) {
      const billingMethodName = getNewCohortLabel(data.billingMethod)
      setBillingMethod(billingMethodName)
    }
  }

  useEffect(() => {
    if (member) {
      setLoadingCohorts(true)
      const timer = setTimeout(() => {
        fetchMemberCohorts(member?.antaraId)
      }, 1000)

      return () => clearTimeout(timer)
    }

    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const getSubmitLabel = (value: any) => {
    const selectedMethod = billingMethods.find(
      (method) => method.value === value
    )

    if (
      selectedMethod?.description?.toLowerCase().includes('insurance benefits')
    ) {
      return 'Submit and send consent request'
    }

    return 'Submit'
  }

  return (
    <div>
      <PrimaryForm initialValues={initialValues} handleSubmit={handleSubmit}>
        {(formik) => (
          <Form key="list-edit-form">
            {loadingCohorts ? (
              <div className="rounded-md p-4 mb-4 flex flex-col items-center justify-center h-[300px]">
                <FadeLoader color="#222222" loading data-testid="loader" />
                <div className="mt-4 text-center">Fetching Billing Methods</div>
              </div>
            ) : (
              <>
                {validation &&
                (type === 'fee-for-service' || type === 'unlimited') ? (
                  <div>
                    <div className="full-width">
                      <h3 className="font-medium text-base">Heads up!</h3>
                      <p className="mt-2">
                        Moving the member to{' '}
                        <strong>
                          {getNewCohortLabel(formik.values.billingMethod)}
                        </strong>{' '}
                        will automatically cancel{' '}
                        <strong>{activeCohort?.name}</strong> billing method.
                      </p>
                      <p className="mt-5">Are you sure you want to proceed?</p>
                      <div className="mt-10 flex flex-col gap-4">
                        <Button
                          type="button"
                          fullWidth
                          className="border"
                          sx={{
                            backgroundColor: '#205284 !important',
                            border: '1px #205284 solid',
                            color: '#FFFFFF !important',
                          }}
                          onClick={() => {
                            checkSetBillingMethod(formik.values)
                            setValidation(false)
                            handleSubmit(formik.values, formik)
                          }}
                        >
                          Yes, Proceed
                        </Button>
                        <Button
                          type="button"
                          fullWidth
                          className="border"
                          onClick={() =>
                            setUnlimitedMembershipMode
                              ? setUnlimitedMembershipMode('benefits')
                              : null
                          }
                          sx={{
                            backgroundColor: '#ffff',
                            border: '1px #205284 solid',
                            color: '#205284',
                          }}
                        >
                          No, Go back
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {loading ? (
                      <div className="rounded-md p-4 mb-4 flex flex-col items-center justify-center h-[300px]">
                        <FadeLoader
                          color="#222222"
                          loading
                          data-testid="loader"
                        />
                        <div className="mt-4 text-center">
                          Updating billing method
                        </div>
                      </div>
                    ) : (
                      <div>
                        {type === 'billing-method' && !showWizardControls && (
                          <div className="bg-[#efeff3] rounded-md p-4 mb-4">
                            <h3 className="text-[#777777] text-base font-medium font-rubik mb-3">
                              Please confirm that these details are accurate
                            </h3>
                            <div className="flex justify-between">
                              <section className="flex-1 mr-4">
                                <h1 className="text-[#777777]">Employer</h1>
                                <p>
                                  {insuranceData?.employer?.name ||
                                    'Not Provided'}
                                </p>
                              </section>
                              <section className="flex-1 ml-4">
                                <h1 className="text-[#777777]">Department</h1>
                                <p>
                                  {insuranceData?.employer?.department?.name ||
                                    'Not Provided'}
                                </p>
                              </section>
                            </div>
                            <div className="flex justify-between mt-4">
                              <section className="flex-1 mr-4">
                                <h1 className="text-[#777777]">
                                  Insurance Provider
                                </h1>
                                <p>
                                  {insuranceData?.insurances?.[0]
                                    .insuranceCompany || 'Not Provided'}
                                </p>
                              </section>
                              <section className="flex-1 ml-4">
                                <h1 className="text-[#777777]">Insurance ID</h1>
                                <p>
                                  {insuranceData?.insurances?.[0].insuranceId ||
                                    'Not Provided'}
                                </p>
                              </section>
                            </div>
                            <div className="text-right">
                              <Button
                                onClick={handleEditDetails}
                                className="mt-3 hover:bg-none"
                                sx={{
                                  backgroundColor: 'none !important',
                                  border: 'none',
                                  color: '#007AFF !important',
                                  textTransform: 'capitalize',
                                }}
                              >
                                Edit
                              </Button>
                            </div>
                          </div>
                        )}
                        <GroupedSearchField
                          label="Assign billing method"
                          name="billingMethod"
                          placeholder="Search..."
                          group
                          options={sortAlphabetically(
                            billingMethods || [],
                            'label'
                          )}
                          required={false}
                          groupByField="label"
                        />
                        <div className="mt-6">
                          <PrimaryButton
                            type="button"
                            onClick={() => {
                              type === 'billing-method'
                                ? handleSubmit(formik.values, formik)
                                : setValidation(true)
                            }}
                            fullWidth
                            variant="contained"
                            disabled={loading || !formik.values.billingMethod}
                            loading={loading}
                          >
                            {getSubmitLabel(formik.values.billingMethod)}
                          </PrimaryButton>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </Form>
        )}
      </PrimaryForm>
    </div>
  )
}

export default BillingMethodComponent
