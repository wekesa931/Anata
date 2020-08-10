import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import airtableFetch from '../../../../../resources/airtableFetch'
import List from '../../../../utils/list/list.component'

const FilledForms = () => {
  const [filledForms, setFilledForms] = useState<any[]>([])
  const { recId } = useParams()

  useEffect(() => {
    const hifPromise = airtableFetch(
      `hif/list/0?view=HN Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((res) => {
      const result = Object.keys(res).map((key) => res[key])[0]
      return result
    })

    const baselinePromise = airtableFetch(
      `baseline/list/0?view=HN Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((res) => {
      const result = Object.keys(res).map((key) => res[key])[0]
      return result
    })

    Promise.all([baselinePromise, hifPromise]).then((response) => {
      if (response.every((form) => form === undefined)) {
        setFilledForms([])
      } else {
        setFilledForms([
          { name: 'Baseline', data: response[0] },
          { name: 'HIF', data: response[1] },
        ])
      }
    })
  }, [recId])

  return (
    <div>
      <h4>Filled forms</h4>
      <List list={filledForms} emptyListText="No Forms found for this member" />
    </div>
  )
}

export default FilledForms
