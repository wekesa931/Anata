export type IWorkflow = {
  id: string
  name?: string
  workflowId: string
  airtableId: string
  completed: boolean
  template: {
    id: string
    name: string
  }
  member: any
  modules: { name: string }[]
  currentModules: string[]
  moduleData: any
  createdAt: Date
  updatedAt: Date
}

export type FormMeta = {
  id: string
  name: string
  helper: string
  fields: {
    type: string
    name: string
    id: string
    options?: {
      choices: any[]
    }
  }[]
}

export type WorkflowMeta = {
  name: string
  airtableId: string
  completed: boolean
  createdAt: string
  currentModules: any[]
  id: string
  member: any
  moduleData: any
  modules: any[]
  template: any
  updatedAt: string
  workflowId: string
}

export type FormSectionInput = {
  index: number
  setFormError: (data: any) => void
  setValidatedData: (data: any[]) => void
  setfinalPayload: (data: any[]) => void
  addOpenForm: (openForm: WorkflowMeta) => void
  modId: any
  finalPayload: any
  formError: any
  validatedData: any[]
  formPayload: any[]
  // subModuleIndex: number
  shouldSaveModule: boolean
  formMeta: FormMeta
  activeModule: { name: string; isDraft: boolean }
  template: IWorkflow
  disabled: boolean
  activeModuleName: string
  isToastOpen: boolean
  setIsFormEdited: (isEdited: boolean) => void
  resetActiveModule: () => void
  setFormPayload: (payload: any) => void
  saveModule: (isDraft: boolean) => void
  setShouldSaveModule: (save: boolean) => void
  setOpen: (open: boolean) => void
}

export type ConfirmButtonProps = {
  onConfirm: () => void
}

export type FormSchema = {
  parentTableId?: string
  required: boolean
  type: string
  name: string
  id: string
  helper?: string
  options?: { choices: any[] }
  isDateTime: boolean
  symmetricColumnId: string
  unreversed: boolean
  relationship: string
  formId?: string
  ctlabel?: string
  foreignTableId: string
}

export type Form = {
  value?: any
  template?: any
  field: FormSchema
  airtableMeta?: any
  parentTableId?: string
  type?: string
  disabled: boolean
  control: any
  error: any
  saveInput: (name: string, value: any) => void
}
