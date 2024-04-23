import { RawMedicationRecord, CustomMedication } from '../types'

export const transformMedicationRecord = (
  record: RawMedicationRecord
): CustomMedication => {
  const medicationName =
    record['Medication Name (from Medication Base)'] ||
    record['Other Medication'] ||
    'Other'

  return {
    label: Array.isArray(medicationName) ? medicationName[0] : medicationName,
    value: record['Record ID'],
  }
}
