import { useState } from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useNotifications } from 'src/context/notifications'
import { useModuleAnalytics } from 'src/modules/analytics'
import { useFormsData } from '../forms-data'
import { Forms as TWorkflowForm } from '../../db/models'

export const useFormsRouting = () => {
  const [forms, setForms] = useState<TWorkflowForm[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { notify } = useNotifications()
  const { getForms, createForm, deleteForm } = useFormsData()
  const { trackFormClosed, trackFormOpened } = useModuleAnalytics()

  const getFormIdsFromSearchParams = () => {
    const formIds = searchParams.get('formIds')
    if (formIds) {
      const ids = formIds.split(',')
      if (ids.length > 1) {
        return { formIds: ids, formName: '' }
      }
      const formName = searchParams.get('formName')
      if (formName) {
        return { formIds: [ids[0]], formName }
      }
      return { formIds: ids, formName: '' }
    }

    return { formIds: [], formName: '' }
  }

  const setFormIdsInSearchParams = (formIds: string[]) => {
    if (formIds.length > 0) {
      searchParams.set('formIds', formIds.join(','))
    } else {
      searchParams.delete('formIds')
      searchParams.delete('reloadAppt')
      searchParams.delete('selectedAppt')
      searchParams.delete('completedApptSelection')
      searchParams.delete('apptBilled')
      searchParams.delete('selectedAppt')
    }
    setSearchParams(searchParams)
  }

  const addFormIdToSearchParams = (formId: string) => {
    const { formIds } = getFormIdsFromSearchParams()
    if (!formIds.includes(formId)) {
      formIds.push(formId)
      setFormIdsInSearchParams(formIds)
    }
  }

  const removeFormIdFromSearchParams = (formId: string) => {
    const { formIds } = getFormIdsFromSearchParams()
    const index = formIds.indexOf(formId)
    if (index > -1) {
      formIds.splice(index, 1)
      setFormIdsInSearchParams(formIds)
    }
  }

  const navigateToNewUrl = () =>
    navigate(
      {
        pathname: location.pathname,
        search: searchParams.toString(),
      },
      { replace: true }
    )

  const openForm = async (formName: string, formData?: any) => {
    try {
      const form = await createForm(formName, formData)
      if (form) {
        trackFormOpened(form.name)
        setForms((prev) => [...prev, form])
        addFormIdToSearchParams(form.id)
        searchParams.set('action', 'forms')

        // notify the user that the form was created
        notify(`Created form: ${formName}`, 'info')
        // navigate to new url with new form id
        navigateToNewUrl()
      }
    } catch (error) {
      notify(`Failed to create form: ${formName}`, 'error')
    }
  }

  const closeForm = async (form: TWorkflowForm) => {
    trackFormClosed(form.name)
    setForms(forms.filter((f) => f.id !== form.id))
    removeFormIdFromSearchParams(form.id)
    navigateToNewUrl()

    // if the form is still a draft and has not been edited, delete it
    if (form.isDraft && !form.isEdited && !form.isSynced) {
      await deleteForm(form.id)
    }
  }

  const copyFormLink = (form: TWorkflowForm) => {
    const link = `${window.location.href
      .replace(/formIds=[^&]*/, `formIds=${form.airtableId || form.id}`)
      .replace(/workflowId=[^&]*/, '')}&formName=${form.name}`
    navigator.clipboard.writeText(link)
  }

  const openFormFromSearchParams = () => {
    const { formIds } = getFormIdsFromSearchParams()
    if (formIds.length > 0) {
      getForms(formIds)
        .then((result: TWorkflowForm[]) => {
          if (result.length > 0) {
            setForms(result)
          } else {
            // reset the search params if the form ids are invalid
            setFormIdsInSearchParams([])
            notify(`Failed to open given forms`)
          }
        })
        .catch((error) => {
          notify(`Failed to load forms: ${error.message}`)
        })
    }
  }

  return {
    forms,
    openForm,
    closeForm,
    copyFormLink,
    openFormFromSearchParams,
  }
}

export default useFormsRouting
