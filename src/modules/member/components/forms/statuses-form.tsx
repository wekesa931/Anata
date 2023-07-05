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
import { isDirty } from 'src/utils/form-validation-methods'
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
}

const validationSchema = yup.object().shape({
  assignedHn: yup.object().shape({
    fullName: yup.string().required('Required'),
    emailUsername: yup.string().required('Required'),
    atRecordId: yup.string().required('Required'),
  }),
  assignedMe: yup.object().shape({
    fullName: yup.string().required('Required'),
    emailUsername: yup.string().required('Required'),
    atRecordId: yup.string().required('Required'),
  }),
  assignedNutritionist: yup.object().shape({
    fullName: yup.string().required('Required'),
    emailUsername: yup.string().required('Required'),
    atRecordId: yup.string().required('Required'),
  }),
  onboardStage: yup.string().required('Required'),
  status: yup.string().required('Required'),
  antaraId: yup.string().required('Required'),
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
      })
    }
  }, [member])

  const handleSubmit = (values: any, formikBag: any) => {
    if (isDirty(initialValues, values)) {
      if (member) {
        handleUpdateStatus(member, values)
          .then(() => {
            notify('Statuses and assignees updated')
            onNext()
          })
          .catch(() => {
            notify('Error updating status')
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
          {({ isSubmitting, isValidating, setFieldValue }) => {
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
                  />

                  <SelectField
                    name="assignedMe.emailUsername"
                    label="Assigned ME"
                    options={antaraMEs}
                    placeholder="-- Select --"
                    handleChange={(v) => {
                      const selectedME = antaraMEs.find((me) => me.value === v)
                      setFieldValue('assignedMe.name', selectedME?.label)
                      setFieldValue(
                        'assignedMe.atRecordId',
                        selectedME?.recordId
                      )
                    }}
                    handleBlur={() => {
                      setIsEdited(true)
                    }}
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
                    setFieldValue('assignedNutritionist.name', selected?.label)
                    setFieldValue(
                      'assignedNutritionist.atRecordId',
                      selected?.recordId
                    )
                  }}
                  handleBlur={() => {
                    setIsEdited(true)
                  }}
                />

                <div className="mt-6">
                  <PrimaryButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting || isValidating}
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
