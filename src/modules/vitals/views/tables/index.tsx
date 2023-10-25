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

const toFixed = (value: number) =>
  !isNaN(Number(value)) ? value?.toFixed(2) : value?.toString()

const BMI_COLUMNS: Column[] = [
  { id: 'timestamp', label: 'Date', sortable: true, type: 'date' },
  { id: 'height', label: 'Height', units: 'm', sortable: true },
  { id: 'weight', label: 'Weight', units: 'kg', sortable: true },
  {
    id: 'bmi',
    label: 'BMI',
    units: 'kg/m2',
    sortable: true,
    format: toFixed,
  },
]

const BODY_COMPOSITION_COLUMNS: Column[] = [
  {
    id: 'timestamp',
    label: 'Date',
    sortable: true,
    type: 'date',
    width: '30%',
  },
  {
    id: 'muscle_mass',
    label: 'Muscle Mass',
    units: 'kg',
    sortable: true,
    width: '10%',
  },
  { id: 'body_fat', label: 'Body Fat', sortable: true, width: '15%' },
  { id: 'visceral_fat', label: 'Visceral Fat', sortable: true, width: '15%' },
  {
    id: 'waist_circumference',
    label: 'Waist Circumference',
    units: 'cm',
    sortable: true,
    width: '15%',
  },
  {
    id: 'hip_circumference',
    label: 'Hip Circumference',
    units: 'cm',
    sortable: true,
    width: '15%',
  },
]

const OTHER_VITALS: Column[] = [
  { id: 'timestamp', label: 'Date', sortable: true, type: 'date' },
  { id: 'temperature', label: 'Temperature', units: '°C', sortable: true },
  { id: 'respiratory_rate', label: 'RR', units: 'bpm', sortable: true },
  { id: 'oxygen_saturation', label: 'SpO2', units: '%', sortable: true },
  { id: 'six_lead_ecg_findings', label: 'ECG', units: '6-lead' },
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

const BS_COLUMNS: Column[] = [
  {
    id: 'timestamp',
    label: 'Date',
    sortable: true,
    type: 'date',
    format: (value: string) => dayjs(value).format('DD MMM YYYY'),
  },
  {
    id: 'fasting_blood_glucose',
    label: 'FBS',
    units: 'mmol/L',
    sortable: true,
  },
  {
    id: 'random_blood_glucose',
    label: 'RBS',
    units: 'mmol/L',
    sortable: true,
    format: toFixed,
  },
  { id: 'hba1c', label: 'HBA1C', units: '%', sortable: true },
]

export function BloodGlucoseTable() {
  const { bloodSugar, bloodSugarError, bloodSugarLoading, refetchBsData } =
    useTablesData()

  return (
    <div>
      {bloodSugarError ? (
        <div>
          <p className="text-lg text-left mb-1">Glucose Monitoring</p>
          <ErrorComponent retry={refetchBsData} />
        </div>
      ) : (
        <div className="my-2">
          <p className="text-lg text-left mb-1">Glucose Monitoring</p>
          <DataTable
            data={bloodSugar}
            columns={BS_COLUMNS}
            loading={bloodSugarLoading}
            title="Glucose Monitoring"
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
          <p className="text-lg text-left mb-1">Blood Pressure</p>
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
      <BloodGlucoseTable />
      <VitalsTable />
    </div>
  )
}

export default LabsAndVitalsTable
