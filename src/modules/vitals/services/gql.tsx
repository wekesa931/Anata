import { gql } from '@apollo/client'

export const CREATE_VITALS_READING = gql`
  mutation uploadVitalsReading($input: VitalsReadingInput!) {
    uploadVitalsReading(input: $input) {
      message
      errors
      status
    }
  }
`

export const CREATE_CHOLESTROL_READING = gql`
  mutation uploadCholesterolReading($input: CholesterolReadingInput!) {
    uploadCholesterolReading(input: $input) {
      message
      errors
      status
    }
  }
`

export const CREATE_BLOOD_PRESSURE_READING = gql`
  mutation uploadBloodPressureReading($input: BloodPressureReadingInput!) {
    uploadBloodPressureReading(input: $input) {
      message
      errors
      status
    }
  }
`

export const CREATE_BLOOD_GLUCOSE_READING = gql`
  mutation uploadBloodGlucoseReading($input: BloodGlucoseReadingInput!) {
    uploadBloodGlucoseReading(input: $input) {
      message
      errors
      status
    }
  }
`

export const CREATE_HBA1C_READING = gql`
  mutation uploadHba1cReading($input: Hba1cReadingInput!) {
    uploadHba1cReading(input: $input) {
      message
      errors
      status
    }
  }
`

export const CREATE_DM_READING = gql`
  mutation CombinedDMReading(
    $bloodGlucose: BloodGlucoseReadingInput!
    $hba1c: Hba1cReadingInput!
  ) {
    uploadBloodGlucoseReading(input: $bloodGlucose) {
      message
      errors
      status
    }
    uploadHba1cReading(input: $hba1c) {
      message
      errors
      status
    }
  }
`

export const GET_VITALS = gql`
  query vitals($antaraId: String!) {
    vitals(antaraId: $antaraId) {
      edges {
        node {
          data
          timestamp
        }
      }
    }
  }
`

export const GET_BP_PANEL = gql`
  query bloodPressureMonitoring($antaraId: String!) {
    bloodPressureMonitoring(antaraId: $antaraId) {
      edges {
        node {
          data
          timestamp
        }
      }
    }
  }
`

export const GET_BS_PANEL = gql`
  query ($antaraId: String!) {
    bs: bloodGlucoseMonitoring(antaraId: $antaraId) {
      edges {
        node {
          data
          timestamp
        }
      }
    }
    hba1c: hba1cMonitoring(antaraId: $antaraId) {
      edges {
        node {
          data
          timestamp
        }
      }
    }
  }
`

export const GET_ALL_VITALS = gql`
  query ($antaraId: String!) {
    vitals(antaraId: $antaraId) {
      edges {
        node {
          weight
          height
          bmi
          sixLeadEcgFindings
          respiratoryRate
          oxygenSaturation
          temperature
          waterContent
          midUpperArmCircumference
          waistCircumference
          waisthipRatio
          boneDensity
          bodyFat
          visceralFat
          muscleMass
          muscleMassWeightRatio
          timestamp
          measurer
          id
        }
      }
    }
    cholesterolMonitoring(antaraId: $antaraId) {
      edges {
        node {
          lipidPanelTestType
          hdl
          ldl
          totalCholesterol
          triglyceride
          timestamp
          measurer
          id
        }
      }
    }
    bloodPressureMonitoring(antaraId: $antaraId) {
      edges {
        node {
          bpReadingType
          morningSystolic
          morningDiastolic
          eveningSystolic
          eveningDiastolic
          morningPulse
          eveningPulse
          averageDailySystolic
          averageDailyDiastolic
          averageDailyPulse
          timestamp
          measurer
          id
        }
      }
    }
    bloodGlucoseMonitoring(antaraId: $antaraId) {
      edges {
        node {
          morningBloodGlucoseTiming
          afternoonBloodGlucoseTiming
          eveningBloodGlucoseTiming
          afternoonPostprandialBloodGlucose
          eveningPostprandialBloodGlucose
          morningPostprandialBloodGlucose
          afternoonPreprandialBloodGlucose
          eveningPreprandialBloodGlucose
          fastingBloodGlucose
          randomBloodGlucose
          timestamp
          measurer
          id
        }
      }
    }
    hba1cMonitoring(antaraId: $antaraId) {
      edges {
        node {
          hba1c
          timestamp
          measurer
          id
        }
      }
    }
  }
`

export const GET_CLUSTERS_BY_PANEL = gql`
  query measurementPanelTypeAggregatedMeasurements(
    $measurementPanelType: String!
    $startDateOffset: Date!
    $antaraId: String!
    $stopDateOffset: Date!
    $granularity: String
  ) {
    measurementPanelTypeAggregatedMeasurements(
      measurementPanelType: $measurementPanelType
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: $granularity
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
  }
`

export const GET_AGGREGATED_METRICS = gql`
  query healthMetricAggregatedMeasurements(
    $healthMetric: String!
    $startDateOffset: Date!
    $antaraId: String!
    $stopDateOffset: Date
    $granularity: String
  ) {
    healthMetricAggregatedMeasurements(
      healthMetric: $healthMetric
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: $granularity
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
  }
`

export const GET_AGGREGATED_BP_METRICS = gql`
  query healthMetricAggregatedMeasurements(
    $startDateOffset: Date!
    $antaraId: String!
    $stopDateOffset: Date
    $granularity: String
  ) {
    systolic: healthMetricAggregatedMeasurements(
      healthMetric: "Systolic"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: $granularity
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    diastolic: healthMetricAggregatedMeasurements(
      healthMetric: "Diastolic"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: $granularity
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
  }
`

export const GET_CHL_MEASUREMENTS = gql`
  query cholesterolMonitoring($antaraId: String!, $offset: Int, $first: Int) {
    cholesterolMonitoring(antaraId: $antaraId, offset: $offset, first: $first) {
      edges {
        node {
          data
          timestamp
        }
      }
    }
  }
`

export const GET_BS_AGGREGATES = gql`
  query bloodGlucoseAggregatedMeasurements(
    $startDateOffset: Date!
    $antaraId: String!
    $stopDateOffset: Date
    $granularity: String
  ) {
    fastingBloodGlucose: healthMetricAggregatedMeasurements(
      healthMetric: "Fasting Blood Glucose"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: $granularity
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    randomBloodGlucose: healthMetricAggregatedMeasurements(
      healthMetric: "Random Blood Glucose"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: $granularity
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
  }
`

export const GET_REFERENCE_RANGE = gql`
  query referenceRanges(
    $sex: String!
    $ageInMonths: Int!
    $healthMetric: String!
  ) {
    referenceRanges(
      healthMetric: $healthMetric
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          backgroundColor
          name
          minimumValue
          maximumValue
        }
      }
    }
  }
`

export const GET_BS_REFERENCE_RANGE = gql`
  query referenceRanges($sex: String!, $ageInMonths: Int!) {
    fbs: referenceRanges(
      healthMetric: "Fasting Blood Glucose"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          backgroundColor
          name
          minimumValue
          maximumValue
        }
      }
    }
    rbs: referenceRanges(
      healthMetric: "Random Blood Glucose"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          backgroundColor
          name
          minimumValue
          maximumValue
        }
      }
    }
  }
`
