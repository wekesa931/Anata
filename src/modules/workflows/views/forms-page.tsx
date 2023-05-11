import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { Search } from 'react-feather'
import { TForm } from 'src/modules/workflows/types'
import FORMS from 'src/modules/workflows/components/forms/form-inputs-definitions'
import AirtableIframe from 'src/components/iframes/airtable-iframe'
import PortalWindow from 'src/components/portal'
import { useFormsRouting } from 'src/modules/workflows/hooks/routing/forms'
import { Forms as TWorkflowForm } from 'src/modules/workflows/db/models'
import FormPortal from './forms-portal'
import { formNames } from '../utils'

function Forms() {
  const [airtableForm, setAirtableForm] = useState<TForm | null>(null)
  const [isEdited, setIsEdited] = useState(false)
  const { openForm, closeForm, forms } = useFormsRouting()
  const [searchForm, setSearchForm] = useState<any[]>(FORMS)

  const openFormHandler = (form: TForm) => {
    if (form.type === 'airtableForm') {
      setAirtableForm(form)
    } else {
      openForm(form.name)
    }
  }

  return (
    <>
      <div className="d-flex flex-direction-column">
        <div className="margin-top-0 flex-1">
          <div>
            <TextField
              className="w-full text-[13px]"
              id="input-with-icon-textfield"
              placeholder="Search forms"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target
                let formMeta = FORMS
                if (value) {
                  formMeta = (FORMS as any[]).filter((form) =>
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
              onClick={() => openFormHandler(form)}
              className="full-width btn btn-secondary form-btns"
              key={form.name}
            >
              {formNames[form.name]}
            </button>
          ))}
        </div>
      </div>
      {airtableForm && (
        <PortalWindow
          title={airtableForm.name}
          closeWindow={() => setAirtableForm(null)}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
        >
          <AirtableIframe src={airtableForm.url as string} />
        </PortalWindow>
      )}
      {forms.map((form: TWorkflowForm, index: number) => (
        <FormPortal
          key={form.name}
          form={form}
          closeForm={closeForm}
          index={index}
        />
      ))}
    </>
  )
}

export default Forms
