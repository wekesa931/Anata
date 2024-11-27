import React, { useState } from 'react'
import { useWizardContext } from 'src/components/wizard'
import PrimaryButton, {
  NextButton,
  PreviousButton,
} from 'src/components/buttons/primary'
import { FieldArray, Form, FormikProps } from 'formik'
import TextField from 'src/components/forms/fields/text'
import SelectField from 'src/components/forms/fields/select-field'
import PrimaryForm from 'src/components/forms/primary-form'
import AddressField from 'src/components/forms/fields/address-field'
import type { Member } from 'src/modules/member/db/models'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import { logError } from 'src/utils/logging/logger'
import { useNotifications } from 'src/context/notifications'
import DeleteFormEntry from 'src/modules/member/components/delete-form-entry'
import FlexRow from 'src/components/layouts/flex-row'
import { getChanges, isDirty } from 'src/utils/form-validation-methods'
import ErrorComponent from 'src/components/feedbacks/error-component'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'

type AddressesSectionProps = {
  member: Member | null
  showWizardControls?: boolean
}

function AddressSectionForm(props: AddressesSectionProps) {
  const { onNext, onPrev } = useWizardContext()
  return <AddressesForm {...props} onNext={onNext} onPrev={onPrev} />
}

type AddressesFormProps = AddressesSectionProps & {
  onNext: () => void
  onPrev?: () => void
}

export function AddressesForm({
  member,
  onNext,
  onPrev,
  showWizardControls = false,
}: AddressesFormProps) {
  const { handleUpdateAddresses, loading } = useRegistrationData()
  const { notify } = useNotifications()
  const [userError, setUserError] = useState<string | null>(null)
  const analytics = useMemberAnalytics()

  const defaultAddressObject = {
    description: '',
    place_id: '',
    residentialCountry: '',
    residentialCounty: '',
    residentialTown: '',
    latitude: '',
    longitude: '',
  }

  const initialValues = member?.addresses?.addresses?.length
    ? member?.addresses
    : {
        addresses: [
          {
            address: defaultAddressObject,
            addressLabel: '',
            deliveryInstructions: '',
          },
        ],
        antaraId: member?.antaraId || '',
      }

  const handleSubmit = (values: any, formikBag: any) => {
    const handleNext = () => {
      onNext()
    }
    if (isDirty(initialValues, values)) {
      if (member) {
        handleUpdateAddresses(member, values)
          .then(() => {
            analytics.trackProfileEdited(
              'Addresses updated',
              getChanges(initialValues, values)
            )
            handleNext()
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
      handleNext()
    }
  }

  return (
    <div className="overflow-scroll">
      <PrimaryForm initialValues={initialValues} handleSubmit={handleSubmit}>
        {({ values, isValid }: FormikProps<any>) => (
          <Form>
            <h3 className="text-dark-blue-100 text-base my-4 font-medium font-rubik">
              Address{' '}
            </h3>
            <FieldArray name="addresses">
              {({ push, remove }) => (
                <>
                  {values.addresses &&
                    values.addresses.length > 0 &&
                    values.addresses.map((p: any, index: number) => (
                      <div key={index}>
                        <DeleteFormEntry
                          title={`Address ${index + 1}`}
                          onDelete={() => remove(index)}
                          showDeleteButton={values.addresses.length > 1}
                        />
                        <FlexRow>
                          <AddressField
                            label="Address"
                            name={`addresses.${index}.address`}
                            initialValue={values.addresses[index].address}
                            id={`address-${index}`}
                            required={false}
                          />
                          <SelectField
                            label="Address Label"
                            name={`addresses.${index}.addressLabel`}
                            placeholder="--Select--"
                            options={[
                              { value: 'Home', label: 'Home' },
                              { value: 'Office', label: 'Office' },
                            ]}
                            required={false}
                          />
                        </FlexRow>
                        <TextField
                          label="Delivery Instructions"
                          required={false}
                          placeholder="Enter delivery instructions"
                          name={`addresses.${index}.deliveryInstructions`}
                          textarea
                        />
                      </div>
                    ))}
                  <PrimaryButton
                    variant="text"
                    onClick={() =>
                      push({
                        address: defaultAddressObject,
                        addressLabel: '',
                        deliveryInstructions: '',
                      })
                    }
                    className="normal-case text-sm my-2"
                  >
                    <p className="flex justify-start text-left gap-2 text-xs">
                      +<span>Add another address</span>
                    </p>
                  </PrimaryButton>
                </>
              )}
            </FieldArray>
            {userError && (
              <ErrorComponent handleClose={() => setUserError(null)}>
                {' '}
                {userError}{' '}
              </ErrorComponent>
            )}
            {showWizardControls ? (
              <div className="flex justify-between gap-4 mt-3">
                <PreviousButton onClick={onPrev} disabled={loading}>
                  {' '}
                  Previous{' '}
                </PreviousButton>
                <NextButton
                  type="submit"
                  disabled={loading || !isValid}
                  loading={loading}
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
                >
                  Submit
                </PrimaryButton>
              </div>
            )}
          </Form>
        )}
      </PrimaryForm>
    </div>
  )
}

export default AddressSectionForm
