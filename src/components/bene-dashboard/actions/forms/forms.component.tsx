import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import analytics from '../../../../helpers/segment'
import airtableFetch from '../../../../resources/airtableFetch'
import { useAuth } from '../../../../context/auth-context'
import FORMS from './forms'

const Forms = () => {
  const { recId } = useParams()
  const [hn, setHN] = useState<any>({})
  const { user } = useAuth()

  useEffect(() => {
    if (user && user.profileObj) {
      airtableFetch(
        `team/list/0?view=Grid%20view&filterByFormula=FIND("${user.profileObj.email}", {Email})`
      ).then((res) => {
        const currentHN = Object.keys(res).map((key: any) => res[key])
        if (currentHN.length) {
          setHN(currentHN[0])
        }
      })
    }
  }, [user])
  const openForm = (form: { url: string; name: string; hnField?: string }) => {
    analytics.track('Form Opened', {
      form_name: name,
      bene: recId,
    })
    window.open(
      `https://airtable.com/${form.url}?prefill_${form.hnField}=${hn['Record ID']}&prefill_Member=${recId}`,
      form.name
    )
  }
  return (
    <div className="d-flex flex-direction-column">
      <h3>Forms</h3>
      <div className="margin-top-16 flex-1">
        {FORMS.map((form) => (
          <button
            onClick={() => openForm(form)}
            className="full-width btn btn-secondary"
          >
            {form.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Forms
