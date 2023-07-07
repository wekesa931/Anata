import { Model as BaseModel } from '@nozbe/watermelondb'

export enum CollectionType {
  WORKFLOW = 'workflows',
  FORM = 'forms',
  WORKFLOW_TEMPLATES = 'workflow_templates',
  MEMBERS = 'members',
  LOOKUPS = 'lookups',
  CONDITIONS = 'conditions',
  INTERVENTIONS = 'interventions',
  CONDITIONS_INTERVENTIONS = 'conditions_interventions', // many to many between condition and interventions
  HMPS = 'hmps',
}

export type Model<T> = T &
  BaseModel & {
    _id: string
    id: string
    _raw: T
  }
