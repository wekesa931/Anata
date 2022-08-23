import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { Search } from 'react-feather'
import FORMS from './forms'
import { useFormPortal } from '../../../../context/forms-context'
import { useMember } from '../../../../context/member.context'
import { formNames } from '../workflows/Forms/form-fields'

const Forms = () => {
  const { member } = useMember()
  const { addOpenForm } = useFormPortal()

  const [searchForm, setSearchForm] = useState<any[]>(FORMS)

  return (
    <div className="d-flex flex-direction-column">
      <div className="margin-top-0 flex-1">
        <div>
          <TextField
            sx={{ fontSize: '13px' }}
            id="input-with-icon-textfield"
            className="full-width"
            placeholder="Search forms"
            onChange={(e) => {
              const { value } = e.target
              let formMeta = FORMS
              if (value) {
                formMeta = FORMS.filter((form) =>
                  form.name.toLowerCase().includes(value.toLowerCase())
                )
                setSearchForm(formMeta)
              } else {
                setSearchForm(formMeta)
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search width={18} height={18} />
                </InputAdornment>
              ),
              style: {
                marginBottom: 10,
              },
            }}
            variant="standard"
          />
        </div>
        {searchForm.map((form) => (
          <button
            onClick={() => addOpenForm({ ...form, member })}
            className="full-width btn btn-secondary form-btns"
            key={form.name}
          >
            {formNames[form.name]}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Forms
