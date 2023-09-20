import { gql } from '@apollo/client'

export const GET_REPORT_GEN_MEASUREMENTS = gql`
  query healthMetricAggregatedMeasurements(
    $startDateOffset: Date!
    $antaraId: String!
    $stopDateOffset: Date!
  ) {
    weight: healthMetricAggregatedMeasurements(
      healthMetric: "Weight"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    height: healthMetricAggregatedMeasurements(
      healthMetric: "Height"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    bmi: healthMetricAggregatedMeasurements(
      healthMetric: "BMI"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    systolic: healthMetricAggregatedMeasurements(
      healthMetric: "Systolic"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
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
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    temperature: healthMetricAggregatedMeasurements(
      healthMetric: "Temperature"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    rr: healthMetricAggregatedMeasurements(
      healthMetric: "Respiratory Rate"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    spo2: healthMetricAggregatedMeasurements(
      healthMetric: "Oxygen Saturation"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    waistHipRatio: healthMetricAggregatedMeasurements(
      healthMetric: "Waisthip Ratio"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    muscleMass: healthMetricAggregatedMeasurements(
      healthMetric: "Muscle Mass"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    bodyFat: healthMetricAggregatedMeasurements(
      healthMetric: "Body fat"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    rbs: healthMetricAggregatedMeasurements(
      healthMetric: "Random Blood Glucose"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    fbs: healthMetricAggregatedMeasurements(
      healthMetric: "Fasting Blood Glucose"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    hba1c: healthMetricAggregatedMeasurements(
      healthMetric: "HbA1c"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    hdl: healthMetricAggregatedMeasurements(
      healthMetric: "Hdl"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    ldl: healthMetricAggregatedMeasurements(
      healthMetric: "Ldl"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    totalCholestrol: healthMetricAggregatedMeasurements(
      healthMetric: "Total Cholesterol"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
    triglycerides: healthMetricAggregatedMeasurements(
      healthMetric: "Triglyceride"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
      granularity: "day"
    ) {
      edges {
        node {
          aggregates
        }
      }
    }
  }
`

export const GET_REPORT_GEN_MEASUREMENTS_NORMAL_RANGES = gql`
  query referenceRanges($sex: String, $ageInMonths: Int) {
    bmi: referenceRanges(
      healthMetric: "BMI"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    height: referenceRanges(
      healthMetric: "Height"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    weight: referenceRanges(
      healthMetric: "Weight"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    systolic: referenceRanges(
      healthMetric: "Systolic"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    diastolic: referenceRanges(
      healthMetric: "Diastolic"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    temperature: referenceRanges(
      healthMetric: "Temperature"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    rr: referenceRanges(
      healthMetric: "Respiratory Rate"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    spo2: referenceRanges(
      healthMetric: "Oxygen Saturation"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    waistHipRatio: referenceRanges(
      healthMetric: "Waisthip Ratio"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    muscleMass: referenceRanges(
      healthMetric: "Muscle Mass"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    bodyFat: referenceRanges(
      healthMetric: "Body fat"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
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
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    fbs: referenceRanges(
      healthMetric: "Fasting Blood Glucose"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    hba1c: referenceRanges(
      healthMetric: "HbA1c"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    hdl: referenceRanges(
      healthMetric: "Hdl"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    ldl: referenceRanges(
      healthMetric: "Ldl"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    totalCholestrol: referenceRanges(
      healthMetric: "Total Cholesterol"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
    triglycerides: referenceRanges(
      healthMetric: "Triglyceride"
      sex: $sex
      ageInMonths: $ageInMonths
    ) {
      edges {
        node {
          name
          minimumValue
          maximumValue
          healthMetric {
            name
          }
        }
      }
    }
  }
`

export const GET_BP_DIFF = gql`
  query bloodPressureMonitoring($antaraId: String!) {
    recent: bloodPressureMonitoring(antaraId: $antaraId, first: 1) {
      edges {
        node {
          systolic
          diastolic
          timestamp
        }
      }
    }
    earliest: bloodPressureMonitoring(antaraId: $antaraId, last: 1) {
      edges {
        node {
          systolic
          diastolic
          timestamp
        }
      }
    }
  }
`

export const GET_VITALS_DIFF = gql`
  query vitals($antaraId: String!) {
    recent: vitals(antaraId: $antaraId, first: 1) {
      edges {
        node {
          weight
          height
          bmi
          respiratoryRate
          oxygenSaturation
          temperature
          timestamp
        }
      }
    }
    earliest: vitals(antaraId: $antaraId, last: 1) {
      edges {
        node {
          weight
          height
          bmi
          respiratoryRate
          oxygenSaturation
          temperature
          timestamp
        }
      }
    }
  }
`

export const GET_BS_DIFF = gql`
  query bloodGlucoseMonitoring($antaraId: String!) {
    recent: bloodGlucoseMonitoring(antaraId: $antaraId, first: 1) {
      edges {
        node {
          randomBloodGlucose
          fastingBloodGlucose
          timestamp
        }
      }
    }
    earliest: bloodGlucoseMonitoring(antaraId: $antaraId, last: 1) {
      edges {
        node {
          randomBloodGlucose
          fastingBloodGlucose
          timestamp
        }
      }
    }
  }
`

export const GET_HBA1C_DIFF = gql`
  query hba1cMonitoring($antaraId: String!) {
    recent: hba1cMonitoring(antaraId: $antaraId, first: 1) {
      edges {
        node {
          hba1c
          timestamp
        }
      }
    }
    earliest: hba1cMonitoring(antaraId: $antaraId, last: 1) {
      edges {
        node {
          hba1c
          timestamp
        }
      }
    }
  }
`

export const GET_CHL_DIFF = gql`
  query cholesterolMonitoring($antaraId: String!) {
    recent: cholesterolMonitoring(antaraId: $antaraId, first: 1) {
      edges {
        node {
          data
          timestamp
        }
      }
    }
    earliest: cholesterolMonitoring(antaraId: $antaraId, last: 1) {
      edges {
        node {
          data
          timestamp
        }
      }
    }
  }
`
