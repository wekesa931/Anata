/* eslint max-classes-per-file: ["error", 3] */

import { Model, Collection } from '@nozbe/watermelondb'
import {
  text,
  json,
  relation,
  field,
  children,
  date,
  writer,
} from '@nozbe/watermelondb/decorators'

import { Associations } from '@nozbe/watermelondb/Model'
import dayjs from 'dayjs'
import { generateId } from 'src/storage/utils'
import { initialFormValues } from '../utils'
import { CollectionType } from '../../../storage/types'

// return objects and arrays as is
const sanitizeJson = (data: any) => data

interface TModule {
  id: string
  name: string
}

type Status = 'Active' | 'Inactive'

export class Templates extends Model {
  static table = CollectionType.WORKFLOW_TEMPLATES

  @text('name') name!: string

  @text('status') status!: Status

  @json('modules', sanitizeJson) modules!: TModule[]

  @date('updatedAt') updatedAt!: number

  get moduleNames() {
    return this.modules.map((m) => m.name)
  }

  // update the modules
  @writer async updateModules(modules: TModule[]) {
    await this.update((t) => {
      t.modules = modules
    })
  }
}

export class Forms extends Model {
  static table = CollectionType.FORM

  static associations: Associations = {
    workflows: { type: 'belongs_to', key: 'workflow_id' },
  }

  @text('name') name!: string

  @relation('workflows', 'workflow_id') workflow?: any

  @text('member') member!: string

  @json('data', sanitizeJson) data?: any

  @field('is_draft') isDraft!: boolean

  @field('is_edited') isEdited!: boolean

  @json('createdBy', sanitizeJson) createdBy?: any

  @json('updatedBy', sanitizeJson) updatedBy?: any

  @text('airtableId') airtableId?: string

  @field('is_synced') isSynced!: boolean

  @writer async saveInput(key: string, data: any) {
    // update the data object with the new data [key]: data
    await this.update((f) => {
      f.data = { ...this.data, [key]: data }
      f.isEdited = true
    })
  }

  @writer async delete() {
    return this.destroyPermanently()
  }

  @writer async markAsCompleted(airtableId?: string) {
    await this.update((f) => {
      f.isDraft = false
      f.isEdited = false
      f.isSynced = true
      f.airtableId = airtableId
    })
  }

  @writer async markAsSynced() {
    await this.update((f) => {
      f.isSynced = true
    })
  }
}

type V2MemberParam = {
  antaraId: string
  airtableRecordId: string
}

export class Workflows extends Model {
  static table = CollectionType.WORKFLOW

  static associations: Associations = {
    forms: { type: 'has_many', foreignKey: 'workflow_id' },
  }

  @text('workflowId') workflowId!: string

  @text('template') template!: any

  @text('member') member!: string

  @field('is_completed') isCompleted!: boolean

  @children(CollectionType.FORM) forms!: any

  @json('createdBy', sanitizeJson) createdBy?: any

  @json('updatedBy', sanitizeJson) updatedBy?: any

  @date('created_at') createdAt!: number

  @date('updated_at') updatedAt!: number

  @text('airtableId') airtableId?: string

  @field('is_synced') isSynced!: boolean

  @text('is_draft_saved') isDraftSaved?: boolean

  get workflowObject() {
    return {
      workflowId: this.workflowId,
      template: this.template,
      member: this.member,
      isCompleted: this.isCompleted,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      airtableId: this.airtableId,
      isSynced: this.isSynced,
    }
  }

  @writer async markSavedDraft() {
    await this.update((w) => {
      w.isDraftSaved = true
    })
  }

  // create a writer to add a form
  @writer async addForm(formName: string, formData: any = {}) {
    const formsCollection: Collection<Forms> = this.collections.get('forms')
    const form = await formsCollection.create((f) => {
      f.name = formName
      f.workflow.set(this)
      f.member = this.member
      f.data = formData
      f.isDraft = true
      f.isEdited = false
      f.isSynced = false
      f.createdBy = this.createdBy
      f.updatedBy = this.updatedBy
    })
    return form
  }

  // remove a form from this workflow with given form id
  @writer async deleteForm(formId: string) {
    const form = await this.forms.fetch()
    const formToDelete = form.find((f: Forms) => f.id === formId)
    if (formToDelete) {
      await formToDelete.destroyPermanently()
    }
  }

  // check if any form is edited
  async isEdited() {
    const forms = await this.forms.fetch()
    return forms.some((f: Forms) => f.isEdited)
  }

  async isDraft() {
    const forms = await this.forms.fetch()
    return forms.some((f: Forms) => f.isDraft)
  }

  @writer async clearEdited() {
    const forms = await this.forms.fetch()
    await Promise.all(
      forms.map((form: any) =>
        form.update((f: Forms) => {
          f.isEdited = false
        })
      )
    )
  }

  @writer async markAsCompleted() {
    await this.update((w) => {
      w.isCompleted = true
    })
  }

  @writer async syncWorkflow(syncedWorkflow: any) {
    await this.update((w) => {
      w.isSynced = true
      w.airtableId = syncedWorkflow.airtableId
      w.workflowId = syncedWorkflow.workflowId
      w.isCompleted = syncedWorkflow.completed
    })
  }

  @writer async synchronizeWorkflowFormData(
    newWorkflow: any,
    v2Member: V2MemberParam,
    user: any
  ) {
    const member = v2Member.antaraId
    const formData = newWorkflow.moduleData || {}
    const workflowModules = newWorkflow.currentModules

    const initialFormData = initialFormValues(
      member,
      user,
      newWorkflow.template.name
    )

    const formDataKeys = Object.keys(formData)
    const forms = await this.forms.fetch()
    formDataKeys.forEach((k: string) => {
      let filledValues = formData[k].filled_values || []
      if (!Array.isArray(filledValues)) {
        filledValues = [filledValues]
      }

      filledValues.map(async (fv: any) => {
        const moduleId = fv?.moduleId
        if (moduleId) {
          const form = forms.find((f: Forms) => f.id === moduleId)
          if (form) {
            form.update((f: Forms) => {
              // f.data = merge f.data and dv
              f.data = { ...f.data, ...fv, moduleId }
              f.isSynced = true
              f.isDraft = false
            })
          }
        }
      })
    })

    // if new forms were created that are not within the db, we need to add them
    const uniqueCurrentFormNames = new Set(...[forms.map((f: Forms) => f.name)])
    // get the forms to create, forms in currentModules and not in uniqueCurrentModules
    const formsToCreate = workflowModules.filter(
      (m: any) => !uniqueCurrentFormNames.has(m)
    )
    const formsToDelete = forms.filter(
      (f: Forms) => !uniqueCurrentFormNames.has(f.name)
    )

    // create the forms
    const formsCollection: Collection<Forms> = this.collections.get('forms')
    await Promise.all(
      formsToCreate.map(async (f: any) => {
        let thisFormsData = formData[f]?.filled_values || []
        if (!Array.isArray(thisFormsData)) {
          thisFormsData = [thisFormsData]
        }
        const moduleId = generateId()

        const setupFormData = {
          ...initialFormData[f],
          moduleId,
          Member: [v2Member?.airtableRecordId],
        }
        if (thisFormsData.length !== 0) {
          // some data exists for this form, so we need to create it
          thisFormsData.forEach(async (fv: any) => {
            await formsCollection.create((form: Forms) => {
              form.name = f
              form.workflow.set(this)
              form.member = this.member
              form.data = { ...setupFormData, ...fv }
              form.isDraft = false
              form.isEdited = false
              form.isSynced = true
              form.createdBy = this.createdBy
              form.updatedBy = this.updatedBy
              // eslint-disable-next-line no-underscore-dangle
              form._raw.id = moduleId
            })
          })
        } else {
          await formsCollection.create((form: Forms) => {
            form.name = f
            form.workflow.set(this)
            form.member = this.member
            form.data = setupFormData
            form.isDraft = true
            form.isEdited = false
            form.isSynced = false
            form.createdBy = this.createdBy
            form.updatedBy = this.updatedBy
            // eslint-disable-next-line no-underscore-dangle
            form._raw.id = moduleId
          })
        }
      })
    )

    // delete the forms
    await Promise.all(
      formsToDelete.map(async (f: Forms) => {
        await f.destroyPermanently()
      })
    )
  }

  @writer async createFromAPI(newWorkflow: any, member: string, user: any) {
    const userData = {
      email: user.email,
      name: user.name,
    }
    await this.update((w) => {
      w.workflowId = newWorkflow.workflowId
      w.template = newWorkflow.template.name
      w.member = member
      w.isCompleted = newWorkflow.completed
      w.isSynced = true
      w.isDraftSaved = true
      w.airtableId = newWorkflow.airtableId
      w.createdBy = userData
      w.updatedBy = userData
      w.createdAt = dayjs(newWorkflow.createdAt).valueOf()
      w.updatedAt = dayjs(newWorkflow.updatedAt).valueOf()
    })

    return this
  }

  @writer async delete() {
    const forms = await this.forms.fetch()
    await Promise.all(forms.map((f: any) => f.destroyPermanently()))
    await this.destroyPermanently()
  }
}

export default [Templates, Forms, Workflows]
