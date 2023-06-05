import { X, AlertTriangle, Check } from 'react-feather'
import {
  Autocomplete,
  Button,
  FilterOptionsState,
  TextField,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import React, { useState } from 'react'
import { formNames, airtableFormNames } from 'src/modules/workflows/utils'
import { uniqBy } from 'lodash'

function FormsListRaw({
  addForm,
  selectForm,
  forms,
  activeForm,
  showIncompleteForms,
}: any) {
  const [open, setOpen] = useState<boolean>(false)

  const filterOptions = (
    options: string[],
    state: FilterOptionsState<string>
  ) =>
    options.filter((option) =>
      option.toLowerCase().includes(state.inputValue.toLowerCase())
    )

  const moduleOptions = airtableFormNames.filter(
    (formName: any) => !forms.find((module: any) => module.name === formName)
  )

  const handleAddForm = async (formName: string) => {
    setOpen(false)
    addForm(formName)
  }

  const uniqueFormsByName = uniqBy(forms, 'name')

  const isFormDraft = (form: any) => {
    const allFormsWithName = forms.filter((f: any) => f.name === form.name)

    // check if any of these forms is draft
    return allFormsWithName.some((f: any) => f.isDraft)
  }

  return (
    <>
      {uniqueFormsByName.map((form: any) => (
        <Button
          className={`flex w-full items-center justify-between text-left font-rubik text-sm normal-case  ${
            activeForm === form.name
              ? 'self-stretch bg-orange-10 text-orange-100'
              : 'justify-start text-dark-blue-100'
          }`}
          variant="text"
          key={form?.id}
          onClick={() => selectForm(form.name)}
        >
          {formNames[form.name]}

          {!isFormDraft(form) && (
            <Check color="var(--green-100)" width={18} height={18} />
          )}

          {form.isDraft && showIncompleteForms && (
            <AlertTriangle color="var(--red-100)" width={12} height={12} />
          )}
        </Button>
      ))}

      <Button
        className="flex w-full justify-start text-left font-rubik text-sm font-medium normal-case text-blue-100"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        Add Form
      </Button>
      {open && (
        <div className="absolute top-0 left-0 h-[400px] w-[230px]">
          <div
            className={`flex grow-0 justify-between bg-orange-50 p-2 text-left font-rubik text-base font-medium text-greyscale-1 `}
          >
            <p>Select Form</p>
            <X
              style={{ cursor: 'pointer' }}
              color="var(--white)"
              width={15}
              height={15}
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="flex h-[400px] flex-col items-stretch justify-start overflow-scroll border-solid border-white bg-white p-0 shadow-template">
            <Autocomplete
              id="modules-search"
              options={moduleOptions}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Search Modules"
                  variant="outlined"
                />
              )}
              filterOptions={filterOptions}
              onChange={async (event, value) => {
                if (value) {
                  await handleAddForm(value)
                }
              }}
              fullWidth
              sx={{ mt: 1 }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default FormsListRaw
