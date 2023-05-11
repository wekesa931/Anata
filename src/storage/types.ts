import { Model as BaseModel } from '@nozbe/watermelondb'

export enum CollectionType {
  WORKFLOW = 'workflows',
  FORM = 'forms',
  WORKFLOW_TEMPLATES = 'workflow_templates',
}

export type Model<T> = T &
  BaseModel & {
    _id: string
    id: string
    _raw: T
  }
