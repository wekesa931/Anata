import React, { useState } from 'react'
import { useWizardContext } from 'src/components/wizard'
import PrimaryButton, {
  NextButton,
  PreviousButton,
} from 'src/components/buttons/primary'
import { FieldArray, Form, FormikProps } from 'formik'
import TextField from 'src/components/forms/fields/text'
import SelectField from 'src/components/forms/fields/select-field'
import PhoneField from 'src/components/forms/fields/phone-field'
import { getChanges, validateEmail } from 'src/utils/form-validation-methods'
import PrimaryForm from 'src/components/forms/primary-form'
import FlexRow from 'src/components/layouts/flex-row'
import DeleteFormEntry from 'src/modules/member/components/delete-form-entry'
import type { Member } from 'src/modules/member/db/models'
import type { ContactValues } from 'src/modules/member/types'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import { logError } from 'src/utils/logging/logger'
import { useNotifications } from 'src/context/notifications'
import { relationshipOptions } from 'src/config/constants'
import PhoneNumberSearch from 'src/modules/member/components/phone-field-search'
import { BooleanStatus } from 'src/modules/member/types'
import * as yup from 'yup'
import ErrorComponent from 'src/components/feedbacks/error-component'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'

type ContactsSectionProps = {
  member: Member | null
  isChildRegistration?: boolean
  setIsEdited: (isEdited: boolean) => void
}

const validationSchema = (isChildRegistration = false) =>
  yup.object().shape({
    phones: yup.array().of(
      yup.object().shape({
        phone: isChildRegistration
          ? yup
              .string()
              .matches(/^\+\d{3}\d{9}$/, 'Invalid phone format')
              .nullable()
          : yup
              .string()
              .matches(/^\+\d{3}\d{9}$/, 'Invalid phone format')
              .required('Phone number is required'),
        phoneType: yup.string().nullable(),
      })
    ),
    email: yup.string(),
    emergencyContact: yup.object().shape({
      name: yup.string(),
      phoneNumber: yup
        .string()
        .matches(/^\+\d{3}\d{9}$/, 'Invalid phone format'),
      relationship: yup.string(),
    }),
    caregiverContact: yup.object().shape({
      name: yup.string(),
      phoneNumber: yup
        .string()
        .matches(/^\+\d{3}\d{9}$/, 'Invalid phone format'),
    }),
  })

export default function ContactsSectionForm(props: ContactsSectionProps) {
  const { onNext, onPrev } = useWizardContext()
  return (
    <ContactsForm
      {...props}
      onNext={onNext}
      onPrev={onPrev}
      showWizardContols
    />
  )
}

type ContactsFormProps = ContactsSectionProps & {
  onNext: () => void
  onPrev?: () => void
  showWizardContols?: boolean
}

export function ContactsForm({
  member,
  isChildRegistration,
  onNext,
  onPrev,
  showWizardContols = true,
  setIsEdited,
}: ContactsFormProps) {
  const { handleUpdateContactsData, loading } = useRegistrationData()
  const { notify } = useNotifications()
  const [showForm, setShowForm] = useState<BooleanStatus>({})
  const [isFetching, setIsFetching] = useState<BooleanStatus>({})
  const [userError, setUserError] = useState<string | null>(null)
  const analytics = useMemberAnalytics()

  const phones =
    member?.phones && member?.phones?.length > 0
      ? member.phones
      : [
          {
            phone: '',
            phoneType: '',
            priority: 0,
          },
        ]
  const initialValues: ContactValues = {
    phones,
    email: member?.email || '',
    emergencyContact: {
      name: member?.emergencyContact?.name || '',
      phoneNumber: member?.emergencyContact?.phoneNumber || '',
      relationship: member?.emergencyContact?.relationship || '',
    },
    caregiverContact: {
      name: member?.caregiverContact?.name || '',
      phoneNumber: member?.caregiverContact?.phoneNumber || '',
    },
    antaraId: member?.antaraId || '',
  }

  const handleSubmit = (values: any, formikBag: any) => {
    if (member) {
      handleUpdateContactsData(member, values)
        .then(() => {
          analytics.trackProfileEdited(
            'Contact details updated',
            getChanges(initialValues, values)
          )
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
    } else {
      formikBag.setSubmitting(false)
      onNext()
    }
  }

  return (
    <div className="overflow-scroll">
      <PrimaryForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationSchema={validationSchema(isChildRegistration)}
      >
        {({ values, setFieldValue, isValid }: FormikProps<any>) => {
          return (
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
                            <PhoneNumberSearch
                              key={index}
                              setResponse={(response: any) => {
                                if (response) {
                                  setFieldValue(
                                    `phones[${index}].phone`,
                                    response.phone
                                  )
                                }
                              }}
                              setIsEdited={setIsEdited}
                              name={`phones.${index}.phone`}
                              showForm={showForm[index]}
                              setShowForm={() =>
                                setShowForm({
                                  ...showForm,
                                  [index]: true,
                                })
                              }
                              isFetching={isFetching[index]}
                              setIsFetching={(v: boolean) =>
                                setIsFetching({
                                  ...isFetching,
                                  [index]: v,
                                })
                              }
                              phone={values.phones[index].phone}
                              fullWidth
                              required={!isChildRegistration}
                              currentPhones={values.phones
                                .filter((x: any, i: number) => i !== index)
                                .map((y: any) => y.phone)}
                            />
                          </FlexRow>
                        </div>
                      ))}
                    <PrimaryButton
                      variant="text"
                      onClick={() => {
                        push({
                          phone: '',
                          phoneType: '',
                          priority: values.phones.length || 0,
                        })
                        setShowForm({})
                        setIsFetching({})
                      }}
                      disabled={isFetching[values.phones.length - 1]}
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
                  autoFocus // to hinder phone verification from popping up initially
                />
                <h3 className="text-dark-blue-100 text-base my-4 font-medium font-rubik">
                  {' '}
                  Emergency contact{' '}
                </h3>
                <TextField
                  name="emergencyContact.name"
                  label="Full name"
                  placeholder="Emergency contact name"
                  required={false}
                />
                <PhoneField
                  name="emergencyContact.phoneNumber"
                  label="Phone number"
                  placeholder="Emergency contact phone number"
                  required={false}
                />
                <SelectField
                  name="emergencyContact.relationship"
                  label="Relationship"
                  placeholder="--Select--"
                  options={relationshipOptions}
                  required={false}
                />
                <h3 className="text-dark-blue-100 text-base my-4 font-medium font-rubik">
                  {' '}
                  Caregiver contact{' '}
                </h3>
                <TextField
                  name="caregiverContact.name"
                  label="Full name"
                  placeholder="Caregiver name"
                  required={false}
                />
                <PhoneField
                  name="caregiverContact.phoneNumber"
                  label="Phone number"
                  placeholder="Caregiver phone number"
                  required={false}
                />
              </div>

              {userError && (
                <ErrorComponent handleClose={() => setUserError(null)}>
                  {userError}
                </ErrorComponent>
              )}

              {showWizardContols ? (
                <div className="flex justify-between gap-4 mt-3">
                  <PreviousButton onClick={onPrev} disabled={loading}>
                    Previous
                  </PreviousButton>
                  <NextButton
                    disabled={loading || !isValid}
                    type="submit"
                    loading={loading}
                  >
                    Next
                  </NextButton>
                </div>
              ) : (
                <PrimaryButton
                  type="submit"
                  disabled={loading || !isValid}
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
