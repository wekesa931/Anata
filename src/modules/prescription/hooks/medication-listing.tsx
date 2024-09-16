import { useMember } from 'src/context/member'
import { usePrescriptionsAPI } from '../services/api.services'

export type MedicationListingData = ReturnType<typeof useMedicationListingData>

const useMedicationListingData = () => {
  const { member } = useMember()

  const { fetchMedications, fetchMedicationDetails, fetchConsultationData } =
    usePrescriptionsAPI()

  const getMedications = async (prescriptionIds: Array<string>) => {
    const medications = await fetchMedications(prescriptionIds)
    return medications
  }

  const getMedicationDetails = async (prescriptionIds: Array<string>) => {
    const medicationDetails = await fetchMedicationDetails(prescriptionIds)
    return medicationDetails
  }
  const getConsultationData = async () => {
    const consultations = await fetchConsultationData(member)
    return consultations
  }

  return {
    getMedications,
    getConsultationData,
    getMedicationDetails,
  }
}

export default useMedicationListingData
