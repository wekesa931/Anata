import { useEffect, useState } from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import logError from 'src/utils/logging/logger'
import { useMember } from 'src/context/member'
import { useUpdateMedications } from 'src/modules/clinical/clinical-modules/medications/services'
import filterFields from 'src/utils/airtable/field-utils'

const useMedicationData = () => {
  const [medicationsData, setMedicationsData] = useState<any[]>([])
  const { member } = useMember()
  const [loading, setLoading] = useState(true)
  const { updateMedications, loading: updatingMedications } =
    useUpdateMedications()

  const editMedication = (medication: any, values: any) => {
    if (member) {
      if (!medication || !values)
        throw new Error('No medication or values to update')
      const medicationId = medication?.['Record ID']

      return updateMedications(medicationId, values)
    }
    throw new Error('Member not found')
  }

  const getMedications = async (antaraId: string) => {
    const allowedFields: string[] = [
      'Autonumber',
      'Change of medication',
      'Check-ups Unit Price (from Medication)',
      'Condition (from Associated condition(s))',
      'County (from Member)',
      'Created time',
      'Data Source',
      'Days until Refill',
      'Dose (Numeric)',
      'Duration',
      'Frequency',
      'Gender (from Member)',
      'Geolocation (from Member)',
      'Immutable Medication',
      'Medication Name (from Medication Base)',
      'Member Address',
      'Member Status (from Member)',
      'New Delivery URL',
      'Prescribing facility name from Provider base',
      'Quantity',
      'Quantity Units',
      'Refill Date calculated',
      'Refillable',
      'Refused services (from Member)',
      'Route',
      'Start Date',
      'Status',
      'Summary',
      'Tags (from Member)',
      'Unit Price (from One Stop) (from Medication)',
      'created_by',
      'created_at',
      'last_modified',
      'status_last_modified_at',
      'updated_by',
    ]
    setLoading(true)
    try {
      const medications = await airtableFetch(
        `medications/list?filterByFormula=FIND("${antaraId}", {Antara ID (from Member)})&${filterFields(
          allowedFields
        )}`
      )

      const mappedResponses = medications?.map((med: any) => {
        Object.entries(med).forEach(([k, v]) => {
          if (Array.isArray(v)) {
            med[k] = v.join(',')
          }
        })

        return med
      })
      setMedicationsData(mappedResponses)
    } catch (e) {
      logError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (member?.antaraId) {
      getMedications(member?.antaraId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])
  return { medicationsData, loading, updatingMedications, editMedication }
}

export default useMedicationData
