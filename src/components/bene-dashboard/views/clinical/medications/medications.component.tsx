import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import airtableFetch from '../../../../../resources/airtableFetch'
import styles from './medications.component.css'

const Medcations = () => {
  const { recId } = useParams()
  const [medications, setMedications] = useState<any[]>([])

  useEffect(() => {
    airtableFetch(
      `medications/list/0?view=Master%20View&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const meds = Object.keys(response).map((key) => response[key])
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

  return (
    <div>
      <h4>Medications</h4>
      <>
        {medications.length ? (
          medications.map((medication) => (
            <button
              style={{ width: '100%', textAlign: 'start' }}
              className="btn-unstyled margin-top-8"
            >
              <div className={styles.meta}>
                <p className="text-tiny">
                  Start Date:{' '}
                  {dayjs(medication['Start Date']).format("DD MMM 'YY")}
                </p>
                <p className="text-tiny">{getRefillText(medication)}</p>
              </div>
              <div className={styles.notes}>
                <div style={{ width: '12px', marginRight: '6px' }} />
                <div>
                  <p className="text-normal">
                    {medication['Drug Name']}, {medication.Frequency},{' '}
                    {medication.Duration} days
                  </p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className={`${styles.notes} margin-top-8`}>
            <p className="text-normal">No medications found</p>
          </div>
        )}
      </>
    </div>
  )
}

export default Medcations
