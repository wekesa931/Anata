import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { throttle } from 'throttle-debounce'
import { SEARCH_MEMBERS } from 'src/gql/search'
import { MEMBER_DETAILS_QUERY } from 'src/modules/member/services/gql'
import type { V2MemberQueryType, V2MemberType } from 'src/modules/member/types'
import { parseV2MemberData } from 'src/utils/data-transform'

interface ResultItemType {
  node: V2MemberQueryType
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

export const useMemberSearch = () => {
  const [results, setResults] = useState<SearchResultType[]>([])
  const [memberDetails, setMemberDetails] = useState<V2MemberType | null>(null)

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
        setMemberDetails(parseV2MemberData(details))
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
          parseV2MemberData(node)
        ) || []
      setResults(searchResults)
    }
  }, [data])

  const querySearch = async (q: string) => {
    const res = await search({
      variables: {
        query: q,
      },
    })

    if (res?.data) {
      const searchResults =
        res?.data?.membersSearch?.edges?.map(({ node }: ResultItemType) =>
          parseV2MemberData(node)
        ) || []
      return searchResults
    }

    return []
  }

  return {
    search: searchMembers,
    results,
    loading,
    error,
    loadingMember,
    getMemberDetails,
    memberDetails,
    memberError,
    querySearch,
  }
}

export default useMemberSearch
