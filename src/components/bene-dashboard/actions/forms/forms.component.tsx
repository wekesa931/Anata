import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import airtableFetch from '../../../../resources/airtableFetch'
import { useAuth } from '../../../../context/auth-context'
import Accordion from '../../../utils/accordion/accordion.component'
import AirtableIframe from '../../../utils/airtableIframe/airtableIframe.component'
import FORMS from './forms'

const FormAccordion = ({
  form,
}: {
  form: { name: string; url: string; hnField?: string }
}) => {
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

  return (
    <Accordion title={form.name}>
      <AirtableIframe
        src={`https://airtable.com/embed/${form.url}?prefill_${form.hnField}=${hn['Record ID']}&prefill_Member=${recId}`}
        style={{ border: 'none', height: '100%', padding: '12px' }}
      />
    </Accordion>
  )
}

const Forms = () => {
  return (
    <div className="d-flex flex-direction-column">
      <h3>Forms</h3>
      <div className="margin-top-16 flex-1">
        {FORMS.map((form) => (
          <FormAccordion form={form} key={form.name} />
        ))}
      </div>
    </div>
  )
}

export default Forms
