import { useMember } from 'src/context/member'
import { useEffect, useState } from 'react'
import { useConditionsApi } from 'src/modules/conditions/services/conditions.api'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Collection, Q } from '@nozbe/watermelondb'
import { Condition } from 'src/modules/conditions/db/models'
import { CollectionType } from 'src/storage/types'
import type { Member } from 'src/modules/member/db/models'
import {
  Filter,
  AcuteVsChronic,
  ConditionStatus,
  Condition as TCondition,
} from 'src/modules/conditions/types'
import { logError } from 'src/utils/logging/logger'
import type { ConditionInterventions } from 'src/storage/indexeddb/watermelon/relations-models'
import { useInterventionData } from 'src/modules/interventions/hooks/intervention.data'
import { diffRecordsById } from 'src/utils/diff'
import { buildCondition } from 'src/modules/conditions/utils'
import { ConditionsObserver } from 'src/services/observers'

export const useConditionData = () => {
  const { member } = useMember()
  const [loading, setLoading] = useState<boolean>(false)
  const { getConditions, getById, isLoading } = useConditionsApi()
  const database = useDatabase()
  const { findInterventionById } = useInterventionData()
  const [memberConditions, setMemberConditions] = useState<Condition[]>([])

  const conditionsCollection: Collection<Condition> = database.collections.get(
    CollectionType.CONDITIONS
  )
  const relationCollection: Collection<ConditionInterventions> =
    database.collections.get(CollectionType.CONDITIONS_INTERVENTIONS)

  const getAllConditionsFromDb = async () => {
    filterBy({
      acuteVsChronic: AcuteVsChronic.ALL,
      conditionStatus: ConditionStatus.ALL,
    })
      .then(setMemberConditions)
      .catch((err) => {
        logError(err)
      })
  }

  const deleteAllConditions = async () => {
    await database.write(async () => {
      const conditions = await conditionsCollection.query().fetch()
      await Promise.all(
        conditions.map(async (condition) => {
          await condition.destroyPermanently()
        })
      )
    })
  }

  const getAllConditions = async (currentMember: Member) => {
    return (
      (await conditionsCollection
        .query(Q.where('antaraId', currentMember?.antaraId))
        .fetch()) || []
    )
  }

  const filterBy = async (filter: Filter) => {
    if (member) {
      if (
        filter.acuteVsChronic === AcuteVsChronic.ALL &&
        filter.conditionStatus === ConditionStatus.ALL
      ) {
        return getAllConditions(member)
      }

      if (filter.acuteVsChronic === AcuteVsChronic.ALL) {
        return filterByStatus(filter.conditionStatus)
      }
      if (filter.conditionStatus === ConditionStatus.ALL) {
        return filterByAcuteVsChronic(filter.acuteVsChronic)
      }

      return (
        conditionsCollection
          .query(
            Q.where('antaraId', member?.antaraId),
            Q.where('condition_status', filter.conditionStatus),
            Q.where('acute_vs_chronic', filter.acuteVsChronic)
          )
          .fetch() || []
      )
    }

    return []
  }
  const filterByStatus = async (status: ConditionStatus) => {
    try {
      setLoading(true)
      let filteredConditions: Condition[] = []
      if (member) {
        if (status === ConditionStatus.ALL) {
          filteredConditions =
            (await conditionsCollection
              .query(Q.where('antaraId', member?.antaraId))
              .fetch()) || []
        } else {
          filteredConditions =
            (await conditionsCollection
              .query(
                Q.where('antaraId', member?.antaraId),
                Q.where('condition_status', status)
              )
              .fetch()) || []
        }
      }

      return filteredConditions
    } catch (error) {
      logError(error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const filterByAcuteVsChronic = async (status: AcuteVsChronic) => {
    try {
      setLoading(true)
      let filteredAcuteVsChronic: Condition[] = []
      if (member) {
        if (status === AcuteVsChronic.ALL) {
          filteredAcuteVsChronic =
            (await conditionsCollection
              .query(Q.where('antaraId', member?.antaraId))
              .fetch()) || []
        } else {
          filteredAcuteVsChronic =
            (await conditionsCollection
              .query(
                Q.where('antaraId', member?.antaraId),
                Q.where('acute_vs_chronic', status)
              )
              .fetch()) || []
        }
      }
      return filteredAcuteVsChronic
    } catch (error) {
      logError(error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const hydrateConditions = async (currentMember: Member) => {
    try {
      if (member) {
        const conditions = await getConditions()
        const cachedConditions =
          (await conditionsCollection
            .query(Q.where('antaraId', currentMember?.antaraId))
            .fetch()) || []

        const {
          deleted: toBeDeleted,
          created: toBeAdded,
          updated: toBeUpdated,
        } = diffRecordsById(cachedConditions, conditions)

        // delete conditions
        await Promise.all(
          toBeDeleted.map(async (condition) => {
            await database.write(async () => {
              await condition.destroyPermanently()
            })
          })
        )

        // add conditions
        await Promise.all(
          toBeAdded.map(async (condition) => {
            await database.write(async () => {
              await conditionsCollection.create((c) => {
                buildCondition(c, condition)
              })
            })
          })
        )

        // update conditions
        await Promise.all(
          toBeUpdated.map(async (condition) => {
            await database.write(async () => {
              const cached = await conditionsCollection.find(condition.id)
              await cached.update((c) => {
                buildCondition(c, condition)
              })
            })
          })
        )

        // hydrate the interventions for all to be added and to be updated
        await Promise.all([...toBeAdded, ...toBeUpdated].map(hydrateRelations))
      }
    } catch (error) {
      logError(error)
    }
  }

  const findConditionById = async (conditionId: string) => {
    try {
      return await conditionsCollection.find(conditionId)
    } catch (err: any) {
      const notFoundRegex = /Record ([^ ]+) not found/
      const notFoundError = err?.message.match(notFoundRegex)
      if (notFoundError) {
        return hydrateConditonById(conditionId)
      }

      return null
    }
  }

  const hydrateConditonById = async (conditionId: string) => {
    try {
      const condition = await getById(conditionId)
      if (condition) {
        return await database.write(() => {
          return conditionsCollection.create((c) =>
            buildCondition(c, condition)
          )
        })
      }

      return null
    } catch (err: any) {
      logError(err)
      return null
    }
  }
  const hydrateRelations = async (condition: TCondition) => {
    const { id, interventions = [] } = condition

    await Promise.all(
      interventions.map(async (intervention_id: string) => {
        // hydrate the intervention if it does not exist
        await findInterventionById(intervention_id)
        const cachedRelations =
          (await relationCollection
            .query(
              Q.where('condition_id', id),
              Q.where('intervention_id', intervention_id),
              Q.take(1)
            )
            .fetch()) || []

        if (!cachedRelations.length) {
          return database.write(async () => {
            await relationCollection.create((r) => {
              r.condition.id = id
              r.intervention.id = intervention_id
            })
          })
        }
        return null
      })
    )
  }

  const hydrateAndLoadConditions = async (member: Member) => {
    try {
      setLoading(true)
      await hydrateConditions(member)
      await getAllConditionsFromDb()
    } catch (error) {
      logError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (member) {
      hydrateAndLoadConditions(member)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  useEffect(() => {
    getAllConditionsFromDb()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  useEffect(() => {
    if (member) {
      ConditionsObserver.subscribe(() => {
        hydrateAndLoadConditions(member)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  return {
    loading: loading || isLoading,
    filterByStatus,
    filterByAcuteVsChronic,
    hydrateConditions,
    deleteAllConditions,
    filterBy,
    findConditionById,
    conditionsCollection,
    memberConditions,
  }
}

export default useConditionData
