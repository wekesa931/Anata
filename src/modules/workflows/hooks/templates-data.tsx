import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useEffect, useState } from 'react'
import { Collection } from '@nozbe/watermelondb'
import dayjs from 'dayjs'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'
import {
  initialFormValues,
  getUserModelDetails,
} from 'src/modules/workflows/utils'
import useObservable from 'src/hooks/observable'
import { generateId } from 'src/storage/utils'
import { Workflows, Forms, Templates } from '../db/models'
import {
  useWorkflowTemplates,
  normalizeWorkflowTemplates,
} from '../services/templates.api'
import { useCreateWorkflow } from '../services/workflows.api'

export const useTemplatesData = () => {
  const database = useDatabase()
  const { getData } = useWorkflowTemplates()
  const [loading, setLoading] = useState<boolean>(false)
  const { v2Member, member } = useMember()
  const user = useUser()
  const { createWorkflow: syncWorkflowAPI, loading: creatingWorkflow } =
    useCreateWorkflow()

  const templatesCollection: Collection<Templates> =
    database.collections.get('workflow_templates')
  const workflowsCollection: Collection<Workflows> =
    database.collections.get('workflows')
  const formsCollection: Collection<Forms> = database.collections.get('forms')

  const templatesSubscription = templatesCollection.query().observe()
  const templates = useObservable(
    templatesSubscription,
    [],
    [templatesCollection]
  )

  const createWorkflow = async (template: Templates) => {
    const res = await syncWorkflowAPI({
      templateName: template.name,
      memberId: v2Member.antaraId,
    })

    const modules = res?.currentModules || []

    if (v2Member) {
      return database.write(async () => {
        const created = await workflowsCollection.create((workflow) => {
          workflow.member = v2Member?.antaraId
          workflow.template = template.name
          workflow.isCompleted = false
          workflow.workflowId = res?.workflowId
          workflow.createdBy = getUserModelDetails(user)
          workflow.updatedBy = getUserModelDetails(user)
          workflow.isSynced = false
          // eslint-disable-next-line no-underscore-dangle
          workflow._raw.id = res?.workflowId
        })

        // let's grab the initial form data
        const initialFormData = initialFormValues(member, user, template.name)

        // for each module in the template, create a form
        await Promise.all(
          modules.map(async (module: any) => {
            const moduleId = generateId()
            await formsCollection.create((form) => {
              form.workflow.set(created)
              form.member = v2Member?.antaraId
              form.name = module
              form.data = {
                ...initialFormData[module],
                moduleId,
                Member: [v2Member?.airtableRecordId],
              }
              form.isDraft = true

              // eslint-disable-next-line no-underscore-dangle
              form._raw.id = moduleId
            })
          })
        )

        return created
      })
    }

    return null
  }

  const deleteAllTemplates = async () => {
    return database.write(async () => {
      const allTemplates = await templatesCollection.query().fetch()
      await database.batch(
        ...allTemplates.map((t) => t.prepareDestroyPermanently())
      )
    })
  }

  const hydrateTemplates = async () => {
    const data = await getData()
    const normalizedTemplates = normalizeWorkflowTemplates(data?.data)
    if (normalizedTemplates.length) {
      database.write(async () => {
        // clear the templates from the collection first
        Promise.all(
          normalizedTemplates.map(async (template) => {
            try {
              // check if a template with template.id exists
              await templatesCollection.find(template.id)
            } catch (err: any) {
              const notFoundRegex = /Record ([^ ]+) not found/
              const notFoundError = err?.message.match(notFoundRegex)
              if (notFoundError) {
                templatesCollection.create((t) => {
                  t.name = template.name
                  t.modules = template.modules

                  // eslint-disable-next-line no-underscore-dangle
                  t._raw.id = template.id
                  t.updatedAt = dayjs(template.updatedAt).toDate().getDate()
                })
              }
            }
          })
        )
      })
    }
  }

  useEffect(() => {
    setLoading(true)

    hydrateTemplates().finally(() => {
      setLoading(false)
    })

    // deleteAllTemplates()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    templates,
    loading,
    createWorkflow,
    deleteAllTemplates,
    creatingWorkflow,
  }
}

export default useTemplatesData
