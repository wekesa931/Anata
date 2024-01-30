import { useState } from 'react'
import { useMember } from 'src/context/member'
import {
  ActiveForm,
  omitKeys,
  renameField,
  generatePayload,
} from 'src/modules/workflows/utils'
import { useAirtableMeta } from 'src/context/airtable-meta'
import TABLE_ROUTES from 'src/config/airtable-tables'
import { Forms } from '../db/models'
import { useHNOSData } from '../services/workflows.api'

export const useHNOSFormHandler = () => {
  const { airtableMeta } = useAirtableMeta()
  const [submittingForm, setSubmittingForm] = useState<boolean>(false)
  const { member } = useMember()
  const { createHif, createTableEntry, getHifInfo } = useHNOSData()

  const handleHNOSFormSubmission = async (
    form: Forms,
    data: any,
    formMeta: any
  ) => {
    if (airtableMeta) {
      setSubmittingForm(true)
      const activeForm = ActiveForm(form.name)
      let payload = omitKeys(data, ['moduleId', 'isDraft'])
      if (activeForm.isHIFMinor || activeForm.isInterventionDataTracking) {
        payload = omitKeys(payload, ['Member'])
      }

      if (activeForm.isPhysio) {
        payload = renameField(payload, 'Member', 'member')
      }

      if (activeForm.isLogisticsTasks || activeForm.isIncidentReports) {
        payload = renameField(payload, 'Member', 'Members')
      }

      if (activeForm.isHIF) {
        payload = {
          ...payload,
          'HIF Completed': true,
          'Antara ID': member?.antaraId,
        }
      }

      if (activeForm.isIncidentReports) {
        payload = {
          ...payload,
          Assignee: ['recpEJZoCuWN85DM4'],
        }
      }

      const createNewTableRecord = async () => {
        const tableName = TABLE_ROUTES[form.name]
        if (tableName) {
          const res = await createTableEntry(tableName, generatedPayload)
          // update the form status to completed and set it's record ID
          form.markAsCompleted(res?.['Record ID'])
          setSubmittingForm(false)
        } else {
          throw new Error(`Table name not found for ${form.name} on airtable`)
        }
      }

      const generatedPayload = generatePayload(payload, formMeta, airtableMeta)
      if (activeForm.isHIF) {
        const hifId = await getHifInfo(member?.airtableRecordId)
        if (hifId) {
          return createHif(hifId, generatedPayload)
            .then(() => {
              form.markAsCompleted()
            })
            .catch((e) => {
              throw e
            })
            .finally(() => {
              setSubmittingForm(false)
            })
        }

        return createNewTableRecord()
      }
      return createNewTableRecord()
    }
    throw new Error('Airtable meta not found')
  }

  return {
    handleHNOSFormSubmission,
    loading: submittingForm,
  }
}
