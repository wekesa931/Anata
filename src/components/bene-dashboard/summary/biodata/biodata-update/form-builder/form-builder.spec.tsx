/**
 * Use cases
 * 1. Form builder can render fields with the correct label and input type and row, groups
 * 2. Can render dynamic fields properly with add and remove button
 * 3. Field changes are propagated well
 */
import { fireEvent } from '@testing-library/react'
import React from 'react'
import renderWithRouter from '../../../../../../../__mocks__/custom-render.mock'
import FormBuilder from './form-builder.component'
import { FormFieldType } from './form-elements.component'

const mockFieldConfig: FormFieldType[] = [
  {
    id: 'ins-group',
    type: 'group',
    label: 'Insurance',
    dataIndex: '',
    editable: true,
    stateKey: 'memberInsurance',
    addButtonText: 'Add Insurance',
    showAddButton: true,
    index: 0,
    items: [
      {
        id: 'insurance',
        type: 'select',
        dataIndex: 'insuranceCompany',
        label: 'Insurance Company',
        options: [
          { label: 'Ins A', value: 'ia' },
          { label: 'Ins B', value: 'ib' },
        ],
        dynamic: true,
        stateKey: 'memberInsurance',
        index: 0,
      },
    ],
  },
  {
    id: 'basic_info-group',
    type: 'group',
    label: 'Basic info',
    dataIndex: '',
    stateKey: '',
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
        stateKey: '',
        label: '',
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
            options: [
              { label: 'Male', value: 'M' },
              { label: 'Female', value: 'F' },
            ],
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
        options: [
          { label: 'Single', value: 'SINGLE' },
          { label: 'Married', value: 'MARRIED' },
        ],
        stateKey: 'memberDetails',
      },
    ],
  },
  {
    id: 'group',
    label: 'Onboarding',
    dataIndex: '',
    type: 'group',
    stateKey: '',
    items: [
      {
        id: 'row',
        type: 'row',
        dataIndex: '',
        stateKey: '',
        items: [
          {
            id: 'onboardStage',
            type: 'select',
            dataIndex: 'onboardStage',
            options: [
              { label: 'Onboarding', value: 'onboarding' },
              { label: 'Active', value: 'active' },
            ],
            label: 'Onboarding Stage',
            stateKey: 'memberStatus',
          },
          {
            id: 'status',
            type: 'select',
            dataIndex: 'status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ],
            label: 'Member Status',
            stateKey: 'memberStatus',
          },
        ],
      },
    ],
  },

  {
    id: 'tags-grp',
    type: 'group',
    label: 'Tags',
    dataIndex: '',
    stateKey: '',
    items: [
      {
        id: 'tags',
        dataIndex: 'tags',
        type: 'select',
        multiple: true,
        options: [
          { label: 'VIP', value: 'VIP' },
          { label: 'High Risk', value: 'HIGH_RISK' },
          { label: 'Low Risk', value: 'LOW_RISK' },
        ],
        label: 'Choose tags',
        stateKey: 'memberStatus',
      },
    ],
  },
]

const mockInitialValues = {
  memberStatus: {
    onboardStage: 'onboarding',
    status: 'active',
  },
  memberPhones: [
    {
      phone: '08012345678',
      phoneType: 'mobile',
    },
    {
      phone: '08012145678',
      phoneType: 'home',
    },
  ],
  memberDetails: {
    firstName: 'John',
    middleName: 'Doe',
    lastName: 'Doe',
    birthDate: '1990-01-01',
    sex: 'M',
    maritalStatus: 'SINGLE',
  },
  memberInsurance: [],
}

const mockSetValue = jest.fn()
const mockSetIsEdited = jest.fn()

const { console } = global
beforeAll(() => {
  global.console = { ...global.console, error: jest.fn() }
})

afterAll(() => {
  global.console = console
})

describe('<FormBuilder />', () => {
  it('Render fields with correct label and input type', () => {
    const component = renderWithRouter(
      <FormBuilder
        values={mockInitialValues}
        setFieldValue={mockSetValue}
        setIsEdited={mockSetIsEdited}
        formFields={mockFieldConfig}
        errors={{}}
      />
    )

    // check that text field can be filled
    const firstNameInput = component.getByRole('textbox', {
      name: 'First Name',
    })
    expect(firstNameInput).toBeInTheDocument()
    expect(firstNameInput).toHaveValue('John')
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } })
    expect(mockSetValue).toHaveBeenCalledWith('memberDetails', {
      ...mockInitialValues.memberDetails,
      firstName: 'Jane',
    })

    // check that date field can be filled
    const dobInput = component.getByRole('textbox', { name: 'Date of Birth' })
    expect(dobInput).toBeInTheDocument()
    expect(dobInput).toHaveValue('01/01/1990')
    fireEvent.change(dobInput, { target: { value: '02/01/1990' } })
    expect(mockSetValue).toHaveBeenCalledWith('memberDetails', {
      ...mockInitialValues.memberDetails,
      birthDate: '1990-02-01',
    })

    // test select input field can be filled
    const sexInput = component.getByLabelText('Sex')
    fireEvent.mouseDown(sexInput)
    fireEvent.click(component.getByText('Female'))
    expect(mockSetValue).toHaveBeenCalledWith('memberDetails', {
      ...mockInitialValues.memberDetails,
      sex: 'F',
    })

    // test select input with multiple options can be filled
    const tagsInput = component.getByLabelText('Choose tags')
    fireEvent.mouseDown(tagsInput)
    fireEvent.click(component.getByText('High Risk'))
    fireEvent.click(component.getByText('Low Risk'))
    expect(mockSetValue).toHaveBeenCalledWith('memberStatus', {
      ...mockInitialValues.memberStatus,
      tags: ['HIGH_RISK', 'LOW_RISK'],
    })
  })

  it('renders correct controls for dynamic elements', () => {
    const component = renderWithRouter(
      <FormBuilder
        values={mockInitialValues}
        setFieldValue={mockSetValue}
        setIsEdited={mockSetIsEdited}
        formFields={mockFieldConfig}
        errors={{}}
      />
    )

    const addInsurance = component.getByText('+ Add Insurance')
    expect(addInsurance).toBeInTheDocument()
    expect(
      component.queryByLabelText('Remove Insurance')
    ).not.toBeInTheDocument()
    fireEvent.click(addInsurance)
    expect(component.getAllByText('Insurance').length).toBe(2)
    const removeButtons = component.queryAllByLabelText('Remove Insurance')
    expect(removeButtons.length).toBe(2)
    expect(component.getAllByText('+ Add Insurance').length).toBe(1)
    // click remove
    const removeButton = removeButtons[0]
    fireEvent.click(removeButton)
    expect(
      component.queryByLabelText('Remove Insurance')
    ).not.toBeInTheDocument()
    expect(component.getAllByText('+ Add Insurance').length).toBe(1)
  })
})
