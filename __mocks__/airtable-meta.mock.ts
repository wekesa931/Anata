export const mockMeta = {
  tables: [
    {
      id: 'tblQRToQAT8BRlLHW',
      name: 'Members',
      description:
        'This is the main table that has information about all of our beneficiaries',
      primaryFieldId: 'fldxvRediRoOcq5RF',
      fields: [
        {
          type: 'formula',
          options: {
            isValid: true,
            referencedFieldIds: ['fldLUcAarlJY7HH1z'],
            result: {
              type: 'singleLineText',
            },
          },
          id: 'fldxvRediRoOcq5RF',
          name: 'Full Name (ID)',
        },
        {
          type: 'singleLineText',
          id: 'fldD0IcnvdHYWSGTJ',
          name: 'Antara ID',
        },
      ],
    },
  ],
}

export default mockMeta
