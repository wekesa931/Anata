import { LabRequest, RawLabRequest } from 'src/modules/labs/types'

export const transformRawLabRequest = (
  rawLabRequest: RawLabRequest
): LabRequest => {
  const {
    Status: status,
    Notes: notes,
    'Tags (from Members)': tags,
    'Lab type': labType,
    'Payor name (from Payors) (from Members)': payorName,
    'Full Name (from Members)': memberName,
    'Full Address (from Members)': memberAddress,
    Source: source,
    'Record ID': recordId,
    Summary: summary,
    'Created By': createdBy,
    'Antara ID (from Members)': antaraId,
    Created: createdAt,
    'Last Modified By': lastModifiedBy,
    'Last Modified': lastModifiedAt,
    'Date of request (created at)': dateOfRequest,
  } = rawLabRequest

  return {
    status,
    notes,
    tags,
    labType,
    payorName: extractFromArray(payorName),
    memberName: extractFromArray(memberName),
    memberAddress: extractFromArray(memberAddress),
    source,
    recordId,
    summary,
    createdBy,
    antaraId: extractFromArray(antaraId),
    createdAt,
    lastModifiedAt,
    lastModifiedBy,
    dateOfRequest,
  }
}

export function extractFromArray(array?: string[]) {
  if (array && array.length > 0) {
    return array[0]
  }

  return ''
}
