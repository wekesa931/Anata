const relationshipOptions = [
  'Self',
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
]

export type LookupOption = {
  label: string
  value: string
}

type LookupData = {
  v2Member: any
  insuranceCompanies: LookupOption[]
  companies: string[]
  healthPolicies: LookupOption[]
  benefits: LookupOption[]
  phoneTypes: LookupOption[]
  onboardingStages: LookupOption[]
  memberStatus: any[]
  antaraHNs: LookupOption[]
  antaraMEs: LookupOption[]
  tags: LookupOption[]
  sexOptions: LookupOption[]
  maritalStatus: LookupOption[]
}

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

export const getFormFields = (lookups: LookupData) => {
  const {
    v2Member,
    insuranceCompanies,
    companies,
    healthPolicies,
    benefits,
    phoneTypes,
    onboardingStages,
    memberStatus,
    antaraHNs,
    antaraMEs,
    tags,
    maritalStatus,
    sexOptions,
  } = lookups

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
      {
        id: 'princ',
        type: 'text',
        dataIndex: 'principalMemberInsuranceId',
        label: 'Principal Member Insurance Id',
        dynamic: true,
        stateKey: 'memberInsurance',
      },
      {
        id: 'rel',
        type: 'autocomplete',
        dataIndex: 'relationshipToPrincipalMember',
        label: 'Relationship to Principal Member',
        options: relationshipOptions,
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
        id: 'residentialAddress',
        type: 'places',
        dataIndex: 'residentialAddress',
        label: 'Address',
        dynamic: true,
        stateKey: 'memberAddress',
      },
      {
        id: 'deliveryInstructions',
        type: 'textarea',
        dataIndex: 'deliveryInstructions',
        label: 'Delivery Instruction',
        dynamic: true,
        stateKey: 'memberAddress',
      },
      {
        id: 'residentialCounty',
        type: 'text',
        dataIndex: 'residentialCounty',
        label: 'County',
        dynamic: true,
        stateKey: 'memberAddress',
        disabled: true,
      },
      {
        id: 'residentialTown',
        type: 'text',
        dataIndex: 'residentialTown',
        label: 'Town',
        dynamic: true,
        stateKey: 'memberAddress',
        disabled: true,
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
              options: antaraHNs,
              stateKey: 'memberStaff',
            },
            {
              id: 'assigned-me',
              type: 'select',
              dataIndex: 'assignedMe',
              label: 'Assigned ME',
              options: antaraMEs,
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
          label: 'First Name',
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
          options: companies,
          stateKey: 'memberStatus',
        },
      ],
    },
    {
      id: 'primary-member-group',
      type: 'group',
      label: 'Primary Member',
      dataIndex: '',
      items: [
        {
          id: 'primaryMember',
          type: 'search',
          dataIndex: 'primaryMemberAntaraId',
          label: 'Primary Member',
          stateKey: 'memberDetails',
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
          options: relationshipOptions,
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

  return formFields
}

export default getFormFields
