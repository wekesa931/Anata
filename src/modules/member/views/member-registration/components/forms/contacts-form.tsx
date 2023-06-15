import React from 'react'
import { useWizardContext } from 'src/components/wizard'
import PrimaryButton, {
  NextButton,
  PreviousButton,
} from 'src/components/buttons/primary'
import { FieldArray, Form } from 'formik'
import TextField from 'src/components/forms/fields/text'
import SelectField from 'src/components/forms/fields/select-field'
import PhoneField from 'src/components/forms/fields/phone-field'
import { validateEmail } from 'src/utils/form-validation-methods'
import PrimaryForm from 'src/components/forms/primary-form'
import FlexRow from 'src/components/layouts/flex-row'
import DeleteFormEntry from 'src/modules/member/components/delete-form-entry'
import type { Member } from 'src/modules/member/db/models'
import type { ContactValues } from 'src/modules/member/types'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import { logError } from 'src/utils/logging/logger'
import { useNotifications } from 'src/context/notifications'
import { useRegistrationForm } from 'src/context/member-registration'
import { relationshipOptions } from 'src/config/constants'

type ContactsFormProps = {
  member: Member | null
}

function ContactsForm({ member }: ContactsFormProps) {
  const { onNext, onPrev } = useWizardContext()
  const { handleUpdateContactsData, loading } = useRegistrationData()
  const { notify } = useNotifications()
  const { lookupOptions } = useRegistrationForm()

  const phones = member?.phones || [
    {
      phone: '',
      phoneType: '',
      priority: 0,
    },
  ]
  const initialValues: ContactValues = {
    phones,
    email: member?.email || '',
    emergencyContact: member?.emergencyContact || {
      name: '',
      phoneNumber: '',
      relationship: '',
    },
    antaraId: member?.antaraId || '',
  }

  const handleSubmit = (values: any) => {
    if (member) {
      handleUpdateContactsData(member, values)
        .then(() => {
          onNext()
        })
        .catch((err) => {
          logError(err)
          notify('An error occurred while updating member')
        })
    }
  }

  return (
    <div className="overflow-scroll">
      <PrimaryForm initialValues={initialValues} handleSubmit={handleSubmit}>
        {({ values }: any) => (
          <Form>
            <h3 className="text-dark-blue-100 text-base my-4 font-medium font-rubik">
              {' '}
              Personal contact{' '}
            </h3>
            <FieldArray name="phones">
              {({ push, remove }) => (
                <>
                  {values.phones &&
                    values.phones.length > 0 &&
                    values.phones.map((p: any, index: number) => (
                      <div key={index}>
                        <DeleteFormEntry
                          title={`Phone ${index + 1}`}
                          onDelete={() => remove(index)}
                          showDeleteButton={values.phones.length > 1}
                        />
                        <FlexRow>
                          <PhoneField
                            name={`phones.${index}.phone`}
                            label="Phone Number"
                            placeholder="Enter the phone number"
                            required
                          />
                          <SelectField
                            name={`phones.${index}.phoneType`}
                            label="Phone Type"
                            placeholder="--Select--"
                            options={lookupOptions?.phoneTypes || []}
                            required={false}
                          />
                        </FlexRow>
                      </div>
                    ))}
                  <PrimaryButton
                    variant="text"
                    onClick={() =>
                      push({
                        phone: '',
                        phoneType: '',
                      })
                    }
                    className="normal-case text-sm my-2"
                  >
                    <p className="flex justify-start text-left gap-2 text-xs">
                      +<span>Add another phone number</span>
                    </p>
                  </PrimaryButton>
                </>
              )}
            </FieldArray>
            <div className="mt-2">
              <TextField
                name="email"
                label="Email"
                placeholder="Enter the email address"
                type="email"
                required={false}
                validate={validateEmail}
              />
              <h3 className="text-dark-blue-100 text-base my-4 font-medium font-rubik">
                {' '}
                Emergency contact{' '}
              </h3>
              <TextField
                name="emergencyContact.name"
                label="Full name"
                placeholder="Emergency contact name"
              />
              <PhoneField
                name="emergencyContact.phoneNumber"
                label="Phone number"
                placeholder="Emergency contact phone number"
              />
              <SelectField
                name="emergencyContact.relationship"
                label="Relationship"
                placeholder="--Select--"
                options={relationshipOptions}
              />
            </div>

            <div className="flex justify-between gap-4 mt-3">
              <PreviousButton onClick={() => onPrev()} disabled={loading}>
                {' '}
                Previous{' '}
              </PreviousButton>
              <NextButton disabled={loading} type="submit" loading={loading}>
                Next
              </NextButton>
            </div>
          </Form>
        )}
      </PrimaryForm>
    </div>
  )
}

export default ContactsForm
