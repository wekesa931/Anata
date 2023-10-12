import type { Forms } from 'src/modules/workflows/db/models'
import { ActiveForm } from 'src/modules/workflows/utils'
import { useInteractionsData } from 'src/modules/interactions/hooks/interactions.hook'
import { useMemberFeedbackData } from 'src/modules/feedback/hooks/feedback.hook'
import { useHNOSFormHandler } from 'src/modules/workflows/hooks/hnos-form-handler'

type FormHandler = (form: Forms, formData: any, formMeta?: any) => Promise<any>

export const useFormHandlers = () => {
  const { handleCreateInteraction, loading: handlingInteractions } =
    useInteractionsData()
  const { handleHNOSFormSubmission, loading: submittingHnosForms } =
    useHNOSFormHandler()
  const { handleCreateMemberFeedback, loading: creatingMemberFeedback } =
    useMemberFeedbackData()

  function getFormHandler(form: Forms): FormHandler {
    const activeForm = ActiveForm(form.name)

    if (activeForm.isInteractionsLog) {
      return handleCreateInteraction
    }

    if (activeForm.isMemberFeedback) {
      return async (form, formData, formMeta) => {
        await handleCreateMemberFeedback(form, formData)
        return handleHNOSFormSubmission(form, formData, formMeta)
      }
    }

    return handleHNOSFormSubmission
  }

  const loading =
    handlingInteractions || submittingHnosForms || creatingMemberFeedback

  return {
    getFormHandler,
    loading,
  }
}
