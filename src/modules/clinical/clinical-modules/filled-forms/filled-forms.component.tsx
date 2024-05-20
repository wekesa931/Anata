import React, { useState, useEffect } from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import List from 'src/components/list'
import LoadingComponent from 'src/components/loaders/centered'
import { useMember } from 'src/context/member'

function FilledForms() {
  const [filledForms, setFilledForms] = useState<any[]>([])
  const { member } = useMember()
  const [loading, setLoading] = useState(true)
  const hiddenFields = [
    'Member Record ID',
    'Weeks',
    'Profile photo',
    'src URL (from Members)',
    'name',
    'Gender',
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
    'ncf',
    'minorhif',
    'hntasks',
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
    'interventions',
    'interventions_tracking',
    'mhc',
    'physio',
    'minor_health_check',
    'minorhifv2',
    'healthTriageForm',
    'incident',
    'logisticsTasks',
  ]

  useEffect(() => {
    const recId = member?.airtableRecordId
    if (recId) {
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
          `${form}/list?filterByFormula=FIND("${recId}",{Member Record ID})&maxRecords=1&sort=[{"field":"created_at", "direction":"desc"}]`
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
            {
              name: 'Nutritional Consultation',
              data: response[forms.indexOf('ncf')],
            },
            { name: 'Minor HIF', data: response[forms.indexOf('minorhif')] },
            {
              name: 'Care Team Tasks',
              data: response[forms.indexOf('hntasks')],
            },
            {
              name: 'Interactions',
              data: response[forms.indexOf('interactions')],
            },
            { name: 'PAFU', data: response[forms.indexOf('pafu')] },
            {
              name: 'Medications',
              data: response[forms.indexOf('medications')],
            },
            {
              name: 'Appointments',
              data: response[forms.indexOf('appointments')],
            },
            { name: 'Vitals', data: response[forms.indexOf('vitals')] },
            { name: 'BP Monitoring', data: response[forms.indexOf('bp')] },
            { name: 'CHL Monitoring', data: response[forms.indexOf('chl')] },
            {
              name: 'Diabetes Monitoring',
              data: response[forms.indexOf('dm')],
            },
            { name: 'Conditions', data: response[forms.indexOf('conditions')] },
            { name: 'HMP', data: response[forms.indexOf('hmp')] },
            {
              name: 'Clinical Rounds',
              data: response[forms.indexOf('clinicalrounds')],
            },
            {
              name: 'Intervention',
              data: response[forms.indexOf('interventions')],
            },
            {
              name: 'Intervention Tracking',
              data: response[forms.indexOf('interventions_tracking')],
            },
            {
              name: 'MHC',
              data: response[forms.indexOf('mhc')],
            },
            {
              name: 'Physiotherapy Consultation',
              data: response[forms.indexOf('physio')],
            },
            {
              name: 'Minor Health Check (0 to 5)',
              data: response[forms.indexOf('minorHealthCheckZeroToFive')],
            },
            {
              name: 'Minor Health Check (6 to 17)',
              data: response[forms.indexOf('minorHealthCheckSixToSeventeen')],
            },
            {
              name: 'Healthy triage form',
              data: response[forms.indexOf('healthTriageForm')],
            },
            {
              name: 'Lab/imaging management',
              data: response[forms.indexOf('labs')],
            },
            {
              name: 'Incident reports',
              data: response[forms.indexOf('incident')],
            },
            {
              name: 'Logistics Tasks',
              data: response[forms.indexOf('logisticsTasks')],
            },
          ]
          setFilledForms(formResponses)
        }
        setLoading(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const isReadyToShow = filledForms?.length >= 0 && !loading

  return (
    <div>
      <h4>Filled forms</h4>
      {isReadyToShow && (
        <List
          list={filledForms.filter((form: any) => !!form.data)}
          emptyListText="No Forms found for this member"
          paginate
          modalTitle="Filled Form"
          dateColumnKey="created_at"
          filterByDate
        />
      )}
      {loading && <LoadingComponent message="Loading Filled Forms " />}
    </div>
  )
}

export default FilledForms
