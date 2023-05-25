import React from 'react'
import { Link2 } from 'react-feather'
import { Alert, Button, Snackbar, Tooltip } from '@mui/material'
import PortalWindow from 'src/components/portal'
import {
  WorkflowFormsLayout,
  FormsSection,
  ActionsSection,
} from 'src/modules/workflows/components/layout'
import { useFormsData } from 'src/modules/workflows/hooks/forms-data'
import { useWorkflowData } from 'src/modules/workflows/hooks/workflow-data'
import form_schemas from 'src/modules/workflows/components/forms/form-inputs-definitions'
import WorkflowForm from 'src/modules/workflows/components/forms'
import { useFormsRouting } from 'src/modules/workflows/hooks/routing/forms'
import { Forms as TWorkflowForm } from 'src/modules/workflows/db/models'
import { formNames } from '../utils'

type TitleProps = {
  form: TWorkflowForm
  handleCopy: () => void
}

type CopyAlertMessage = {
  type: 'error' | 'success'
  message: string
}

function Title({ form, handleCopy }: TitleProps) {
  return (
    <div className="bg-orange-100 text-orange-20">
      <div className="flex items-center">
        <span>{formNames[form.name] || form.name}</span>
        {form.isSynced ? (
          <small className="ml-2 text-xs italic">(Saved)</small>
        ) : (
          <small className="ml-2 text-xs italic">(Unsaved)</small>
        )}
        <Tooltip title="Copy link to this form">
          <Link2
            className="ml-2 cursor-pointer hover:text-orange-50"
            onClick={handleCopy}
            width={18}
            height={18}
          />
        </Tooltip>
      </div>
    </div>
  )
}

type FormPortalProps = {
  form: TWorkflowForm
  closeForm: (form: TWorkflowForm) => void
  index: number
}

function FormPortal({ form, closeForm, index }: FormPortalProps) {
  const [copyAlertMessage, setCopyAlertMessage] =
    React.useState<CopyAlertMessage | null>(null)
  const { loading } = useFormsData()
  const { submitForm, loaderDisplayed } = useWorkflowData()
  const [submissionId, setSubmissionId] = React.useState<string>('')
  const { copyFormLink, openForm } = useFormsRouting()
  const [isEdited, setIsEdited] = React.useState<boolean>(false)
  const [formData, setFormData] = React.useState<any>(form?.data || {})

  const formSchema: any = (form_schemas as any[]).find(
    (f: any) => f.name === form.name
  )

  const handleCopy = () => {
    if (!form.isSynced) {
      setCopyAlertMessage({
        type: 'error',
        message: 'You need to save the form before copying the link',
      })
    } else {
      // grab the link and replace the formIds with the form.airtableId and append the formName
      copyFormLink(form)
      setCopyAlertMessage({
        type: 'success',
        message: `Link to ${form.name} form copied to clipboard`,
      })
    }
  }

  const saveInput = async (name: string, value: any) => {
    setIsEdited(true)
    form.saveInput(name, value)
    setFormData({ ...formData, [name]: value })
  }

  return (
    <>
      <PortalWindow
        title={<Title form={form} handleCopy={handleCopy} />}
        width={50}
        index={index}
        closeWindow={() => closeForm(form)}
        isEdited={isEdited}
        setIsEdited={setIsEdited}
      >
        <WorkflowFormsLayout
          loading={loading || loaderDisplayed}
          isWorkflow={false}
        >
          <FormsSection>
            <WorkflowForm
              form={form}
              formSchema={formSchema}
              submissionId={submissionId}
              submitForm={submitForm}
              openForm={openForm}
              saveInput={saveInput}
              formData={formData}
            />
          </FormsSection>
          <ActionsSection>
            <div className="flex items-center justify-end">
              <Button
                className="rounded-xl bg-blue-100 font-rubik text-sm font-medium normal-case text-white"
                onClick={() => {
                  setSubmissionId(form.id)
                }}
                disabled={loading || loaderDisplayed || form.isSynced}
              >
                Submit form
              </Button>
            </div>
          </ActionsSection>
        </WorkflowFormsLayout>
      </PortalWindow>
      {copyAlertMessage && (
        <Snackbar
          open={!!copyAlertMessage}
          autoHideDuration={3000}
          onClose={() => setCopyAlertMessage(null)}
        >
          <Alert
            severity={copyAlertMessage.type}
            onClose={() => setCopyAlertMessage(null)}
          >
            {copyAlertMessage.message}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default FormPortal
