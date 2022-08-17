export const DUPLICATE_DEFAULTS = {
  Conditions: 'Condition',
  Prescriptions: 'Drug Name',
  Appointments: 'Service',
  'BP Mon': 'Date',
  'CHL Mon': 'Test Date',
  'DM Mon': 'Test Date',
  'HN Tasks': 'Type',
  'Logistics Tasks': 'Type',
  'Member tasks': 'Type',
  Interventions: 'Intervention',
}

export const duplicates = [
  'Conditions',
  'Prescriptions',
  'Appointments',
  'BP Mon',
  'CHL Mon',
  'DM Mon',
  'HN Tasks',
  'Logistics Tasks',
  'Member tasks',
  'Interventions',
]

export const formNames = {
  'HN Tasks': 'Health Navigator Task Form',
  'Member tasks': 'Member Task Form',
  Prescriptions: 'HN Prescription Intake Form',
  Appointments: 'Appointment Form',
  Vitals: 'Vitals Intake Form',
  'BP Mon': 'BP Monitoring Intake',
  'CHL Mon': 'CHL Monitoring Intake',
  'DM Mon': 'DM Monitoring',
  Baseline: 'Baseline Form',
  Conditions: 'Condition Diagnosis Form',
  HIF: 'HIF',
  'HIF Minor': 'Minor HIF Form',
  HMP: 'HMP Intake Form',
  Kits: 'Monitoring Kit Form',
  'Nutritional Consultation': 'Nutritional Consultation Form',
  Interventions: 'Intervention Intake Form',
  'Intervention Data Tracking': 'Intervention Data Collection Form',
  'Conditions Data tracking': 'Conditions data tracking',
  'Clinical Consultation': 'Clinical consultation',
  'Prescriptions VC': 'VC prescription form',
  'Mental Health Consultation': 'MHC intake form',
  'Physiotherapy Consultation': 'Physiotherapy consultation form',
  PAFU: 'PAFU',
  'Interaction Log form': 'Interaction Log form',
  'Logistics Tasks': 'Logistics Tasks',
  'Incident reports': 'Incident reports',
}

export const initialFormValues = (member: any) => {
  return {
    'BP Mon': {
      Date: new Date(),
    },
    Baseline: {
      'Health Navigator': member['Health Navigator Assignment Record ID'],
    },
    Vitals: {
      Staff: member['Health Navigator Assignment Record ID'],
    },
    'CHL Mon': {
      'Test Date': new Date(),
    },
    'DM Mon': {
      'Test Date': new Date(),
    },
    Conditions: {
      'Health Navigator': member['Health Navigator Assignment Record ID'],
    },
  }
}
