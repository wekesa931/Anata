import React, { useState, useEffect } from 'react'
import ErrorIcon from '@mui/icons-material/Error'
import { startCase, toLower } from 'lodash'
import * as Yup from 'yup'
import { useLazyQuery } from '@apollo/client'
import FormBuilder from './form-builder/form-builder.component'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'
import constituencies from './constituencies.json'
import { useMember } from '../../../../../context/member.context'
import {
  GET_INSURANCE_COMPANIES,
  LOOKUP_ENTRIES_QUERY,
} from '../../../../../gql/comms'
import { GET_ANTARA_STAFF } from '../../../../../gql/staff'
import createApolloClient from '../../../../../resources/apollo-client'
import logError from '../../../../utils/Bugsnag/Bugsnag'

const constituencyOptions = [...new Set(constituencies.map((c) => c.name))].map(
  (c) => startCase(toLower(c))
)

type MemberDetailsProps = {
  errors: any
  values: any
  setFieldValue: (name: string, v: any) => any
  handleChange: (v: any) => any
  isMemberLoading: boolean
}

type LookupOption = {
  label: string
  value: string
}

type LoadingData = {
  staffLoading: boolean
  insuranceLoading: boolean
  lookupLoading: boolean
}

const phoneRe = /^(\+254|0)\d{9}$/

export const memberDetailsValidationSchema = Yup.object().shape({
  memberDetails: Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  }),
  memberPhones: Yup.array().of(
    Yup.object().shape({
      phone: Yup.string().matches(phoneRe, 'Invalid phone format.'),
    })
  ),
  memberContact: Yup.object().shape({
    email: Yup.string().email('Invalid email'),
    emergencyContactPhone: Yup.string()
      .matches(phoneRe, 'Invalid phone format.')
      .nullable(),
  }),
  memberInsurance: Yup.array().of(
    Yup.object().shape({
      insuranceCompany: Yup.string().when('toDelete', {
        is: (val: any) => !val,
        then: Yup.string().required('Insurance company is required'),
      }),
      insuranceId: Yup.string().when(['insuranceCompany', 'toDelete'], {
        is: (val: string, toDelete: any) => val !== '' && !toDelete,
        then: Yup.string().required('Insurance ID is required'),
      }),
    })
  ),
})

export const createInitialFormState = (member: any = {}) => {
  const getInsurancesState = () => {
    const insuranceDetails = member?.insuranceDetails || []

    return insuranceDetails.map((e: any) => ({
      insuranceCompany: e?.insuranceCompany?.name,
      insuranceId: e?.insuranceId,
      benefits: e?.benefitUtilizations?.map((b: any) => b?.benefit?.name),
      priority: e?.priority,
      healthPolicy: e?.memberPolicy?.healthPolicy?.name,
    }))
  }

  // // get the memberAddress information
  const getMemberAddress = () => {
    const memberAddresses = member?.memberAddresses || []
    let constituency = ''

    const addresses = memberAddresses.map((e: any) => {
      if (e?.constituency) {
        constituency = e?.constituency
      }

      return {
        residentialAddress: {
          description: e?.residentialAddress,
          place_id: e?.geolocation,
        },
        label: e?.label,
        deliveryInstructions: e?.deliveryInstructions,
      }
    })

    // filter out addresses with null geolocation
    const filteredAddresses = addresses.filter(
      (e: any) => e?.residentialAddress?.place_id
    )

    return filteredAddresses.map((a: any, i: number) => ({
      ...a,
      constituency,
      priority: i,
    }))
  }

  return {
    memberDetails: {
      birthDate: member?.birthDate,
      firstName: member?.firstName,
      lastName: member?.lastName,
      middleName: member?.middleName,
      sex: member?.sex,
      maritalStatus: member?.maritalStatus,
    },
    memberPhones: member?.phones,
    memberContact: {
      email: member?.email,
      constituency: member?.constituency,
      emergencyContactName: member?.emergencyContactName,
      emergencyContactPhone: member?.emergencyContactPhone,
      emergencyContactRelationship: member?.emergencyContactRelationship,
    },
    memberInsurance: [...getInsurancesState()],
    memberAddress: [...getMemberAddress()],
    memberStatus: {
      onboardStage: member?.onboardStage,
      status: member?.status,
      employer: member?.employer,
      tags: member?.tags,
    },
    memberStaff: {
      assignedHn: member?.assignedHn,
      assignedMe: member?.assignedMe,
    },
  }
}

const cleanObject = (obj: any) => {
  const cleanedObj = { ...obj }
  Object.keys(cleanedObj).forEach((key) => {
    if (cleanedObj[key] === undefined || cleanedObj[key] === null) {
      cleanedObj[key] = ''
    } else if (typeof cleanedObj[key] === 'object') {
      if (Array.isArray(cleanedObj[key])) {
        cleanedObj[key] = cleanedObj[key].map((e: any) => {
          if (typeof e === 'object') {
            return cleanObject(e)
          }
          return e
        })
      } else {
        cleanedObj[key] = cleanObject(cleanedObj[key])
      }
    }
  })
  return cleanedObj
}

const prepareData = (vars: any, antaraId: string) => {
  const inputVariables = { ...vars }

  if (inputVariables.memberPhones) {
    inputVariables.memberPhones = {
      phones: inputVariables.memberPhones,
      antaraId,
    }
  }

  if (inputVariables.memberInsurance) {
    inputVariables.memberInsurance = inputVariables.memberInsurance.filter(
      (e: any) => e.insuranceCompany !== '' && e.insuranceId !== ''
    )

    inputVariables.memberInsurance = {
      insuranceDetails: inputVariables.memberInsurance.map((ins: any) => ({
        ...(!!ins.benefits && { benefits: ins.benefits }),
        ...(!!ins.healthPolicy && { healthPolicy: ins.healthPolicy }),
        insuranceCompany: ins.insuranceCompany,
        insuranceId: ins.insuranceId,
        priority: ins.priority,
        toDelete: !!ins?.toDelete,
      })),
      antaraId,
    }
  }

  if (inputVariables.memberAddress) {
    inputVariables.memberAddress = {
      addresses: inputVariables.memberAddress.map((e: any) => ({
        ...e,
        geolocation: e?.residentialAddress?.place_id,
        residentialAddress: e?.residentialAddress?.description,
      })),
      antaraId,
    }

    // omit the key priority from addresses in memberAddress
    inputVariables.memberAddress.addresses.forEach((e: any) => {
      delete e.priority
    })
  }

  Object.keys(inputVariables).forEach((key) => {
    if (key !== 'antaraId') {
      inputVariables[key] = {
        ...inputVariables[key],
        antaraId,
      }
    }
  })

  return inputVariables
}

export const parseMemberInputData = (vars: any, antaraId: string) => {
  return prepareData(cleanObject(vars), antaraId)
}

export const handleFormSubmissionErrors = (data: any) => {
  const errors = Object.keys(data).filter((key) => data[key].errors)
  const errorMessages = errors.map(
    (e) =>
      `There was an error updating ${e
        .replace('update', '')
        .replace('Member', '')}`
  )

  return errorMessages
}

const apolloClient = createApolloClient(true)

/**
 * Parse the details into a selectable elements
 * @param data - graphql response for fetch company details
 */

const parseDataToOptions = (data: any, key: string) => {
  const raw: any[] = data?.edges

  return raw?.map((e) => ({ label: e?.node[key], value: e?.node[key] }))
}

function MemberDetailsUpdateForm({
  errors,
  values,
  handleChange,
  setFieldValue,
  isMemberLoading,
}: MemberDetailsProps) {
  const { v2Member, errorLoadingMember } = useMember()
  const [companies, setCompanies] = useState<any[]>([])
  const [healthPolicies, setHealthPolicies] = useState<LookupOption[]>([])
  const [phoneTypes, setPhoneTypes] = useState<LookupOption[]>([])
  const [memberStatus, setMemberStatus] = useState<LookupOption[]>([])
  const [insuranceCompanies, setInsuranceCompanies] = useState<LookupOption[]>(
    []
  )
  const [onboardingStages, setOnboardingStages] = useState<LookupOption[]>([])
  const [sexOptions, setSexOptions] = useState<LookupOption[]>([])
  const [maritalStatus, setMaritalStatus] = useState<LookupOption[]>([])
  const [benefits, setBenefits] = useState<LookupOption[]>([])
  const [antaraStaff, setAntaraStaff] = useState<LookupOption[]>([])
  const [tags, setTags] = useState<LookupOption[]>([])
  const [dataLoading, setDataLoading] = useState<LoadingData>({
    staffLoading: true,
    insuranceLoading: true,
    lookupLoading: true,
  })

  const parseLookupEntries = (rawLookupData: any) => {
    setCompanies(parseDataToOptions(rawLookupData?.getCompanies, 'name'))
    setHealthPolicies(parseDataToOptions(rawLookupData?.healthPolicies, 'name'))
    setMemberStatus(parseDataToOptions(rawLookupData?.memberStatus, 'status'))
    setOnboardingStages(
      parseDataToOptions(rawLookupData?.onboardStage, 'onboardStage')
    )
    setSexOptions(parseDataToOptions(rawLookupData?.sex, 'sex'))
    setMaritalStatus(
      parseDataToOptions(rawLookupData?.maritalStatus, 'maritalStatus')
    )
    setPhoneTypes(parseDataToOptions(rawLookupData?.phoneTypes, 'phoneType'))
    setBenefits(parseDataToOptions(rawLookupData?.benefits, 'name'))
    setTags(parseDataToOptions(rawLookupData?.tags, 'name'))
  }

  const [getLookupEntries] = useLazyQuery(LOOKUP_ENTRIES_QUERY, {
    client: apolloClient,
    onCompleted: (data) => {
      setDataLoading((prev) => ({ ...prev, lookupLoading: false }))
      parseLookupEntries(data)
    },
    onError: (error) => {
      setDataLoading((prev) => ({ ...prev, lookupLoading: false }))
      logError(error)
    },
  })
  const [getInsurances] = useLazyQuery(GET_INSURANCE_COMPANIES, {
    onCompleted: (data) => {
      setDataLoading((prev) => ({ ...prev, insuranceLoading: false }))
      setInsuranceCompanies(
        parseDataToOptions(data?.insuranceCompanies, 'name')
      )
    },
    onError: (error) => {
      setDataLoading((prev) => ({ ...prev, insuranceLoading: false }))
      logError(error)
    },
  })

  const [getAntaraStaff] = useLazyQuery(GET_ANTARA_STAFF, {
    onCompleted: (data) => {
      setDataLoading((prev) => ({ ...prev, staffLoading: false }))
      setAntaraStaff(
        data?.antaraStaff?.edges.map((staff: any) => ({
          label: staff?.node?.fullName,
          value: staff?.node?.emailUsername,
        }))
      )
    },
    onError: (error) => {
      setDataLoading((prev) => ({ ...prev, staffLoading: false }))
      logError(error)
    },
  })

  useEffect(() => {
    getLookupEntries()
    getInsurances()
    getAntaraStaff()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // create a list of form fields given initial state and form field data and return the form fields or a default form field
  const createFormFields = (initialState: any = [], formField: any) => {
    // create a formField given the index and boolean showAddButton default true  and assign the index to the object and all items key in the
    const createFormField = (index = 0, showAddButton = true) => {
      return {
        ...formField,
        index,
        showAddButton,
        id: `${formField.id}-${index}`,
        label: index ? `${formField.label} ${index}` : formField.label,
        items: formField.items.map((item: any) => {
          return {
            ...item,
            index,
            id: `${formField.id}-${index}`,
            label: item.label,
          }
        }),
      }
    }

    if (initialState.length === 0) {
      return [createFormField()]
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return initialState.map((item: any, index: number) => {
      return createFormField(index, index === initialState.length - 1)
    })
  }

  const insuranceField = {
    id: 'ins-group',
    type: 'group',
    label: 'Insurance',
    dataIndex: '',
    editable: true,
    stateKey: 'memberInsurance',
    addButtonText: 'Add Insurance',
    items: [
      {
        id: 'insurance',
        type: 'select',
        dataIndex: 'insuranceCompany',
        label: 'Insurance Company',
        options: insuranceCompanies,
        dynamic: true,
        stateKey: 'memberInsurance',
      },
      {
        id: 'ins-id',
        type: 'text',
        dataIndex: 'insuranceId',
        label: 'Insurance Id',
        dynamic: true,
        stateKey: 'memberInsurance',
      },
      {
        id: 'cover',
        type: 'select',
        dataIndex: 'healthPolicy',
        label: 'Health Policy',
        options: healthPolicies,
        dynamic: true,
        stateKey: 'memberInsurance',
      },
      {
        id: 'ben',
        type: 'select',
        dataIndex: 'benefits',
        label: 'Benefits, riders e.t.c',
        options: benefits,
        multiple: true,
        dynamic: true,
        stateKey: 'memberInsurance',
      },
    ],
  }

  const insuranceFields = createFormFields(
    v2Member?.insuranceDetails || [],
    insuranceField
  )

  const phoneField = {
    id: 'phone-numbers-grp',
    type: 'row',
    dataIndex: '',
    editable: true,
    stateKey: 'memberPhones',
    addButtonText: 'Add Phone Number',
    items: [
      {
        id: 'phone-group',
        type: 'text',
        dataIndex: 'phone',
        label: 'Phone',
        dynamic: true,
        stateKey: 'memberPhones',
      },
      {
        id: 'phoneType',
        type: 'select',
        dataIndex: 'phoneType',
        label: 'Phone Type',
        options: phoneTypes,
        dynamic: true,
        stateKey: 'memberPhones',
      },
    ],
  }
  const phoneFields = createFormFields(v2Member?.phones || [], phoneField)

  const addressField = {
    id: 'address-1-grp',
    type: 'group',
    dataIndex: '',
    label: 'Address',
    editable: true,
    showAddButton: true,
    stateKey: 'memberAddress',
    addButtonText: 'Add Address',
    items: [
      {
        id: 'residentialAddress',
        type: 'places',
        dataIndex: 'residentialAddress',
        label: 'Residential Address',
        dynamic: true,
        stateKey: 'memberAddress',
      },
      {
        id: 'addressLabel',
        type: 'select',
        dataIndex: 'label',
        label: 'Address Label',
        helperText: 'Use one label for each address (Home, Office, Other)',
        dynamic: true,
        stateKey: 'memberAddress',
        options: [
          { value: 'Home', label: 'Home' },
          { value: 'Office', label: 'Office' },
          { value: 'Work', label: 'Work' },
          { value: 'Other', label: 'Other' },
        ],
      },
      {
        id: 'deliveryInstructions',
        type: 'textarea',
        dataIndex: 'deliveryInstructions',
        label: 'Delivery Instruction',
        dynamic: true,
        stateKey: 'memberAddress',
      },
    ],
  }
  const addressFields = createFormFields(
    v2Member?.memberAddresses || [],
    addressField
  )

  // v2 form configuration
  const formFields = [
    {
      id: 'group',
      label: 'Onboarding',
      dataIndex: '',
      type: 'group',
      items: [
        {
          id: 'row',
          type: 'row',
          dataIndex: '',
          items: [
            {
              id: 'onboardStage',
              type: 'select',
              dataIndex: 'onboardStage',
              options: onboardingStages,
              label: 'Onboarding Stage',
              stateKey: 'memberStatus',
            },
            {
              id: 'status',
              type: 'select',
              dataIndex: 'status',
              options: memberStatus,
              label: 'Member Status',
              stateKey: 'memberStatus',
            },
          ],
        },
      ],
    },
    {
      id: 'hn_me-group',
      label: 'HN & ME',
      dataIndex: '',
      type: 'group',
      items: [
        {
          id: 'hn_me-row',
          type: 'row',
          dataIndex: '',
          items: [
            {
              id: 'lead-hn',
              type: 'select',
              dataIndex: 'assignedHn',
              label: 'Assigned HN',
              options: antaraStaff,
              stateKey: 'memberStaff',
            },
            {
              id: 'assigned-me',
              type: 'select',
              dataIndex: 'assignedMe',
              label: 'Assigned ME',
              options: antaraStaff,
              stateKey: 'memberStaff',
            },
          ],
        },
      ],
    },
    {
      id: 'basic_info-group',
      type: 'group',
      label: 'Basic info',
      dataIndex: '',
      items: [
        {
          id: 'first_name',
          type: 'text',
          label: 'First name',
          dataIndex: 'firstName',
          required: true,
          stateKey: 'memberDetails',
        },
        {
          id: 'middle_name',
          type: 'text',
          dataIndex: 'middleName',
          label: 'Middle Name',
          stateKey: 'memberDetails',
        },
        {
          id: 'last_name',
          type: 'text',
          dataIndex: 'lastName',
          label: 'Last Name',
          required: true,
          stateKey: 'memberDetails',
        },
        {
          id: 'birth_sex-row',
          type: 'row',
          dataIndex: '',
          items: [
            {
              id: 'dob',
              type: 'date',
              dataIndex: 'birthDate',
              label: 'Date of Birth',
              stateKey: 'memberDetails',
            },
            {
              id: 'sex',
              type: 'select',
              dataIndex: 'sex',
              options: sexOptions,
              label: 'Sex',
              stateKey: 'memberDetails',
            },
          ],
        },
        {
          id: 'maritalStatus',
          type: 'select',
          dataIndex: 'maritalStatus',
          label: 'Marital Status',
          options: maritalStatus,
          stateKey: 'memberDetails',
        },
      ],
    },
    {
      id: 'occ-group',
      type: 'group',
      label: 'Occupation',
      dataIndex: '',
      items: [
        {
          id: 'employer',
          type: 'autocomplete',
          dataIndex: 'employer',
          label: 'Employer',
          options: companies.map((c: any) => c.value),
          stateKey: 'memberStatus',
        },
      ],
    },
    ...insuranceFields,
    {
      id: 'contact-info-group',
      type: 'group',
      dataIndex: '',
      label: 'Contact info',
      items: [
        {
          id: 'email',
          type: 'text',
          dataIndex: 'email',
          label: 'Email 1',
          stateKey: 'memberContact',
        },
        ...phoneFields,
      ],
    },
    {
      id: 'emergency-id',
      dataIndex: '',
      type: 'group',
      label: 'Emergency | Next of kin, etc.',
      items: [
        {
          id: 'emergencyContactName',
          type: 'text',
          dataIndex: 'emergencyContactName',
          label: 'Emergency Contact Name',
          stateKey: 'memberContact',
        },
        {
          id: 'emergencyContactPhone',
          type: 'text',
          dataIndex: 'emergencyContactPhone',
          label: 'Emergency Contact Phone',
          stateKey: 'memberContact',
        },
        {
          id: 'emergencyContactRelationship',
          type: 'autocomplete',
          dataIndex: 'emergencyContactRelationship',
          label: 'Emergency Contact Relationship',
          stateKey: 'memberContact',
          options: [
            'Aunt',
            'Brother',
            'Child',
            'Cousin',
            'Employer',
            'Father',
            'Friend',
            'Guardian',
            'Husband',
            'Mother',
            'Parent',
            'Sibling',
            'Sister',
            'Son',
            'Spouse',
            'Uncle',
            'Wife',
            'Other',
          ],
        },
      ],
    },
    {
      id: 'address-grp',
      dataIndex: '',
      type: 'group',
      label: 'Constituency',
      items: [
        {
          id: 'constituency',
          type: 'autocomplete',
          dataIndex: 'constituency',
          label: 'Constituency',
          options: constituencyOptions,
          stateKey: 'memberAddress',
          index: 0,
          dynamic: true,
          showAddButton: false,
        },
      ],
    },
    ...addressFields,
    {
      id: 'tags-grp',
      type: 'group',
      label: 'Tags',
      dataIndex: '',
      items: [
        {
          id: 'tags',
          dataIndex: 'tags',
          type: 'select',
          multiple: true,
          options: tags,
          label: 'Choose tags',
          stateKey: 'memberStatus',
        },
      ],
    },
  ]

  const isDataLoading = Object.values(dataLoading).some((e) => e)

  return (
    <div>
      {isDataLoading || isMemberLoading ? (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small">Loading Member Data...</p>
        </div>
      ) : (
        <>
          {errorLoadingMember || !v2Member ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'start',
                padding: '2rem',
              }}
            >
              <ErrorIcon color="error" />

              <p style={{ marginLeft: '1rem', color: `var(--red-100)` }}>
                There was a problem loading this member details from v2 schema.
              </p>
            </div>
          ) : (
            <FormBuilder
              formFields={formFields}
              errors={errors}
              values={values}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          )}
        </>
      )}
    </div>
  )
}

export default MemberDetailsUpdateForm
