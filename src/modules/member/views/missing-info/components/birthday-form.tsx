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

type MissingInfoBlockProps = {
  member: Member | null
}

export default function MissingBirthdateForm({
  member,
}: MissingInfoBlockProps) {
  const { handleUpdateBirthdate } = useRegistrationData()
  const { notify } = useNotifications()

  const handleSubmit = (values: any, props: any) => {
    if (member) {
      handleUpdateBirthdate(member, values.birthDate)
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
    <UpdateForms title="Missing birthdate">
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
              <DateField
                name="birthDate"
                label="Birthdate"
                placeholder="Enter the date of birth"
                handleBlur={() => setIsEdited(true)}
              />

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
