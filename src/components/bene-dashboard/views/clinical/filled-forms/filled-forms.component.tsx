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

    const forms = [
      'baseline',
      'hif',
      'nif',
      'ncf',
      'activity',
      'minorhif',
      'hntasks',
      'interactions',
      'pafu',
      'medications',
      'appointments',
      'vitals',
      'bp',
      'chl',
      'dm',
      'conditions',
      'hmp',
      'clinicalrounds',
      'kits',
      'interventions',
      'interventions_tracking',
    ]

    const getFields = (fields: any) => {
      const keys = Object.keys(fields).filter(
        (key) => !hiddenFields.includes(key)
      )
      const obj = {}
      keys.forEach((key) => Object.assign(obj, { [key]: fields[key] }))
      return obj
    }
    //
    const getForm = (form: string) => {
      return airtableFetch(
        `${form}/list/0?filterByFormula=FIND("${recId}",{Member Record ID})&maxRecords=1&sort=[{"field":"created_at", "direction":"desc"}]`
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
        const formResponses = [
          { name: 'Baseline', data: response[forms.indexOf('baseline')] },
          { name: 'HIF', data: response[forms.indexOf('hif')] },
          { name: 'NIF', data: response[forms.indexOf('nif')] },
          {
            name: 'Nutritional Consultation',
            data: response[forms.indexOf('ncf')],
          },
          { name: 'Activity', data: response[forms.indexOf('activity')] },
          { name: 'Minor HIF', data: response[forms.indexOf('minorhif')] },
          { name: 'HN Tasks', data: response[forms.indexOf('hntasks')] },
          {
            name: 'Interactions',
            data: response[forms.indexOf('interactions')],
          },
          { name: 'PAFU', data: response[forms.indexOf('pafu')] },
          { name: 'Medications', data: response[forms.indexOf('medications')] },
          {
            name: 'Appointments',
            data: response[forms.indexOf('appointments')],
          },
          { name: 'Vitals', data: response[forms.indexOf('vitals')] },
          { name: 'BP Monitoring', data: response[forms.indexOf('bp')] },
          { name: 'CHL Monitoring', data: response[forms.indexOf('chl')] },
          { name: 'Diabetes Monitoring', data: response[forms.indexOf('dm')] },
          { name: 'Conditions', data: response[forms.indexOf('conditions')] },
          { name: 'HMP', data: response[forms.indexOf('hmp')] },
          {
            name: 'Clinical Rounds',
            data: response[forms.indexOf('clinicalrounds')],
          },
          { name: 'Monitoring Kit', data: response[forms.indexOf('kits')] },
          {
            name: 'Intervention',
            data: response[forms.indexOf('interventions')],
          },
          {
            name: 'Intervention Tracking',
            data: response[forms.indexOf('interventions_tracking')],
          },
        ]
        setFilledForms(formResponses)
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
