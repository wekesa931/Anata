import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { throttle } from 'throttle-debounce'
import { SEARCH_MEMBERS } from '../gql/members'
import { MEMBER_DETAILS_QUERY } from '../gql/comms'
import calcAge from '../components/bene-dashboard/summary/biodata/utils'

interface ResultItemTypeNode {
  antaraId: string
  birthDate: string
  details: {
    sex: {
      sex: string
    }
    fullName: string
    airtableRecordId: string
  }
  status: {
    employer: {
      name: string
    }
  }
}
interface ResultItemType {
  node: ResultItemTypeNode
}

export interface SearchResultType {
  fullName: string
  antaraId: string
  age: number
  sex: string
  airtableRecordId: string
  displayName: string
  employerName: string
}

const getSexAccronym = (sex: string) => {
  if (sex?.toLowerCase() === 'male') return 'M'
  if (sex?.toLowerCase() === 'female') return 'F'
  return ''
}

const useMemberSearch = () => {
  const [results, setResults] = useState<SearchResultType[]>([])
  const [memberDetails, setMemberDetails] = useState<SearchResultType | null>(
    null
  )

  const [search, { loading, data, error }] = useLazyQuery(SEARCH_MEMBERS, {
    context: {
      clientName: 'v2',
    },
  })

  const [
    getMember,
    { loading: loadingMember, data: memberData, error: memberError },
  ] = useLazyQuery(MEMBER_DETAILS_QUERY, {
    context: {
      clientName: 'v2',
    },
  })

  const processMemberDetails = (node: ResultItemTypeNode) => {
    const fullName = node?.details?.fullName
    const age = calcAge(node?.birthDate || '')
    const sex = node?.details?.sex?.sex
    const employerName = node?.status?.employer?.name

    const displayName = `${fullName} (${
      node.antaraId
    }) - ${age} yrs [${getSexAccronym(sex || '')}] - ${employerName}`

    return {
      fullName,
      antaraId: node?.antaraId,
      age,
      airtableRecordId: node?.details?.airtableRecordId,
      sex,
      displayName,
      employerName,
    }
  }

  const getMemberDetails = (antaraId: string) => {
    getMember({
      variables: {
        antaraId,
      },
    })
  }

  useEffect(() => {
    if (memberData) {
      const details = memberData?.members.edges[0]?.node

      if (details) {
        setMemberDetails(processMemberDetails(details))
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberData])

  const searchMembers = (q: string) => {
    const throttleFunc = throttle(
      1000,
      () => {
        if (q && q.length >= 4) {
          search({ variables: { query: q } })
        }
      },
      { noTrailing: true, debounceMode: true }
    )

    return throttleFunc()
  }

  useEffect(() => {
    if (data) {
      const searchResults =
        data?.membersSearch?.edges?.map(({ node }: ResultItemType) =>
          processMemberDetails(node)
        ) || []
      setResults(searchResults)
    }
  }, [data])

  return {
    search: searchMembers,
    results,
    loading,
    error,
    loadingMember,
    getMemberDetails,
    memberDetails,
    memberError,
  }
}

export default useMemberSearch
