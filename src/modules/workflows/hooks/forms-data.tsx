import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Collection, Q } from '@nozbe/watermelondb'
import { useState } from 'react'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'
import {
  initialFormValues,
  generateId,
  getUserModelDetails,
} from 'src/modules/workflows/utils'
import { Forms } from '../db/models'
import { useGetAirtableRecord } from '../services/airtable.api'

export const useFormsData = () => {
  const database = useDatabase()
  const { v2Member, member } = useMember()
  const user = useUser()
  const [loading, setLoading] = useState<boolean>(false)
  const { getAirtableRecord } = useGetAirtableRecord()

  const formsCollection: Collection<Forms> = database.collections.get('forms')

  const createForm = async (
    formName: string,
    formId?: string,
    formData?: any
  ) => {
    if (v2Member && user) {
      const initialFormData = initialFormValues(member, user, formName)
      return database.write(async () => {
        const created = await formsCollection.create((form) => {
          form.member = v2Member?.antaraId
          form.name = formName
          form.data = {
            ...initialFormData[formName],
            ...formData,
          }

          // eslint-disable-next-line no-underscore-dangle
          form._raw.id = formId || generateId(formName.substring(0, 3))
          form.createdBy = getUserModelDetails(user)
          form.updatedBy = getUserModelDetails(user)
          form.isSynced = false
          form.isDraft = true
          form.isEdited = false
        })
        return created
      })
    }

    return null
  }

  const getFormFromApi = async (formId: string, formName: string) => {
    setLoading(true)
    const res = await getAirtableRecord(formId, formName)
    setLoading(false)
    return res
  }

  const getForms = async (formIds: string[], formName: string) => {
    if (v2Member) {
      // formIDs maybe an array of local ids or airtable ids from the API
      const query = formIds
        ? formsCollection.query(
            Q.where('member', v2Member?.antaraId),
            Q.or(
              Q.where('id', Q.oneOf(formIds)),
              Q.where('airtable_id', Q.oneOf(formIds))
            )
          )
        : formsCollection.query(Q.where('member', v2Member?.antaraId))
      const formsFound = await query.fetch()

      if (formsFound.length) {
        return formsFound
      }
      if (formIds?.length > 0) {
        const [rawId] = formIds
        // get the first form from the api
        const fromApi = await getFormFromApi(rawId, formName)
        // hydrate this form into the database
        if (Object.keys(fromApi).length > 0) {
          const createdForm = await database.write(async () => {
            const created = await formsCollection.create((form) => {
              form.member = v2Member?.antaraId
              form.name = formName
              form.data = {
                ...fromApi,
              }

              // eslint-disable-next-line no-underscore-dangle
              form._raw.id = rawId
              form.createdBy = getUserModelDetails(user)
              form.updatedBy = getUserModelDetails(user)
              form.isSynced = true
              form.isDraft = false
              form.isEdited = false
              form.airtableId = fromApi?.id
            })
            return created
          })

          return [createdForm]
        }
      }
    }

    return []
  }

  const deleteAllForms = async () => {
    if (v2Member) {
      await database.write(async () => {
        const query = formsCollection.query(
          Q.where('member', v2Member?.antaraId),
          Q.where('workflow_id', null)
        )
        const forms = await query.fetch()
        await database.batch(
          ...forms.map((form) => form.prepareDestroyPermanently())
        )
      })
    }
  }

  const deleteForm = async (formId: string) => {
    if (v2Member) {
      await database.write(async () => {
        const query = formsCollection.query(
          Q.where('member', v2Member?.antaraId),
          Q.where('id', formId),
          Q.where('workflow_id', null)
        )
        const form = await query.fetch()
        database.batch(...form.map((f) => f.prepareDestroyPermanently()))
      })
    }
  }

  return {
    createForm,
    getForms,
    deleteAllForms,
    deleteForm,
    loading,
  }
}

export default useFormsData
