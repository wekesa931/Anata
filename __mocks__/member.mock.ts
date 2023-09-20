export const mockMember = {
  data: {
    member: {
      edges: [
        {
          node: {
            antaraId: 'TEST-1234',
            details: {
              firstName: 'John',
              lastName: 'Doe',
              middleName: 'Smith',
              airtableRecordId: 'rec123',
            },
            contact: {
              email: 'test@mail.com',
            },
          },
        },
      ],
    },
  },
}

export const mockStaffResponse = {
  data: {
    antaraStaff: {
      edges: [
        {
          node: {
            email: 'test@mail.com',
            emailUsername: 'test',
            fullName: 'John Doe',
            atRecordId: 'rec123',
            team: 'Test Team',
            id: 1,
          },
        },
      ],
    },
  },
}
