import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useEffect, useState } from 'react'
import { Collection, Q } from '@nozbe/watermelondb'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'
import {
  initialFormValues,
  getUserModelDetails,
} from 'src/modules/workflows/utils'
import useObservable from 'src/hooks/observable'
import { generateId } from 'src/storage/utils'
import { logError } from 'src/utils/logging/logger'
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
  const { member } = useMember()
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
    if (member) {
      const res = await syncWorkflowAPI({
        templateName: template.name,
        memberId: member.antaraId,
      })

      const modules = res?.currentModules || []

      return database.write(async () => {
        const created = await workflowsCollection.create((workflow) => {
          workflow.member = member?.antaraId
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
              form.member = member?.antaraId
              form.name = module
              form.data = {
                ...initialFormData[module],
                moduleId,
                Member: [member?.airtableRecordId],
                isDraft: true,
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

  // determine the templates to create and delete
  const hydrateTemplates = async () => {
    const data = await getData()
    const normalizedTemplates = normalizeWorkflowTemplates(data?.data)
    const templatesToCreate: any[] = []
    if (normalizedTemplates.length) {
      // find templates to create, only those whose name is not in the database, query from db
      await Promise.all(
        normalizedTemplates.map(async (template) => {
          const existingTemplate = await templatesCollection
            .query(Q.where('name', template.name))
            .fetch()

          if (!existingTemplate.length) {
            templatesToCreate.push(template)
          }
        })
      )

      // create new templates from the API
      database.write(async () => {
        await Promise.all(
          templatesToCreate.map(async (template) => {
            await templatesCollection
              .create((t) => {
                t.name = template.name
                t.modules = template.modules

                // eslint-disable-next-line no-underscore-dangle
                t._raw.id = template.name
              })
              .catch((err) => {
                const duplicateRegex =
                  /Diagnostic error: Error: Duplicate key for property id: ([A-Z0-9-]+)/
                if (!err?.message.match(duplicateRegex)) {
                  logError(err)
                }
              })
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
