export interface LabsAndVitals {
  antaraId: string
  dependentAntaraId?: string
  timestamp?: string | Date
  id: string
  measurer?: string
}

export type RecordID = [string]
type UserRecord = {
  email: string
  name: string
}

export interface VitalsFormInputs {
  '6-Lead ECG Findings'?: string
  'Body fat'?: number
  'Bone density'?: number
  'Hip circumference'?: number
  Height?: number
  'Mid-Upper Arm Circumference(MUAC)'?: number
  'Muscle mass (kgs)'?: number
  RR?: number
  SPO2?: number
  Temperature?: number
  'Type of Reading'?: string
  'Visceral fat'?: number
  'Waist circumference'?: number
  'Water content'?: number
  Weight?: number
  Date?: string
  Staff?: RecordID
  'Case ID'?: RecordID
  Member?: RecordID
  createdBy?: UserRecord
  updatedBy?: UserRecord
  timestamp?: string | Date
  BMI?: number
}

export interface VitalsReading extends LabsAndVitals {
  sixLeadEcgFindings?: string
  weight?: number
  height?: number
  bmi?: number
  respiratoryRate?: number
  oxygenSaturation?: number
  temperature?: number
  waterContent?: number
  midUpperArmCircumference?: number
  waistCircumference?: number
  hipCircumference?: number
  waisthipRatio?: number
  boneDensity?: number
  bodyFat?: number
  visceralFat?: number
  muscleMass?: number
  muscleMassWeightRatio?: number
  antaraId: string
}

export interface CholesterolFormInputs {
  timestamp: string
  lipidPanelTestType: string
  hdl: number
  ldl: number
  totalCholesterol: number
  triglyceride: number
  antaraId: string
}
export interface CholesterolReading extends LabsAndVitals {
  lipidPanelTestType: string
  hdl?: number
  ldl?: number
  totalCholesterol?: number
  triglyceride?: number
}
export interface BloodPressureFormInputs {
  diastolic: number
  systolic: number
  pulse: number
  timestamp: string
  bpReadingType: string
  antaraId: string
}

export interface Hba1cReading {
  hba1c: number
  antaraId: string
}

export interface DMMonitoringFormInputs extends Hba1cReading {
  timestamp: string
  preprandialBloodGlucose: number
  postprandialBloodGlucose: number
  fastingBloodGlucose: number
  antaraId: string
}

export enum TimeFilters {
  ONE_MONTH = '1M',
  THREE_MONTHS = '3M',
  TWELVE_MONTHS = '12M',
}

export type TimeRange = [Date | null, Date | null]

export type ReportGenVariables = {
  antaraId: string
  startDateOffset: Date | string
  stopDateOffset: Date | string
}

export type ReportGenNormalRangeVariables = {
  sex: string
  ageInMonths: number
}

export type NormalRange = {
  name: string
  minimumValue: number
  maximumValue: number
}
