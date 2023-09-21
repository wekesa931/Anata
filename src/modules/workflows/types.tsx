import type { Forms as TWorkflowForm } from 'src/modules/workflows/db/models'

export type TWorkflowTemplateVariables = {
  name: string
  status: 'Active' | 'Inactive'
}

export type CreateWorkflowVariables = {
  templateName: string
  memberId: string
}

export type SaveWorkflowVariables = {
  workflowId: string
  airtableId: string | null
  completed: boolean
}

export type CreateCaseVariables = {
  ID?: string
  Status: 'Ongoing' | 'Complete' | 'Canceled' | 'Resolved'
  Members?: string[]
  createdBy?: {
    email?: string
    name?: string
  }
  updatedBy?: {
    email?: string
    name?: string
  }
}

export type UpdateCaseVariables = {
  id: string | null
  fields: CreateCaseVariables
}

export type TWorkflow = {
  airtableId?: string
  completed: boolean
  createdAt: string
  name: string
  id: string
  workflowId: string
  updatedAt: string
  currentModules: string[]
  modules: {
    id: string
    name: string
  }[]
  template: {
    id: string
    name: string
  }
  moduleData: Record<string, any>
  member?: Record<string, any>
  prefills?: Record<string, any>
}

export type WorkflowVariables = {
  memberId: string
  workflowId: string
}

export type AddModuleVariables = {
  workflowId: string
  moduleName: string
}

export type DeleteModuleVariables = AddModuleVariables

export type DeleteWorkflowVariables = {
  workflowId: string
}

export type TModule = {
  name: string
  isDraft: boolean
}

type ModuleData = {
  moduleName: string
  workflowId: string
  data: Array<Record<string, any>>
  draft: boolean
}

export type SaveModuleData = ModuleData

export type InteractionsVariables = {
  healthNavigator: string
  interactionDirection: 'Inbound interaction' | 'Outbound interaction'
  interactionStartedAt: Date
  interactorName: string
  interactorType: string
  modeOfCommunication: string
  outboundInteractionCategory?: string[]
  inboundInteractionCategory?: string[]
  outcome: string[]
  outcomeMetadata: Record<string, any>
  historyUserIdField: string
  member: string
  reasonForConsultation?: string
}

export type FeedbackVariables = {
  feedback: boolean | string
  feedbackFromMember: string
  memberAntaraId: string
  reasonForFeedback: string[]
  source: string
  typeOfFeedback: 'Positive' | 'Negative'[]
  createdBy: string
}

export type FormField = {
  foreignTableId: string
  format: string
  helper: string
  id: string
  isDateTime: boolean
  name: string
  options: { choices: any[] }
  relationship: 'one' | 'many' | null
  required: boolean
  symmetricColumnId: string
  type: string
  unreversed: boolean
  condition?: (values: any) => boolean
  formId?: string
  ctlabel?: string
  parentTableId?: string
}

export type FormMeta = {
  name: string
  id: string
  helper: string
  fields: FormField[]
}

export type Form = {
  value?: any
  field: FormField
  airtableMeta?: any
  parentTableId?: string
  type?: string
  disabled: boolean
  control: any
  error: any
  saveInput: (name: string, value: any) => void
  isWorkflow?: boolean
}

export type NotifyFn = (message: string) => void

export type GroupedWorkflows = {
  complete: TWorkflow[]
  incomplete: TWorkflow[]
} | null

export type TForm = {
  name: string
  type?: string
  url?: string
}

export type FormProps = {
  form: TWorkflowForm
  handleSubmissionSuccess: (data?: any) => void
  handleSubmissionError: (error?: any) => void
  saveInput: (name: string, value: string) => void
  formData?: Record<string, any>
}
