import dayjs from 'dayjs'
import 'dayjs/locale/en'
import { groupBy } from 'lodash'
import { GroupedWorkflows, TForm, TWorkflow } from 'src/modules/workflows/types'
import FORMS from 'src/modules/workflows/components/forms/form-inputs-definitions'
import { User } from 'src/types/user'
import { todayFormattedDate } from 'src/utils/date-time/helpers'
import { v4 as uuidV4 } from 'uuid'
import { logError } from 'src/utils/logging/logger'

dayjs.locale('en')

export const groupWorkflows = (workflows: TWorkflow[]) => {
  const parsed = groupBy(workflows, 'completed')
  return {
    complete: parsed.true || [],
    incomplete: parsed.false || [],
  }
}

export const workflowStartDate = (date: number) => {
  const startDate = dayjs(date)
  const diffInDays = dayjs().diff(startDate, 'day')

  if (diffInDays < 1) {
    return `Started today`
  }
  if (diffInDays < 7) {
    return `Started ${diffInDays} days ago`
  }
  if (diffInDays < 14) {
    return `Started a week ago`
  }
  return `Started on ${startDate.format('DD/MMM/YYYY')}`
}

export const extractUsername = (email: string) => {
  return email.replace(/@.*$/, '')
}

const generateMethodName = (activeForm: string) => {
  const words = activeForm.split(' ')
  const capitalized = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  return `is${capitalized.join('')}`
}

/**
 * Generic method to provide easy checks for table names in the form of:
 *
 * const methods = ActiveForm('Interactions logs');
 * methods.isInteractionsLogs() // true
 * Can be used to wrap around active form and avoid manual string checks
 *
 * @param activeForm activeForm name
 * @returns true if activeForm matches the method name
 */
export const ActiveForm = (activeForm: string) => {
  const methods: Record<string, boolean> = {}
  const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(methods))

  methodNames.forEach((methodName) => {
    const pattern = methodName.slice(2).replace(/([A-Z])/g, ' $1')
    methods[methodName] = activeForm === pattern
  })

  methods[generateMethodName(activeForm)] = true

  return {
    ...methods,
    isHIFMinor: activeForm === 'HIF Minor',
    isHIF: activeForm === 'HIF',
    isPhysio: activeForm === 'Physiotherapy Consultation',
    isLogisticsTasks: activeForm === 'Logistics Tasks',
    isIncidentReports: activeForm === 'Incident reports',
    isInteractionsLog: activeForm === 'Interaction log',
    isMemberFeedback: activeForm === 'Member Feedback',
    isInterventionDataTracking: activeForm === 'Intervention Data Tracking',
    isVitals: activeForm === 'Vitals',
    isBp: activeForm === 'BP Mon',
    isChl: activeForm === 'CHL Mon',
    isDm: activeForm === 'DM Mon',
    isLabs: activeForm === 'Lab/imaging management',
    isCareTeamTasks: activeForm === 'Care Team Tasks',
  }
}

export type TActiveForm = ReturnType<typeof ActiveForm>

export const getModules = (fm: TWorkflow | null) => {
  if (!fm) {
    return []
  }
  const modules = fm?.currentModules.map((mod) => {
    if (fm?.moduleData[mod]) {
      return {
        name: mod,
        isDraft: fm?.moduleData[mod]?.status === 'Draft',
      }
    }
    return {
      name: mod,
      isDraft: true,
    }
  })
  return modules
}

type ObjectOrArray = Record<string, any> | Array<Record<string, any>>

export const omitKeys = (
  obj: ObjectOrArray,
  keysToOmit: string[]
): ObjectOrArray => {
  return Array.isArray(obj)
    ? obj.map((item) => omitKeys(item, keysToOmit))
    : Object.keys(obj).reduce((acc: Record<string, any>, key) => {
        if (!keysToOmit.includes(key)) {
          acc[key] = obj[key]
        }
        return acc
      }, {})
}

export const updateFormMeta = (fl: TWorkflow | null) => {
  let form = null
  if (fl) {
    if (fl.currentModules[0]) {
      form = (FORMS as any[]).find((frm) => frm.name === fl.currentModules[0])
    }
  }

  return form
}

export const renameField = (
  form: ObjectOrArray,
  oldName: string,
  newName: string
): ObjectOrArray => {
  if (Array.isArray(form)) {
    return form.map((item) => renameField(item, oldName, newName))
  }

  return Object.keys(form).reduce((acc: Record<string, any>, key) => {
    if (key === oldName) {
      acc[newName] = form[key]
    } else {
      acc[key] = form[key]
    }
    return acc
  }, {})
}

const isAllowedField = (name: string) => {
  const allowedFields = [
    'createdBy',
    'updatedBy',
    'Data Source',
    'Member',
    'Assignee',
  ]
  return allowedFields.includes(name)
}

export const generatePayload = (
  initialPayload: any,
  formMeta: any,
  airtableMeta: any
) => {
  const airtableFieldsMap: Record<string, any> =
    airtableMeta[formMeta.id].fields
  const erroredFields: string[] = []
  const mappedPayload: any = {}
  const localFieldsMap: any = {}
  formMeta?.fields?.forEach((fm: any) => {
    localFieldsMap[fm?.name] = {
      id: fm?.id,
    }
  })

  const findBy = (key: string, value: string) => {
    const allFields = Object.values(airtableFieldsMap)
    const found = allFields.find((f: any) => f[key] === value)
    return found
  }

  const findFieldId = (name: string) => findBy('name', name)?.id || null
  const findById = (id: string) => findBy('id', id)?.name || null

  Object.keys(initialPayload)?.forEach((k) => {
    const fieldId = findFieldId(k)
    if (fieldId) {
      mappedPayload[fieldId] = initialPayload[k]
    } else if (isAllowedField(k)) {
      mappedPayload[k] = initialPayload[k]
    } else {
      erroredFields.push(k)
    }
  })
  if (erroredFields.length > 0) {
    const affectedFields = JSON.stringify(erroredFields)
    logError(
      `The following fields are missing on airtable and have not been saved ${affectedFields}`
    )
  }
  /**
   * Remove fields that are not defined in the local schema
   */
  const currentFieldOptionsInLocalSchema = Object.values(localFieldsMap).map(
    (f: any) => f.id
  )
  Object.keys(mappedPayload)?.forEach((k) => {
    if (
      !currentFieldOptionsInLocalSchema.includes(k) &&
      !isAllowedField(findById(k))
    ) {
      delete mappedPayload[k]
    }
  })

  return {
    generatedPayload: {
      fields: mappedPayload,
    },
    findFieldId,
  }
}

export const checkModuleStatus = (payload: any[]) => {
  let isDraft = false
  payload?.forEach((py) => {
    if (py?.isDraft === true) {
      isDraft = true
    }
  })
  return isDraft
}

export const initialFormValues = (
  member: any,
  user: any,
  workflow: any = null
): Record<string, any> => {
  const isOnsite = workflow === 'Onsite'
  const homeAddress = member?.homeAddress?.address || null

  return {
    'BP Mon': {
      Date: dayjs().format('YYYY-MM-DD'),
      'BP Reading Type': isOnsite ? 'Ad hoc BP measurement' : null,
      'Type of reading': isOnsite ? 'Measured by Antara' : null,
    },
    Baseline: {
      'Health Navigator': [user.userAirtableId],
      Gender: member?.sex,
      'Is the BN a minor': member?.isMinor ? 'Yes' : 'No',
      'Date of baseline': dayjs().format('YYYY-MM-DD'),
    },
    Vitals: {
      Staff: isOnsite
        ? [user.userAirtableId]
        : [member?.assignedHn?.atRecordId],
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
      'Consulting Clinican': [user.userAirtableId],
      Member: [member?.airtableRecordId],
    },
    'Clinical Consultation': {
      'Consulting Clinician': isOnsite ? [user.userAirtableId] : null,
      Minor: member?.isMinor ? 'yes' : 'no',
      'Interaction type': isOnsite ? 'In-person' : null,
      'Initial vs FU': isOnsite ? 'Initial consultation' : null,
      'Date of Consultation': dayjs().format('YYYY-MM-DD'),
    },
    'Interaction log': {
      'Encounter Date': new Date(),
    },
    'Logistics Tasks': {
      Beneficiary: member?.fullName,
      Status: 'Scheduled',
      Creator: [user.userAirtableId],
      Location: homeAddress?.description,
      Contact: member?.phone,
    },
    Appointments: {
      'Missed #': 0,
      'Rescheduled #': 0,
      Assignee: [user?.userAirtableId],
    },
    Conditions: {
      'Date of Diagnosis/Condition': todayFormattedDate(new Date()),
      'Condition Status': 'Active',
    },
    'Conditions Data tracking': {
      Date: todayFormattedDate(new Date()),
    },
    Interventions: {
      Status: 'Active',
    },
    'Member tasks': {
      Status: 'Not Started',
    },
    'Prescriptions VC': {
      'Start Date': todayFormattedDate(new Date()),
      'Prescribing facility from Provider base': ['recnjX3KGmGvKv7Ek'],
    },
    'Healthy triage form': {
      Gender: member?.sex,
    },
    HIF: {
      'Your Age': member?.ageFull,
    },
  }
}

export const useInitialFormMeta = (member: any, user: any) => {
  const initialFormMeta = (
    workflow: TWorkflow | null,
    formValues: any = null
  ) => {
    const prefills = workflow?.prefills || {}
    if (user && member) {
      return {
        ...formValues,
        moduleId: dayjs().toISOString(),
        Member: [member?.airtableRecordId],
        isDraft: true,
        createdBy: {
          email: user?.email,
          name: user?.name,
        },
        updatedBy: {
          email: user?.email,
          name: user?.name,
        },
        ...prefills,
      }
    }

    return {}
  }

  return {
    initialFormMeta,
  }
}

export const DUPLICATE_DEFAULTS: Record<string, any> = {
  Conditions: 'Condition',
  Prescriptions: 'Drug Name',
  Appointments: 'Service',
  'BP Mon': 'Date',
  'CHL Mon': 'Test Date',
  'DM Mon': 'Test Date',
  'Care Team Tasks': 'Task definition',
  'Logistics Tasks': 'Type',
  'Member tasks': 'Type',
  'Prescriptions VC': 'Drug Name',
  Interventions: 'Intervention',
}

export const duplicates = [
  'Care Team Tasks',
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
  'Mental Health Consultation',
  'Physiotherapy Consultation',
  'PAFU',
  'Interaction Log form',
  'Logistics Tasks',
  'Incident reports',
  'Interaction log',
  'Member Feedback',
  'Minor Health Check (6 to 17)',
  'Minor Health Check (0 to 5)',
  'Healthy triage form',
  'Lab/imaging management',
]

export const formNames: Record<string, string> = {
  'Member tasks': 'Member Task',
  Prescriptions: 'HN Prescription',
  'Prescriptions VC': 'VC Prescription',
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
  'Minor Health Check (0 to 5)': 'Minor Health Check (0 to 5)',
  'Minor Health Check (6 to 17)': 'Minor Health Check (6 to 17)',
  'Healthy triage form': 'Healthy triage form',
  'Lab/imaging management': 'Lab/imaging management',
  'Care Team Tasks': 'Care Team Tasks',
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
          { name: 'HMP check-in call' },
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
          { name: 'HMP check-in call' },
          { name: 'Lab result review' },
          { name: 'Lab and vitals review' },
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
  Testimonial: 'testimonial',
  Other: 'otherFeedback',
  Feedback: 'feedbackFromMember',
  Member: 'memberAntaraId',
  Source: 'source',
}

export const feedbackPayload = (raw: any) => {
  const finalPayload: any = {}
  Object.keys(raw).forEach((key) => {
    if (feedbackMap[key]) finalPayload[`${feedbackMap[key]}`] = raw[key]
  })
  return finalPayload
}

export const airtableFormNames = FORMS.map((fm) => fm.name)

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

const updatedForms = (): TForm[] => {
  const payload: TForm[] = []
  FORMS.forEach((fm) => {
    payload.push({ name: fm.name })
  })

  return payload
}

export const sorted = updatedForms().sort((a, b) => {
  if (a.name > b.name) {
    return 1
  }
  if (b.name > a.name) {
    return -1
  }
  return 0
})

const sortWorkflows = (workflows: TWorkflow[] | null) => {
  // sort the workflows by their workflow.createdAt and show the latest first
  if (!workflows) {
    return []
  }
  const sortedWorkflows = workflows.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1
    }
    if (b.createdAt > a.createdAt) {
      return 1
    }
    return 0
  })

  return sortedWorkflows
}

export const sortGroupedWorflows = (groupedWorkflows: GroupedWorkflows) => {
  // sort the workflows incomplete and complete by their workflow.createdAt and show the latest first
  if (!groupedWorkflows) {
    return null
  }

  const sortedGroupedWorkflows: GroupedWorkflows = {
    incomplete: sortWorkflows(groupedWorkflows.incomplete),
    complete: sortWorkflows(groupedWorkflows.complete),
  }

  return sortedGroupedWorkflows
}

export const generateId = (name: string) => {
  return `${name}-${uuidV4()}`
}

export const getUserModelDetails = (user: User) => ({
  email: user?.email,
  name: user?.name,
})

export const sortByCreatedAt = (workflows: any[]) => {
  // sort from most recent to oldest
  return workflows.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1
    }
    if (b.createdAt > a.createdAt) {
      return 1
    }
    return 0
  })
}
