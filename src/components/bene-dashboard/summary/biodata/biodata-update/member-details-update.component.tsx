import React from 'react'
import ErrorIcon from '@mui/icons-material/Error'
import FormBuilder from './form-builder/form-builder.component'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'

const validatePhoneNumber = (
  dataIndex: string,
  phone: string,
  required = true
) => {
  const result: any = { [dataIndex]: null }

  if (!phone || (phone === '' && required)) {
    result[dataIndex] = 'Phone is required'
  } else {
    // check format
    const re = /^(\+254|0)\d{9}$/
    if (!re.test(phone)) {
      result[dataIndex] = 'Invalid phone format'
    }
  }

  return result
}

const validateEmail = (dataIndex: string, email: string, required = true) => {
  const result: any = { [dataIndex]: null }

  if (!email || (email === '' && required)) {
    result[dataIndex] = 'Email is required'
  } else {
    /* eslint-disable no-useless-escape */
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(email)) {
      result[dataIndex] = 'Invalid email address'
    }
  }

  return result
}

type MemberDetailsProps = {
  setIsFormEdited: (edited: boolean) => void
  memberDetails: any
  isEdited: boolean
}

const MemberDetailsUpdateForm = ({
  setIsFormEdited,
  memberDetails,
  isEdited,
}: MemberDetailsProps) => {
  const {
    v2Member,
    isDataLoading,
    companies,
    submitting,
    formErrors,
    handleSubmit,
  } = memberDetails

  // v2 form configuration
  const formFields = [
    {
      id: 'antara_id',
      readOnly: true,
      dataIndex: 'antaraId',
      type: 'text',
    },
    {
      id: 'first_name',
      type: 'text',
      dataIndex: 'firstName',
      label: 'First Name',
      required: true,
    },
    {
      id: 'middle_name',
      type: 'text',
      dataIndex: 'middleName',
      label: 'Middle Name',
    },
    {
      id: 'last_name',
      type: 'text',
      dataIndex: 'lastName',
      label: 'Last Name',
      required: true,
    },
    {
      id: 'dob',
      type: 'date',
      dataIndex: 'birthDate',
      label: 'Date of Birth',
    },
    {
      id: 'sex',
      type: 'select',
      dataIndex: 'sex',
      options: [
        // 'Male', 'Female'
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ],
      label: 'Sex',
    },
    {
      id: 'phone',
      type: 'text',
      dataIndex: 'phone',
      label: 'Phone 1',
      validator: validatePhoneNumber,
    },
    {
      id: 'phoneType',
      type: 'text',
      dataIndex: 'phoneType',
      label: 'Phone Type',
    },
    {
      id: 'email',
      type: 'text',
      dataIndex: 'email',
      label: 'Email 1',
      validator: validateEmail,
    },
    {
      id: 'maritalStatus',
      type: 'select',
      dataIndex: 'maritalStatus',
      label: 'Marital Status',
      options: [
        // 'Single', 'Married', 'Divorced
        { label: 'Single', value: 'Single' },
        { label: 'Married', value: 'Married' },
        { label: 'Divorced', value: 'Divorced' },
      ],
    },
    {
      id: 'constituency',
      type: 'text',
      dataIndex: 'constituency',
      label: 'Constituency',
    },
    {
      id: 'poBoxNumber',
      type: 'number',
      dataIndex: 'poBoxNumber',
      label: 'PO Box Number',
    },
    {
      id: 'postCode',
      type: 'number',
      dataIndex: 'postCode',
      label: 'Post Code',
    },
    {
      id: 'emergencyContactName',
      type: 'text',
      dataIndex: 'emergencyContactName',
      label: 'Emergency Contact Name',
    },
    {
      id: 'emergencyContactPhone',
      type: 'text',
      dataIndex: 'emergencyContactPhone',
      label: 'Emergency Contact Phone',
      validator: validatePhoneNumber,
    },
    {
      id: 'emergencyContactRelationship',
      type: 'text',
      dataIndex: 'emergencyContactRelationship',
      label: 'Contact Relationship',
    },
    {
      id: 'employer',
      type: 'select',
      dataIndex: 'employer',
      label: 'Employer',
      options: companies,
    },
    {
      id: 'onboardStage',
      type: 'select',
      dataIndex: 'onboardStage',
      options: [
        { label: 'Unscheduled Baseline', value: 'Unscheduled Baseline' },
        { label: 'Scheduled Baseline', value: 'Scheduled Baseline' },
        { label: 'Onboarded', value: 'Onboarded' },
      ],
      label: 'Onboarding Stage',
    },
    {
      id: 'residentialAddress',
      type: 'text',
      dataIndex: 'residentialAddress',
      label: 'Residential Address',
    },
    {
      id: 'residentialCounty',
      type: 'text',
      dataIndex: 'residentialCounty',
      label: 'Residential County',
    },
    {
      id: 'residentialTown',
      type: 'text',
      dataIndex: 'residentialTown',
      label: 'Residential Town',
    },
    {
      id: 'residentialCountry',
      type: 'text',
      dataIndex: 'residentialCountry',
      label: 'Residential Country',
    },
    {
      id: 'deliveryInstructions',
      type: 'textarea',
      dataIndex: 'deliveryInstructions',
      label: 'Delivery Instruction',
    },
  ]

  return (
    <div>
      {isDataLoading ? (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small">Loading Member Data</p>
        </div>
      ) : (
        <>
          {v2Member ? (
            <FormBuilder
              formFields={formFields}
              initialValues={v2Member}
              onSubmit={handleSubmit}
              isLoading={submitting}
              formErrors={formErrors}
              setIsFormEdited={setIsFormEdited}
              isEdited={isEdited}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'start',
                padding: '2rem',
              }}
            >
              <ErrorIcon color="error" />

              <p style={{ marginLeft: '1rem', color: `var(--red-100)` }}>
                Member with Antara ID {memberDetails?.member['Antara ID']} not
                found in v2Schema database.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MemberDetailsUpdateForm
