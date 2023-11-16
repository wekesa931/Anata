import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Collection, Q } from '@nozbe/watermelondb'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'
import {
  initialFormValues,
  generateId,
  getUserModelDetails,
} from 'src/modules/workflows/utils'
import dayjs from 'dayjs'
import { Forms } from '../db/models'

export const useFormsData = () => {
  const database = useDatabase()
  const { member } = useMember()
  const user = useUser()

  const formsCollection: Collection<Forms> = database.collections.get('forms')

  const createForm = async (
    formName: string,
    formData: any = {},
    formId = ''
  ) => {
    if (member && user) {
      const initialFormData = initialFormValues(member, user, formName)
      return database.write(async () => {
        const created = await formsCollection.create((form) => {
          form.member = member?.antaraId
          form.name = formName
          form.data = {
            timestamp: dayjs().toDate(),
            isDraft: true,
            ...initialFormData[formName],
            ...formData,
            Member: [member?.airtableRecordId],
            createdBy: getUserModelDetails(user),
            updatedBy: getUserModelDetails(user),
          }

          // eslint-disable-next-line no-underscore-dangle
          form._raw.id = formId || generateId(formName.substring(0, 3))
          form.createdBy = getUserModelDetails(user)
          form.updatedBy = getUserModelDetails(user)
          form.isSynced = false
          form.isDraft = true
          form.isEdited = false
          form.createdAt = dayjs().valueOf()
        })
        return created
      })
    }

    return null
  }

  const getForms = async (formIds: string[]) => {
    if (formIds.length) {
      // formIDs maybe an array of local ids or airtable ids from the API
      const query = formsCollection.query(Q.where('id', Q.oneOf(formIds)))

      const formsFound = await query.fetch()

      if (formsFound.length) {
        return formsFound
      }
      throw new Error('Form(s) not found')
    }
    if (member?.antaraId) {
      return formsCollection.query(Q.where('member', member?.antaraId)).fetch()
    }

    throw new Error('Member not found')
  }

  const deleteAllForms = async () => {
    if (member) {
      await database.write(async () => {
        const query = formsCollection.query(
          Q.where('member', member?.antaraId),
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
    if (member) {
      await database.write(async () => {
        const query = formsCollection.query(
          Q.where('member', member?.antaraId),
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
  }
}

export default useFormsData
