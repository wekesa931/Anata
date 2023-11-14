import { FieldArray, Form } from 'formik'
import React, { useState } from 'react'
import PrimaryForm from 'src/components/forms/primary-form'
import FlexRow from 'src/components/layouts/flex-row'
import type { Member } from 'src/modules/member/db/models'
import UpdateForms from 'src/modules/member/components/update-forms'
import { PhoneNumberSearch } from 'src/modules/member/components/phone-field-search'
import DeleteFormEntry from 'src/modules/member/components/delete-form-entry'
import PrimaryButton from 'src/components/buttons/primary'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import { BooleanStatus } from 'src/modules/member/types'
import { useNotifications } from 'src/context/notifications'
import { logError } from 'src/utils/logging/logger'

type MissingInfoBlockProps = {
  member: Member | null
}

export default function MissingPhoneForm({ member }: MissingInfoBlockProps) {
  const [showForm, setShowForm] = useState<BooleanStatus>({})
  const [isFetching, setIsFetching] = useState<BooleanStatus>({})
  const { handleUpdatePhones, isUpdatingPhones } = useRegistrationData()
  const { notify } = useNotifications()

  const handleSubmit = (values: any, props: any) => {
    if (member) {
      handleUpdatePhones(values.phones, member)
        .then(() => {
          notify('Phone numbers updated')
          props.setIsEdited(false)
          props.handleClose()
        })
        .catch((err: any) => {
          logError(err)
          notify('Error updating phone numbers')
        })
    }
  }
  return (
    <UpdateForms title="Missing phone info">
      {({ setIsEdited, handleClose }) => (
        <PrimaryForm
          initialValues={{
            phones:
              member?.phones && member?.phones?.length > 0
                ? member?.phones
                : [
                    {
                      phone: '',
                      phoneType: '',
                      priority: 0,
                    },
                  ],
          }}
          handleSubmit={(values: any) =>
            handleSubmit(values, {
              setIsEdited,
              handleClose,
            })
          }
          expanded={false}
        >
          {({ values, setFieldValue, isSubmitting, isValidating }) => {
            return (
              <Form>
                <FieldArray name="phones">
                  {({ remove, push }) => (
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
                                setResponse={(response: any, phone: string) => {
                                  if (phone) {
                                    setFieldValue(
                                      `phones[${index}].phone`,
                                      phone
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
                                currentPhones={values.phones
                                  .filter((x: any, i: number) => i !== index)
                                  .map((y: any) => y.phone)}
                                fullWidth
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
                            priority: values?.phones?.length || 0,
                          })
                          setShowForm({})
                          setIsFetching({})
                        }}
                        className="normal-case text-sm my-2"
                        disabled={isFetching[values.phones.length - 1]}
                      >
                        <p className="flex justify-start text-left gap-2 text-xs">
                          +<span>Add another phone number</span>
                        </p>
                      </PrimaryButton>
                    </>
                  )}
                </FieldArray>
                <PrimaryButton
                  type="submit"
                  disabled={
                    isSubmitting ||
                    isValidating ||
                    isFetching[values.phones.length - 1] ||
                    isUpdatingPhones
                  }
                  loading={
                    isSubmitting ||
                    isValidating ||
                    isFetching[values.phones.length - 1] ||
                    isUpdatingPhones
                  }
                  className="w-full mt-3"
                >
                  Save
                </PrimaryButton>
              </Form>
            )
          }}
        </PrimaryForm>
      )}
    </UpdateForms>
  )
}
