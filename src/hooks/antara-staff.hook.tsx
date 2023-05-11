import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_ANTARA_STAFF } from 'src/gql/staff'

const useAntaraStaff = () => {
  const [antaraMEs, setAntaraMEs] = useState<any>([])
  const [antaraHNs, setAntaraHNs] = useState<any>([])
  const [allAntaraStaffs, setAllAntaraStaffs] = useState<any>([])

  const [getAntaraStaff, { loading }] = useLazyQuery(GET_ANTARA_STAFF)

  const getStaffTeam =
    (team: string) =>
    (staffMembers: any[] = []) => {
      return staffMembers
        .filter((e: any) => e?.node?.team === team)
        .map((staff: any) => ({
          ...staff?.node,
        }))
    }

  const getAllStaff = (staffMembers: any[] = []) => {
    return staffMembers.map((staff: any) => ({
      ...staff?.node,
    }))
  }

  useEffect(() => {
    getAntaraStaff().then(({ data }) => {
      const getMes = getStaffTeam('MEMBER_EXPERIENCE')
      const getHns = getStaffTeam('HEALTH_NAVIGATOR')

      setAntaraHNs(getHns(data?.antaraStaff?.edges))
      setAntaraMEs(getMes(data?.antaraStaff?.edges))
      setAllAntaraStaffs(getAllStaff(data?.antaraStaff?.edges))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    antaraHNs,
    antaraMEs,
    allAntaraStaffs,
    loading,
  }
}

export default useAntaraStaff
