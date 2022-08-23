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
  'Intervention Data Tracking': 'Intervention Data Tracking',
  'Conditions Data tracking': 'Conditions data tracking',
  'Clinical Consultation': 'Clinical consultation',
  'Prescriptions VC': 'VC prescription form',
  'Mental Health Consultation': 'MHC intake form',
  'Physiotherapy Consultation': 'Physiotherapy consultation form',
  PAFU: 'PAFU',
  'Interaction Log form': 'Interaction Log form',
  'Logistics Tasks': 'Logistics Tasks',
  'Incident reports': 'Incident reports form',
  'Interaction log': 'Interaction log form',
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
          { name: 'Physio Consultation' },
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
  'Reasons for Referral': 'pcReferralReasons',
  'MHC Reasons for Referral': 'mhcReferralReasons',
  'NC Reasons for Referral': 'ncReferralReasons',
  'Notes for MHC': 'mhcReferralNotes',
  'Notes for Nutritional Consultation': 'ncReferralNotes',
  'Notes for Physio Consultation': 'pcReferralNotes',
  'Did the member provide any feedback?': 'feedback',
  'Type of feedback': 'typeOfFeedback',
  'What did the member provide feedback for?': 'reasonForFeedback',
  Other: 'otherFeedback',
  Feedback: 'feedbackFromMember',
  Member: 'member',
}

export const interactionLogPayload = (raw: any) => {
  const finalPayload: any = {}
  Object.keys(raw).forEach((key) => {
    if (interactionlogMap[key])
      finalPayload[`${interactionlogMap[key]}`] = raw[key]
  })
  return finalPayload
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
