import { LabRequest, RawLabRequest } from 'src/modules/labs/types'

export const transformRawLabRequest = (
  rawLabRequest: RawLabRequest
): LabRequest => {
  const parseArrayOrString = (arrayOrString: any) => {
    if (Array.isArray(arrayOrString)) {
      return arrayOrString.join(', ')
    }

    return arrayOrString
  }

  const parseImagingType = (imagingType: any) => parseArrayOrString(imagingType)

  const parseLabType = (labType: any) => parseArrayOrString(labType)

  const {
    Status: status,
    Notes: notes,
    'Tags (from Members)': tags,
    'Payor name (from Payors) (from Members)': payorName,
    'Full Name (from Members)': memberName,
    'Full Address (from Members)': memberAddress,
    Source: source,
    'Record ID': recordId,
    Summary: summary,
    createdBy,
    'Antara ID (from Members)': antaraId,
    Created: createdAt,
    'Last Modified By': lastModifiedBy,
    'Last Modified': lastModifiedAt,
    'Date of request (created at)': dateOfRequest,
    'Imaging type': imagingType,
    'Result Date': resultDate,
    Reason: reason,
    Type: type,
    'Routine lab name': routineLabName,
  } = rawLabRequest

  return {
    status,
    notes,
    tags,
    labType: parseLabType(routineLabName),
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
    resultDate,
    imagingType: parseImagingType(imagingType),
    reason,
    type,
  }
}

export function extractFromArray(array?: string[]) {
  if (array && array.length > 0) {
    return array[0]
  }

  return ''
}
