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
import type { BiodataValues } from 'src/modules/member/types'
import { useRegistrationForm } from 'src/context/member-registration'
import { isDirty } from 'src/utils/form-validation-methods'

type BioDataSectionProps = {
  setIsEdited: (isEdited: boolean) => void
  onPrev?: () => Promise<void> | void
  member: Member | null
  isChildRegistration?: boolean
}

const extractInitialState = (member: Member | null, initialPhone?: string) => {
  return {
    firstName: member?.firstName || '',
    middleName: member?.middleName || '',
    lastName: member?.lastName || '',
    phone: member?.phone || initialPhone || '',
    birthDate: member?.birthDate ? dayjs(member?.birthDate).toDate() : null,
    sex: member?.sex || '',
    maritalStatus: member?.maritalStatus || '',
    tags: member?.tags || [],
    antaraId: member?.antaraId || '',
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
}

export function BioDataForm({
  setIsEdited,
  onPrev,
  member,
  isChildRegistration = false,
  onNext,
  showWizardControls = true,
  showPhoneInput = true,
}: BioDataFormProps) {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [isFetchingMember, setIsFetchingMember] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<BiodataValues>(
    extractInitialState(member)
  )
  const { createMemberInstance, handleUpdateBioData, loading } =
    useRegistrationData()
  const { notify } = useNotifications()
  const { lookupOptions } = useRegistrationForm()

  const parseMemberFromResponse = (response: any, phone: string) => {
    if (response) {
      createMemberInstance(member, response)
        .then((newMember) => {
          setInitialValues(extractInitialState(newMember, phone))
        })
        .catch((error) => {
          logError(error)
          notify('An error occurred while creating member')
        })
    } else if (member) {
      member.reset().then(async () => {
        await member.setInitialPhone(phone)
        setInitialValues(extractInitialState(member, phone))
      })
    }
  }

  const handleSubmit = (values: any, formikBag: any) => {
    if (isDirty(initialValues, values)) {
      if (member) {
        handleUpdateBioData(member, values)
          .then(() => {
            onNext()
          })
          .catch((err) => {
            logError(err)
            notify('An error occurred while updating member')
          })
      }
    } else {
      formikBag.setSubmitting(false)
      onNext()
    }
  }

  return (
    <div className="overflow-scroll">
      <PrimaryForm initialValues={initialValues} handleSubmit={handleSubmit}>
        {({ isValid, isSubmitting, values }) => {
          return (
            <Form>
              <>
                {!isChildRegistration && showPhoneInput ? (
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
                {showForm || !!member?.antaraId || isChildRegistration ? (
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
                      />
                      <SelectField
                        name="sex"
                        label="Gender"
                        options={lookupOptions?.sexes || []}
                        placeholder="--Select--"
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
                        />
                      </>
                    ) : null}
                  </div>
                ) : null}
              </>
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
                    disabled={
                      !isValid || isFetchingMember || loading || isSubmitting
                    }
                    type="submit"
                    loading={loading}
                  >
                    Next
                  </NextButton>
                </div>
              ) : (
                <PrimaryButton
                  disabled={
                    !isValid || isFetchingMember || loading || isSubmitting
                  }
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
