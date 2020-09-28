import Downshift from 'downshift'
import React, { useEffect, useState } from 'react'
import filterFields from '../../../helpers/filter-fields'
import airtableFetch from '../../../resources/airtableFetch'

type RemoteSelectProps = {
  lookupUrl: string
  prefetch: boolean
  lookupFieldNames?: string[]
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
  } | null>(null)

  useEffect(() => {
    if (prefetch) {
      const url = lookupFieldNames
        ? `${lookupUrl}/list/0?${filterFields(lookupFieldNames)}`
        : `${lookupUrl}/list/0`
      airtableFetch(url).then((res) => {
        const results = Object.keys(res)
          .map((key) => res[key])
          .map((obj) => ({ label: obj.Name, value: obj['Record ID'] }))
        setItems(results)
      })
    }
  }, [prefetch, lookupUrl, lookupFieldNames])

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
              disabled={disabled}
            />
          </div>
          <ul {...getMenuProps()}>
            {isOpen
              ? items
                  .filter((item) => {
                    return (
                      !inputValue ||
                      item.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    )
                  })
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
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
