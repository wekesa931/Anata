import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import airtableFetch from '../../../../resources/airtable-fetch'
import { useAuth } from '../../../../context/auth-context'
import FORMS from './forms'
import { useMember } from '../../../../context/member.context'
import openForm from '../../../../helpers/form-opener'

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

  return (
    <div className="d-flex flex-direction-column">
      <h3>Forms</h3>
      <div className="margin-top-16 flex-1">
        {FORMS.map((form) => (
          <button
            onClick={() => openForm(form, recId, match.url, member, user, hn)}
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
