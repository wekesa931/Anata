import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'
import Table from '../../../../utils/table/table.component'
import airtableFetch from '../../../../../resources/airtable-fetch'
import BloodPressure from './bloodpressure.component'
import Bmi from './bmi.component'

type OtherVitalsInfo = {
  Temperature: number
  Date: string
  RR: number
  SPO2: number
  ECG: number
}

type OtherVitalsInfoProps = {
  otherVitals: OtherVitalsInfo[]
}

function OtherVitals({ otherVitals }: OtherVitalsInfoProps) {
  const columns = [
    { name: 'Date', format: 'dd/mmm/yy', key: 'Date' },
    { name: 'Temp', format: '\xB0C', key: 'Temperature' },
    { name: 'RR', format: '/min', key: 'RR' },
    { name: 'SPO2', format: '%', key: 'SPO2' },
    { name: 'ECG', format: '6-lead', key: 'ECG' },
  ]

  return (
    otherVitals && (
      <Table
        title="Other Vitals"
        columns={columns}
        data={otherVitals}
        dateColumnKey="Date"
      />
    )
  )
}

function Vitals() {
  const { recId } = useParams()
  const [vitals, setVitals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    airtableFetch(
      `vitals/list?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const labResults = Object.keys(response).map((key) => response[key])
      setVitals(labResults)
      setLoading(false)
    })
  }, [recId])
  const isReadyToShow = vitals?.length >= 0 && !loading

  return (
    <div className="margin-bottom-16">
      <h4>Vitals</h4>
      {isReadyToShow && (
        <Bmi
          bmiInfo={vitals.filter(
            ({ Height, Weight, BMI }) => Height || Weight || BMI
          )}
        />
      )}
      {isReadyToShow && <BloodPressure />}
      {isReadyToShow && (
        <OtherVitals
          otherVitals={vitals.filter(
            ({ Temperature, SPO2, ECG, RR }) => Temperature || SPO2 || ECG || RR
          )}
        />
      )}
      {loading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small"> Loading Vitals </p>
        </div>
      )}
    </div>
  )
}

export default Vitals
