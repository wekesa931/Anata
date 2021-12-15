import React, { useEffect, useState } from 'react'
import airtableFetch from '../../../../resources/airtable-fetch'
import { useAuth } from '../../../../context/auth-context'
import FORMS from './forms'
import FormPortal from './forms-portal.component'

const Forms = () => {
  const [hn, setHN] = useState<any>({})
  const [openedForms, setOpenedForms] = useState<any>([])
  const { user } = useAuth()

  const addOpenForm = (form) => {
    setOpenedForms([...openedForms, form])
    // openForm(form, recId, match.url, member, user, hn)
  }

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
      <FormPortal openedForms={openedForms} hn={hn} />

      <div className="margin-top-0 flex-1">
        {FORMS.map((form) => (
          <button
            onClick={() => addOpenForm(form)}
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
