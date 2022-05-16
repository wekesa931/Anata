import dayjs from 'dayjs'
import AirtableField from '../../../../../types/airtable-field'

type Field = AirtableField & {
  label: string
  disabled?: boolean
  required?: boolean
  helperText?: any
  condition?: (values: any) => boolean
}

const useInteractionFormFields = (member: any, user: any) => {
  const fields: Field[] = [
    {
      label: 'Member',
      name: 'member',
      type: 'text',
      value: member?.['Full Name'],
      disabled: true,
    },
    {
      label: 'Encounter Date',
      name: 'interactionStartedAt',
      type: 'datetime',
      value: dayjs().format('YYYY-MM-DDTHH:mm'),
      required: true,
    },
    {
      label: 'Health Navigator',
      name: 'healthNavigator',
      type: 'lookup',
      lookupUrl: 'team',
      lookupFieldNames: ['Name', 'Email'],
      value: user && user.email,
      required: true,
    },
    {
      label: 'Interactor Type',
      name: 'interactorType',
      type: 'single-select',
      options: [
        'Beneficiary',
        'Employer',
        'Provider',
        'Payor',
        'Caregiver',
        'Relative',
        'Other',
        'Pharmacy',
      ].map((option) => ({ label: option, value: option })),
      required: true,
    },
    {
      label: 'Interactor Name',
      name: 'interactorName',
      type: 'text',
      condition: (values) =>
        values.interactorType && values.interactorType !== 'Beneficiary',
    },
    {
      label: 'Relationship Type',
      name: 'relationshipType',
      type: 'single-select',
      options: ['Parent', 'Other', 'Child', 'Spouse'].map((option) => ({
        label: option,
        value: option,
      })),
      condition: (values) =>
        values.interactorType &&
        (values.interactorType === 'Payor' ||
          values.interactorType === 'Caregiver' ||
          values.interactorType === 'Relative'),
    },
    {
      label: 'Mode of Communication',
      name: 'modeOfCommunication',
      type: 'single-select',
      options: [
        'SMS',
        'Email',
        'WhatsApp',
        'In-person',
        'Phone call',
        'Chat(Intercom)',
      ].map((option) => ({
        label: option,
        value: option,
      })),
      required: true,
    },
    {
      label: 'Interaction Direction',
      name: 'interactionDirection',
      type: 'single-select',
      options: ['Outbound interaction', 'Inbound interaction'].map(
        (option) => ({
          label: option,
          value: option,
        })
      ),
      required: true,
    },
    {
      label: 'Inbound Interaction Category',
      name: 'inboundInteractionCategory',
      type: 'multi-select',
      options: [
        'Urgent care issue',
        'Clinical question',
        'Medication question',
        'Scheduled interaction',
        'Rescheduling request',
        'Appointment request',
        'Data input',
        'HMP follow-up',
        'Nutrition follow-up',
        'Other',
      ].map((option) => ({
        label: option,
        value: option,
      })),
      condition: (values) =>
        values.interactionDirection &&
        values.interactionDirection === 'Inbound interaction',
      required: true,
    },
    {
      label: 'Other Category (Inbound)',
      name: 'otherCategoryInbound',
      type: 'text',
      condition: (values) =>
        values.inboundInteractionCategory &&
        values.inboundInteractionCategory.includes('Other'),
    },
    {
      label: 'Outbound Interaction Category',
      name: 'outboundInteractionCategory',
      type: 'multi-select',
      options: [
        'Appointment reminder',
        'Data request',
        'Education',
        'HMP Follow-up',
        'Pre-Appointment prep',
        'Rescheduling call',
        'Routine follow-up',
        'Scheduled interaction',
        'Send HMP',
        'Other',
        'Appointment booking',
        'Request for clinical summary',
        'Confirmation of appointment',
        'Post appointment follow-up (provider)',
        'Medication follow-up',
        'VC Follow up',
        'Chronic consent collection',
      ].map((option) => ({
        label: option,
        value: option,
      })),
      condition: (values) =>
        values.interactionDirection &&
        values.interactionDirection === 'Outbound interaction',
      required: true,
    },
    {
      label: 'Other Category (Outbound)',
      name: 'otherCategoryOutbound',
      type: 'text',
      condition: (values) =>
        values.outboundInteractionCategory &&
        values.outboundInteractionCategory.includes('Other'),
    },
    {
      label: 'Interactor Summary Notes',
      name: 'interactionSummaryNotes',
      type: 'long-text',
      required: true,
    },
    {
      label: 'Next Steps',
      name: 'outcome',
      type: 'multi-select',
      options: [
        'Virtual Consultation Required',
        'Flag for Review',
        'MHC',
        'Nutritional Consultation',
        'Physio Consultation',
        'None',
      ].map((option) => ({
        label: option,
        value: option,
      })),
      required: true,
    },
    {
      label: 'Flag for Review',
      name: 'flagForReview',
      type: 'single-select',
      options: ['Yes', 'No', 'Reviewed'].map((option) => ({
        label: option,
        value: option,
      })),
      condition: (values) =>
        values.outcome && values.outcome.includes('Flag for Review'),
      required: true,
    },
    {
      label: 'Reasons for Consultation',
      name: 'outcomeMetadata[reasonForConsultation]',
      type: 'long-text',
      helperText: `<p>Please describe the reason(s) why you are requesting a Virtual</p> 
      <p>Consultation with as much details as you can.</p>`,
      condition: (values) =>
        values.outcome &&
        values.outcome.includes('Virtual Consultation Required'),
      required: true,
    },
    {
      label: 'Reasons for Referral',
      name: 'mhcReferralReasons',
      type: 'long-text',
      condition: (values) => values.outcome && values.outcome.includes('MHC'),
      required: true,
    },
    {
      label: 'Notes for MHC',
      name: 'mhcReferralNotes',
      type: 'long-text',
      condition: (values) => values.outcome && values.outcome.includes('MHC'),
      required: true,
    },
    {
      label: 'Reasons for Referral',
      name: 'ncReferralReasons',
      type: 'long-text',
      condition: (values) =>
        values.outcome && values.outcome.includes('Nutritional Consultation'),
      required: true,
    },
    {
      label: 'Notes for Nutritional Consultation',
      name: 'ncReferralNotes',
      type: 'long-text',
      condition: (values) =>
        values.outcome && values.outcome.includes('Nutritional Consultation'),
      required: true,
    },
    {
      label: 'Reasons for Referral',
      name: 'pcReferralReasons',
      type: 'long-text',
      condition: (values) =>
        values.outcome && values.outcome.includes('Physio Consultation'),
      required: true,
    },
    {
      label: 'Notes for Physio Consultation',
      name: 'pcReferralNotes',
      type: 'long-text',
      condition: (values) =>
        values.outcome && values.outcome.includes('Physio Consultation'),
      required: true,
    },
  ]
  return fields
}

export default useInteractionFormFields
