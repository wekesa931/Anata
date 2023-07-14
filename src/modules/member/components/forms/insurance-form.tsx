import React, { useEffect, useState } from 'react'
import { useWizardContext } from 'src/components/wizard'
import PrimaryButton, {
  NextButton,
  PreviousButton,
} from 'src/components/buttons/primary'
import { FieldArray, Form, FormikProps } from 'formik'
import TextField from 'src/components/forms/fields/text'
import SelectField from 'src/components/forms/fields/select-field'
import PrimaryForm from 'src/components/forms/primary-form'
import type { Member } from 'src/modules/member/db/models'
import RadioField from 'src/components/forms/fields/radio-field'
import * as yup from 'yup'
import DeleteFormEntry from 'src/modules/member/components/delete-form-entry'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import VerificationLoader from 'src/components/loaders/verification-loader'
import type {
  VerificationStatus,
  DbValueTypes,
  LookupOption,
} from 'src/modules/member/types'
import ErrorFeedback from 'src/components/feedbacks/error'
import { logError } from 'src/utils/logging/logger'
import { useNotifications } from 'src/context/notifications'
import { useRegistrationForm } from 'src/context/member-registration'
import { relationshipOptions } from 'src/config/constants'
import { useNavigate } from 'react-router-dom'
import { isDirty } from 'src/utils/form-validation-methods'
import { sortAlphabetically } from 'src/utils/sort'
import ErrorComponent from 'src/components/feedbacks/error-component'

type InsuranceDetailsValues = DbValueTypes.InsuranceDetailsValues

const validationSchema = (isDependent = false) =>
  yup.object().shape({
    employer: yup.object().shape({
      name: isDependent
        ? yup.string()
        : yup.string().required('Employer is required'),
      department: yup
        .object()
        .shape({
          name: yup.string(),
          departmentId: yup.string(),
        })
        .nullable(),
      businessLocation: yup
        .object()
        .shape({
          name: yup.string(),
          businessLocationId: yup.string(),
        })
        .nullable(),
    }),
    insurances: yup.array().of(
      yup.object().shape(
        {
          insuranceCompany: yup.string().when('insuranceId', {
            is: (insuranceId: string) => !!insuranceId,
            then: yup.string().required('Insurance provider is required'),
            otherwise: yup.string(),
          }),
          insuranceId: yup.string().when('insuranceCompany', {
            is: (insuranceCompany: string) => !!insuranceCompany,
            then: yup.string().required('Insurance ID is required'),
            otherwise: yup.string(),
          }),
          isPrincipalMember: yup.string().required('This field is required'),
          principalMemberInsuranceId: yup.string().when('isJubileeMember', {
            is: (isJubileeMember: string) => isJubileeMember === 'no',
            then: yup
              .string()
              .required('Principal member insurance ID is required'),
            otherwise: yup.string(),
          }),
          relationshipToPrincipalMember: yup.string().when('isJubileeMember', {
            is: (isJubileeMember: string) => isJubileeMember === 'no',
            then: yup
              .string()
              .required('Relationship to principal member is required'),
            otherwise: yup.string(),
          }),
        },
        [['insuranceCompany', 'insuranceId']]
      )
    ),
  })

type InsuranceSectionProps = {
  setCompleted: (completed: any) => void
  member: Member | null
  primaryMember: Member | undefined
}

type Statuses = {
  [key: number]: VerificationStatus
}

type BooleanStatus = {
  [key: number]: boolean
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
      insuranceCompany: '',
      insuranceId: '',
      isPrincipalMember: primaryMember ? 'no' : 'yes',
      principalMemberInsuranceId: primaryMember?.principalInsuranceId,
      relationshipToPrincipalMember: '',
      priority: 0,
      verificationStatus: 'unverified',
    },
  ],

  antaraId: '',
})

export default function InsuranceSectionForm(props: InsuranceSectionProps) {
  const { onPrev } = useWizardContext()

  return <InsuranceForm {...props} onPrev={onPrev} showWizardContols />
}

type InsuranceFormProps = InsuranceSectionProps & {
  onPrev?: () => void
  showWizardContols?: boolean
}

export function InsuranceForm({
  setCompleted,
  member,
  primaryMember,
  onPrev,
  showWizardContols = true,
}: InsuranceFormProps) {
  const {
    handleVerifyInsuranceDetails,
    isVerifyingInsurance,
    handleUpdateInsuranceDetails,
    loading,
  } = useRegistrationData()
  const [verificationStatus, setVerificationStatus] = useState<Statuses>({})
  const [hasError, setHasError] = useState<BooleanStatus>({})
  const [isLoading, setIsLoading] = useState<BooleanStatus>({})
  const { notify } = useNotifications()
  const { lookupOptions, insuranceCompanies } = useRegistrationForm()
  const [initialValues, setInitialValues] = useState<InsuranceDetailsValues>(
    {} as InsuranceDetailsValues
  )
  const navigate = useNavigate()
  const [businessLocations, setBusinessLocations] = useState<LookupOption[]>([])
  const [departments, setDepartments] = useState<LookupOption[]>([])
  const [userError, setUserError] = useState<string | null>(null)

  useEffect(() => {
    const values = member?.insurances?.insurances.length
      ? member?.insurances
      : defaultInsurance(primaryMember)
    setInitialValues(values as InsuranceDetailsValues)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationStatus, member])

  const handleSubmit = (values: any, formikBag: any) => {
    const completeSubmission = () => {
      setCompleted(member)
      if (member?.antaraId) navigate(`/member/${member.antaraId}`)
    }

    const parseInsuranceData = (insurances: any[]) => {
      // remove empty insurances or insurances whose insuranceCompany and insuranceId fields are empty
      const filteredInsurances = insurances.filter((insurance: any) => {
        const { insuranceCompany, insuranceId } = insurance
        return insuranceCompany && insuranceId
      })

      return filteredInsurances
    }

    if (isDirty(initialValues, values)) {
      if (member) {
        handleUpdateInsuranceDetails(member, {
          ...values,
          insurances: parseInsuranceData(values.insurances),
        })
          .then(() => {
            completeSubmission()
          })
          .catch((e) => {
            logError(e)
            setUserError(e?.message)
            notify('An error occurred while updating insurance details', 2000)
          })
          .finally(() => {
            formikBag.setSubmitting(false)
          })
      }
    } else {
      completeSubmission()
    }
  }

  const shouldVerifyInsurance = (
    touched: any,
    index: number,
    values: any = {}
  ) => {
    // check if either insuranceId or insuranceCompany field of a given insurances index object has been touched
    const hasFilledValues = () => {
      const insurance = values?.insurances?.[index]
      return insurance && insurance.insuranceId && insurance.insuranceCompany
    }
    if (touched.insurances && touched.insurances[index]) {
      const touchedFields =
        touched.insurances[index].insuranceCompany ||
        touched.insurances[index].insuranceId

      return touchedFields && hasFilledValues()
    }

    return false
  }

  const verifyInsurance = (
    p: InsuranceDetailsValues,
    c: any,
    index: number
  ) => {
    // find the insurance at index and verify it
    setVerificationStatus({ ...verificationStatus, [index]: 'pending' })
    setHasError({})
    setIsLoading({ ...isLoading, [index]: true })
    const variables = {
      ...p,
      insurances: p.insurances.map((i: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isPrincipalMember, ...rest } = i
        return rest
      }),
    }

    if (member) {
      handleVerifyInsuranceDetails(member, variables, c?.insuranceId)
        .then((newDetails) => {
          const { verified, update } = newDetails
          setInitialValues(update)
          if (verified) {
            setVerificationStatus({
              ...verificationStatus,
              [index]: 'verified',
            })
          } else {
            setVerificationStatus({
              ...verificationStatus,
              [index]: 'unverified',
            })
          }
        })
        .catch(() => {
          setHasError({ ...hasError, [index]: true })
        })
        .finally(() => {
          setIsLoading({})
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

  return (
    <div className="overflow-scroll">
      {Object.keys(initialValues).length > 0 && (
        <PrimaryForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          validationSchema={validationSchema(!!primaryMember)}
        >
          {({
            values,
            touched,
            setFieldValue,
            isValid,
            setSubmitting,
          }: FormikProps<InsuranceDetailsValues>) => {
            return (
              <Form>
                <h3 className="text-dark-blue-100 text-base my-4 font-medium font-rubik">
                  {' '}
                  Employer details{' '}
                </h3>
                <SelectField
                  label="Employer"
                  name="employer.name"
                  placeholder="--Select--"
                  options={sortAlphabetically(
                    lookupOptions?.employers || [],
                    'label'
                  )}
                  handleChange={(v) => {
                    const b =
                      getBusinessLocations(lookupOptions?.employers || [], v) ||
                      []
                    const d =
                      getBusinessDepartments(
                        lookupOptions?.employers || [],
                        v
                      ) || []

                    setBusinessLocations(b)
                    setDepartments(d)
                  }}
                  required={!primaryMember}
                />
                {!!businessLocations.length && (
                  <SelectField
                    label="Business Unit/Branch/Wing"
                    name="employer.businessLocation.businessLocationId"
                    placeholder="--Select--"
                    options={businessLocations}
                    handleChange={(v) => {
                      const businessLocation =
                        businessLocations?.find(
                          (d) => d.businessLocationId === v
                        )?.label || ''
                      setFieldValue(
                        'employer.businessLocation.name',
                        businessLocation
                      )
                    }}
                    required={false}
                  />
                )}
                {!!departments.length && (
                  <SelectField
                    label="Department"
                    name="employer.department.departmentId"
                    placeholder="--Select--"
                    options={departments}
                    handleChange={(v: any) => {
                      const department =
                        departments?.find((d) => d.departmentId === v)?.label ||
                        ''
                      setFieldValue('employer.department.name', department)
                    }}
                    required={false}
                  />
                )}
                <h3 className="text-dark-blue-100 text-base my-4 font-medium font-rubik">
                  {' '}
                  Insurance details{' '}
                </h3>
                <FieldArray name="insurances">
                  {({ push, remove }) => (
                    <>
                      {values.insurances &&
                        values.insurances.length > 0 &&
                        values.insurances.map((p: any, index: number) => (
                          <div key={index}>
                            <DeleteFormEntry
                              title={`Insurance ${index + 1}`}
                              onDelete={() => remove(index)}
                              showDeleteButton={values.insurances.length > 1}
                            />
                            <SelectField
                              label="Insurance provider"
                              placeholder="--Select--"
                              options={insuranceCompanies || []}
                              name={`insurances.${index}.insuranceCompany`}
                              handleBlur={() => {
                                if (
                                  shouldVerifyInsurance(touched, index, values)
                                ) {
                                  verifyInsurance(values, p, index)
                                }
                              }}
                              required={false}
                            />
                            <TextField
                              label="Insurance ID"
                              placeholder="Enter insurance ID"
                              name={`insurances.${index}.insuranceId`}
                              handleBlur={() => {
                                if (
                                  shouldVerifyInsurance(touched, index, values)
                                ) {
                                  verifyInsurance(values, p, index)
                                }
                              }}
                              required={false}
                            />
                            <>
                              {hasError[index] ? (
                                <ErrorFeedback message="An error occured. Please try again." />
                              ) : (
                                <>
                                  {isLoading[index] && (
                                    <VerificationLoader message="One moment while we verify the insurance ID..." />
                                  )}

                                  {verificationStatus[index] === 'verified' && (
                                    <p className="text-orange-main text-sm font-rubik text-left">
                                      Insurance ID successfully verified
                                    </p>
                                  )}
                                  {verificationStatus[index] ===
                                    'unverified' && (
                                    <p className="text-orange-main text-sm font-rubik text-left">
                                      We are unable to automatically verify this
                                      insurance ID. Please confirm that it is
                                      correct then proceed. The verification
                                      will be manually done later.
                                    </p>
                                  )}
                                </>
                              )}
                            </>

                            <RadioField
                              name={`insurances.${index}.isPrincipalMember`}
                              label={`Is this the principal member in the ${values.insurances[index]?.insuranceCompany} insurance scheme?`}
                              options={[
                                { value: 'yes', label: 'Yes' },
                                { value: 'no', label: 'No' },
                              ]}
                              required
                            />

                            {values.insurances[index]?.isPrincipalMember ===
                              'no' && (
                              <>
                                <TextField
                                  label="Principal member insurance ID"
                                  name={`insurances.${index}.principalMemberInsuranceId`}
                                  placeholder="Enter principal's member insurance ID"
                                  disabled={
                                    !!primaryMember?.principalInsuranceId &&
                                    !!values.insurances[index]
                                      ?.principalMemberInsuranceId
                                  }
                                />

                                <SelectField
                                  label="Relationship to principal member"
                                  name={`insurances.${index}.relationshipToPrincipalMember`}
                                  placeholder="--Select--"
                                  options={relationshipOptions || []}
                                />
                              </>
                            )}
                          </div>
                        ))}
                      <PrimaryButton
                        variant="text"
                        onClick={() => {
                          const highestPriority = values.insurances.reduce(
                            (acc: any, curr: any) => {
                              return acc.priority > curr.priority ? acc : curr
                            },
                            { priority: 0 }
                          )
                          push({
                            ...defaultInsurance(primaryMember).insurances[0],
                            priority: highestPriority.priority + 1,
                          })
                        }}
                        className="normal-case text-sm my-2"
                        disabled={isVerifyingInsurance}
                      >
                        <p className="flex justify-start text-left gap-2 text-xs">
                          +<span>Add insurance</span>
                        </p>
                      </PrimaryButton>
                    </>
                  )}
                </FieldArray>
                {userError && (
                  <ErrorComponent handleClose={() => setUserError(null)}>
                    {userError}
                  </ErrorComponent>
                )}

                {showWizardContols ? (
                  <div className="flex justify-between gap-4 mt-3">
                    <PreviousButton onClick={onPrev} disabled={loading}>
                      {' '}
                      Previous{' '}
                    </PreviousButton>
                    <NextButton
                      type="submit"
                      loading={loading}
                      disabled={loading || isVerifyingInsurance || !isValid}
                    >
                      Submit
                    </NextButton>
                  </div>
                ) : (
                  <div className="mt-6">
                    <PrimaryButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading || isVerifyingInsurance || !isValid}
                      loading={loading}
                      onClick={() => {
                        if (!isValid) {
                          notify('Please check the form for errors')
                        } else {
                          handleSubmit(values, { setSubmitting })
                        }
                      }}
                    >
                      Submit
                    </PrimaryButton>
                  </div>
                )}
              </Form>
            )
          }}
        </PrimaryForm>
      )}
    </div>
  )
}
