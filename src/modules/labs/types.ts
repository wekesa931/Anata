type Creator = {
  name: string
  id: string
  email: string
}

export interface LabRequest {
  dateOfRequest: string
  labType: string
  status: string
  tags: string[]
  payorName: string
  memberName: string
  memberAddress: string
  source: string
  createdBy: Creator
  lastModifiedBy: Creator
  antaraId: string
  summary: string
  createdAt: string
  lastModifiedAt: string
  recordId: string
  notes: string
}

export type RawLabRequest = {
  Summary: string
  Status: string
  Type: string
  'Created By': Creator
  'Last Modified By': Creator
  Created: string
  'Last Modified': string
  'Record ID': string
  Members: string[]
  'Payor name (from Payors) (from Members)': string[]
  'Employer (from Members)': string[]
  'Antara ID (from Members)': string[]
  'Full Name (from Members)': string[]
  'Lab type': string
  'Date of request (created at)': string
  'Full Address (from Members)': string[]
  'Assigned HN (from Members)': string[]
  'Assigned ME (from Members)': string[]
  Source: string
  'Tags (from Members)': string[]
  tableName: string
  Notes: string
}

export type UpdateLabRequest = {
  id: string
  fields: Partial<RawLabRequest>
}
