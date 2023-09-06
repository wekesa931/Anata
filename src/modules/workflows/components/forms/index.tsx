import WorkflowForm from 'src/modules/workflows/components/forms/airtable-base-form'
import type { FormProps } from 'src/modules/workflows/types'

export const getFormImplementation = (
  formName: string
): React.FC<FormProps> => {
  switch (formName) {
    default:
      return WorkflowForm
  }
}
