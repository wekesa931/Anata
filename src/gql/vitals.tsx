import { gql } from '@apollo/client'

export const GET_VITALS_READING = gql`
  query vitals($antaraId: String!) {
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
          memberAntaraId
        }
      }
    }
  }
`
