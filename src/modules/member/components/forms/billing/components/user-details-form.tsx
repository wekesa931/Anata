import React, { useEffect, useState } from 'react'
import PrimaryButton from 'src/components/buttons/primary'
import DateField from 'src/components/forms/fields/date-field'
import SelectField from 'src/components/forms/fields/select-field'
import PrimaryForm from 'src/components/forms/primary-form'
import { Form } from 'formik'
import { isDirty } from 'src/utils/form-validation-methods'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import { useNotifications } from 'src/context/notifications'
import { useRegistrationForm } from 'src/context/member-registration'
import dayjs from 'dayjs'

type UserDetailsProps = {
  isChildRegistration?: boolean
  inEligibilityReasons?: Array<{ tag: string }>
  member: any
  handleFormCompletion: () => void
}

type FormValues = {
  birthDate: Date | null
  status: string
}

const createBiodataValues = (member: any, updatedValues: FormValues) => ({
  antaraId: member.antaraId,
  firstName: member.firstName,
  middleName: member.middleName,
  lastName: member.lastName,
  phone: member.phone || '',
  sex: member.sex || '',
  tags: member.tags || [],
  refusedServices: member.refusedServices || [],
  birthDate: updatedValues.birthDate,
})

const createStatusData = (member: any, updatedValues: FormValues) => ({
  status: updatedValues.status,
  onboardStage: member.onboardStage,
  verificationStatus: member.verificationStatus,
  assignedMe: member.assignedMe?.emailUsername || '',
  assignedHn: member.assignedHn?.emailUsername || '',
  assignedNutritionist: member.assignedNutritionist?.emailUsername || '',
})

function UserDetailsForm({
  isChildRegistration,
  inEligibilityReasons = [],
  member,
  handleFormCompletion,
}: UserDetailsProps) {
  const [initialValues, setInitialValues] = useState<FormValues>({
    birthDate: null,
    status: '',
  })
  const [loading, setLoading] = useState(false)
  const { handleUpdateStatus, handleUpdateBioData } = useRegistrationData()
  const { notify } = useNotifications()
  const { lookupOptions } = useRegistrationForm()

  const ageMinDate = isChildRegistration
    ? dayjs().subtract(18, 'year').toDate()
    : undefined

  const showBirthDateField = inEligibilityReasons.some(
    (reason) => reason.tag === 'age'
  )

  const showStatusField = inEligibilityReasons.some(
    (reason) => reason.tag === 'status'
  )

  const handleSubmit = async (values: FormValues, formikBag: any) => {
    if (isDirty(initialValues, values)) {
      if (member) {
        setLoading(true)
        try {
          await Promise.all([
            values.birthDate !== initialValues.birthDate &&
              handleUpdateBioData(member, createBiodataValues(member, values)),
            values.status !== initialValues.status &&
              handleUpdateStatus(member, createStatusData(member, values)),
          ])
          notify('Details updated successfully')
          handleFormCompletion()
        } catch (error) {
          notify('Error updating details')
          formikBag.setErrors({ submit: error?.message })
        } finally {
          formikBag.setSubmitting(false)
          setLoading(false)
        }
      }
    } else {
      notify('Nothing to update')
      formikBag.setSubmitting(false)
    }
  }

  useEffect(() => {
    if (member) {
      setInitialValues({
        birthDate: member?.birthDate ? dayjs(member?.birthDate).toDate() : null,
        status: member?.status || '',
      })
    }
  }, [member])

  return (
    <div>
      <PrimaryForm initialValues={initialValues} handleSubmit={handleSubmit}>
        {() => (
          <Form>
            {showBirthDateField && (
              <DateField
                name="birthDate"
                label="Date of Birth"
                placeholder="Enter the date of birth"
                minDate={ageMinDate}
                maxDate={new Date()}
              />
            )}
            {showStatusField && (
              <SelectField
                name="status"
                label="Status"
                options={lookupOptions?.memberStatuses}
                placeholder="-- Select --"
                required={false}
              />
            )}
            <div className="mt-6">
              <PrimaryButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                disabled={loading}
              >
                Save
              </PrimaryButton>
            </div>
          </Form>
        )}
      </PrimaryForm>
    </div>
  )
}

export default UserDetailsForm
