import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import airtableFetch from '../../../../../resources/airtable-fetch'
import Table from '../../../../utils/table/table.component'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'

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
    {
      name: 'Date',
      format: 'dd/mmm/yy',
      key: 'Date',
    },
    { name: 'Height', format: 'm', key: 'Height' },
    { name: 'Weight', format: 'kg', key: 'Weight' },
    {
      name: 'BMI',
      format: 'kg/m2',
      key: 'BMI',
      info: `Stage 1: BMI 25-30
             Stage 2: BMI 30-40
             Stage 3: BMI >40`,
    },
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
      `bp/list?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const labResults = Object.keys(response).map((key) => response[key])
      setBp(labResults)
    })
  }, [recId])

  const columns = [
    { name: 'Date', format: 'dd/mmm/yy', key: 'Date' },
    {
      name: 'Sys',
      format: 'mmHg',
      key: 'Average Daily Systolic',
      info: `Elevated BP: 120-129 mmHg,
             Stage 1 Hypertension: 130-140 mmHg,
             Stage 2 Hypertension: >140 mmHg`,
    },
    {
      name: 'Dia',
      format: 'mmHg',
      key: 'Average Daily Diastolic',
      info: `Elevated BP: <80 mmHg,
             Stage 1 Hypertension: 80-89 mmHg,
             Stage 2 Hypertension: >89 mmHg`,
    },
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
