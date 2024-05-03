import { useMember } from 'src/context/member'
import { useEffect, useState } from 'react'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Collection, Q } from '@nozbe/watermelondb'
import type { HMP } from 'src/modules/hmp/db/models'
import { CollectionType } from 'src/storage/types'
import type { Member } from 'src/modules/member/db/models'
import { logError } from 'src/utils/logging/logger'
import { useHmpApi } from 'src/modules/hmp/services/hmp.api'
import { buildHmp } from 'src/modules/hmp/utils'
import { HMPObserver } from 'src/services/observers'

export const useHmpData = () => {
  const { member } = useMember()
  const [loading, setLoading] = useState<boolean>(false)
  const { getHmps, isLoading } = useHmpApi()
  const database = useDatabase()
  const [memberHmps, setMemberHmps] = useState<HMP[]>([])

  const hmpsCollection: Collection<HMP> = database.collections.get(
    CollectionType.HMPS
  )

  const getHmpsFromDb = async (antaraId: string) => {
    setLoading(true)
    hmpsCollection
      .query(Q.where('antaraId', antaraId))
      .fetch()
      .then(setMemberHmps)
      .catch(logError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (member) {
      getHmpsFromDb(member?.antaraId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const deleteAllHmps = async () => {
    await database.write(async () => {
      const hmps = await hmpsCollection.query().fetch()
      await Promise.all(
        hmps.map(async (hmp) => {
          await hmp.destroyPermanently()
        })
      )
    })
  }

  const hydrateHmps = async (currentMember: Member) => {
    try {
      if (currentMember) {
        const hmps = await getHmps()

        const cachedHmps =
          (await hmpsCollection
            .query(Q.where('antaraId', currentMember?.antaraId))
            .fetch()) || []

        const toBeDeleted = cachedHmps.filter((cachedHmp) => {
          const found = hmps.find((hmp) => {
            return hmp.id === cachedHmp.id
          })
          return !found
        })

        const toBeAdded = hmps.filter((hmp) => {
          const found = cachedHmps.find((cachedHmp) => {
            return hmp.id === cachedHmp.id
          })
          return !found
        })

        const toBeUpdated = hmps.filter((hmp) => {
          const found = cachedHmps.find((cachedHmp) => {
            return hmp.id === cachedHmp.id
          })
          return found
        })

        await Promise.all(
          toBeDeleted.map(async (hmp) => {
            await database.write(async () => {
              await hmp.destroyPermanently()
            })
          })
        )

        await Promise.all(
          toBeAdded.map(async (hmp) => {
            await database.write(async () => {
              await hmpsCollection.create((c) => {
                buildHmp(c, hmp)
              })
            })
          })
        )

        await Promise.all(
          toBeUpdated.map(async (hmp) => {
            await database.write(async () => {
              const cached = await hmpsCollection.find(hmp.id)
              await cached.update((c) => {
                buildHmp(c, hmp)
              })
            })
          })
        )
      }
    } catch (error) {
      logError(error)
    }
  }

  const hydrateAndLoadHmps = async (currentMember: Member) => {
    try {
      setLoading(true)
      await hydrateHmps(currentMember)
      await getHmpsFromDb(currentMember?.antaraId)
    } catch (error) {
      logError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    if (member) {
      hydrateAndLoadHmps(member)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  useEffect(
    () => {
      if (member) {
        HMPObserver.subscribe(() => {
          hydrateAndLoadHmps(member)
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [member]
  )

  return {
    loading: loading || isLoading,
    hydrateHmps,
    deleteAllHmps,
    hmpsCollection,
    memberHmps,
  }
}

export default useHmpData
