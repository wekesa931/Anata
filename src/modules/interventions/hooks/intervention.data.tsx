import { useMember } from 'src/context/member'
import { useEffect, useState } from 'react'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Collection, Q } from '@nozbe/watermelondb'
import type { Intervention } from 'src/modules/interventions/db/models'
import { CollectionType } from 'src/storage/types'
import type { Member } from 'src/modules/member/db/models'
import {
  Attainment,
  Filter,
  InterventionStatus,
} from 'src/modules/interventions/types'
import { logError } from 'src/utils/logging/logger'
import { useInterventionsApi } from 'src/modules/interventions/services/interventions.api'
import { diffRecordsById } from 'src/utils/diff'
import { buildIntervention } from 'src/modules/interventions/utils'
import { InterventionsObserver } from 'src/services/observers'

export const useInterventionData = () => {
  const { member } = useMember()
  const [loading, setLoading] = useState<boolean>(false)
  const { getInterventions, getById, isLoading } = useInterventionsApi()
  const database = useDatabase()
  const [memberInterventions, setMemberInterventions] = useState<
    Intervention[]
  >([])
  const interventionsCollection: Collection<Intervention> =
    database.collections.get(CollectionType.INTERVENTIONS)

  const getAllInterventionsFromDb = async () => {
    setLoading(true)
    filterBy({
      attainment: Attainment.ALL,
      interventionStatus: InterventionStatus.ALL,
    })
      .then(setMemberInterventions)
      .catch((err) => {
        logError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getAllInterventionsFromDb()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const deleteAllInterventions = async () => {
    await database.write(async () => {
      const interventions = await interventionsCollection.query().fetch()
      await Promise.all(
        interventions.map(async (intervention) => {
          await intervention.destroyPermanently()
        })
      )
    })
  }

  const getAllInterventions = async (currentMember: Member) => {
    return (
      (await interventionsCollection
        .query(Q.where('antaraId', currentMember?.antaraId))
        .fetch()) || []
    )
  }

  const filterBy = async (filter: Filter) => {
    if (member) {
      if (
        filter.interventionStatus === InterventionStatus.ALL &&
        filter.attainment === Attainment.ALL
      ) {
        return getAllInterventions(member)
      }

      if (filter.interventionStatus === InterventionStatus.ALL) {
        return filterByAttainment(filter.attainment)
      }

      if (filter.attainment === Attainment.ALL) {
        return filterByStatus(filter.interventionStatus)
      }

      return (
        interventionsCollection
          .query(
            Q.where('antaraId', member?.antaraId),
            Q.where('intervention_status', filter.interventionStatus),
            Q.where('attainment', filter.attainment)
          )
          .fetch() || []
      )
    }

    return []
  }
  const filterByStatus = async (status: InterventionStatus) => {
    try {
      setLoading(true)
      let filteredInterventions: Intervention[] = []
      if (member) {
        if (status === InterventionStatus.ALL) {
          filteredInterventions =
            (await interventionsCollection
              .query(Q.where('antaraId', member?.antaraId))
              .fetch()) || []
        } else {
          filteredInterventions =
            (await interventionsCollection
              .query(
                Q.where('antaraId', member?.antaraId),
                Q.where('intervention_status', status)
              )
              .fetch()) || []
        }
      }

      return filteredInterventions
    } catch (error) {
      logError(error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const filterByAttainment = async (status: Attainment) => {
    try {
      setLoading(true)
      let filteredAttainment: Intervention[] = []
      if (member) {
        if (status === Attainment.ALL) {
          filteredAttainment =
            (await interventionsCollection
              .query(Q.where('antaraId', member?.antaraId))
              .fetch()) || []
        } else {
          filteredAttainment =
            (await interventionsCollection
              .query(
                Q.where('antaraId', member?.antaraId),
                Q.where('attainment', status)
              )
              .fetch()) || []
        }
      }
      return filteredAttainment
    } catch (error) {
      logError(error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const hydrateInterventions = async (currentMember: Member) => {
    try {
      if (currentMember) {
        const interventions = await getInterventions()
        const cachedInterventions =
          (await interventionsCollection
            .query(Q.where('antaraId', currentMember?.antaraId))
            .fetch()) || []

        const {
          deleted: toBeDeleted,
          created: toBeAdded,
          updated: toBeUpdated,
        } = diffRecordsById(cachedInterventions, interventions)

        await Promise.all(
          toBeDeleted.map(async (intervention) => {
            await database.write(async () => {
              await intervention.destroyPermanently()
            })
          })
        )

        await Promise.all(
          toBeAdded.map(async (intervention) => {
            await database.write(async () => {
              await interventionsCollection.create((c) => {
                buildIntervention(c, intervention)
              })
            })
          })
        )

        await Promise.all(
          toBeUpdated.map(async (intervention) => {
            await database.write(async () => {
              const cached = await interventionsCollection.find(intervention.id)
              await cached.update((c) => {
                buildIntervention(c, intervention)
              })
            })
          })
        )
      }
    } catch (error) {
      logError(error)
    }
  }
  useEffect(() => {
    if (member) {
      hydrateInterventions(member)
        .then(getAllInterventionsFromDb)
        .catch(logError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const findInterventionById = async (interventionId: string) => {
    try {
      return await interventionsCollection.find(interventionId)
    } catch (err: any) {
      const notFoundRegex = /Record ([^ ]+) not found/
      const notFoundError = err?.message.match(notFoundRegex)
      if (notFoundError) {
        return hydrateInterventionById(interventionId)
      }

      return null
    }
  }

  const hydrateInterventionById = async (interventionId: string) => {
    try {
      const intervention = await getById(interventionId)
      if (intervention) {
        return await database.write(async () => {
          return interventionsCollection.create((i) => {
            buildIntervention(i, intervention)
          })
        })
      }

      return null
    } catch (err) {
      logError(err)
      return null
    }
  }

  useEffect(() => {
    const subscription = InterventionsObserver.subscribe(() => {
      if (member) {
        hydrateInterventions(member)
          .then(getAllInterventionsFromDb)
          .catch(logError)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  return {
    loading: loading || isLoading,
    filterByStatus,
    filterByAttainment,
    hydrateInterventions,
    deleteAllInterventions,
    filterBy,
    findInterventionById,
    interventionsCollection,
    memberInterventions,
  }
}

export default useInterventionData
