import { useMember } from 'src/context/member'
import {
  Condition,
  Filters,
  ConditionDefinition,
  NewConditionValues,
} from 'src/modules/conditions/types'
import { useConditionsApi } from 'src/modules/conditions/services/conditions.api'
import { useEffect, useState } from 'react'
import { logError } from 'src/utils/logging/logger'
import { formatDate } from 'src/modules/conditions/utils/transforms'
import {
  sortDefinitionsByName,
  FILTER_TABLE,
} from 'src/modules/conditions/utils'

export type ConditionsData = {
  conditions: Condition[]
  error: any
  loading: boolean
}
type PayloadType = {
  antaraId: string
  conditionDefinitionId: any
  clinicalStatusId: any
  verificationStatusId: any
  note: any
  dataSource: string
  isChronic: any
  icd11Code: any
  currentStageId: any
  onsetDate: string | null
  diagnosisDate: string | null
  targetAchievementStatusId: any
  targetId: any
  isNewlyDiagnosed: boolean
  shouldSystemAutoUpdate: boolean
  reasonForClinicalStatusChange?: string
}

export const useConditionsData = () => {
  const {
    fetchConditionsData,
    updateConditionsData,
    fetchLookups,
    fetchConditionsDefinitions,
    createNewCondition,
  } = useConditionsApi()
  const { member } = useMember()
  const [lookups, setLookups] = useState<any>({})
  const [conditionDefinitions, setConditionDefinitions] = useState<
    ConditionDefinition[]
  >([])
  const [loadingLookups, setLoadingLookups] = useState(false)
  const [allConditions, setAllConditions] = useState<Condition[]>([])

  const loadAllLookups = async (antaraId: string) => {
    const lookups = await fetchLookups()
    const definitions = await fetchConditionsDefinitions()
    const conditions = await fetchConditionsData(antaraId)

    return {
      lookups,
      definitions,
      conditions,
    }
  }

  useEffect(() => {
    setLoadingLookups(true)
    if (member?.antaraId) {
      loadAllLookups(member?.antaraId || '')
        .then(({ lookups, definitions, conditions }) => {
          setLookups(lookups)
          setConditionDefinitions(sortDefinitionsByName(definitions))
          setAllConditions(conditions)
        })
        .catch((error) => {
          logError(error)
        })
        .finally(() => {
          setLoadingLookups(false)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.antaraId])

  const filterConditions = async (filters: Filters) => {
    if (!member?.antaraId) {
      return []
    }
    const conditions = await fetchConditionsData(member.antaraId)
    return FILTER_TABLE[filters](conditions)
  }

  const handleUpdateConditions = async (values: any) => {
    const getIdValue = (v: any) => {
      const value = v?.value

      if (value === null) {
        // null may represent a non existent options such as `Pending`
        return undefined
      }

      return v?.value ?? v
    }
    try {
      if (member?.antaraId) {
        const payload: PayloadType = {
          antaraId: member.antaraId,
          conditionDefinitionId: values.conditionDefinitionId,
          clinicalStatusId: getIdValue(values.clinicalStatus),
          verificationStatusId: getIdValue(values.verificationStatus),
          note: values.notes,
          dataSource: 'guided-workflow',
          isChronic: values.isChronic,
          icd11Code: values.icd11Code,
          currentStageId: getIdValue(values.currentStage),
          onsetDate: values.onsetDate ? formatDate(values.onsetDate) : null,
          diagnosisDate: values.diagnosisDate
            ? formatDate(values.diagnosisDate)
            : null,
          targetAchievementStatusId:
            values.achievementStatus?.value || values.achievementStatus,
          targetId: values.targetId?.value || values.targetId,
          isNewlyDiagnosed: values.isNewlyDiagnosed === 'yes',
          shouldSystemAutoUpdate: values.shouldSystemAutoUpdate,
          reasonForClinicalStatusChange: values.reasonForClinicalStatusChange,
        }
        const filteredPayload = Object.fromEntries(
          Object.entries(payload).filter(
            ([, value]) => value !== null && value !== '' && value !== 'Unknown'
          )
        ) as PayloadType
        const response = await updateConditionsData(filteredPayload)
        return response
      }
      return undefined
    } catch (error) {
      logError(error)
      return { error }
    }
  }

  const handleCreateNewCondition = async (
    values: Partial<NewConditionValues>
  ) => {
    if (!member?.antaraId) throw new Error('Member not found')

    const { targetId, startingStageId, atRiskFromIds, ...rest } = values

    const targetIdValue = targetId === -1 ? undefined : targetId
    const startingStageIdValue =
      startingStageId === -1 ? undefined : startingStageId

    const atRiskFromIdsValue = atRiskFromIds?.includes(-1) ? [] : atRiskFromIds

    const payload = {
      antaraId: member.antaraId,
      ...rest,
      targetId: targetIdValue,
      startingStageId: startingStageIdValue,
      atRiskFromIds: atRiskFromIdsValue,
    }

    return createNewCondition(payload)
  }

  return {
    filterConditions,
    lookups,
    handleUpdateConditions,
    conditionDefinitions,
    loadingLookups,
    handleCreateNewCondition,
    allConditions,
    loading: loadingLookups,
  }
}

export default useConditionsData
