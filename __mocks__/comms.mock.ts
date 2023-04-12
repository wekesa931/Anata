export const mockLookups = {
  getCompanies: {
    edges: [
      {
        node: {
          name: 'Unknown',
        },
      },
      {
        node: {
          name: 'Food Mart',
        },
      },
    ],
  },
  healthPolicies: {
    edges: [
      {
        node: {
          healthPolicyId: '1',
          name: 'Gold',
        },
      },
      {
        node: {
          healthPolicyId: '2',
          name: 'Platinum',
        },
      },
    ],
  },
  phoneTypes: {
    edges: [
      {
        node: {
          phoneType: 'Unknown',
          phoneTypeId: '1',
        },
      },
      {
        node: {
          phoneType: 'Smart Phone',
          phoneTypeId: '35',
        },
      },
    ],
  },
  memberStatus: {
    edges: [
      {
        node: {
          status: 'Unknown',
        },
      },
      {
        node: {
          status: 'Active',
        },
      },
      {
        node: {
          status: 'Inactive',
        },
      },
    ],
  },
  maritalStatus: {
    edges: [
      {
        node: {
          maritalStatus: 'Unknown',
        },
      },
      {
        node: {
          maritalStatus: 'Single',
        },
      },
      {
        node: {
          maritalStatus: 'Married',
        },
      },
    ],
  },
  onboardStage: {
    edges: [
      {
        node: {
          onboardStage: 'Unknown',
        },
      },
      {
        node: {
          onboardStage: 'Onboarded',
        },
      },
      {
        node: {
          onboardStage: 'Not onboarded',
        },
      },
    ],
  },
  sex: {
    edges: [
      {
        node: {
          sex: 'Unknown',
        },
      },
      {
        node: {
          sex: 'Male',
        },
      },
      {
        node: {
          sex: 'Female',
        },
      },
    ],
  },
  benefits: {
    edges: [
      {
        node: {
          name: 'In Patient',
        },
      },
      {
        node: {
          name: 'Out Patient',
        },
      },
    ],
  },
  tags: {
    edges: [
      {
        node: {
          name: 'VIP',
        },
      },
    ],
  },
}

export const mockInsuranceCompanies = [
  {
    node: {
      name: 'Jubilee',
      email: 'ngowa@gmail.com',
      api: 'JUBILEE',
      phone: '+254743231908',
    },
  },
  {
    node: {
      name: 'APA',
      email: 'django@email.com',
      api: 'SMART',
      phone: '+254743231911',
    },
  },
]

export const mockv2Member = {
  node: {
    antaraId: 'JT8-F4H8',
    birthDate: '1997-11-07',
    details: {
      fullName: 'Shad Test Mwangi',
      firstName: 'Shad',
      middleName: 'Test',
      lastName: 'Mwangi',
      intercomUrl: null,
      intercomRecordId: null,
      intercomUserId: null,
      sex: {
        sex: 'Male',
      },
      maritalStatus: {
        maritalStatus: 'Single',
      },
      relationshipToPrimary: null,
    },
    phones: [
      {
        phone: '+254745231900',
        phoneType: {
          phoneType: 'Unknown',
        },
        priority: 0,
      },
    ],
    status: {
      startDate: '2022-11-24T21:06:39.024192+00:00',
      onboardStage: {
        onboardStage: 'Onboarded',
      },
      employer: {
        name: 'Food Mart',
      },
      assignedHn: 'antara@test2.staff',
      assignedHnFullName: 'Antara Test Staff',
      assignedMeEmailUsername: 'a',
      assignedHnEmailUsername: 'b',
      readyForCompanyOnboarding: false,
      readyForIndividualOnboarding: false,
      assignedMe: 'antara@test2.staff',
      tags: ['VIP'],
      status: {
        status: 'Inactive',
      },
    },
    dependents: [],
    contact: {
      memberAddresses: [
        {
          constituency: '',
          residentialAddress: 'I&M Bank Tower, Nairobi, Kenya',
          residentialCountry: null,
          residentialCounty: null,
          subCounty: null,
          residentialTown: null,
          deliveryInstructions: '',
          poBoxNumber: null,
          postCode: null,
          geolocation: 'ChIJNVNZydYQLxgRcohuKK-3Lt8',
          label: 'Office',
          latitude: -1.283333,
          longitude: 36.816667,
        },
        {
          constituency: '',
          residentialAddress: 'Ruaka, Kenya',
          residentialCountry: null,
          residentialCounty: null,
          subCounty: null,
          residentialTown: null,
          deliveryInstructions: 'A13',
          poBoxNumber: null,
          postCode: null,
          geolocation: 'ChIJDQT_EbgiLxgRAhSvnBHFkAk',
          label: 'Home',
          latitude: -1.283333,
          longitude: 36.816667,
        },
      ],
      email: 'mail@test.com',
      emergencyContactName: 'Shad',
      emergencyContactPhone: '+254743546563',
      emergencyContactRelationship: 'Cousin',
    },
    insuranceDetails: [
      {
        id: 'TWVtYmVySW5zdXJhbmNlVHlwZTo0Ng==',
        insuranceId: '23233',
        priority: 0,
        relationshipToPrincipalMember: 'Self',
        principalMemberInsuranceId: '23233a',
        insuranceCompany: {
          id: 'SW5zdXJhbmNlQ29tcGFueVR5cGU6Mg==',
          name: 'APA',
          logo: null,
        },
        memberPolicy: {
          healthPolicy: {
            name: 'Gold',
          },
        },
        benefitUtilizations: [
          {
            id: 'QmVuZWZpdFV0aWxpemF0aW9uVHlwZTo3',
            utilizedPortion: 0.0,
            benefit: {
              name: 'Optical',
              description: '',
              api: null,
              limit: null,
            },
          },
          {
            id: 'QmVuZWZpdFV0aWxpemF0aW9uVHlwZTo4',
            utilizedPortion: 0.0,
            benefit: {
              name: 'Dental',
              description: '',
              api: null,
              limit: null,
            },
          },
          {
            id: 'QmVuZWZpdFV0aWxpemF0aW9uVHlwZToxMA==',
            utilizedPortion: 0.0,
            benefit: {
              name: 'Out Patient',
              description: '',
              api: null,
              limit: null,
            },
          },
          {
            id: 'QmVuZWZpdFV0aWxpemF0aW9uVHlwZToxMQ==',
            utilizedPortion: 0.0,
            benefit: {
              name: 'In Patient',
              description: '',
              api: null,
              limit: null,
            },
          },
        ],
      },
    ],
  },
}

export const mockStaff = [
  {
    node: {
      id: 'SGVhbHRoTmF2aWdhdG9yVHlwZTox',
      fullName: 'Antara Test 2',
      emailUsername: 'antara@test.staff',
      historyUserIdField: null,
      slackId: null,
      phone: null,
    },
  },
  {
    node: {
      id: 'SGVhbHRoTmF2aWdhdG9yVHlwZToy',
      fullName: 'Antara Test Staff',
      emailUsername: 'antara@test2.staff',
      historyUserIdField: null,
      slackId: null,
      phone: null,
    },
  },
]

export const mockMutationSuccess = {
  data: {
    updateMemberAddress: {
      data: {
        addresses: [
          {
            constituency: '',
            geolocation: 'ChIJNVNZydYQLxgRcohuKK-3Lt8',
            residentialAddress: 'I&M Bank Tower, Nairobi, Kenya',
            label: 'Office',
            deliveryInstructions: '',
          },
          {
            constituency: '',
            geolocation: 'ChIJDQT_EbgiLxgRAhSvnBHFkAk',
            residentialAddress: 'Mirai Court Apartments, Ruaka, Kenya',
            label: 'Home',
            deliveryInstructions: 'A13',
          },
        ],
      },
      message:
        'No changes made to member addresses, all addresses already exist',
      errors: null,
      status: 200,
    },
    updateMemberStatus: {
      data: {
        employer: {
          name: 'Food Mart',
        },
        status: {
          status: 'Inactive',
        },
        onboardStage: {
          onboardStage: 'Onboarded',
        },
        tags: ['VIP'],
      },
      errors: null,
      message: 'Details already upto date for member JT8-F4H8',
      status: 200,
    },
    updateMemberStaff: {
      data: {
        assignedHn: 'antara@test2.staff',
        assignedMe: 'antara@test2.staff',
      },
      errors: null,
      message: 'No details to change',
      status: 200,
    },
    updateMemberDetails: {
      data: {
        member: {
          id: 'QmFzaWNNZW1iZXJUeXBlOjE=',
        },
        details: {
          firstName: 'Shad',
          lastName: 'Mwangi',
        },
      },
      errors: null,
      message: 'Member details already exist',
      status: 200,
    },
    updateMemberContact: {
      data: {
        email: 'mail@test.com',
        emergencyContactName: 'Shad',
        emergencyContactPhone: '+254743546563',
        emergencyContactRelationship: 'Cousin',
      },
      errors: null,
      status: 200,
      message: 'Successfully updated member contact',
    },
    updateMemberInsurance: {
      data: {
        insuranceDetails: [
          {
            insuranceCompany: {
              name: 'APA',
            },
            insuranceId: '23233',
            priority: 0,
            memberPolicy: {
              healthPolicy: {
                name: 'Gold',
              },
            },
          },
        ],
      },
      message: 'Insurance details updated succesfully',
      errors: null,
      status: 200,
    },
    updateMemberPhones: {
      data: {
        phones: [
          {
            priority: 0,
            phoneType: {
              phoneType: 'Unknown',
            },
            phone: '+254745231903',
          },
        ],
      },
      errors: null,
      message: 'Member phones updated successfully',
      status: 200,
    },
  },
}

export const mockMutationError = {
  data: {
    ...mockMutationSuccess.data,
    updateMemberInsurance: {
      data: null,
      message: 'Insurance details updated succesfully',
      errors: 'There was an error',
      status: 500,
    },
  },
}
