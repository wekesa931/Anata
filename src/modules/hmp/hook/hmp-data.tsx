import { useMember } from 'src/context/member'
import { useEffect, useState } from 'react'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Collection, Q } from '@nozbe/watermelondb'
import type { HMP } from 'src/modules/hmp/db/models'
import { CollectionType } from 'src/storage/types'
import type { Member } from 'src/modules/member/db/models'
import { HMPType } from 'src/modules/hmp/types'
import { logError } from 'src/utils/logging/logger'
import { useHmpApi } from 'src/modules/hmp/services/hmp.api'

const buildHmp = (hmp: HMP, data: HMPType) => {
  hmp.antaraId = data.antaraId
  hmp.hmpDay = data?.hmpDay
  hmp.hmpSendDate = data?.hmpSendDate
  hmp.hmpNumber = data?.hmpNumber
  hmp.hmpLastReviewDate = data?.hmpLastReviewDate
  hmp.hmpLink = data?.hmpLink
  hmp.hmpState = data?.hmpState
  // eslint-disable-next-line no-underscore-dangle
  hmp._raw.id = data.id
}

export const useHmpData = () => {
  const { member } = useMember()
  const [loading, setLoading] = useState<boolean>(false)
  const { getHmps } = useHmpApi()
  const database = useDatabase()
  const [memberHmps, setMemberHmps] = useState<HMP[]>([])

  const hmpsCollection: Collection<HMP> = database.collections.get(
    CollectionType.HMPS
  )

  useEffect(() => {
    setLoading(true)
    if (member) {
      hmpsCollection
        .query(Q.where('antaraId', member?.antaraId))
        .fetch()
        .then(setMemberHmps)
        .finally(() => {
          setLoading(false)
        })
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

  useEffect(() => {
    setLoading(true)
    if (member) {
      hydrateHmps(member).finally(() => {
        setLoading(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  useEffect(() => {
    deleteAllHmps()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    hydrateHmps,
    deleteAllHmps,
    hmpsCollection,
    memberHmps,
  }
}

export default useHmpData
