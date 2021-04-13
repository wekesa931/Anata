import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import analytics from '../../../../helpers/segment'
import airtableFetch from '../../../../resources/airtable-fetch'
import { useAuth } from '../../../../context/auth-context'
import FORMS from './forms'
import { useMember } from '../../../../context/member.context'

const Forms = () => {
  const { recId } = useParams()
  const [hn, setHN] = useState<any>({})
  const { user } = useAuth()
  const { member } = useMember()
  const match = useRouteMatch()

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
  const openForm = (form: {
    url: string
    name: string
    hnField?: string
    airtableUrl: boolean
    url_sandbox: string
  }) => {
    analytics.track('Form Opened', {
      form_name: form.name,
      bene: recId,
    })
    const url =
      form.airtableUrl === false
        ? `${match.url}${form.url}?data=${encodeURIComponent(
            JSON.stringify({
              member: {
                'Full Name': member['Full Name'],
                'Antara ID': member['Antara ID'],
              },
              user: {
                email: user && user.email,
              },
            })
          )}`
        : `https://airtable.com/${
            process.env.PROD ? form.url : form.url_sandbox
          }?prefill_${form.hnField}=${hn['Record ID']}&prefill_Member=${recId}`
    window.open(url, form.name)
  }
  return (
    <div className="d-flex flex-direction-column">
      <h3>Forms</h3>
      <div className="margin-top-16 flex-1">
        {FORMS.map((form) => (
          <button
            onClick={() => openForm(form)}
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
