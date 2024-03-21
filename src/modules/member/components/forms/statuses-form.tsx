import React, { useEffect, useState } from 'react'
import PrimaryForm from 'src/components/forms/primary-form'
import { useRegistrationForm } from 'src/context/member-registration'
import type { Member } from 'src/modules/member/db/models'
import { Form } from 'formik'
import FlexRow from 'src/components/layouts/flex-row'
import SelectField from 'src/components/forms/fields/select-field'
import PrimaryButton from 'src/components/buttons/primary'
import * as yup from 'yup'
import { useNotifications } from 'src/context/notifications'
import { getChanges, isDirty } from 'src/utils/form-validation-methods'
import ErrorComponent from 'src/components/feedbacks/error-component'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'
import { useRegistrationData } from '../../hooks/registration'

type StatusFormProps = {
  member: Member | null
  setIsEdited: (isEdited: boolean) => void
  onNext: () => Promise<void> | void
}

const defaultValue = {
  assignedHn: {
    fullName: null,
    emailUsername: null,
    atRecordId: null,
  },
  assignedMe: {
    fullName: null,
    emailUsername: null,
    atRecordId: null,
  },
  assignedNutritionist: {
    fullName: null,
    emailUsername: null,
    atRecordId: null,
  },
  onboardStage: null,
  status: null,
  antaraId: '',
  verificationStatus: '',
}

const validationSchema = yup.object().shape({
  assignedHn: yup
    .object()
    .shape({
      fullName: yup.string().notRequired(),
      emailUsername: yup.string().notRequired(),
      atRecordId: yup.string().notRequired(),
    })
    .notRequired()
    .nullable(),
  assignedMe: yup
    .object()
    .shape({
      fullName: yup.string().notRequired(),
      emailUsername: yup.string().notRequired(),
      atRecordId: yup.string().notRequired(),
    })
    .notRequired()
    .nullable(),
  assignedNutritionist: yup
    .object()
    .shape({
      fullName: yup.string().notRequired(),
      emailUsername: yup.string().notRequired(),
      atRecordId: yup.string().notRequired(),
    })
    .notRequired()
    .nullable(),
  onboardStage: yup.string().nullable(),
  status: yup.string().nullable(),
  antaraId: yup.string().required(),
  verificationStatus: yup.string().nullable(),
})

export function StatusForm({ member, setIsEdited, onNext }: StatusFormProps) {
  const [initialValues, setInitialValues] = useState({})
  const {
    lookupOptions,
    antaraHNs,
    antaraMEs,
    isDataLoading,
    antaraNutritionists,
  } = useRegistrationForm()
  const { handleUpdateStatus } = useRegistrationData()
  const { notify } = useNotifications()
  const [userError, setUserError] = useState<string | null>(null)
  const analytics = useMemberAnalytics()

  useEffect(() => {
    if (member) {
      setInitialValues({
        assignedHn: member?.assignedHn || defaultValue.assignedHn,
        assignedMe: member?.assignedMe || defaultValue.assignedMe,
        assignedNutritionist:
          member?.assignedNutritionist || defaultValue.assignedNutritionist,
        onboardStage: member?.onboardStage || defaultValue.onboardStage,
        status: member?.status || defaultValue.status,
        antaraId: member?.antaraId,
        verificationStatus: member?.verificationStatus,
      })
    }
  }, [member])
  const handleSubmit = (values: any, formikBag: any) => {
    if (isDirty(initialValues, values)) {
      if (member) {
        handleUpdateStatus(member, values)
          .then(() => {
            analytics.trackProfileEdited(
              'Statuses and assignees updated',
              getChanges(initialValues, values)
            )
            notify('Statuses and assignees updated')
            onNext()
          })
          .catch((error) => {
            setUserError(error?.message)
            notify('Error updating status')
          })
          .finally(() => {
            formikBag.setSubmitting(false)
          })
      }
    } else {
      notify('Nothing to update')
      formikBag.setSubmitting(false)
      onNext()
    }
  }

  return (
    <div className="overflow">
      {!isDataLoading && Object.keys(initialValues).length > 0 && (
        <PrimaryForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, isValidating, setFieldValue, isValid }) => {
            return (
              <Form>
                <h3 className="text-dark-blue-100 text-base my-4 font-medium font-rubik">
                  {' '}
                  Status and assignees{' '}
                </h3>
                <FlexRow>
                  <SelectField
                    name="status"
                    label="Status"
                    options={lookupOptions?.memberStatuses}
                    placeholder="-- Select --"
                    handleBlur={() => {
                      setIsEdited(true)
                    }}
                    required={false}
                  />
                  <SelectField
                    name="onboardStage"
                    label="Onboard Stage"
                    options={lookupOptions?.onboardingStages}
                    placeholder="-- Select --"
                    handleBlur={() => {
                      setIsEdited(true)
                    }}
                  />
                </FlexRow>
                <SelectField
                  name="verificationStatus"
                  label="Verification Status"
                  options={[
                    { label: 'Unknown', value: 'Unknown' },
                    { label: 'Rejected', value: 'Rejected' },
                    { label: 'Verified', value: 'Verified' },
                    { label: 'Pending', value: 'Pending' },
                  ]}
                  placeholder="-- Select --"
                  handleBlur={() => {
                    setIsEdited(true)
                  }}
                  required={false}
                />
                <FlexRow>
                  <SelectField
                    name="assignedHn.emailUsername"
                    label="Assigned HN"
                    options={antaraHNs}
                    placeholder="-- Select --"
                    handleChange={(v) => {
                      const selectedHN = antaraHNs.find((hn) => hn.value === v)
                      setFieldValue('assignedHn.fullName', selectedHN?.label)
                      setFieldValue(
                        'assignedHn.atRecordId',
                        selectedHN?.recordId
                      )
                    }}
                    handleBlur={() => {
                      setIsEdited(true)
                    }}
                    required={false}
                  />

                  <SelectField
                    name="assignedMe.emailUsername"
                    label="Assigned ME"
                    options={antaraMEs}
                    placeholder="-- Select --"
                    handleChange={(v) => {
                      const selectedME = antaraMEs.find((me) => me.value === v)
                      setFieldValue('assignedMe.fullName', selectedME?.label)
                      setFieldValue(
                        'assignedMe.atRecordId',
                        selectedME?.recordId
                      )
                    }}
                    handleBlur={() => {
                      setIsEdited(true)
                    }}
                    required={false}
                  />
                </FlexRow>
                <SelectField
                  name="assignedNutritionist.emailUsername"
                  label="Assigned Nutritionist"
                  options={antaraNutritionists}
                  placeholder="-- Select --"
                  handleChange={(v) => {
                    const selected = antaraNutritionists.find(
                      (me) => me.value === v
                    )
                    setFieldValue(
                      'assignedNutritionist.fullName',
                      selected?.label
                    )
                    setFieldValue(
                      'assignedNutritionist.atRecordId',
                      selected?.recordId
                    )
                  }}
                  handleBlur={() => {
                    setIsEdited(true)
                  }}
                  required={false}
                />
                {userError && (
                  <ErrorComponent handleClose={() => setUserError(null)}>
                    {userError}
                  </ErrorComponent>
                )}

                <div className="mt-6">
                  <PrimaryButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting || isValidating || !isValid}
                    loading={isSubmitting || isValidating}
                  >
                    Submit
                  </PrimaryButton>
                </div>
              </Form>
            )
          }}
        </PrimaryForm>
      )}
    </div>
  )
}

export default StatusForm
