import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import airtableFetch from '../../../../../resources/airtable-fetch'
import Table from '../../../../utils/table/table.component'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'

function Lipids() {
  const { recId } = useParams()
  const [lipids, setLipids] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const columns = [
    { name: 'Date', format: 'dd/mmm/yy', key: 'Test Date' },
    {
      name: 'TC',
      format: 'mg/dL',
      key: 'Total Cholesterol',
      info: `<200 mg/dL: Desirable,
            200-239 mg/dL: Borderline,
            >240 mg/dL: High`,
    },
    {
      name: 'HDL',
      format: 'mg/dL',
      key: 'HDL',
      info: `Men < 40mg/dL: Poor,
             Women <50 mg/dL: Poor,
             40-59 mg/dL: Better,
             > 60 mg/dL: Best`,
    },
    {
      name: 'LDL',
      format: 'mg/dL',
      key: 'LDL',
      info: `<70 mg/dL: target if coronary artery disease,
            < 100 mg/dL: target if @ risk for coronary artery disease,
            100-129 mg/dL: Normal,
            130-159 mg/dL: Borderline high,
            160-189 mg/dL: High,
            190 mg/dL and above: Very high`,
    },
    {
      name: 'TG',
      format: 'mg/dL',
      key: 'Triglyceride',
      info: `<150 mg/dL: Desirable,
            150-199 mg/dL: Borderline High,
            200-499 mg/dL: High,
            > 500 mg/dL : Very High`,
    },
    {
      name: 'T.Type',
      format: 'F/NF',
      key: 'Lipid panel test type',
      info: `Test Type for Fasting / Non fasting`,
    },
  ]

  useEffect(() => {
    airtableFetch(
      `chl/list?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const labResults = Object.keys(response).map((key) => response[key])
      setLipids(labResults)
      setLoading(false)
    })
  }, [recId])
  const isReadyToShow = lipids?.length >= 0 && !loading
  return (
    <div>
      {isReadyToShow && lipids && (
        <Table
          title="Lipids"
          columns={columns}
          data={lipids}
          dateColumnKey="Test Date"
        />
      )}
      {loading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small"> Loading Lipids </p>
        </div>
      )}
    </div>
  )
}

function GlucoseMonitoring() {
  const { recId } = useParams()
  const [glucose, setGlucose] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const columns = [
    { name: 'Date', format: 'dd/mmm/yy', key: 'Test Date' },
    {
      name: 'Fasted',
      format: 'mmol/L',
      key: 'Fasting Blood Sugar',
      info: `Normal: <5.5 mmol/l,
             Pre-diabetic: 5.5-6.9 mmol/l,
             Diabetic: >7 mmol/l,
             Target for Diabetics: <7 mmol/l`,
    },
    { name: 'RBS', format: 'mmol/L', key: 'random_bs' },
    {
      name: 'HBA1C',
      format: '%',
      key: 'HbA1c',
      info: `normal<5.7%, prediabetes 5.7-6.4%, diabetes>6.5%. Targets: diabetics <65 years → <7%, diabetics >65 years → >8%`,
    },
  ]

  useEffect(() => {
    airtableFetch(
      `dm/list?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const labResults = Object.keys(response).map((key) => response[key])
      setGlucose(labResults)
      setLoading(false)
    })
  }, [recId])
  const isReadyToShow = glucose?.length >= 0 && !loading
  return (
    <div>
      {isReadyToShow && glucose && (
        <Table
          title="Glucose Monitoring"
          columns={columns}
          data={glucose}
          dateColumnKey="Test Date"
        />
      )}
      {loading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small"> Loading Glucose Monitoring </p>
        </div>
      )}
    </div>
  )
}

function Labs() {
  return (
    <div className="margin-bottom-16">
      <h4>Labs</h4>
      <Lipids />
      <GlucoseMonitoring />
    </div>
  )
}

export default Labs
