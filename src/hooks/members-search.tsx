import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_MEMBERS, SEARCH_MEMBERS_FULL } from 'src/gql/search'
import { MEMBER_DETAILS_QUERY } from 'src/modules/member/services/gql'
import type { V2MemberQueryType, V2MemberType } from 'src/modules/member/types'
import { parseSearchData, parseV2MemberData } from 'src/utils/data-transform'
import { debounce } from 'lodash'

interface ResultItemType {
  node: V2MemberQueryType
}

export interface SearchResultType {
  antaraId: string
  displayName: string
}

export const useMemberSearch = () => {
  const [results, setResults] = useState<SearchResultType[]>([])
  const [memberDetails, setMemberDetails] = useState<V2MemberType | null>(null)

  const [search, { loading, error }] = useLazyQuery(SEARCH_MEMBERS)
  const [fullSearch, { loading: loadingFull, error: errorFull }] =
    useLazyQuery(SEARCH_MEMBERS_FULL)

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

  const abortController = useRef<AbortController | null>(null)

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.length > 3) {
          if (abortController.current) {
            abortController.current.abort()
          }

          abortController.current = new AbortController()
          const { signal } = abortController.current

          const { data } = await search({
            variables: { query },
            context: {
              clientName: 'v2',
              fetchOptions: {
                signal,
              },
            },
          })

          if (data) {
            const searchResults =
              data?.membersSearch?.edges?.map(({ node }: ResultItemType) =>
                parseSearchData(node)
              ) || []
            setResults(searchResults)
          }
        }
      }, 500),
    [search]
  )

  const searchMembers = useCallback(
    (query: string) => {
      debouncedSearch(query)
    },
    [debouncedSearch]
  )

  const querySearch = async (q: string) => {
    const res = await fullSearch({
      variables: {
        query: q,
      },
      context: {
        clientName: 'v2',
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
    loading: loading || loadingFull,
    error: error || errorFull,
    loadingMember,
    getMemberDetails,
    memberDetails,
    memberError,
    querySearch,
  }
}

export default useMemberSearch
