import React, { useState } from 'react'
import Downshift from 'downshift'
import { throttle } from 'throttle-debounce'
import { Link, useHistory } from 'react-router-dom'
import SearchIcon from '../../assets/img/icons/search.svg'
import CloseIcon from '../../assets/img/icons/close.svg'
import airtableFetch from '../../resources/airtableFetch'
import styles from './search.component.css'
import analytics from '../../helpers/segment'

interface resultItemType {
  id: string
  displayName: string
  'Full Name': string
  Age: string
  Employer: string
  Sex: string
}

const SearchInput = () => {
  const [results, setResults] = useState<Array<resultItemType>>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const history = useHistory()

  const searchMembers = (q: string) => {
    const throttleFunc = throttle(
      1000,
      true,
      () => {
        if (q) {
          setIsLoading(true)
          const searchQ = `filterByFormula=IF(FIND("${q.toLowerCase()}", LOWER({Full Name})), TRUE(), FALSE())&fields[]=Full Name&fields[]=Age&fields[]=Sex&fields[]=Employer`
          airtableFetch(`members/list/0?${searchQ}`).then((response: any) => {
            let finalRes = []
            if (response && Object.keys(response).length > 0) {
              finalRes = Object.keys(response).map((recId: string) => ({
                ...response[recId],
                id: recId,
                displayName: [
                  response[recId]['Full Name'],
                  `${response[recId].Age}Yrs`,
                  response[recId].Sex,
                  response[recId].Employer,
                ].join(', '),
              }))
              setResults(finalRes)
            }
            setResults(finalRes)
            setIsLoading(false)
          })
        }
      },
      true
    )

    return throttleFunc()
  }

  const onResultClicked = (
    item: resultItemType | null,
    stateAndHelpers: { clearSelection: () => any }
  ) => {
    if (item) {
      analytics.track('Bene Searched', {
        bene: item.id,
      })
      history.push(`/member/${item.id}`)
    }
    // clear selection
    stateAndHelpers.clearSelection()
  }

  return (
    <Downshift
      onChange={onResultClicked}
      itemToString={(item) => (item ? `${item['Full Name']}` : '')}
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
      }) => (
        <div className={styles.searchWrap}>
          <div
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
          </div>

          {inputValue && !isLoading && (
            <div className={styles.searchResultsWrap}>
              {results && results.length > 0 && isOpen && (
                <ul {...getMenuProps()} data-testid="bene-list">
                  {results.map((item: any, index: number) => (
                    <li
                      {...getItemProps({
                        key: item.id,
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
                      <Link
                        to={{
                          pathname: `/member/${item.id}`,
                        }}
                      >
                        <span>{item.displayName}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {inputValue && results.length === 0 && (
                <div className={styles.noResultWrap}>
                  <span className={styles.noResultMsg}>
                    Your search - <strong>{inputValue}</strong> - did not match
                    any member.{' '}
                  </span>
                  <ul className={styles.noResultSuggestion}>
                    <li>Make sure the word is spelled correctly.</li>
                    <li>Try a different alternate name.</li>
                  </ul>
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
