import React, { useEffect, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { Search } from 'react-feather'
import airtableFetch from '../../../../resources/airtable-fetch'
import { useAuth } from '../../../../context/auth-context'
import FORMS from './forms'
import { useFormPortal } from '../../../../context/forms-context'

const Forms = () => {
  const [hn, setHN] = useState<any>({})
  const { user } = useAuth()

  const { addOpenForm, openedForms } = useFormPortal()

  const [searchForm, setSearchForm] = useState<any[]>(FORMS)

  useEffect(() => {
    if (user && user.email) {
      airtableFetch(
        `team/list?filterByFormula=FIND("${user.email}", {Email})`
      ).then((res) => {
        const currentHN = Object.keys(res).map((key: any) => res[key])
        if (currentHN.length) {
          setHN(currentHN[0])
        }
      })
    }
  }, [user])

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
            onClick={() => addOpenForm([...openedForms, form], hn)}
            className="full-width btn btn-secondary form-btns"
            key={form.name}
          >
            {form.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Forms
