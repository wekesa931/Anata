import airtableFetch from 'src/services/airtable/fetch'
import filterFields from 'src/utils/airtable/field-utils'
import { useMember } from 'src/context/member'
import { transformMedicationRecord } from '../utils/transform'
import { RawMedicationRecord, CustomMedication } from '../types'
import { getMedicationName, formatDate } from '../utils'

export const usePrescriptionsAPI = () => {
  const { member } = useMember()

  const fetchMedications = async (
    prescriptions: Array<string>
  ): Promise<Array<CustomMedication>> => {
    const medicationFields = [
      'Summary',
      'Medication Name (from Medication Base)',
      'Other Medication',
      'Record ID',
    ]

    let filterFormula = ''

    if (!prescriptions) {
      filterFormula = `AND(FIND("${member?.airtableRecordId}", {Member Record ID}), {Status} != "STOPPED")`
    } else {
      filterFormula = `OR(${prescriptions
        .map((prescriptionId) => `FIND("${prescriptionId}", {Record ID})`)
        .join(',')})`
    }
    const records = await airtableFetch(
      `medications/list?&filterByFormula=${encodeURIComponent(
        filterFormula
      )}&${filterFields(medicationFields)}`
    )
    const medicationList: Array<CustomMedication> = records.map(
      (record: RawMedicationRecord) => transformMedicationRecord(record)
    )

    return medicationList
  }

  const fetchMedicationDetails = async (
    prescriptions: Array<string>
  ): Promise<Array<any>> => {
    const medicationDetailsFields = [
      'Summary',
      'Medication Name (from Medication Base)',
      'Molecule Name (from Clean Molecule) (from Medication)',
      'Brand Name',
      'Other Medication',
      'Record ID',
      'Quantity',
      'Quantity Units',
      'Frequency',
      'Route',
      'Duration',
      'Instructions',
      'Refillable',
      'Additional Instructions',
    ]

    const prescriptionValues = prescriptions.map(
      (prescription) => prescription.value
    )

    const filterByFormula = `OR(${prescriptionValues
      .map((value) => `FIND("${value}", {Record ID})`)
      .join(',')})`

    const records = await airtableFetch(
      `medications/list?&filterByFormula=${encodeURIComponent(
        filterByFormula
      )}&${filterFields(medicationDetailsFields)}`
    )

    const medicationList = records.map((record: any) => {
      const medicationName = getMedicationName(record)
      const medicationInstructions = record.Instructions || 'As Directed'
      const refillableStatus =
        record.Refillable === 'Yes' ? 'Refillable' : 'Not Refillable'

      return {
        medicationName,
        brandName: record['Brand Name'],
        recordId: record['Record ID'],
        quantity: record.Quantity,
        unit: record['Quantity Units'],
        frequency: record.Frequency,
        route: record.Route,
        duration: record.Duration,
        instructions: medicationInstructions,
        additionalInstructions: record['Additional Instructions'],
        refillable: refillableStatus,
        dosageStrength:
          record['Dosage Strength (from Clean Molecule) (from Medication)'],
        formulation:
          record['Formulation (from Clean Molecule) (from Medication)'],
        value: record['Record ID'],
      }
    })

    return medicationList
  }

  const fetchConsultationData = async (member: any) => {
    const allowedFields = [
      'Date of Consultation',
      'Interaction type',
      'Consultation Type',
      'Created',
      'Record ID (from Appointments)',
      'Status (from Appointments)',
      "Doctor's Name",
      'created_by',
      'Prescriptions',
      'Antara ID (from Member)',
      'Case ID',
    ]
    const memberConsultation = await airtableFetch(
      `clinicalconsultation/list?&filterByFormula=FIND("${
        member?.antaraId
      }", {Antara ID (from Member)})&${filterFields(allowedFields)}`
    )

    const filteredConsultationData = memberConsultation.filter(
      (consultation: any) => consultation.Prescriptions
    )

    const formattedOptions = filteredConsultationData.map(
      (consultation: any) => ({
        value: consultation.Prescriptions,
        label: formatDate(consultation.Created),
      })
    )
    return formattedOptions
  }

  return {
    fetchMedications,
    fetchMedicationDetails,
    fetchConsultationData,
  }
}
