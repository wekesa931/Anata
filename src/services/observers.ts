import { Subject } from 'rxjs'
import { formNames } from 'src/modules/workflows/utils'

export const ConditionsObserver = new Subject<void>()
export const InterventionsObserver = new Subject<void>()
export const HMPObserver = new Subject<void>()

/**
 * Create a list of all forms that can be filled from forms/workflows and that should trigger refresh
 */
const FormModules = (() =>
  ({
    ...Object.keys(formNames)
      .filter((k) => isNaN(Number(k)))
      .reduce((acc: any, key) => {
        acc[key] = key
        return acc
      }, {}),
  } as {
    [k in keyof typeof formNames]: k
  }))()

export const triggerRefresh = (module: keyof typeof FormModules) => {
  switch (module) {
    case FormModules.Conditions:
    case FormModules['Conditions Data tracking']:
      ConditionsObserver.next()
      break
    case FormModules.Interventions:
    case FormModules['Intervention Data Tracking']:
      InterventionsObserver.next()
      break
    case FormModules.HMP:
      HMPObserver.next()
      break
    default:
      break
  }
}
