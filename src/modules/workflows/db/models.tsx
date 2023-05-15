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

  @writer async createFromAPI(newWorkflow: any, member: string, user: any) {
    const userData = {
      email: user.email,
      name: user.name,
    }
    const formsCollection: Collection<Forms> = this.collections.get('forms')
    await this.update((w) => {
      w.workflowId = newWorkflow.workflowId
      w.template = newWorkflow.template.name
      w.member = member
      w.isCompleted = newWorkflow.completed
      w.isSynced = true
      w.airtableId = newWorkflow.airtableId
      w.createdBy = userData
      w.updatedBy = userData
      w.createdAt = dayjs(newWorkflow.createdAt).valueOf()
      w.updatedAt = dayjs(newWorkflow.updatedAt).valueOf()
    })

    const currentModules = newWorkflow.currentModules || []
    const moduleData = newWorkflow.moduleData || {}
    let formsToCreateOrUpdate: any[] = []

    currentModules.forEach((m: string) => {
      if (moduleData[m]) {
        let filledValues = moduleData[m].filled_values || []
        if (!Array.isArray(filledValues)) {
          filledValues = [filledValues]
        }

        filledValues.forEach((d: any) => {
          // grab module id or set it to created date
          const moduleId =
            d?.moduleId || dayjs(moduleData[m]?.created_at).toISOString()
          formsToCreateOrUpdate = [
            ...formsToCreateOrUpdate,
            { moduleId, data: { ...d, moduleId }, formName: m },
          ]
        })
      }
    })

    if (formsToCreateOrUpdate.length === 0) {
      const forms = await this.forms.fetch()
      if (forms.length !== currentModules.length) {
        const initialFormData = initialFormValues(
          member,
          user,
          newWorkflow.template.name
        )
        currentModules.forEach((m: string) => {
          if (!forms.find((f: any) => f.name === m)) {
            formsCollection.create((f) => {
              f.name = m
              f.workflow.set(this)
              f.member = this.member
              f.data = {
                moduleId: dayjs().toISOString(),
                ...initialFormData[m],
              }
              f.isDraft = true
              f.isEdited = false
              f.isSynced = false
              f.createdBy = userData
              f.updatedBy = userData
            })
          }
        })
      }
    }

    if (formsToCreateOrUpdate.length > 0) {
      await Promise.all(
        formsToCreateOrUpdate.map(async (f: any) => {
          try {
            const existingForm = await formsCollection.find(f.moduleId)
            if (existingForm) {
              await existingForm.update((form: Forms) => {
                form.data = f.data
                form.isSynced = true
                form.workflow.set(this)
                form.updatedBy = f.data?.updatedBy || userData
              })
            }
          } catch (e: Error | any) {
            const notFoundRegex = /Record ([^ ]+) not found/
            const notFoundError = e?.message.match(notFoundRegex)
            if (notFoundError) {
              // create a new form
              formsCollection.create((form: Forms) => {
                form.name = f.formName
                form.workflow.set(this)
                form.member = this.member
                form.data = f.data
                form.isDraft = false
                form.isEdited = false
                form.isSynced = true
                form.createdBy = userData
                form.updatedBy = userData

                // eslint-disable-next-line no-underscore-dangle
                form._raw.id = f.moduleId
              })
            }
          }
        })
      )
    }

    return this
  }

  @writer async delete() {
    const forms = await this.forms.fetch()
    await Promise.all(forms.map((f: any) => f.destroyPermanently()))
    await this.destroyPermanently()
  }
}

export default [Templates, Forms, Workflows]
