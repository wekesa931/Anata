import React, { useState } from 'react'
import GroupedSearchField from 'src/components/forms/fields/grouped-search-field'
import { sortAlphabetically } from 'src/utils/sort'
import CreateMissingCompany from 'src/modules/member/components/forms/company-create-form'
import type {
  LookupOption,
  DbValueTypes,
  SelectedInsurance,
} from 'src/modules/member/types'
import { useRegistrationForm } from 'src/context/member-registration'
import SelectField from 'src/components/forms/fields/select-field'
import { FieldArray, Form, FormikProps } from 'formik'
import DeleteFormEntry from 'src/modules/member/components/delete-form-entry'
import TextField from 'src/components/forms/fields/text'
import RadioField from 'src/components/forms/fields/radio-field'
import { relationshipOptions } from 'src/config/constants'
import PrimaryButton, {
  NextButton,
  PreviousButton,
} from 'src/components/buttons/primary'
import ErrorComponent from 'src/components/feedbacks/error-component'
import { useNotifications } from 'src/context/notifications'
import PrimaryForm from 'src/components/forms/primary-form'
import * as yup from 'yup'

type InsuranceDetailsValues = DbValueTypes.InsuranceDetailsValues

type Insurance = {
  insuranceCompany: string
  insuranceId: string
  isPrincipalMember: string
  principalMemberInsuranceId?: string
  relationshipToPrincipalMember: string
  priority: number
  verificationStatus: string
}

type InsuranceDetails = {
  employer: {
    isPrimaryMember: boolean
    name: string
    department: {
      departmentId: string
      name: string
    }
    businessLocation: {
      businessLocationId: string
      name: string
    }
  }
  insurances: Insurance[]
  antaraId: string
}

type InsuranceProps = {
  alertState: string
  type: string
  setBusinessLookups: (value: string) => void
  primaryMember: any
  businessLocations: any
  departments: any
  showWizardControls: boolean
  defaultInsurance: (primaryMember: any) => InsuranceDetails
  userError: any
  setUserError: (error: any) => void
  onPrev?: (() => void) | undefined
  hasOnPrev?: boolean
  loading: boolean
  handleSubmit: (values: any, formikBag: any) => void
  setAlertState: (value: string) => void
  initialValues: any
}

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

function InsuranceForm({
  alertState,
  type,
  setBusinessLookups,
  primaryMember,
  businessLocations,
  departments,
  showWizardControls = false,
  defaultInsurance,
  userError,
  setUserError,
  onPrev,
  hasOnPrev = true,
  loading,
  handleSubmit,
  setAlertState,
  initialValues,
}: InsuranceProps) {
  const { lookupOptions, insuranceCompanies } = useRegistrationForm()
  const [selectedInsurance, setSelectedInsurances] = useState({})
  const [employers, setEmployers] = useState<LookupOption[]>(
    lookupOptions?.employers
  )
  const [employer, setEmployer] = useState<string>('')
  const { notify } = useNotifications()

  const getBillingAlertHeader = () => {
    switch (alertState) {
      case 'all':
        return 'Missing employer and insurance details'
      case 'business':
        return 'Missing employer details'
      case 'insurance':
        return 'Missing insurance details'
      default:
        return ''
    }
  }

  const getBillingAlertDescription = () => {
    switch (alertState) {
      case 'all':
        return 'This member does not have employer and insurance details. Please add them then assign a billing package'
      case 'business':
        return 'This member does not have employer details. Please add them then assign a billing package'
      case 'insurance':
        return 'This member does not have insurance details. Please add them then assign a billing package'
      default:
        return ''
    }
  }
  const getAlertCheck = (value: any) => {
    const employerName = value?.employer?.name?.trim()

    const isInsuranceProvided = value?.insurances?.some(
      (insurance: any) =>
        insurance?.insuranceCompany?.trim() && insurance?.insuranceId?.trim()
    )
    const newState =
      !employerName && !isInsuranceProvided
        ? 'all'
        : !employerName
        ? 'business'
        : !isInsuranceProvided
        ? 'insurance'
        : ''
    setAlertState(newState)
    return newState !== ''
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
      <PrimaryForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationSchema={validationSchema(!!primaryMember, selectedInsurance)}
      >
        {({
          values,
          setFieldValue,
          isValid,
          setSubmitting,
        }: FormikProps<InsuranceDetailsValues>) => {
          return (
            <Form>
              <div>
                {getAlertCheck(values) && type === 'assign-billing' && (
                  <div className="bg-[#FFEBEA] rounded-md p-4 mb-4">
                    <h1 className="text-dark-blue-100 text-base font-medium font-rubik mb-2">
                      {getBillingAlertHeader()}
                    </h1>
                    <p>{getBillingAlertDescription()}</p>
                  </div>
                )}

                <h3 className="text-dark-blue-100 text-base my-4 font-medium font-rubik">
                  Insurance details
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
                            {!showWizardControls && (
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
                        businessLocations?.find((d: any) => d.value === v)
                          ?.label || ''
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

                {showWizardControls ? (
                  <div
                    className={`flex  gap-4 mt-3 ${
                      !hasOnPrev ? 'justify-end' : 'justify-between'
                    }`}
                  >
                    {hasOnPrev && (
                      <PreviousButton onClick={onPrev} disabled={loading}>
                        Previous
                      </PreviousButton>
                    )}

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
              </div>
            </Form>
          )
        }}
      </PrimaryForm>
    </div>
  )
}

export default InsuranceForm
