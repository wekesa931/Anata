import React, { useState } from 'react'
import { useWizardContext } from 'src/components/wizard'
import PrimaryButton, {
  NextButton,
  PreviousButton,
} from 'src/components/buttons/primary'
import { Form } from 'formik'
import { PhoneNumberSearch } from 'src/modules/member/components/phone-field-search'
import TextField from 'src/components/forms/fields/text'
import DateField from 'src/components/forms/fields/date-field'
import SelectField from 'src/components/forms/fields/select-field'
import PrimaryForm from 'src/components/forms/primary-form'
import type { Member } from 'src/modules/member/db/models'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import { logError } from 'src/utils/logging/logger'
import { useNotifications } from 'src/context/notifications'
import dayjs from 'dayjs'
import FlexRow from 'src/components/layouts/flex-row'
import type {
  BiodataValues,
  LookupOption,
  RosterMemberType,
} from 'src/modules/member/types'
import { useRegistrationForm } from 'src/context/member-registration'
import { getChanges, isDirty } from 'src/utils/form-validation-methods'
import * as yup from 'yup'
import ErrorComponent from 'src/components/feedbacks/error-component'
import { useNavigate } from 'react-router-dom'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'

type BioDataSectionProps = {
  setIsEdited: (isEdited: boolean) => void
  onPrev?: () => Promise<void> | void
  member: Member | null
  isChildRegistration?: boolean
  primaryMember?: Member | null
  rosterMember?: RosterMemberType
}

type InitialStateProps = {
  member: Member | null
  initialPhone?: string | null
  primaryMember?: Member | null
  isChildRegistration?: boolean
}

const validationSchema = (isChildRegistration = false) =>
  yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    middleName: yup.string(),
    phone: isChildRegistration
      ? yup
          .string()
          .matches(/^\+?\d{3}\d{9}$/, 'Invalid phone format')
          .nullable()
          .optional()
      : yup
          .string()
          .matches(/^\+?\d{3}\d{9}$/, 'Invalid phone format')
          .nullable(),
    birthDate: isChildRegistration
      ? yup
          .date()
          .typeError('Birth date is required')
          .min(
            dayjs().subtract(18, 'years').toDate(),
            'Must be 18 years or older'
          )
          .required('Birth date is required')
      : yup
          .date()
          .typeError('Birth date is required')
          .required('Birth date is required'),
    sex: yup.string().required('Sex is required'),
    maritalStatus: isChildRegistration
      ? yup.string().nullable()
      : yup.string().required('Marital status is required'),
    kenyaNationalId: yup.string(),
    nhifNumber: yup.string(),
  })

const extractInitialState = ({
  member,
  initialPhone,
  primaryMember,
  isChildRegistration,
}: InitialStateProps) => {
  return {
    firstName: member?.firstName || '',
    middleName: member?.middleName || '',
    lastName: member?.lastName || '',
    phone: member?.phone || initialPhone || '',
    birthDate: member?.birthDate ? dayjs(member?.birthDate).toDate() : null,
    sex: member?.sex || '',
    maritalStatus: member?.maritalStatus || '',
    tags: member?.tags || [],
    refusedServices: member?.refusedServices || [],
    antaraId: member?.antaraId || '',
    primaryMemberAntaraId: primaryMember?.antaraId,
    // next-line: possible data polution if dependent is an adult child
    relationshipToPrimary: isChildRegistration
      ? 'Child'
      : primaryMember
      ? 'Spouse'
      : '',
    referralSource: member?.referralSource || '',
    nhifNumber: member?.nhifNumber || '',
    kenyaNationalId: member?.kenyaNationalId || '',
  }
}

function BioDataFormSection(props: BioDataSectionProps) {
  const { onNext } = useWizardContext()
  return <BioDataForm {...props} onNext={onNext} showWizardControls />
}

type BioDataFormProps = BioDataSectionProps & {
  onNext: () => Promise<void> | void
  showWizardControls?: boolean
  showPhoneInput?: boolean
  isEditing?: boolean
}

export function BioDataForm({
  setIsEdited,
  onPrev,
  member,
  isChildRegistration = false,
  onNext,
  showWizardControls = true,
  showPhoneInput = true,
  primaryMember,
  rosterMember,
  isEditing = false,
}: BioDataFormProps) {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [isFetchingMember, setIsFetchingMember] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<BiodataValues>(
    extractInitialState({
      member,
      primaryMember,
      isChildRegistration,
    })
  )
  const { createMemberInstance, handleUpdateBioData, loading } =
    useRegistrationData()
  const { notify } = useNotifications()
  const { lookupOptions } = useRegistrationForm()
  const [userError, setUserError] = useState<string | null>(null)
  const analytics = useMemberAnalytics()

  const parseMemberFromResponse = (response: any, phone: string) => {
    if (response) {
      createMemberInstance(member, response)
        .then((newMember) => {
          setInitialValues(
            extractInitialState({
              member: newMember,
              initialPhone: phone,
              isChildRegistration,
              primaryMember,
            })
          )
        })
        .catch((error) => {
          logError(error)
          setUserError(error?.message)
          notify('An error occurred while creating member')
        })
    } else if (member) {
      member.reset().then(async () => {
        await member.setInitialPhone(phone)
        setInitialValues(
          extractInitialState({
            member,
            initialPhone: phone,
            isChildRegistration,
            primaryMember,
          })
        )
      })
    }
  }

  const navigate = useNavigate()

  const handleSubmit = (values: any, formikBag: any) => {
    if (isDirty(initialValues, values) || !member?.antaraId) {
      if (member) {
        const { referralSource, otherReferralSource, ...rest } = values
        let referralSourceValue = referralSource
        if (referralSource === OTHER_REFERRAL_SOURCE) {
          referralSourceValue = otherReferralSource
        }
        handleUpdateBioData(
          member,
          {
            ...rest,
            referralSource: referralSourceValue,
          },
          rosterMember
        )
          .then(() => {
            analytics.trackProfileEdited(
              'Bio data updated',
              getChanges(initialValues, values)
            )
            navigate(`/member/${member.antaraId}`)
            onNext()
          })
          .catch((err) => {
            logError(err)
            setUserError(err?.message)
            notify('An error occurred while updating member')
          })
          .finally(() => {
            formikBag.setSubmitting(false)
          })
      }
    } else {
      formikBag.setSubmitting(false)
      onNext()
    }
  }

  const ageMinDate = isChildRegistration
    ? dayjs().subtract(18, 'year').toDate()
    : undefined

  const shouldShowPhoneInput =
    !isChildRegistration && showPhoneInput && !rosterMember

  const shouldShowForm =
    showForm || !!member?.antaraId || isChildRegistration || !!rosterMember

  const OTHER_REFERRAL_SOURCE = 'Other'

  const referralSources: LookupOption[] = [
    {
      label: 'Registration from Scheduled Interactions with ME Team',
      value: 'Registration from Scheduled Interactions with ME Team',
    },
    {
      label: 'In-person Activation Event',
      value: 'In-person Activation Event',
    },
    { label: 'Virtual Activation Event', value: 'Virtual Activation Event' },
    {
      label: 'Topical / Expert Talks (Health Talks, MHC etc.)',
      value: 'Topical / Expert Talks (Health Talks, MHC etc.)',
    },
    { label: 'Communication Campaign', value: 'Communication Campaign' },
    {
      label:
        'Live Registration during Care Team Consultation (VC, NC, Logistics etc.)',
      value:
        'Live Registration during Care Team Consultation (VC, NC, Logistics etc.)',
    },
    { label: 'Other', value: OTHER_REFERRAL_SOURCE },
  ]

  return (
    <div className="overflow-scroll">
      <PrimaryForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationSchema={validationSchema(isChildRegistration)}
      >
        {({ isSubmitting, values }) => {
          return (
            <Form>
              <>
                {shouldShowPhoneInput ? (
                  <PhoneNumberSearch
                    setResponse={parseMemberFromResponse}
                    setIsEdited={setIsEdited}
                    showForm={showForm}
                    setShowForm={setShowForm}
                    isFetching={isFetchingMember}
                    setIsFetching={setIsFetchingMember}
                    phone={values.phone}
                  />
                ) : null}
                {shouldShowForm ? (
                  <div className="mb-6 flex flex-col gap-4">
                    <FlexRow>
                      <TextField
                        name="firstName"
                        label="First Name"
                        placeholder="Enter the first name"
                      />
                      <TextField
                        name="middleName"
                        label="Middle Name"
                        placeholder="Enter the middle name"
                        required={false}
                      />
                    </FlexRow>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter the last name"
                    />
                    <FlexRow>
                      <DateField
                        name="birthDate"
                        label="Date of Birth"
                        placeholder="Enter the date of birth"
                        minDate={ageMinDate}
                      />
                      <SelectField
                        name="sex"
                        label="Gender"
                        options={lookupOptions?.sexes || []}
                        placeholder="--Select--"
                      />
                    </FlexRow>
                    <FlexRow>
                      <TextField
                        name="kenyaNationalId"
                        label="National ID"
                        placeholder="Enter the national ID"
                        required={false}
                      />
                      <TextField
                        name="nhifNumber"
                        label="NHIF Number"
                        placeholder="Enter the NHIF number"
                        required={false}
                      />
                    </FlexRow>
                    {!isChildRegistration ? (
                      <>
                        <SelectField
                          name="maritalStatus"
                          label="Marital status"
                          options={lookupOptions?.maritalStatuses || []}
                          placeholder="--Select--"
                        />
                        <SelectField
                          name="tags"
                          label="Tags"
                          options={lookupOptions?.tags || []}
                          placeholder="--Select--"
                          multiple
                          required={false}
                        />
                        <SelectField
                          name="refusedServices"
                          label="Refused Services"
                          options={lookupOptions?.antaraServices || []}
                          placeholder="--Select--"
                          multiple
                          required={false}
                        />
                      </>
                    ) : null}
                    <SelectField
                      name="referralSource"
                      label="Referral Source"
                      options={referralSources}
                      placeholder="--Select--"
                      required={!isEditing}
                      disabled={!!member?.referralSource}
                    />
                    {!member?.referralSource &&
                      values.referralSource === OTHER_REFERRAL_SOURCE && (
                        <TextField
                          name="otherReferralSource"
                          label="Other Referral Source"
                          placeholder="Enter other referral source"
                        />
                      )}
                  </div>
                ) : null}
              </>
              {userError && (
                <ErrorComponent handleClose={() => setUserError(null)}>
                  {userError}
                </ErrorComponent>
              )}

              {showWizardControls ? (
                <div className="flex justify-between gap-4 mt-3 grow-0">
                  <PreviousButton
                    onClick={onPrev}
                    type="button"
                    disabled={isFetchingMember || loading || isSubmitting}
                  >
                    {' '}
                    Previous{' '}
                  </PreviousButton>
                  <NextButton
                    disabled={isFetchingMember || loading || isSubmitting}
                    type="submit"
                    loading={loading}
                  >
                    Next
                  </NextButton>
                </div>
              ) : (
                <PrimaryButton
                  disabled={isFetchingMember || loading || isSubmitting}
                  type="submit"
                  loading={loading}
                  className="w-full mt-3"
                  fullWidth
                >
                  Save
                </PrimaryButton>
              )}
            </Form>
          )
        }}
      </PrimaryForm>
    </div>
  )
}

export default BioDataFormSection
