import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_ANTARA_STAFF } from 'src/gql/staff'
import { User } from 'src/types/user'

const mapAssigneeTeam = (antaraStaff: any[]) => {
  const teamType = [
    'DOCTOR',
    'NUTRITIONIST',
    'HEALTH_NAVIGATOR',
    'MEMBER_EXPERIENCE',
    'LOGISTICS',
    'ME_TEAM_LEAD',
    'HN_TEAM_LEAD',
    'NUTRITIONIST_TEAM_LEAD',
    'HN_TEAM_LEAD',
    'PHARMTECH',
    'MENTAL HEALTH COUNSELOR',
    'HEALTHY PROGRAM COORDINATOR',
    'LOG',
  ]
  return antaraStaff
    .filter(({ team, staffTeam }: any) => {
      const teamName = (team || staffTeam?.name)?.toUpperCase()
      return teamType.includes(teamName)
    })
    .sort((a, b) => a?.fullName?.localeCompare(b?.fullName))
}

export const mapAssigneeToLookup = (allAntaraStaffs: any[]) => {
  return mapAssigneeTeam(allAntaraStaffs).map(
    ({ fullName, atRecordId, emailUsername }: any) => ({
      label: fullName,
      value: emailUsername,
      recordId: atRecordId,
      id: atRecordId,
      name: fullName,
    })
  )
}

export const useAntaraStaff = () => {
  const [allAntaraStaffs, setAllAntaraStaffs] = useState<any>([])

  const ANTARA_STAFF_KEY = 'ANTARA_STAFF'

  const [getAntaraStaff, { loading }] = useLazyQuery(GET_ANTARA_STAFF)

  const filterByTeam = (team: any[], staffMembers: any[] = []) => {
    return staffMembers.filter((e: any) => {
      const teamType = (e?.team || e?.staffTeam?.name)?.toUpperCase()
      return team.includes(teamType)
    })
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
    const cache = sessionStorage.getItem(ANTARA_STAFF_KEY)
    if (cache) {
      const cached = JSON.parse(cache)
      if (cached.length > 0) {
        setAllAntaraStaffs(cached)
        return cached
      }
    }
    const { data } = await getAntaraStaff()
    const fetchedData = extractStaffData(data?.antaraStaff?.edges || [])
    setAllAntaraStaffs(fetchedData)
    sessionStorage.setItem(ANTARA_STAFF_KEY, JSON.stringify(fetchedData))

    return fetchedData
  }

  const getStaffData = async () => {
    const data = await getFromCache()

    return data.map((d: any) => ({
      ...d,
      name: d.fullName,
      id: d.atRecordId,
    }))
  }

  useEffect(() => {
    getFromCache()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const returnValue = React.useMemo(
    () => ({
      allAntaraStaffs,
      loading,
      antaraHNs: filterByTeam(
        ['HEALTH_NAVIGATOR', 'HN_TEAM_LEAD'],
        allAntaraStaffs
      ),
      antaraMEs: filterByTeam(
        ['MEMBER_EXPERIENCE', 'ME_TEAM_LEAD'],
        allAntaraStaffs
      ),
      antaraNutritionists: filterByTeam(
        ['NUTRITIONIST', 'NUTRITIONIST_TEAM_LEAD'],
        allAntaraStaffs
      ),
      antaraLogistics: filterByTeam(['LOGISTICS'], allAntaraStaffs),
      getStaffByUser,
      getStaffData,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, allAntaraStaffs]
  )

  return returnValue
}

export default useAntaraStaff
