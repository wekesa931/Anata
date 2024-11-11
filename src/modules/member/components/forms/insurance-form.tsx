import React, { useEffect, useState } from 'react'
import { useWizardContext } from 'src/components/wizard'
import PrimaryButton, {
  NextButton,
  PreviousButton,
} from 'src/components/buttons/primary'
import { FieldArray, Form, FormikProps } from 'formik'
import TextField from 'src/components/forms/fields/text'
import SelectField from 'src/components/forms/fields/select-field'
import GroupedSearchField from 'src/components/forms/fields/grouped-search-field'
import PrimaryForm from 'src/components/forms/primary-form'
import type { Member } from 'src/modules/member/db/models'
import RadioField from 'src/components/forms/fields/radio-field'
import * as yup from 'yup'
import DeleteFormEntry from 'src/modules/member/components/delete-form-entry'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import type {
  DbValueTypes,
  LookupOption,
  SelectedInsurance,
} from 'src/modules/member/types'
import { logError } from 'src/utils/logging/logger'
import { useNotifications } from 'src/context/notifications'
import { useRegistrationForm } from 'src/context/member-registration'
import { relationshipOptions } from 'src/config/constants'
import { getChanges, isDirty } from 'src/utils/form-validation-methods'
import { sortAlphabetically } from 'src/utils/sort'
import ErrorComponent from 'src/components/feedbacks/error-component'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'
import CreateMissingCompany from 'src/modules/member/components/forms/company-create-form'

type InsuranceDetailsValues = DbValueTypes.InsuranceDetailsValues

const validationSchema = (
  isDependent = false,
  selectedInsurances: Record<string, SelectedInsurance> = {}
) => {
  return yup.object().shape({
    employer: yup.object().shape({
      name: isDependent
        ? yup.string()
        : yup.string().when([], {
            is: () => {
              return Object.values(selectedInsurances).some(
                (insurance) => insurance.isEmployerRequiredForPolicyHolders
              )
            },
            then: yup.string().required('Employer is required'),
            otherwise: yup.string(),
          }),
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
            is(insuranceCompany: string) {
              if (!insuranceCompany) return false
              const selectedInsurance = Object.values(selectedInsurances).find(
                (insurance) => insurance.name === insuranceCompany
              )
              return selectedInsurance?.isInsuranceIdRequiredForPolicyHolders
            },
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
}

type InsuranceSectionProps = {
  member: Member | null
  primaryMember: Member | undefined
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

  return (
    <InsuranceForm
      {...props}
      onPrev={onPrev}
      onNext={onNext}
      showWizardContols
    />
  )
}

type InsuranceFormProps = InsuranceSectionProps & {
  onPrev?: () => void
  onNext: () => void
  showWizardContols?: boolean
}

export function InsuranceForm({
  member,
  primaryMember,
  onPrev,
  onNext,
  showWizardContols = true,
}: InsuranceFormProps) {
  const { handleUpdateInsuranceDetails, loading } = useRegistrationData()
  const { notify } = useNotifications()
  const { lookupOptions, insuranceCompanies } = useRegistrationForm()
  const [selectedInsurance, setSelectedInsurances] = useState({})
  const [initialValues, setInitialValues] = useState<InsuranceDetailsValues>(
    {} as InsuranceDetailsValues
  )
  const [employers, setEmployers] = useState<LookupOption[]>(
    lookupOptions?.employers
  )
  const [businessLocations, setBusinessLocations] = useState<LookupOption[]>([])
  const [departments, setDepartments] = useState<LookupOption[]>([])
  const [userError, setUserError] = useState<string | null>(null)
  const analytics = useMemberAnalytics()
  const [employer, setEmployer] = useState<string>('')

  useEffect(() => {
    const values = member?.needsInsurancePreffil
      ? defaultInsurance(primaryMember)
      : member?.insurances
    setInitialValues(values as InsuranceDetailsValues)
    const employerName = values?.employer?.name
    setBusinessLookups(employerName)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member, primaryMember])

  const handleSubmit = (values: any, formikBag: any) => {
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
            analytics.trackProfileEdited(
              'Insurance and employer details updated',
              getChanges(initialValues, values)
            )

            if (showWizardContols) {
              localStorage.setItem(
                'registration_insurance',
                JSON.stringify(values.insurances)
              )
            }
            onNext()
          })
          .catch((e) => {
            logError(e)
            setUserError(e?.message)
            notify(
              'An error occurred while updating insurance details',
              'error'
            )
          })
          .finally(() => {
            formikBag.setSubmitting(false)
          })
      }
    } else {
      onNext()
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

  const handleInsuranceChange = (insuranceCompany: any, index: any) => {
    const selected = insuranceCompanies.find(
      (insurance) => insurance.name === insuranceCompany
    )

    setSelectedInsurances((prev) => ({
      ...prev,
      [index]: selected || {},
    }))
  }

  return (
    <div className="overflow-scroll">
      {Object.keys(initialValues).length > 0 && (
        <PrimaryForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          validationSchema={validationSchema(
            !!primaryMember,
            selectedInsurance
          )}
        >
          {({
            values,
            setFieldValue,
            isValid,
            setSubmitting,
          }: FormikProps<InsuranceDetailsValues>) => {
            return (
              <Form>
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
                              required
                              autoFocus={index === 0}
                              handleChange={(e) => {
                                handleInsuranceChange(e, index)
                              }}
                            />
                            <TextField
                              label="Insurance ID"
                              placeholder="Enter insurance ID"
                              name={`insurances.${index}.insuranceId`}
                              required={false}
                            />
                            {!showWizardContols && (
                              <SelectField
                                name={`insurances.${index}.verificationStatus`}
                                label="Insurance verification status"
                                placeholder="--Select--"
                                options={[
                                  { label: 'VERIFIED', value: 'Verified' },
                                  { label: 'PENDING', value: 'Pending' },
                                  { label: 'REJECTED', value: 'Rejected' },
                                ]}
                                required={false}
                                autoFocus={index === 0}
                              />
                            )}
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
                                    !!primaryMember?.primaryInsuranceId &&
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
                      >
                        <p className="flex justify-start text-left gap-2 text-xs">
                          +<span>Add insurance</span>
                        </p>
                      </PrimaryButton>
                    </>
                  )}
                </FieldArray>

                <h3 className="text-dark-blue-100 text-base my-4 font-medium font-rubik">
                  Employer details
                </h3>

                <GroupedSearchField
                  label="Employer"
                  name="employer.name"
                  placeholder="--Select--"
                  group
                  options={sortAlphabetically(employers || [], 'label')}
                  handleChange={(v) => {
                    setBusinessLookups(v)
                    setFieldValue('employer.businessLocation', {})
                    setFieldValue('employer.department', {})
                  }}
                  handleInputChange={(v) => {
                    setEmployer(v)
                  }}
                  required={!primaryMember}
                  EmptyOptionBtn={
                    <CreateMissingCompany
                      missingEmployer={employer}
                      onMissingCompanySaved={(companyName: string) => {
                        setFieldValue('employer.name', companyName)
                        setEmployers((prev) => [
                          ...prev,
                          { label: companyName, value: companyName },
                        ])
                      }}
                    />
                  }
                />
                {!!businessLocations.length && (
                  <SelectField
                    label="Business Unit/Branch/Wing"
                    name="employer.businessLocation.businessLocationId"
                    placeholder="--Select--"
                    options={businessLocations}
                    handleChange={(v) => {
                      const businessLocation =
                        businessLocations?.find((d) => d.value === v)?.label ||
                        ''
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
                        departments?.find((d) => d.value === v)?.label || ''
                      setFieldValue('employer.department.name', department)
                    }}
                    required={false}
                  />
                )}
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
                      disabled={loading || !isValid}
                    >
                      Next
                    </NextButton>
                  </div>
                ) : (
                  <div className="mt-6">
                    <PrimaryButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading || !isValid}
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
