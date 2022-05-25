import React, { useEffect, useState } from 'react'
import Downshift from 'downshift'
import useAirtableFetch from '../../../hooks/airtable-fetch.hook'
import filterFields from '../../../helpers/filter-fields'
import styles from './remote-select.component.css'

type RemoteSelectProps = {
  lookupUrl: string
  prefetch: boolean
  lookupFieldNames: string[]
  field: any
  form: any
  disabled: boolean
}

const RemoteSelect = ({
  lookupUrl,
  prefetch,
  lookupFieldNames,
  field,
  form,
  disabled,
}: RemoteSelectProps) => {
  const [items, setItems] = useState<{ label: string; value: string }[]>([])
  const [initialValue, setInitialValue] = useState<{
    label: string
    value: string
  } | null>({ label: 'Loading...', value: '' })

  const url = lookupFieldNames
    ? `${lookupUrl}/list?${filterFields(lookupFieldNames)}`
    : `${lookupUrl}/list`
  const { data } = useAirtableFetch(url)

  useEffect(() => {
    if (prefetch) {
      const results = Object.keys(data)
        .map((key) => data[key])
        .map((obj) => ({
          label: obj[lookupFieldNames[0]],
          value: obj[lookupFieldNames[1]],
        }))
      if (results) {
        setItems(results)
      }
    }
  }, [data, prefetch, lookupFieldNames])

  const onChange = (selection: { label: string; value: string } | null) => {
    if (selection) {
      form.setFieldValue(field.name, selection.value)
    }
  }

  useEffect(() => {
    if (items.length) {
      const item = items.find((_item) => _item.value === field.value)
      if (item) {
        setInitialValue(item)
      }
    }
  }, [items, field])
  return (
    <Downshift
      onChange={(selection) => onChange(selection)}
      itemToString={(item) => (item ? item.label : '')}
      selectedItem={initialValue}
      id={field.name}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div>
          <div {...getRootProps(undefined, { suppressRefError: true })}>
            <input
              {...getInputProps()}
              className="form-control"
              disabled={
                disabled ||
                (selectedItem ? selectedItem.label === 'Loading...' : false)
              }
              aria-labelledby={`${field.name}Label`}
            />
          </div>
          <ul {...getMenuProps()} className={isOpen ? styles.list : undefined}>
            {isOpen
              ? items
                  .filter((item) => {
                    return (
                      !inputValue ||
                      item?.label
                          ?.toLowerCase()
                          .includes(inputValue.toLowerCase())
                    )
                  })
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.value || index,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index
                              ? 'var(--blue-light)'
                              : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                          fontSize: '14px',
                          padding: '4px',
                          borderBottom: '1px solid var(--border-light)',
                          color: 'var(--blue-base)',
                        },
                      })}
                    >
                      {item.label}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
}

export default RemoteSelect
