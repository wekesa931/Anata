import { Form } from 'formik'
import React from 'react'
import PrimaryForm from 'src/components/forms/primary-form'
import type { Member } from 'src/modules/member/db/models'
import UpdateForms from 'src/modules/member/components/update-forms'
import DateField from 'src/components/forms/fields/date-field'
import PrimaryButton from 'src/components/buttons/primary'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import { useNotifications } from 'src/context/notifications'
import { logError } from 'src/utils/logging/logger'
import { SelectField } from 'src/components/forms/fields'
import { useRegistrationForm } from 'src/context/member-registration'

type MissingInfoBlockProps = {
  member: Member | null
  missingInfo?: 'birthday' | 'gender'
}

export default function MissingBioInfoForm({
  member,
  missingInfo = 'birthday',
}: MissingInfoBlockProps) {
  const { handleUpdateBirthdate } = useRegistrationData()
  const { notify } = useNotifications()
  const { lookupOptions } = useRegistrationForm()

  const handleSubmit = (values: any, props: any) => {
    if (member) {
      handleUpdateBirthdate(member, values)
        .then(() => {
          notify('Birthdate updated successfully')
          props.setIsEdited(false)
          props.handleClose()
        })
        .catch((error) => {
          logError(error)
          notify('Failed to update birthdate')
        })
    }
  }
  return (
    <UpdateForms title={`Missing ${missingInfo}`}>
      {({ setIsEdited, handleClose }) => (
        <PrimaryForm
          initialValues={{
            birthDate: member?.birthDate || null,
          }}
          handleSubmit={(values: any) =>
            handleSubmit(values, {
              setIsEdited,
              handleClose,
            })
          }
          expanded={false}
        >
          {({ isSubmitting, isValidating }) => (
            <Form>
              {missingInfo === 'birthday' && (
                <DateField
                  name="birthDate"
                  label="Birthdate"
                  placeholder="Enter the date of birth"
                  handleBlur={() => setIsEdited(true)}
                  maxDate={new Date()}
                />
              )}
              {missingInfo === 'gender' && (
                <SelectField
                  name="sex"
                  label="Gender"
                  options={lookupOptions?.sexes || []}
                  placeholder="--Select--"
                />
              )}

              <PrimaryButton
                type="submit"
                disabled={isSubmitting || isValidating}
                loading={isSubmitting || isValidating}
                className="w-full mt-3"
              >
                Save
              </PrimaryButton>
            </Form>
          )}
        </PrimaryForm>
      )}
    </UpdateForms>
  )
}
