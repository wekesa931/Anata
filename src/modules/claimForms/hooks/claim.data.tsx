import { useMember } from 'src/context/member'
import { useClaimAPI } from 'src/modules/claimForms/services/api.services'

export type ClaimListingData = ReturnType<typeof useClaimListingData>

const useClaimListingData = () => {
  const { member } = useMember()

  const { fetchConsultationData, regenerateClaimForm } = useClaimAPI()

  const getConsultationData = async () => {
    const consultations = await fetchConsultationData(member)
    return consultations
  }

  const handleRegenerateClaim = async (
    recId: string,
    insuranceId: string,
    insurer: string
  ) => {
    const regenerateClaim = await regenerateClaimForm({
      recId,
      insuranceId,
      insurer,
    })
    return regenerateClaim
  }

  return {
    getConsultationData,
    handleRegenerateClaim,
  }
}

export default useClaimListingData
