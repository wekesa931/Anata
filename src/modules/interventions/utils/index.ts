import { Intervention as TIntervention } from 'src/modules/interventions/types'
import type { Intervention } from 'src/modules/interventions/db/models'

export const buildIntervention = (
  intervention: Intervention,
  data: TIntervention
) => {
  intervention.interventionType = data?.interventionType
  intervention.interventionStatus = data?.interventionStatus
  intervention.attainment = data?.attainment
  intervention.antaraId = data?.antaraId
  // eslint-disable-next-line no-underscore-dangle
  intervention._raw.id = data.id
  intervention.startingMeasurement = data?.startingMeasurement
  intervention.currentMeasurement = data?.currentMeasurement
  intervention.startingLevel = data?.startingLevel
  intervention.currentLevel = data?.currentLevel
  intervention.startingMilestone = data?.startingMilestone
  intervention.currentMilestone = data?.currentMilestone
  intervention.result = data?.result
  intervention.persona = data?.persona
}
