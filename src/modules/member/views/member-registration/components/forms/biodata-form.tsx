import React, { useState } from 'react'
import { useWizardContext } from 'src/components/wizard'
import { NextButton, PreviousButton } from 'src/components/buttons/primary'
import { Form } from 'formik'
import { PhoneNumberSearch } from 'src/modules/member/views/member-registration/components/phone-field-search'
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

type BioDataFormProps = {
  setIsEdited: (isEdited: boolean) => void
  onPrev: () => Promise<void> | void
  member: Member | null
  isChildRegistration?: boolean
}

const extractInitialState = (member: Member | null) => {
  return {
    firstName: member?.firstName || '',
    middleName: member?.middleName || '',
    lastName: member?.lastName || '',
    phone: member?.phone || '',
    birthDate: member?.birthDate ? dayjs(member?.birthDate).toDate() : null,
    sex: member?.sex || '',
    maritalStatus: member?.maritalStatus || '',
    tags: member?.tags || [],
    antaraId: member?.antaraId || '',
  }
}

function BioDataForm({
  setIsEdited,
  onPrev,
  member,
  isChildRegistration = false,
}: BioDataFormProps) {
  const { onNext } = useWizardContext()
  const [showForm, setShowForm] = useState<boolean>(false)
  const [isFetchingMember, setIsFetchingMember] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<BiodataValues>(
    extractInitialState(member)
  )
  const { createMemberInstance, handleUpdateBioData, loading } =
    useRegistrationData()
  const { notify } = useNotifications()
  const { lookupOptions } = useRegistrationForm()

  const parseMemberFromResponse = (response: any) => {
    if (response) {
      createMemberInstance(member, response)
        .then((newMember) => {
          // update initial values
          setInitialValues(extractInitialState(newMember))
        })
        .catch((error) => {
          logError(error)
          notify('An error occurred while creating member')
        })
    }
  }

  const handleSubmit = (values: any) => {
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
    // onNext()
  }

  return (
    <div className="overflow-scroll">
      <PrimaryForm initialValues={initialValues} handleSubmit={handleSubmit}>
        {({ isValid }) => {
          return (
            <Form>
              <>
                <PhoneNumberSearch
                  setResponse={parseMemberFromResponse}
                  setIsEdited={setIsEdited}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  isFetching={isFetchingMember}
                  setIsFetching={setIsFetchingMember}
                />
                {showForm || !!member?.antaraId ? (
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
              <div className="flex justify-between gap-4 mt-3 grow-0">
                <PreviousButton
                  onClick={onPrev}
                  type="button"
                  disabled={isFetchingMember || loading}
                >
                  {' '}
                  Previous{' '}
                </PreviousButton>
                <NextButton
                  disabled={!isValid || isFetchingMember || loading}
                  type="submit"
                  loading={loading}
                >
                  Next
                </NextButton>
              </div>
            </Form>
          )
        }}
      </PrimaryForm>
    </div>
  )
}

export default BioDataForm
