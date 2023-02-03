import React, { useEffect, useState } from 'react'
import Downshift from 'downshift'
import { throttle } from 'throttle-debounce'
import { Link, useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import SearchIcon from '../../assets/img/icons/search.svg'
import CloseIcon from '../../assets/img/icons/close.svg'
import LoadingIcon from '../../assets/img/icons/loading.svg'
import styles from './search.component.css'
import analytics from '../../helpers/segment'
import { SEARCH_MEMBERS } from '../../gql/members'

interface IProps {
  unknownMemberSearch?: boolean
  memberInfo?: (info: any) => void
}

interface resultItemTypeNode {
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
interface resultItemType {
  node: resultItemTypeNode
}

interface searchResultType {
  fullName: string
  antaraId: string
  age: number
  sex: string
  airtableRecordId: string
  displayName: string
  employerName: string
}

function SearchInput({ unknownMemberSearch, memberInfo }: IProps) {
  const [results, setResults] = useState<Array<searchResultType>>([])
  const navigate = useNavigate()

  const [search, { loading, data }] = useLazyQuery(SEARCH_MEMBERS, {
    context: {
      clientName: 'v2',
    },
  })

  const getSexAccronym = (sex: string) => {
    if (sex?.toLowerCase() === 'male') return 'M'
    if (sex?.toLowerCase() === 'female') return 'F'
    return ''
  }

  useEffect(() => {
    if (data) {
      const searchResults =
        data?.membersSearch?.edges?.map(({ node }: resultItemType) => {
          const fullName = node?.details?.fullName
          const age =
            new Date().getFullYear() - new Date(node?.birthDate).getFullYear()
          const sex = node?.details?.sex?.sex
          const employerName = node?.status?.employer?.name

          const displayName = `${fullName} (${
            node.antaraId
          }) - ${age} yrs [${getSexAccronym(sex)}] - ${employerName}`

          return {
            fullName,
            antaraId: node.antaraId,
            age,
            airtableRecordId: node?.details?.airtableRecordId,
            sex,
            displayName,
            employerName,
          }
        }) || []

      setResults(searchResults)
    }
  }, [data])

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

  const setMemberInfo = (info: any) => {
    if (memberInfo) {
      memberInfo(info)
    }
  }

  const onResultClicked = (
    item: searchResultType | null,
    stateAndHelpers: { clearSelection: () => any }
  ) => {
    if (item) {
      analytics.track('Bene Searched', {
        bene: item.antaraId,
      })
      if (unknownMemberSearch) {
        setMemberInfo(item)
      } else {
        navigate(`/member/${item.airtableRecordId}`)
        location.reload()
      }
    }
    // clear selection
    stateAndHelpers.clearSelection()
  }

  return (
    <Downshift
      onChange={onResultClicked}
      itemToString={(item) => (item ? `${item?.fullName}` : '')}
      onInputValueChange={searchMembers}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        clearSelection,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }: any) => (
        <div id="search-wrap" className={styles.searchWrap}>
          <div
            id="search-input-wrap"
            className={styles.searchInputWrap}
            {...getRootProps(undefined, { suppressRefError: true })}
          >
            <SearchIcon />
            <input
              type="text"
              {...getInputProps()}
              className={styles.search}
              placeholder="Search members..."
              role="searchbox"
            />
            {inputValue && (
              <button
                className="btn-icon"
                onClick={() => clearSelection()}
                aria-label="toggle menu"
                data-testid="search-input-clear"
              >
                <CloseIcon />
              </button>
            )}
            {loading && (
              <div className={styles.loadingIcon}>
                <LoadingIcon />
              </div>
            )}
          </div>

          {inputValue && !loading && (
            <div className={styles.searchResultsWrap}>
              {results && results.length > 0 && isOpen && (
                <ul {...getMenuProps()} data-testid="bene-list">
                  {results.map((item: searchResultType, index: number) => (
                    <li
                      {...getItemProps({
                        key: item.antaraId,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index
                              ? 'var(--orange-light)'
                              : 'var(--white)',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                      className={styles.resultItem}
                    >
                      {unknownMemberSearch ? (
                        <div
                          aria-hidden="true"
                          onClick={() => setMemberInfo(item)}
                          onKeyDown={() => setMemberInfo(item)}
                        >
                          <span>{item.displayName}</span>
                        </div>
                      ) : (
                        <Link
                          to={{
                            pathname: `/member/${item.airtableRecordId}`,
                          }}
                        >
                          <span>{item.displayName}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {inputValue && results.length === 0 && (
                <div className={styles.noResultWrap}>
                  {inputValue.length >= 4 ? (
                    <>
                      <span className={styles.noResultMsg}>
                        Your search - <strong>{inputValue}</strong> - did not
                        match any member.
                      </span>
                      <ul className={styles.noResultSuggestion}>
                        <li>Make sure the word is spelled correctly.</li>
                        <li>Try a different alternate name.</li>
                      </ul>
                    </>
                  ) : (
                    <span className={styles.noResultMsg}>
                      Search requires a minimum of 4 characters of the
                      bene&lsquo;s name
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Downshift>
  )
}

export default SearchInput
