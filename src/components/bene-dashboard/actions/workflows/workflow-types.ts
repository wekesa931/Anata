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
  fields: {
    type: string
    name: string
    id: string
    options?: {
      choices: any[]
    }
  }[]
}

export type FormSectionInput = {
  index: number
  setFormError: (data: any) => void
  setValidatedData: (data: any[]) => void
  setfinalPayload: (data: any[]) => void
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
}

export type ConfirmButtonProps = {
  onConfirm: () => void
}
export type Form = {
  value: any
  fieldName: string
  template?: any
  field: {
    parentTableId?: string
    required: boolean
    type: string
    name: string
    id: string
    options?: { choices: any[] }
    symmetricColumnId: string
    unreversed: boolean
    relationship: string
    foreignTableId: string
  }
  airtableMeta?: any
  helperText: string
  type?: string
  disabled: boolean
  control: any
  error: any
  saveInput: (name: string, value: any) => void
}
