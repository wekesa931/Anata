import React, { useEffect, useState } from 'react'
import { useTablesData } from 'src/modules/vitals/hooks/tables.data.hook'
import Table, { Column } from 'src/components/table/data-table'
import ErrorComponent from 'src/components/feedbacks/error-retry'
import dayjs from 'dayjs'
import { useClustersData } from 'src/modules/vitals/hooks/clusters.data.hook'
import {
  ValueHelperText,
  TableHeadHelpertext,
} from 'src/modules/vitals/components/helper-texts'
import {
  BP_OBSERVER,
  BS_OBSERVER,
  VITALS_OBSERVER,
  CHL_OBSERVER,
  useLabsAndVitalsObserver,
} from 'src/modules/vitals/services/observers'
import { useRefreshTrigger } from 'src/context/refresh-trigger'

type TableProps = {
  data: any[]
  loading: boolean
  columns: readonly Column[]
  title: string
  defaultSortColumn?: string
  loadingContext?: string | undefined
}

const toFixed = (value: number) =>
  !isNaN(Number(value)) ? value?.toFixed(2) : value?.toString()

const BMI_COLUMNS: Column[] = [
  { id: 'timestamp', label: 'Date', sortable: true, type: 'date' },
  {
    id: 'height',
    label: 'Height',
    units: 'm',
    sortable: true,
    helperText: <TableHeadHelpertext metric="height" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="height" />
    ),
  },
  {
    id: 'weight',
    label: 'Weight',
    units: 'kg',
    sortable: true,
    helperText: <TableHeadHelpertext metric="weight" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="weight" />
    ),
  },
  {
    id: 'bmi',
    label: 'BMI',
    units: 'kg/m2',
    sortable: true,
    format: toFixed,
    helperText: <TableHeadHelpertext metric="bmi" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="bmi" />
    ),
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
    helperText: <TableHeadHelpertext metric="muscleMass" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="muscle_mass" />
    ),
  },
  {
    id: 'body_fat',
    label: 'Body Fat',
    sortable: true,
    width: '15%',
    helperText: <TableHeadHelpertext metric="bodyFat" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="body_fat" />
    ),
  },
  {
    id: 'visceral_fat',
    label: 'Visceral Fat',
    sortable: true,
    width: '15%',
    helperText: <TableHeadHelpertext metric="visceralFat" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="visceral_fat" />
    ),
  },
  {
    id: 'waist_circumference',
    label: 'Waist Circumference',
    units: 'cm',
    sortable: true,
    width: '15%',
    helperText: <TableHeadHelpertext metric="waistCircumference" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="waist_circumference" />
    ),
  },
  {
    id: 'hip_circumference',
    label: 'Hip Circumference',
    units: 'cm',
    sortable: true,
    width: '15%',
    helperText: <TableHeadHelpertext metric="hipCircumference" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="hip_circumference" />
    ),
  },
]

const OTHER_VITALS: Column[] = [
  { id: 'timestamp', label: 'Date', sortable: true, type: 'date' },
  {
    id: 'temperature',
    label: 'Temperature',
    units: '°C',
    sortable: true,
    helperText: <TableHeadHelpertext metric="temperature" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="temperature" />
    ),
  },
  {
    id: 'respiratory_rate',
    label: 'RR',
    units: 'bpm',
    sortable: true,
    helperText: <TableHeadHelpertext metric="rr" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="respiratory_rate" />
    ),
  },
  {
    id: 'oxygen_saturation',
    label: 'SpO2',
    units: '%',
    sortable: true,
    helperText: <TableHeadHelpertext metric="spo2" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="oxygen_saturation" />
    ),
  },
  { id: 'six_lead_ecg_findings', label: 'ECG', units: '6-lead' },
]

function DataTable({
  data,
  loading,
  columns,
  title,
  defaultSortColumn,
  loadingContext = undefined,
}: TableProps) {
  const { refreshKey } = useRefreshTrigger()

  // loading state triggered by refresh key change
  const [refreshTableLoading, setRefreshTableLoading] = useState(false)

  // determines if datatable will refresh on refreshKey change
  const refreshTableContext = refreshKey?.includes(loadingContext!)

  // determines loading state for the datatable, normal loading and trigger refetch loading
  const showLoading = loading || (refreshTableContext && refreshTableLoading)

  // trigger datatable loading when refresh key changes
  useEffect(() => {
    if (refreshTableContext) {
      setRefreshTableLoading(true)
    }
  }, [refreshTableContext, refreshKey])

  // reset datatable loading state when refresh completes
  useEffect(() => {
    if (!loading && refreshTableContext) {
      setRefreshTableLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, refreshTableContext])

  return (
    <div className="mb-4">
      <div>
        <Table
          columns={columns}
          data={data}
          loading={showLoading}
          loadingContext={loadingContext}
          title={title}
          defaultSortColumn={defaultSortColumn || 'timestamp'}
          defaultFilterColumn={defaultSortColumn || 'timestamp'}
          dateColumnKey={defaultSortColumn || 'timestamp'}
          filterByDate
        />
      </div>
    </div>
  )
}

const LIPIDS_COLUMNS: Column[] = [
  {
    id: 'day',
    label: 'Date',
    sortable: true,
    type: 'date',
    width: '25%',
  },
  {
    id: 'total_cholesterol',
    label: 'TC',
    units: 'mg/dL',
    sortable: true,
    width: '15%',
    helperText: <TableHeadHelpertext metric="totalCholestrol" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="total_cholesterol" />
    ),
  },
  {
    id: 'hdl',
    label: 'HDL',
    units: 'mg/dL',
    sortable: true,
    width: '15%',
    helperText: <TableHeadHelpertext metric="hdl" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="hdl" />
    ),
  },
  {
    id: 'ldl',
    label: 'LDL',
    units: 'mg/dL',
    sortable: true,
    width: '15%',
    helperText: <TableHeadHelpertext metric="ldl" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="ldl" />
    ),
  },
  {
    id: 'triglyceride',
    label: 'TG',
    units: 'mg/dL',
    sortable: true,
    width: '15%',
    helperText: <TableHeadHelpertext metric="triglycerides" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="triglyceride" />
    ),
  },
  {
    id: 'lipid_panel_test_type',
    label: 'T.T',
    units: 'F/NF',
    width: '15%',
  },
]

export function LipidsTable() {
  const { getLipidsClusters } = useClustersData()

  const { data, loading, error } = useLabsAndVitalsObserver(
    CHL_OBSERVER,
    getLipidsClusters,
    () => getLipidsClusters(true)
  )

  return (
    <div>
      {error ? (
        <div>
          <p className="text-lg text-left mb-1">Glucose Monitoring</p>
          <ErrorComponent retry={getLipidsClusters} />
        </div>
      ) : (
        <div className="my-2">
          <DataTable
            data={data}
            loading={loading}
            columns={LIPIDS_COLUMNS}
            title="Lipids"
            defaultSortColumn="day"
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
    helperText: <TableHeadHelpertext metric="fbs" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="fasting_blood_glucose" />
    ),
  },
  {
    id: 'random_blood_glucose',
    label: 'RBS',
    units: 'mmol/L',
    sortable: true,
    format: toFixed,
    helperText: <TableHeadHelpertext metric="rbs" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="random_blood_glucose" />
    ),
  },
  {
    id: 'hba1c',
    label: 'HBA1C',
    units: '%',
    sortable: true,
    helperText: <TableHeadHelpertext metric="hba1c" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="hba1c" />
    ),
  },
]

export function BloodGlucoseTable() {
  const { getBsData } = useTablesData()

  const refetchBsData = () => getBsData(true)

  const { data, loading, error } = useLabsAndVitalsObserver(
    BS_OBSERVER,
    getBsData,
    refetchBsData
  )

  return (
    <div>
      {error ? (
        <div>
          <p className="text-lg text-left mb-1">Glucose Monitoring</p>
          <ErrorComponent retry={refetchBsData} />
        </div>
      ) : (
        <div className="my-2">
          <DataTable
            data={data}
            columns={BS_COLUMNS}
            loading={loading}
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
  {
    id: 'average',
    label: 'Average BP',
    units: 'mmHg',
    sortable: true,
    helperText: <TableHeadHelpertext metric="bp" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="bp" />
    ),
  },
  {
    id: 'pulse',
    label: 'Average Pulse',
    units: 'bpm',
    sortable: true,
    helperText: <TableHeadHelpertext metric="pulse" />,
    cellHeperText: ({ value }: { value: any }) => (
      <ValueHelperText value={value} metric="pulse" />
    ),
  },
  {
    id: 'time',
    label: 'Time',
    sortable: true,
    type: 'date',
    format: (value: string) => dayjs(value).format('HH:mm'),
  },
]

export function BloodPressureTable() {
  const { getBpData } = useTablesData()

  const refetchBpData = () => getBpData(true)

  const { data, error, loading } = useLabsAndVitalsObserver(
    BP_OBSERVER,
    getBpData,
    refetchBpData
  )

  const [loadingBP, setLoadingBP] = useState(false)

  const { refreshKey, setRefreshKey } = useRefreshTrigger()

  useEffect(() => {
    if (refreshKey.includes('BP Mon')) {
      setLoadingBP(true)
      refetchBpData()
    }

    // clean up, reset refreshKey
    return () => {
      if (setRefreshKey) {
        setRefreshKey('')
      }
      setLoadingBP(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  return (
    <div>
      {error ? (
        <div>
          <p className="text-lg text-left mb-1">Blood Pressure</p>
          <ErrorComponent retry={refetchBpData} />
        </div>
      ) : (
        <div className="my-2">
          <DataTable
            data={data}
            columns={BP_Columns}
            loading={loading || loadingBP}
            loadingContext={
              refreshKey.includes('BP Mon') ? refreshKey : undefined
            }
            title="Blood Pressure"
          />
        </div>
      )}
    </div>
  )
}

function VitalsTable() {
  const { getVitalsData } = useTablesData()

  const refetchVitalsData = () => getVitalsData(true)

  const { data, loading, error } = useLabsAndVitalsObserver(
    VITALS_OBSERVER,
    getVitalsData,
    refetchVitalsData,
    {}
  )

  return (
    <div>
      {error ? (
        <div>
          <p className="text-lg text-left mb-1">Labs and Vitals</p>
          <ErrorComponent retry={refetchVitalsData} />
        </div>
      ) : (
        <>
          <div className="my-2">
            <DataTable
              data={data?.bmiData || []}
              columns={BMI_COLUMNS}
              loading={loading}
              title="BMI"
            />
          </div>
          <div className="my-2">
            <DataTable
              data={data?.bodyCompositionData || []}
              columns={BODY_COMPOSITION_COLUMNS}
              loading={loading}
              title="Body Composition"
            />
          </div>
          <div className="my-2">
            <DataTable
              data={data?.otherVitalsData || []}
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
