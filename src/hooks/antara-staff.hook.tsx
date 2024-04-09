import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_ANTARA_STAFF } from 'src/gql/staff'
import logError from 'src/utils/logging/logger'
import { User } from 'src/types/user'

const mapAssigneeTeam = (antaraStaff: any[]) => {
  const teamType = [
    'DOCTOR',
    'NUTRITIONIST',
    'HEALTH_NAVIGATOR',
    'MEMBER_EXPERIENCE',
    'LOGISTICS',
  ]
  return antaraStaff
    .filter(({ team }: any) => {
      return teamType.some((value) => team === value)
    })
    .sort((a, b) => a?.fullName?.localeCompare(b?.fullName))
}

export const mapAssigneeToLookup = (allAntaraStaffs: any[]) => {
  return mapAssigneeTeam(allAntaraStaffs).map(
    ({ fullName, atRecordId, emailUsername }: any) => ({
      label: fullName,
      value: emailUsername,
      recordId: atRecordId,
    })
  )
}

export const useAntaraStaff = () => {
  const [allAntaraStaffs, setAllAntaraStaffs] = useState<any>([])

  const ANTARA_STAFF_KEY = 'ANTARA_STAFF'

  const [getAntaraStaff, { loading }] = useLazyQuery(GET_ANTARA_STAFF)

  const filterByTeam = (team: string, staffMembers: any[] = []) => {
    return staffMembers.filter((e: any) => e?.team === team)
  }

  const extractStaffData = (staffMembers: any[] = []) => {
    return staffMembers.map((staff: any) => ({
      ...staff?.node,
    }))
  }

  const getStaffByUser = async (user: User) => {
    if (user && user.email) {
      const { data } = await getAntaraStaff({
        variables: {
          email: user.email,
        },
      })
      if (data?.antaraStaff?.edges?.length > 0) {
        return data?.antaraStaff?.edges[0]?.node
      }
      return null
    }
    throw new Error('User not found')
  }

  const getFromCache = async () => {
    try {
      const cache = sessionStorage.getItem(ANTARA_STAFF_KEY)
      if (cache) {
        const cached = JSON.parse(cache)
        if (cached.length > 0) return setAllAntaraStaffs(cached)
      }
      const { data } = await getAntaraStaff()
      const fetchedData = extractStaffData(data?.antaraStaff?.edges || [])
      setAllAntaraStaffs(fetchedData)
      sessionStorage.setItem(ANTARA_STAFF_KEY, JSON.stringify(fetchedData))
    } catch (error) {
      logError(error)
    }
  }

  useEffect(() => {
    getFromCache()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const returnValue = React.useMemo(
    () => ({
      allAntaraStaffs,
      loading,
      antaraHNs: filterByTeam('HEALTH_NAVIGATOR', allAntaraStaffs),
      antaraMEs: filterByTeam('MEMBER_EXPERIENCE', allAntaraStaffs),
      antaraNutritionists: filterByTeam('NUTRITIONIST', allAntaraStaffs),
      antaraLogistics: filterByTeam('LOGISTICS', allAntaraStaffs),
      getStaffByUser,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, allAntaraStaffs]
  )

  return returnValue
}

export default useAntaraStaff
