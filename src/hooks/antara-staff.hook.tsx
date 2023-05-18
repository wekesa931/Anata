import React , { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_ANTARA_STAFF } from 'src/gql/staff'
import logError from 'src/utils/logging/logger'

const useAntaraStaff = () => {
  const [allAntaraStaffs, setAllAntaraStaffs] = useState<any>([])

  const [getAntaraStaff, { loading }] = useLazyQuery(GET_ANTARA_STAFF)


  const getStaffTeam =
    (team: string, staffMembers: any[] = []) => {
      return staffMembers.filter((e: any) => e?.team === team)
    }

  const getAllStaff = (staffMembers: any[] = []) => {
    return staffMembers.map((staff: any) => ({
      ...staff?.node,
    }))
  }


  useEffect(() => {
    getAntaraStaff().then(({ data }) => {
      const fetchedData = data?.antaraStaff?.edges
      setAllAntaraStaffs(getAllStaff(fetchedData))
    }).catch((err) => {
      logError(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const returnValue = React.useMemo(() => ({
    allAntaraStaffs,
    loading,
    antaraHNs: getStaffTeam('HEALTH_NAVIGATOR', allAntaraStaffs),
    antaraMEs: getStaffTeam('MEMBER_EXPERIENCE', allAntaraStaffs),
  }), [loading, allAntaraStaffs])


  return returnValue
  
}

export default useAntaraStaff
