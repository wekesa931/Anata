import React from 'react'
import { Divider, Button } from '@mui/material'
import {
  AcuteVsChronic,
  ConditionStatus,
  Filter,
} from 'src/modules/conditions(deprecated)/types'

type ConditionFilterProps = {
  filter: Filter
  setFilter: (filter: Filter) => void
}

function ConditionFilter({ filter, setFilter }: ConditionFilterProps) {
  const updateChronicFilter = (f: AcuteVsChronic) => {
    setFilter({
      ...filter,
      acuteVsChronic: f,
    })
  }

  const updateConditionStatusFilter = (f: ConditionStatus) => {
    setFilter({
      ...filter,
      conditionStatus: f,
    })
  }

  return (
    <div className="flex justify-start items-center gap-2 font-rubik uppercase text-dark-blue-50 text-md font-medium my-2">
      <div className="flex justify-between gap-1">
        <Button
          variant="text"
          className={`${
            filter.acuteVsChronic === AcuteVsChronic.ALL
              ? 'text-blue-100'
              : 'text-dark-blue-50'
          } font-semibold font-rubik`}
          onClick={() => updateChronicFilter(AcuteVsChronic.ALL)}
        >
          All
        </Button>
        <Button
          variant="text"
          className={`${
            filter.acuteVsChronic === AcuteVsChronic.CHRONIC
              ? 'text-blue-100'
              : 'text-dark-blue-50'
          } font-semibold font-rubik`}
          onClick={() => updateChronicFilter(AcuteVsChronic.CHRONIC)}
        >
          Chronic
        </Button>
        <Button
          variant="text"
          className={`${
            filter.acuteVsChronic === AcuteVsChronic.ACUTE
              ? 'text-blue-100'
              : 'text-dark-blue-50'
          } font-semibold font-rubik`}
          onClick={() => updateChronicFilter(AcuteVsChronic.ACUTE)}
        >
          Acute
        </Button>
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="flex justify-between gap-2">
        <Button
          variant="text"
          className={`${
            filter.conditionStatus === ConditionStatus.ALL
              ? 'text-blue-100'
              : 'text-dark-blue-50'
          } font-semibold font-rubik`}
          onClick={() => updateConditionStatusFilter(ConditionStatus.ALL)}
        >
          All
        </Button>

        <Button
          variant="text"
          className={`${
            filter.conditionStatus === ConditionStatus.ACTIVE
              ? 'text-blue-100'
              : 'text-dark-blue-50'
          } font-semibold font-rubik`}
          onClick={() => updateConditionStatusFilter(ConditionStatus.ACTIVE)}
        >
          Active
        </Button>

        <Button
          variant="text"
          className={`${
            filter.conditionStatus === ConditionStatus.INACTIVE
              ? 'text-blue-100'
              : 'text-dark-blue-50'
          } font-semibold font-rubik`}
          onClick={() => updateConditionStatusFilter(ConditionStatus.INACTIVE)}
        >
          Inactive
        </Button>
      </div>
    </div>
  )
}

export default ConditionFilter
