interface RawMedicationRecord {
  'Medication Name (from Medication Base)': string | null
  'Other Medication': string | null
  'Record ID': string
}

interface CustomMedication {
  label: string
  value: string
}

export type { RawMedicationRecord, CustomMedication }
