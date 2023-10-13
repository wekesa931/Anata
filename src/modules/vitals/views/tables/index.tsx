import React from 'react'
import { useTablesData } from 'src/modules/vitals/hooks/tables.data.hook'
import Loading from 'src/components/loaders/centered'
import Table, { Column } from 'src/components/table/data-table'
import ErrorComponent from 'src/modules/vitals/components/error'
import dayjs from 'dayjs'

type TableProps = {
  data: any[]
  loading: boolean
  columns: readonly Column[]
  title: string
}

const BMI_COLUMNS: Column[] = [
  { id: 'timestamp', label: 'Date', sortable: true, type: 'date' },
  { id: 'height', label: 'Height', units: 'm', sortable: true },
  { id: 'weight', label: 'Weight', units: 'kg', sortable: true },
  {
    id: 'bmi',
    label: 'BMI',
    units: 'kg/m2',
    sortable: true,
    format: (value: number) =>
      !isNaN(Number(value)) ? value?.toFixed(2) : value.toString(),
  },
]

const BODY_COMPOSITION_COLUMNS: Column[] = [
  { id: 'timestamp', label: 'Date', sortable: true, type: 'date' },
  { id: 'muscleMass', label: 'Muscle Mass', units: 'kg', sortable: true },
  { id: 'bodyFat', label: 'Body Fat', sortable: true },
  { id: 'visceralFat', label: 'Visceral Fat', sortable: true },
  {
    id: 'waistCircumference',
    label: 'Waist Circumference',
    units: 'cm',
    sortable: true,
  },
  {
    id: 'hipCircumference',
    label: 'Hip Circumference',
    units: 'cm',
    sortable: true,
  },
]

const OTHER_VITALS: Column[] = [
  { id: 'timestamp', label: 'Date', sortable: true, type: 'date' },
  { id: 'temperature', label: 'Temperature', units: '°C', sortable: true },
  { id: 'respiratoryRate', label: 'RR', units: 'bpm', sortable: true },
  { id: 'oxygenSaturation', label: 'SpO2', units: '%', sortable: true },
  { id: 'sixLeadEcgFindings', label: 'ECG', units: '6-lead' },
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
          <Table
            columns={columns}
            data={data}
            title={title}
            defaultSortColumn="timestamp"
            defaultFilterColumn="timestamp"
            dateColumnKey="timestamp"
            filterByDate
          />
        </div>
      )}
    </div>
  )
}

const BP_Columns: Column[] = [
  {
    id: 'timestamp',
    label: 'Date',
    sortable: true,
    type: 'date',
    format: (value: string) => dayjs(value).format('DD MMM YYYY'),
  },
  { id: 'average', label: 'Average BP', units: 'mmHg', sortable: true },
  { id: 'pulse', label: 'Average Pulse', units: 'bpm', sortable: true },
  {
    id: 'time',
    label: 'Time',
    sortable: true,
    type: 'date',
    format: (value: string) => dayjs(value).format('HH:mm'),
  },
]

export function BloodPressureTable() {
  const { bpError, bpLoading, bloodPressure, refetchBpData } = useTablesData()

  return (
    <div>
      {bpError ? (
        <div>
          <p className="text-lg text-left mb-1">Blood Pressure</p>
          <ErrorComponent retry={refetchBpData} />
        </div>
      ) : (
        <div className="my-2">
          <DataTable
            data={bloodPressure}
            columns={BP_Columns}
            loading={bpLoading}
            title="Blood Pressure"
          />
        </div>
      )}
    </div>
  )
}

function VitalsTable() {
  const { loading, refetchVitalsData, vitals, vitalsError } = useTablesData()

  return (
    <div>
      {vitalsError ? (
        <div>
          <p className="text-lg text-left mb-1">Labs and Vitals</p>
          <ErrorComponent retry={refetchVitalsData} />
        </div>
      ) : (
        <>
          <div className="my-2">
            <p className="text-lg text-left mb-1">BMI</p>
            <DataTable
              data={vitals?.bmiData || []}
              columns={BMI_COLUMNS}
              loading={loading}
              title="BMI"
            />
          </div>
          <div className="my-2">
            <p className="text-lg text-left mb-1">Body Composition</p>
            <DataTable
              data={vitals?.bodyCompositionData || []}
              columns={BODY_COMPOSITION_COLUMNS}
              loading={loading}
              title="Body Composition"
            />
          </div>
          <div className="my-2">
            <p className="text-lg text-left mb-1">Other Vitals</p>
            <DataTable
              data={vitals?.otherVitalsData || []}
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

function LabsAndVitalsTable() {
  return (
    <div className="font-rubik">
      <BloodPressureTable />
      <VitalsTable />
    </div>
  )
}

export default LabsAndVitalsTable
