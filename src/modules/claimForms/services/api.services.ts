import airtableFetch from 'src/services/airtable/fetch'
import filterFields from 'src/utils/airtable/field-utils'
import { useMember } from 'src/context/member'
import dayjs from 'dayjs'
import { useMutation } from '@apollo/client'
import { REGENERATE_CLAIM_FORM } from 'src/modules/udm/services/gql'

type regenerateClaimInput = {
  recId: string
  insuranceId: string
  insurer: string
}

export const useClaimAPI = () => {
  const { member } = useMember()

  const formatDate = (dateString: any): string => {
    return dayjs(dateString).format('DD/MM/YYYY - hh:mma')
  }

  const fetchConsultationData = async () => {
    const allowedFields = [
      'Created',
      'Status (from Appointments)',
      'Record ID',
      'Consulting Clinician Name',
    ]
    const memberConsultation = await airtableFetch(
      `clinicalconsultation/list?&filterByFormula=AND(FIND("${
        member?.antaraId
      }", {Antara ID (from Member)}))&${filterFields(allowedFields)}`
    )

    const sortedConsultations = memberConsultation
      .sort(
        (a: any, b: any) =>
          new Date(b.Created).getTime() - new Date(a.Created).getTime()
      )
      .slice(0, 5)

    const formattedOptions = sortedConsultations.map((consultation: any) => ({
      value: consultation,
      label: `${consultation['Consulting Clinician Name']} - ${formatDate(
        consultation.Created
      )}`,
    }))
    return formattedOptions
  }

  const [regenerateClaimFormMutation, { loading: regenerating }] = useMutation(
    REGENERATE_CLAIM_FORM
  )

  const regenerateClaimForm = async (input: regenerateClaimInput) => {
    const { insuranceId, recId, insurer } = input
    const { data } = await regenerateClaimFormMutation({
      variables: { input },
    })

    if (data.regenerateClaimForm.status !== 200) {
      throw new Error(data.regenerateClaimForm.message)
    }
    return {
      ...data?.regenerateClaimForm,
      insuranceId,
      recId,
      insurer,
    }
  }

  return {
    fetchConsultationData,
    regeneratingClaim: regenerating,
    regenerateClaimForm,
  }
}
