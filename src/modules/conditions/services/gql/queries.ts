import { gql } from '@apollo/client'

export const CONDITIONSV2_QUERY = gql`
  query Conditions($antaraId: String!) {
    memberConditions(antaraId: $antaraId) {
      isChronic
      id
      reasonForClinicalStatusChange
      conditionDefinition {
        name
        possibleTargets {
          name
          id: targetId
        }
        possibleStages {
          name: technicalName
          id: conditionStageId
          icd11Code
        }
        conditionDefinitionId
      }
      stage {
        id
        name: technicalName
        conditionStageId
        target {
          targetId
          name
        }
        createdAt
      }

      startingStage {
        id
        name: technicalName
        conditionStageId
        target {
          targetId
          name
        }
        createdAt
        icd11Code
      }

      target {
        targetId
        name
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
`

export const LOOKUP_QUERY = gql`
  query ConditionLuts {
    conditionClinicalStatuses {
      id: conditionClinicalStatusId
      name
    }
    conditionVerificationStatuses {
      id: conditionVerificationStatusId
      name
    }
    observationUses {
      id: observationUseId
      name
    }
    conditionStageTypes {
      id: stageTypeId
      name
    }
    conditionTargetAchievementStatuses {
      id: targetAchievementStatusId
      name
    }
    atRiskFromItems {
      id: atRiskFromId
      name
    }
  }
`

export const CONDITIONS_DEFINITION_QUERY = gql`
  query conditionDefinitions {
    conditionDefinitions {
      edges {
        node {
          name
          id
          isChronic
          conditionDefinitionId
          description
          createdAt
          createdBy
          icd11Code
          possibleStages {
            name: technicalName
            id: conditionStageId
            icd11Code
          }
          possibleTargets {
            name
            id: targetId
          }
        }
      }
    }
  }
`
