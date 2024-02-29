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
    const activeForm = ActiveForm(form.name)

    const createNewTableRecord = async (payload: any) => {
      const tableName = TABLE_ROUTES[form.name]
      if (tableName) {
        const res = await createTableEntry(tableName, payload)
        // update the form status to completed and set it's record ID
        form.markAsCompleted(res?.['Record ID'])
        setSubmittingForm(false)
      } else {
        throw new Error(`Table name not found for ${form.name} on airtable`)
      }
    }

    if (airtableMeta) {
      setSubmittingForm(true)
      let payload = omitKeys(data, ['moduleId', 'isDraft'])
      if (activeForm.isHIFMinor || activeForm.isInterventionDataTracking) {
        payload = omitKeys(payload, ['Member'])
      }

      if (activeForm.isPhysio) {
        payload = renameField(payload, 'Member', 'member')
      }

      if (
        activeForm.isLogisticsTasks ||
        activeForm.isIncidentReports ||
        activeForm.isLabs
      ) {
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

      if (activeForm.isLabs) {
        const { generatedPayload, findFieldId } = generatePayload(
          payload,
          formMeta,
          airtableMeta
        )

        let labsPayloads = []
        // find the labs field id
        const LAB_FIELD = 'Routine lab (from Lab synced view)'
        const IMAGING_FIELD = 'Imaging type'

        const labFieldId = findFieldId(LAB_FIELD)
        const imagingFieldId = findFieldId(IMAGING_FIELD)

        const cloneFieldForId = (fieldId: string, payloadArray: any) => {
          const src = Array.isArray(payloadArray)
            ? payloadArray
            : [payloadArray]
          return src.map((s: any) => ({
            fields: {
              ...generatedPayload.fields,
              [fieldId]: [s],
            },
          }))
        }

        // check for labs/imaging field in generate payload
        if (labFieldId && labFieldId in generatedPayload.fields) {
          const routineLabs = generatedPayload.fields[labFieldId]
          // for each of this, clone the record and update the fieldId of the field
          labsPayloads = cloneFieldForId(labFieldId, routineLabs)
        } else if (
          imagingFieldId &&
          imagingFieldId in generatedPayload.fields
        ) {
          const imagingTypes = generatedPayload.fields[imagingFieldId]
          labsPayloads = cloneFieldForId(imagingFieldId, imagingTypes)
        } else {
          labsPayloads = [generatedPayload]
        }

        // create all records in one go
        return Promise.all(
          labsPayloads.map((p: any) => createNewTableRecord(p))
        )
      }

      const { generatedPayload } = generatePayload(
        payload,
        formMeta,
        airtableMeta
      )
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

        return createNewTableRecord(generatePayload)
      }
      return createNewTableRecord(generatePayload)
    }
    throw new Error('Airtable meta not found')
  }

  return {
    handleHNOSFormSubmission,
    loading: submittingForm,
  }
}
