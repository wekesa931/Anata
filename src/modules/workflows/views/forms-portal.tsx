import React from 'react'
import { Link2 } from 'react-feather'
import { Alert, Snackbar, Tooltip } from '@mui/material'
import PortalWindow from 'src/components/portal'
import {
  WorkflowFormsLayout,
  FormsSection,
} from 'src/modules/workflows/components/layout'
import { useWorkflowData } from 'src/modules/workflows/hooks/workflow-data'
import { getFormImplementation } from 'src/modules/workflows/components/forms'
import { useFormsRouting } from 'src/modules/workflows/hooks/routing/forms'
import { Forms as TWorkflowForm } from 'src/modules/workflows/db/models'
import { useNotifications } from 'src/context/notifications'
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
  const { loaderDisplayed } = useWorkflowData()
  const { copyFormLink } = useFormsRouting()
  const [isEdited, setIsEdited] = React.useState<boolean>(false)
  const { notify } = useNotifications()
  const [formData, setFormData] = React.useState<any>(form?.data || {})

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

  const saveInput = (name: string, value: any) => {
    setIsEdited(true)
    form.saveInput(name, value)
    setFormData({ ...formData, [name]: value })
  }

  const updatePrefills = (prefills: any) => {
    setIsEdited(true)

    form.updatePrefills(prefills)
    setFormData({ ...formData, ...prefills })
  }

  const handleSubmissionSuccess = (f: TWorkflowForm) => () => {
    f.clearDraft().then(() => {
      notify('Form submitted succesfully.', 'success')
      setIsEdited(false)
      closeForm(f)
    })
  }

  const handleSubmissionError = (err?: any) => {
    notify(
      err?.message && typeof err?.message === 'string'
        ? err?.message
        : 'There was an error submitting your form. Please try again.',
      'error'
    )
  }

  const FormComponent = getFormImplementation(form?.name)

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
        <WorkflowFormsLayout loading={loaderDisplayed} isWorkflow={false}>
          <FormsSection>
            <FormComponent
              form={form}
              saveInput={saveInput}
              handleSubmissionSuccess={handleSubmissionSuccess(form)}
              handleSubmissionError={handleSubmissionError}
              updatePrefills={updatePrefills}
              formData={formData}
            />
          </FormsSection>
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
