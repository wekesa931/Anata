import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import airtableFetch from '../../../../../resources/airtable-fetch'
import Table from '../../../../utils/table/table.component'

type BMIInfoProps = {
  Height: number
  Date: string
  Weight: number
  BMI: number
}

type BMIProps = {
  bmiInfo: BMIInfoProps[]
}

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

const Bmi = ({ bmiInfo }: BMIProps) => {
  const columns = [
    { name: 'Date', format: 'dd/mmm/yy', key: 'Date' },
    { name: 'Height', format: 'm', key: 'Height' },
    { name: 'Weight', format: 'kg', key: 'Weight' },
    { name: 'BMI', format: 'kg/m2', key: 'BMI' },
  ]

  return (
    bmiInfo && (
      <Table
        title="BMI"
        columns={columns}
        data={bmiInfo}
        dateColumnKey="Date"
      />
    )
  )
}

const OtherVitals = ({ otherVitals }: OtherVitalsInfoProps) => {
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

const BloodPressure = () => {
  const [bp, setBp] = useState<any[]>([])
  const { recId } = useParams()

  useEffect(() => {
    airtableFetch(
      `bp/list/0?view=HN%20Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const labResults = Object.keys(response).map((key) => response[key])
      setBp(labResults)
    })
  }, [recId])

  const columns = [
    { name: 'Date', format: 'dd/mmm/yy', key: 'Date' },
    { name: 'Sys', format: 'mmHg', key: 'Average Daily Systolic' },
    { name: 'Dia', format: 'mmHg', key: 'Average Daily Diastolic' },
  ]

  return (
    bp && (
      <Table
        title="Blood Pressure and Pulse"
        columns={columns}
        data={bp.filter(
          (result) =>
            result['Average Daily Systolic'] ||
            result['Average Daily Diastolic']
        )}
        dateColumnKey="Date"
      />
    )
  )
}

const Vitals = () => {
  const { recId } = useParams()
  const [vitals, setVitals] = useState<any[]>([])

  useEffect(() => {
    airtableFetch(
      `vitals/list/0?view=HN%20Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const labResults = Object.keys(response).map((key) => response[key])
      setVitals(labResults)
    })
  }, [recId])
  return (
    <div className="margin-bottom-16">
      <h4>Vitals</h4>
      <Bmi
        bmiInfo={vitals.filter(
          ({ Height, Weight, BMI }) => Height || Weight || BMI
        )}
      />
      <BloodPressure />
      <OtherVitals
        otherVitals={vitals.filter(
          ({ Temperature, SPO2, ECG, RR }) => Temperature || SPO2 || ECG || RR
        )}
      />
    </div>
  )
}

export default Vitals
