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
  VITALS = 'vitals',
  BLOOD_PRESSURE = 'blood_pressure',
  BLOOD_GLUCOSE = 'blood_glucose',
  CHOLESTEROL = 'cholesterol',
  HBA1C = 'hba1c',
  PANEL_CLUSTERS = 'panel_clusters',
  BP_PANEL_CLUSTERS = 'bp_panel_clusters',
}

export type Model<T> = T &
  BaseModel & {
    _id: string
    id: string
    _raw: T
  }
