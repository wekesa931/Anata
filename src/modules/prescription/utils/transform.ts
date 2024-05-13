import { RawMedicationRecord, CustomMedication } from '../types'
import { getMedicationName } from './index'

export const transformMedicationRecord = (
  record: RawMedicationRecord
): CustomMedication => {
  return {
    label: getMedicationName(record),
    value: record['Record ID'],
  }
}
