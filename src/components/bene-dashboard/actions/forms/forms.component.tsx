import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { Search } from 'react-feather'
import FORMS, { TForm } from './forms'
import { useFormPortal } from '../../../../context/forms-context'
import { useMember } from '../../../../context/member.context'
import { formNames } from '../workflows/Forms/form-fields'
import AirtableIframe from '../../../utils/airtableIframe/airtableIframe.component'
import PortalWindow from '../../../lib/portal/portal.component'

type TPrefillInfo = {
  label?: string
  url?: string
}

function Forms() {
  const { member } = useMember()
  const { addOpenForm } = useFormPortal()
  const [airtableForm, setAirtableForm] = useState<TForm | null>(null)
  const [isEdited, setIsEdited] = useState(false)

  const [searchForm, setSearchForm] = useState<any[]>(FORMS)

  const getPrefillUrl = (prefillInfo: TPrefillInfo) => {
    if (prefillInfo.url) {
      const prefillUrl = prefillInfo.url

      const embedUrl = prefillUrl.replace(
        'airtable.com/',
        'airtable.com/embed/'
      )
      return embedUrl
    }

    return null
  }

  const openFormHandler = (form: TForm) => {
    if (form.type === 'airtableForm') {
      const minorHealthCheckPrefillURL = getPrefillUrl(member['Minor HIF'])

      if (form.name === 'Minor Health Check') {
        setAirtableForm({
          ...form,
          url: minorHealthCheckPrefillURL || form.url,
        })
      }
    } else {
      addOpenForm({ ...(form as any), member })
    }
  }

  return (
    <>
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
    </>
  )
}

export default Forms
