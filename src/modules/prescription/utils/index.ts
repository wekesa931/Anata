import dayjs from 'dayjs'

export const getMedicationName = (record: any): string => {
  const medicationBaseName = record['Medication Name (from Medication Base)']
  if (Array.isArray(medicationBaseName) && medicationBaseName.length > 0) {
    return medicationBaseName[0]
  }

  return (
    record['Molecule Name (from Clean Molecule) (from Medication)'] ||
    record['Other Medication'] ||
    'Other'
  )
}

export const formatDate = (dateString: any): string => {
  return dayjs(dateString).format('hh:mma  YYYY-MM-DD')
}
