import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import airtableFetch from '../../../../../resources/airtableFetch'
import List from '../../../../utils/list/list.component'

const Medcations = () => {
  const { recId } = useParams()
  const [medications, setMedications] = useState<any[]>([])

  const getDrugName = (data: any) => {
    if (data['Drug Name'] === 'Other') {
      return data['Other Medication']
    }
    return data['Drug Name']
  }

  useEffect(() => {
    airtableFetch(
      `medications/list/0?view=HN%20Dashboard%20Active%20Medications&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const meds = Object.keys(response)
        .map((key) => response[key])
        .map((data) => ({
          data,
          name: `${getDrugName(data)}, ${data.Frequency}, ${
            data.Duration
          } days`,
        }))
      setMedications(meds)
    })
  }, [recId])

  const getRefillText = (medication: any) => {
    if (medication.Refillable === 'Yes') {
      return medication['Days until Refill'] <= 3
        ? `Refill due in: ${medication['Days until Refill']} days`
        : 'Refillable'
    }
    return 'Not Refillable'
  }

  const getStartDate = (medication: any) => {
    return `Start Date: ${dayjs(medication['Start Date']).format("DD MMM 'YY")}`
  }

  return (
    <div>
      <h4>Medications</h4>
      <List
        list={medications}
        emptyListText="No medications recorded"
        getTopLeftText={getStartDate}
        getTopRightText={getRefillText}
        dateColumnKey="Start Date"
        paginate
        modalTitle="Medication"
      />
    </div>
  )
}

export default Medcations
