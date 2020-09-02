import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import airtableFetch from '../../../../../resources/airtableFetch'
import List from '../../../../utils/list/list.component'

const FilledForms = () => {
  const [filledForms, setFilledForms] = useState<any[]>([])
  const { recId } = useParams()

  useEffect(() => {
    const hiddenFields = [
      'Member Record ID',
      'Weeks',
      'Profile photo',
      'Scribe URL (from Members)',
      'name',
      'Gender',
      'created_at',
      'last_modified',
      'last_modified_ros',
      'Reporting Week',
      'Member',
      'Health Navigator',
      'Name (First)',
      'Name (Last)',
      'Antara ID',
      'created at',
      'Full Names',
      'ID',
      'HN',
      'Your Name (First)',
      'Your Name (Last)',
      'Your Age',
      'Your Gender',
      'Browser',
      'IP Address',
      'Unique ID',
      'Location',
      'Full Name',
      'Created At',
      'National ID',
      'Full Name (ID) (from Members)',
    ]

    const forms = [ 'baseline', 'hif', 'nif', 'ncf', 'activity', 'minorhif']

    const getFields = (fields: any) => {
      const keys = Object.keys(fields).filter(
        (key) => !hiddenFields.includes(key)
      )
      const obj = {}
      keys.forEach((key) => Object.assign(obj, { [key]: fields[key] }))
      return obj
    }

    const getForm = (form: string) => {
      return airtableFetch(
        `${form}/list/0?view=HN%20Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})`
      ).then((res) => {
        const result = Object.keys(res).map((key) => res[key])[0]
        return result ? getFields(result) : result
      })
    }

    const promises = forms.map((form) => getForm(form))

    Promise.all(promises).then((response) => {
      if (response.every((form) => form === undefined)) {
        setFilledForms([])
      } else {
        setFilledForms([
          { name: 'Baseline', data: response[0] },
          { name: 'HIF', data: response[1] },
          { name: 'NIF', data: response[2] },
          { name: 'Nutritional Consultation', data: response[3] },
          { name: 'Activity', data: response[4] },
          { name: 'Minor HIF', data: response[5] },
        ])
      }
    })
  }, [recId])

  return (
    <div>
      <h4>Filled forms</h4>
      <List
        list={filledForms}
        emptyListText="No Forms found for this member"
        paginate
      />
    </div>
  )
}

export default FilledForms
