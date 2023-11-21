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
// import type { Member } from 'src/modules/member/db/models'
// import { initialFormValues } from '../utils'
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
    await this.update(() => {
      this.modules = modules
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

  @date('created_at') createdAt!: number

  @writer async saveInput(key: string, data: any) {
    // update the data object with the new data [key]: data
    await this.update(() => {
      this.data = { ...this.data, [key]: data }
      this.isEdited = true
    })
  }

  @writer async delete() {
    return this.destroyPermanently()
  }

  @writer async markAsCompleted(airtableId?: string) {
    await this.update(() => {
      this.isDraft = false
      this.isEdited = false
      this.isSynced = true
      this.airtableId = airtableId
    })
  }

  @writer async markAsSynced() {
    await this.update(() => {
      this.isSynced = true
    })
  }

  @writer async clearDraft() {
    await this.update(() => {
      this.isDraft = false
      this.isEdited = false
      this.data = {
        ...this.data,
        isDraft: false,
      }
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
      f.data = {
        ...formData,
        isDraft: true,
        createdBy: this.createdBy,
        updatedBy: this.updatedBy,
      }
      f.isDraft = true
      f.isEdited = false
      f.isSynced = false
      f.createdBy = this.createdBy
      f.updatedBy = this.updatedBy
      f.createdAt = dayjs().valueOf()
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
    return forms.some((f: Forms) => f.data?.isDraft || f.isDraft)
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
    await this.update(() => {
      this.isCompleted = true
    })
  }

  @writer async syncWorkflow(syncedWorkflow: any) {
    await this.update(() => {
      this.isSynced = true
      this.airtableId = syncedWorkflow.airtableId
      this.workflowId = syncedWorkflow.workflowId
      this.isCompleted = syncedWorkflow.completed
    })
  }

  @writer async createFromAPI(newWorkflow: any, member: any, user: any) {
    const userData = {
      email: user.email,
      name: user.name,
    }
    return this.update(() => {
      this.workflowId = newWorkflow.workflowId
      this.template = newWorkflow.template.name
      this.member = member.antaraId
      this.isCompleted = newWorkflow.completed
      this.isSynced = true
      this.isDraftSaved = true
      this.airtableId = newWorkflow.airtableId
      this.createdBy = userData
      this.updatedBy = userData
      this.createdAt = dayjs(newWorkflow.createdAt).valueOf()
      this.updatedAt = dayjs(newWorkflow.updatedAt).valueOf()
    })
  }

  @writer async delete() {
    const forms = await this.forms.fetch()
    await Promise.all(forms.map((f: any) => f.destroyPermanently()))
    await this.destroyPermanently()
  }
}

export default [Templates, Workflows, Forms]
