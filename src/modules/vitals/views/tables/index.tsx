import React from 'react'
import { useTablesData } from 'src/modules/vitals/hooks/tables.data.hook'
import Loading from 'src/components/loaders/centered'
import Table from 'src/modules/vitals/components/table'
import ErrorComponent from 'src/modules/vitals/components/error'

type TableProps = {
  data: any[]
  loading: boolean
  columns: any[]
  title: string
}

const BMI_COLUMNS = [
  { id: 'timestamp', label: 'Date' },
  { id: 'height', label: 'Height', units: 'm' },
  { id: 'weight', label: 'Weight', units: 'kg' },
  {
    id: 'bmi',
    label: 'BMI',
    units: 'kg/m2',
    format: (value: number) =>
      !isNaN(Number(value)) ? value?.toFixed(2) : value,
  },
]

const BODY_COMPOSITION_COLUMNS = [
  { id: 'timestamp', label: 'Date' },
  { id: 'muscleMass', label: 'Muscle Mass', units: 'kg' },
  { id: 'bodyFat', label: 'Body Fat' },
  { id: 'visceralFat', label: 'Visceral Fat' },
  { id: 'waistCircumference', label: 'Waist Circumference', units: 'cm' },
  { id: 'hipCircumference', label: 'Hip Circumference', units: 'cm' },
]

const OTHER_VITALS = [
  { id: 'timestamp', label: 'Date' },
  { id: 'temperature', label: 'Temperature', units: '°C' },
  { id: 'respiratoryRate', label: 'RR', units: 'bpm' },
  { id: 'oxygenSaturation', label: 'SpO2', units: '%' },
  { id: 'sixLeadEcgFindings', label: 'ECG', unit: '6-lead' },
]

function DataTable({ data, loading, columns, title }: TableProps) {
  return (
    <div className="mb-4">
      {loading ? (
        <div className="h-[300px]">
          <Loading message={`Loading ${title} BP Data ...`} />
        </div>
      ) : (
        <div>
          <Table columns={columns} data={data} title={title} />
        </div>
      )}
    </div>
  )
}

function VitalsTables() {
  const { loading, vitalsData, error, refetchVitalsData } = useTablesData()

  return (
    <div className="font-rubik">
      {error ? (
        <div>
          <p className="text-lg text-left mb-1">BMI</p>
          <ErrorComponent retry={refetchVitalsData} />
        </div>
      ) : (
        <>
          <div className="my-2">
            <p className="text-lg text-left mb-1">BMI</p>
            <DataTable
              data={vitalsData?.bmiData || []}
              columns={BMI_COLUMNS}
              loading={loading}
              title="BMI"
            />
          </div>
          <div className="my-2">
            <p className="text-lg text-left mb-1">Body Composition</p>
            <DataTable
              data={vitalsData?.bodyCompositionData || []}
              columns={BODY_COMPOSITION_COLUMNS}
              loading={loading}
              title="Body Composition"
            />
          </div>
          <div className="my-2">
            <p className="text-lg text-left mb-1">Other Vitals</p>
            <DataTable
              data={vitalsData?.otherVitalsData || []}
              columns={OTHER_VITALS}
              loading={loading}
              title="Other vitals"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default VitalsTables
