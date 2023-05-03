import dayjs from 'dayjs'
import TABLES from './FormSchema/form-fields-complete'

export const DUPLICATE_DEFAULTS: Record<string, any> = {
  Conditions: 'Condition',
  'VC condition diagnosis': 'Condition',
  Prescriptions: 'Drug Name',
  Appointments: 'Service',
  'BP Mon': 'Date',
  'CHL Mon': 'Test Date',
  'DM Mon': 'Test Date',
  'HN Tasks': 'Type',
  'Logistics Tasks': 'Type',
  'Member tasks': 'Type',
  'Prescriptions VC': 'Drug Name',
  Interventions: 'Intervention',
}

export const duplicates = [
  'HN Tasks',
  'Member tasks',
  'Prescriptions',
  'Appointments',
  'Vitals',
  'BP Mon',
  'CHL Mon',
  'DM Mon',
  'Conditions',
  'HMP',
  'Nutritional Consultation',
  'Interventions',
  'Intervention Data Tracking',
  'Conditions Data tracking',
  'Clinical Consultation',
  'Prescriptions VC',
  'VC condition diagnosis',
  'Mental Health Consultation',
  'Physiotherapy Consultation',
  'PAFU',
  'Interaction Log form',
  'Logistics Tasks',
  'Incident reports',
  'Interaction log',
  'Member Feedback',
  'Minor HIF v2',
  'Minor Health Check',
]

export const formNames: Record<string, string> = {
  'HN Tasks': 'HN & ME Task',
  'Member tasks': 'Member Task',
  Prescriptions: 'HN Prescription',
  'Prescriptions VC': 'VC Prescription',
  'VC condition diagnosis': 'VC condition diagnosis',
  Appointments: 'Appointment',
  Vitals: 'Vitals',
  'BP Mon': 'BP Monitoring',
  'CHL Mon': 'CHL Monitoring',
  'DM Mon': 'DM Monitoring',
  Baseline: 'Baseline',
  Conditions: 'Condition Diagnosis',
  'Conditions Data tracking': 'Conditions Data Tracking',
  HIF: 'HIF',
  HMP: 'HMP Intake',
  'Nutritional Consultation': 'Nutritional Consultation',
  Interventions: 'Intervention Intake',
  'Intervention Data Tracking': 'Intervention Data Tracking',
  'Clinical Consultation': 'Clinical Consultation',
  'Mental Health Consultation': 'Mental Health Consultation',
  'Physiotherapy Consultation': 'Physiotherapy consultation',
  PAFU: 'PAFU',
  'Interaction Log form': 'Interaction Log',
  'Logistics Tasks': 'Logistics Tasks',
  'Incident reports': 'Incident reports',
  'Interaction log': 'Interaction log',
  'Member Feedback': 'Member Feedback',
  'Minor Health Check': 'Minor Health Check',
  'Minor HIF v2': 'Minor HIF v2',
}

export const interactionlogform = {
  fields: {
    interactorType: {
      name: 'Interactor Type',
      options: {
        choices: [
          { name: 'Beneficiary' },
          { name: 'Employer' },
          { name: 'Provider' },
          { name: 'Payor' },
          { name: 'Caregiver' },
          { name: 'Relative' },
          { name: 'Other' },
          { name: 'Pharmacy' },
        ],
      },
    },
    modeOfCommunication: {
      name: 'Interactor Type',
      options: {
        choices: [
          { name: 'SMS' },
          { name: 'Email' },
          { name: 'WhatsApp' },
          { name: 'In-person' },
          { name: 'Phone call' },
          { name: 'Chat(Intercom)' },
        ],
      },
    },
    inboundInteractionCategory: {
      name: 'Interactor Type',
      options: {
        choices: [
          { name: 'Urgent care issue' },
          { name: 'Clinical question' },
          { name: 'Medication question' },
          { name: 'Scheduled interaction' },
          { name: 'Rescheduling request' },
          { name: 'Appointment request' },
          { name: 'Data input' },
          { name: 'HMP follow-up' },
          { name: 'Nutrition follow-up' },
          { name: 'Other' },
        ],
      },
    },
    outboundInteractionCategory: {
      name: 'Interactor Type',
      options: {
        choices: [
          { name: 'Appointment reminder' },
          { name: 'Data request' },
          { name: 'Education' },
          { name: 'HMP Follow-up' },
          { name: 'Pre-Appointment prep' },
          { name: 'Rescheduling call' },
          { name: 'Routine follow-up' },
          { name: 'Scheduled interaction' },
          { name: 'Send HMP' },
          { name: 'Other' },
          { name: 'Appointment booking' },
          { name: 'Request for clinical summary' },
          { name: 'Confirmation of appointment' },
          { name: 'Post appointment follow-up (provider)' },
          { name: 'Medication follow-up' },
          { name: 'VC Follow up' },
          { name: 'Chronic consent collection' },
          { name: 'Nutrition follow up' },
          { name: 'Chief complaint review' },
        ],
      },
    },
    outcome: {
      name: 'Interactor Type',
      options: {
        choices: [
          { name: 'Virtual Consultation Required' },
          { name: 'Flag for Review' },
          { name: 'MHC' },
          { name: 'Nutritional Consultation' },
          { name: 'Pediatric Consultation' },
          { name: 'None' },
        ],
      },
    },
    reasonForFeedback: {
      name: 'Interactor Type',
      options: {
        choices: [
          { name: 'Provider' },
          { name: 'Mobile App' },
          { name: 'Query on Antara Services' },
          { name: 'Appointment Scheduling/Rescheduling' },
          { name: 'Communication' },
          { name: 'Antara Services (Health Navigation/Specialists/Delivery)' },
          { name: 'Antara Staff (Health Navigator/Specialists/Delivery)' },
          { name: 'Antara Values (Timeliness, Responsiveness, Accuracy)' },
          { name: 'Others' },
        ],
      },
    },
    interactionDirection: {
      name: 'Interaction Direction',
      options: {
        choices: [
          { name: 'Outbound interaction' },
          { name: 'Inbound interaction' },
        ],
      },
    },
    feedback: {
      name: 'Interaction Direction',
      options: {
        choices: [{ name: 'Yes' }, { name: 'No' }],
      },
    },
    relationshipType: {
      name: 'Relationship Type',
      options: {
        choices: [
          { name: 'Parent' },
          { name: 'Other' },
          { name: 'Child' },
          { name: 'Spouse' },
        ],
      },
    },
    typeOfFeedback: {
      name: 'Type of feedback',
      options: {
        choices: [{ name: 'Positive' }, { name: 'Negative' }],
      },
    },
    flagForReview: {
      name: 'Flag for Review',
      options: {
        choices: [{ name: 'Yes' }, { name: 'No' }, { name: 'Reviewed' }],
      },
    },
  },
}

const interactionlogMap: any = {
  'Encounter Date': 'interactionStartedAt',
  'Health Navigator': 'healthNavigator',
  'Interactor Type': 'interactorType',
  'Interactor Name': 'interactorName',
  'Relationship Type': 'relationshipType',
  'Mode of Communication': 'modeOfCommunication',
  'Interaction Direction': 'interactionDirection',
  'Inbound Interaction Category': 'inboundInteractionCategory',
  'Other Category (Inbound)': 'otherCategoryInbound',
  'Outbound Interaction Category': 'outboundInteractionCategory',
  'Other Category (Outbound)': 'otherCategoryOutbound',
  'Interactor Summary Notes': 'interactionSummaryNotes',
  'Next Steps': 'outcome',
  'Flag for Review': 'flagForReview',
  'Reasons for Consultation': 'reasonForConsultation',
  'MHC Reasons for Referral': 'mhcReferralReasons',
  'NC Reasons for Referral': 'ncReferralReasons',
  'Notes for Nutritional Consultation': 'ncReferralNotes',
  'Pedriatic Reasons for Referral': 'pedcReferralReasons',
  'Notes for Pediatric': 'pedcReferralNotes',
}

export const interactionLogPayload = (raw: any) => {
  const finalPayload: any = {}
  Object.keys(raw).forEach((key) => {
    if (interactionlogMap[key])
      finalPayload[`${interactionlogMap[key]}`] = raw[key]
  })
  return finalPayload
}

const feedbackMap: any = {
  'Did the member provide any feedback?': 'feedback',
  'Type of feedback': 'typeOfFeedback',
  'What did the member provide feedback for?': 'reasonForFeedback',
  Other: 'otherFeedback',
  Feedback: 'feedbackFromMember',
  Member: 'memberAntaraId',
  Source: 'source',
  Testimonial: 'testimonial',
}

export const feedbackPayload = (raw: any) => {
  const finalPayload: any = {}
  Object.keys(raw).forEach((key) => {
    if (feedbackMap[key]) finalPayload[`${feedbackMap[key]}`] = raw[key]
  })
  return finalPayload
}

export const initialFormValues = (member: any, user: any, workflow = null) => {
  const isOnsite = workflow === 'Onsite'
  return {
    'BP Mon': {
      Date: dayjs().format('YYYY-MM-DD'),
      'BP Reading Type': isOnsite ? 'Ad hoc BP measurement' : null,
      'Type of reading': isOnsite ? 'Measured by Antara' : null,
    },
    Baseline: {
      'Health Navigator': [user.userAirtableId],
      Gender: member.Sex,
      'Is the BN a minor': member['Minor?'] === 'Adult' ? 'No' : 'Yes',
      'Date of baseline': member['Baseline Date'],
    },
    Vitals: {
      Staff: isOnsite
        ? [user.userAirtableId]
        : member['Health Navigator Assignment Record ID'],
      Date: dayjs().format('YYYY-MM-DD'),
      'Type of Reading': isOnsite ? 'Measured by Antara' : null,
    },
    'CHL Mon': {
      'Test Date': dayjs().format('YYYY-MM-DD'),
      'Type of reading': isOnsite ? 'Measured by Antara' : null,
    },
    'DM Mon': {
      'Test Date': dayjs().format('YYYY-MM-DD'),
      'Type of reading': isOnsite ? 'Measured by Antara' : null,
    },
    'Nutritional Consultation': {
      'Date of Consultation': dayjs().format('YYYY-MM-DD'),
      'Consulting Clinican': isOnsite ? [user.userAirtableId] : null,
    },
    'Clinical Consultation': {
      'Consulting Clinician': isOnsite ? [user.userAirtableId] : null,
      Minor: member['Minor?'] === 'Adult' ? 'no' : 'yes',
      'Interaction type': isOnsite ? 'In-person' : null,
      'Initial vs FU': isOnsite ? 'Initial consultation' : null,
      'Date of appointment': dayjs().format('YYYY-MM-DD'),
    },
    'Interaction log': {
      'Encounter Date': new Date(),
    },
  }
}

export const airtableFormNames = TABLES.map((fm) => fm.name)

export const INDEXES: any = {
  Medication: 'medications_base_sync',
  'Prescribing facility from Provider base': 'facilities_from_provider_base',
  'Refill facility from Provider base': 'facilities_from_provider_base',
  'Facilities from Provider base': 'facilities_from_provider_base',
  Facilities: 'facilities_from_provider_base',
  'Facility referred': 'facilities_from_provider_base',
  'Pharmacy provider (Facility from Provider base)':
    'facilities_from_provider_base',
  'Primary Doctor': 'specialists_from_provider_base',
  'Specialists from Provider Base': 'specialists_from_provider_base',
  Specialists: 'specialists_from_provider_base',
  'Specialist referred': 'specialists_from_provider_base',
}
