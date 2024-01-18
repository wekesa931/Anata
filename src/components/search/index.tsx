import React from 'react'
import Downshift from 'downshift'
import { Link, useNavigate } from 'react-router-dom'
import useMemberSearch from 'src/hooks/members-search'
import { useModuleAnalytics } from 'src/modules/analytics'
import SearchIcon from '../../assets/img/icons/search.svg'
import CloseIcon from '../../assets/img/icons/close.svg'
import LoadingIcon from '../../assets/img/icons/loading.svg'
import styles from './search.module.css'

interface IProps {
  unknownMemberSearch?: boolean
  memberInfo?: (info: any) => void
  source?: 'main' | 'member'
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

function SearchInput({
  unknownMemberSearch,
  memberInfo,
  source = 'member',
}: IProps) {
  const navigate = useNavigate()
  const { search, loading, results, error } = useMemberSearch()
  const { trackMemberSearched } = useModuleAnalytics()

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
      trackMemberSearched(item, source)
      if (unknownMemberSearch) {
        setMemberInfo(item)
      } else {
        navigate(`/member/${item.antaraId}`)
        location.reload() // added to ensure that pending idb saves are reset for the new db
      }
    }
    // clear selection
    stateAndHelpers.clearSelection()
  }

  return (
    <Downshift
      onChange={onResultClicked}
      itemToString={(item) => (item ? `${item?.fullName}` : '')}
      onInputValueChange={search}
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
            className="flex items-center flex-1 px-3 py-0 border border-1 border-neural-base rounded-2xl bg-white "
            {...getRootProps(undefined, { suppressRefError: true })}
          >
            <SearchIcon />
            <input
              type="text"
              {...getInputProps()}
              className={styles.search}
              placeholder="Search member name, Antara Id,..."
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
                            pathname: `/member/${item.antaraId}`,
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
                  {inputValue.length >= 4 || error ? (
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
