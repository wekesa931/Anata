import { useCombobox, useMultipleSelection } from 'downshift'
import React from 'react'
import styles from './multiselect.component.css'

const MultiSelect = ({ form, field, options }: any) => {
  const [value, setValue] = React.useState<string | undefined>('')
  const initialSelectedItems = []
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems })

  const getFilteredItems = () =>
    value
      ? options.filter(
          (item) =>
            selectedItems.indexOf(item) < 0 &&
            item.label.toLowerCase().startsWith(value.toLowerCase())
        )
      : options
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
  } = useCombobox({
    inputValue: value,
    selectedItem: null,
    items: getFilteredItems(),
    stateReducer: (_state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
          }
        default:
          break
      }
      return changes
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setValue(inputValue)
          break
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem && !selectedItems.includes(selectedItem)) {
            setValue('')
            addSelectedItem(selectedItem)
            form.setFieldValue(field.name, [
              ...selectedItems.map((item) => item.value),
              selectedItem.value,
            ])
          }
          break
        default:
          break
      }
    },
  })

  return (
    <div>
      <div>
        {selectedItems.map((selectedItem, index) => (
          <span
            key={`selected-item-${index}`}
            {...getSelectedItemProps({ selectedItem, index })}
            className={styles.selectedItem}
          >
            {selectedItem.label}
            <button
              className={`${styles.removeBtn} btn-unstyled`}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                removeSelectedItem(selectedItem)
                form.setFieldValue(
                  field.name,
                  selectedItems.filter(
                    (item) => item.value !== selectedItem.value
                  )
                )
              }}
            >
              &#10005;
            </button>
          </span>
        ))}
        <div {...getComboboxProps()} className={styles.container}>
          <input
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            className={`form-control ${
              form.touched[field.name] && form.errors[field.name] && 'error'
            } ${styles.input}`}
            name={field.name}
            onBlur={(e) => {
              field.onBlur(e)
            }}
          />
          <button
            {...getToggleButtonProps({
              onClick: (e) => {
                e.stopPropagation()
                e.preventDefault()
              },
            })}
            aria-label="toggle menu"
            className={styles.toggleBtn}
          >
            &#9660;
          </button>
        </div>
      </div>
      <ul {...getMenuProps()} className={isOpen ? styles.list : ''}>
        {isOpen &&
          getFilteredItems().map((item, index) => (
            <li
              style={
                selectedItems.includes(item)
                  ? {
                      color: 'var(--border-regular)',
                      background: 'var(--border-light)',
                    }
                  : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
              className={styles.listItem}
            >
              {item.label}
              {selectedItems.includes(item) && <span>&#x2713;</span>}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default MultiSelect
