import AirtableField from '../../../../types/airtable-field'

const MEETING_FIELDS: AirtableField[] = [
  {
    name: 'Meeting Type',
    type: 'single-select',
    options: [
      'Health Navigation Consultation',
      'Nutritional Consultation',
      'Baseline Consultation',
      'Fitness Consultation',
      'Virtual Doctor Consultation',
      '30 Minute Meeting (US Nights)',
    ].map((type) => ({ label: type, value: type })),
  },
  {
    name: 'Date',
    type: 'datetime',
  },
  {
    name: 'Meeting Notes',
    type: 'long-text',
  },
  {
    name: 'Status',
    type: 'single-select',
    options: [
      'Scheduled',
      'Scheduled - 2nd',
      'Scheduled - 3rd',
      'Rescheduling',
      'Done',
      'Missed',
    ].map((option) => ({ label: option, value: option })),
  },
]

export default MEETING_FIELDS
