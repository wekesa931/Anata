import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import airtableFetch from '../../../../../resources/airtableFetch'
import Table from '../../../../utils/table/table.component'

const Lipids = () => {
  const { recId } = useParams()
  const [lipids, setLipids] = useState<any[]>([])

  const columns = [
    { name: 'Date', format: 'dd/mmm/yy', key: 'Test Date' },
    { name: 'TC', format: 'mg/dL', key: 'Total Cholesterol' },
    { name: 'HDL', format: 'mg/dL', key: 'HDL' },
    { name: 'LDL', format: 'mg/dL', key: 'LDL' },
    { name: 'TG', format: 'mg/dL', key: 'Triglyceride' },
  ]

  useEffect(() => {
    airtableFetch(
      `chl/list/0?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const labResults = Object.keys(response).map((key) => response[key])
      setLipids(labResults)
    })
  }, [recId])

  return lipids && <Table title="Lipids" columns={columns} data={lipids} />
}

const GlucoseMonitoring = () => {
  const { recId } = useParams()
  const [glucose, setGlucose] = useState<any[]>([])

  const columns = [
    { name: 'Date', format: 'dd/mmm/yy', key: 'Test Date' },
    { name: 'Fasted', format: 'mmol/L', key: 'Fasting Blood Sugar' },
    { name: 'RBS', format: 'mmol/L', key: 'Random Blood Sugar' },
    { name: 'HBA1C', format: '%', key: 'HbA1c' },
  ]

  useEffect(() => {
    airtableFetch(
      `dm/list/0?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const labResults = Object.keys(response).map((key) => response[key])
      setGlucose(labResults)
    })
  }, [recId])

  return (
    glucose && (
      <Table title="Glucose Monitoring" columns={columns} data={glucose} />
    )
  )
}

const Labs = () => {
  return (
    <div className="margin-bottom-16">
      <h4>Labs</h4>
      <Lipids />
      <GlucoseMonitoring />
    </div>
  )
}

export default Labs
