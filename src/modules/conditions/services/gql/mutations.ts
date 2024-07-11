import { gql } from '@apollo/client'

export const CREATE_NEW_CONDITION = gql`
  mutation AddCondition($input: AddConditionInput!) {
    addCondition(input: $input) {
      condition {
        isChronic
        id
        conditionDefinition {
          name
          possibleTargets {
            name
            id: targetId
          }
          possibleStages {
            name
            id
          }
          conditionDefinitionId
        }
        stage {
          id
          name
          conditionStageId
          target {
            targetId
            name
          }
          createdAt
        }

        startingStage {
          id
          name
          conditionStageId
          target {
            targetId
            name
          }
          createdAt
        }

        startingObservation {
          displayItems
        }

        currentObservation {
          displayItems
        }

        clinicalStatus {
          conditionClinicalStatusId
          name
        }

        verificationStatus {
          conditionVerificationStatusId
          name
        }

        targetAchievementStatus {
          targetAchievementStatusId
          name
        }

        createdBy
        createdAt
        diagnosisDate
        isChronic
        isNewlyDiagnosed
        icd11Code
        shouldSystemAutoUpdate

        modifiedAt
        modifiedBy
        onsetDate
        note

        atRiskFrom {
          atRiskFromId
          name
        }
      }
    }
  }
`

export const UPDATE_CONDITIONS = gql`
  mutation UpdateCondition($input: UpdateConditionInput!) {
    updateCondition(input: $input) {
      condition {
        isChronic
        id
        conditionDefinition {
          name
          possibleTargets {
            name
            id: targetId
          }
          possibleStages {
            name
            id
          }
          conditionDefinitionId
        }
        stage {
          id
          name
          conditionStageId
          target {
            targetId
            name
          }
          createdAt
        }

        startingStage {
          id
          name
          conditionStageId
          target {
            targetId
            name
          }
          createdAt
        }

        startingObservation {
          displayItems
        }

        currentObservation {
          displayItems
        }

        clinicalStatus {
          conditionClinicalStatusId
          name
        }

        verificationStatus {
          conditionVerificationStatusId
          name
        }

        targetAchievementStatus {
          targetAchievementStatusId
          name
        }

        createdBy
        createdAt
        diagnosisDate
        isChronic
        isNewlyDiagnosed
        icd11Code
        shouldSystemAutoUpdate

        modifiedAt
        modifiedBy
        onsetDate
        note

        atRiskFrom {
          atRiskFromId
          name
        }
      }
    }
  }
`
export const ADD_MEASUREMENT = gql`
  mutation AddMeasurements($input: [AddMeasurementInput]!) {
    batchAddMeasurements(input: $input) {
      measurements {
        id
        measurementId
        member {
          antaraId
        }
        value
        createdAt
      }
    }
  }
`
