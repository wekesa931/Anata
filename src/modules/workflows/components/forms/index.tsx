import AirtableBasedForm from 'src/modules/workflows/components/forms/airtable-base-form'
import type { FormProps } from 'src/modules/workflows/types'
import BpMon from 'src/modules/vitals/views/forms/blood_pressure'
import ChlMon from 'src/modules/vitals/views/forms/chl'
import DMMon from 'src/modules/vitals/views/forms/blood_sugar'
import Vitals from 'src/modules/vitals/views/forms/vitals'
import {
  CreateCondition,
  HealthMetricsForm,
} from 'src/modules/conditions/views/forms'

enum FormNames {
  BP_MON = 'BP Mon',
  CHL_MON = 'CHL Mon',
  DM_MON = 'DM Mon',
  VITALS = 'Vitals',
  CONDITIONS = 'Conditions',
  HEALTH_METRICS = 'Health Metrics',
}

export const getFormImplementation = (
  formName: string,
  shouldUseOldLabsAndVitals = false
): React.FC<FormProps> => {
  if (shouldUseOldLabsAndVitals) {
    return AirtableBasedForm
  }

  switch (formName) {
    case FormNames.BP_MON:
      return BpMon
    case FormNames.CHL_MON:
      return ChlMon
    case FormNames.DM_MON:
      return DMMon
    case FormNames.VITALS:
      return Vitals
    case FormNames.CONDITIONS:
      return CreateCondition
    case FormNames.HEALTH_METRICS:
      return HealthMetricsForm
    default:
      return AirtableBasedForm
  }
}
