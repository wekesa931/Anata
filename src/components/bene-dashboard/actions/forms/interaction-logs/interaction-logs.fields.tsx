import dayjs from 'dayjs'
import qs from 'query-string'
import { useLocation } from 'react-router-dom'
import AirtableField from '../../../../../types/airtable-field'

type Field = AirtableField & {
  label: string
  disabled?: boolean
  required?: boolean
  condition?: (values: any) => boolean
}

const useInteractionFormFields = () => {
  const { search } = useLocation()
  const { data } = qs.parse(search)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { member, user } = JSON.parse(data)
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
      options: ['SMS', 'Email', 'WhatsApp', 'In-person', 'Phone call'].map(
        (option) => ({
          label: option,
          value: option,
        })
      ),
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
      type: 'single-select',
      options: ['Virtual Consultation Required', 'Flag for Review', 'None'].map(
        (option) => ({
          label: option,
          value: option,
        })
      ),
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
        values.outcome && values.outcome === 'Flag for Review',
      required: true,
    },
    {
      label: 'Type of Request',
      name: 'outcomeMetadata[typeOfVcRequest]',
      type: 'single-select',
      options: [
        'General consultation',
        'Chronic case consultation',
        'General consultation - Follow Up',
        'Chronic case consultation - Follow Up',
      ].map((option) => ({ label: option, value: option })),
      condition: (values) =>
        values.outcome && values.outcome === 'Virtual Consultation Required',
      required: true,
    },
    {
      label: 'Level of emergency',
      name: 'outcomeMetadata[levelOfEmergency]',
      type: 'single-select',
      options: ['Emergency', 'Urgent', 'Normal'].map((option) => ({
        label: option,
        value: option,
      })),
      condition: (values) =>
        values.outcome && values.outcome === 'Virtual Consultation Required',
      required: true,
    },
    {
      label: 'Reasons for Consultation',
      name: 'outcomeMetadata[reasonForConsultation]',
      type: 'long-text',
      condition: (values) =>
        values.outcome && values.outcome === 'Virtual Consultation Required',
      required: true,
    },
    {
      label: 'Status',
      name: 'outcomeMetadata[status]',
      type: 'single-select',
      options: ['Requested', 'Validated by HN'].map((option) => ({
        label: option,
        value: option,
      })),
      condition: (values) =>
        values.outcome && values.outcome === 'Virtual Consultation Required',
      required: true,
    },
  ]
  return fields
}

export default useInteractionFormFields
