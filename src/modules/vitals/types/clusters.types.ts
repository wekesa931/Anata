type Readings = {
  value: number
  timestamp: Date
}

export enum PanelNames {
  BMI = 'BMI',
  BloodPressure = 'Blood Pressure Monitoring',
  Lipids = 'Lipids',
}

type HealthMetricMeanValue = {
  mean: number
  readings?: Readings[]
}

export enum HealthMetricNames {
  BMI = 'BMI',
  Systolic = 'Systolic',
  Diastolic = 'Diastolic',
  LDL = 'LDL',
  HDL = 'HDL',
  Triglyceride = 'Triglyceride',
  FASTING_BS = 'Fasting Blood Glucose',
  HbA1c = 'HbA1c',
  RANDOM_BS = 'Random Blood Glucose',
}

export type BMIPanelClusterType = {
  panelName: PanelNames.BMI
  healthMetrics: {
    [HealthMetricNames.BMI]: HealthMetricMeanValue
  }
}

export type BloodPressurePanelClusterType = {
  panelName: PanelNames.BloodPressure
  healthMetrics: {
    [HealthMetricNames.Systolic]: HealthMetricMeanValue
    [HealthMetricNames.Diastolic]: HealthMetricMeanValue
  }
}

export type LipidsPanelClusterType = {
  panelName: PanelNames.Lipids
  healthMetrics: {
    [HealthMetricNames.LDL]: HealthMetricMeanValue
    [HealthMetricNames.HDL]: HealthMetricMeanValue
    [HealthMetricNames.Triglyceride]: HealthMetricMeanValue
  }
}

export type PanelClusterType = {
  start: Date
  end: Date
  antaraId: string
} & (
  | BMIPanelClusterType
  | BloodPressurePanelClusterType
  | LipidsPanelClusterType
)

export type ValidHealthMetrics =
  | BMIPanelClusterType['healthMetrics']
  | BloodPressurePanelClusterType['healthMetrics']
  | LipidsPanelClusterType['healthMetrics']

export interface BPAggregatedMetricData {
  Systolic?: any
  Diastolic?: any
  timestamp: number // unix timestamp
}

export type ReferenceRange = {
  minimum: number
  maximum: number
  color: string
  name: string
  [key: string]: any
}

export type ReferenceDomain = {
  referenceRanges: ReferenceRange[]
  domain: [number, number]
}
