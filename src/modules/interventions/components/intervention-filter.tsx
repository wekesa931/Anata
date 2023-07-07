import React from 'react'
import { Divider, Button } from '@mui/material'
import {
  InterventionStatus,
  Attainment,
  Filter,
} from 'src/modules/interventions/types'

type InterventionFilterProps = {
  filter: Filter
  setFilter: (filter: Filter) => void
}

function InterventionFilter({ filter, setFilter }: InterventionFilterProps) {
  const updateAttainmentFilter = (f: Attainment) => {
    setFilter({
      ...filter,
      attainment: f,
    })
  }

  const updateInterventionStatusFilter = (f: InterventionStatus) => {
    setFilter({
      ...filter,
      interventionStatus: f,
    })
  }

  return (
    <div className="flex justify-start items-center gap-2 font-rubik uppercase text-dark-blue-50 text-md font-medium my-2">
      <div className="flex justify-between gap-1">
        <Button
          variant="text"
          className={`${
            filter.interventionStatus === InterventionStatus.ALL
              ? 'text-blue-100'
              : 'text-dark-blue-50'
          } font-semibold font-rubik`}
          onClick={() => updateInterventionStatusFilter(InterventionStatus.ALL)}
        >
          All
        </Button>
        <Button
          variant="text"
          className={`${
            filter.interventionStatus === InterventionStatus.ACTIVE
              ? 'text-blue-100'
              : 'text-dark-blue-50'
          } font-semibold font-rubik`}
          onClick={() =>
            updateInterventionStatusFilter(InterventionStatus.ACTIVE)
          }
        >
          Active
        </Button>
        <Button
          variant="text"
          className={`${
            filter.interventionStatus === InterventionStatus.INACTIVE
              ? 'text-blue-100'
              : 'text-dark-blue-50'
          } font-semibold font-rubik`}
          onClick={() =>
            updateInterventionStatusFilter(InterventionStatus.INACTIVE)
          }
        >
          Inactive
        </Button>
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="flex justify-between gap-2">
        <Button
          variant="text"
          className={`${
            filter.attainment === Attainment.ALL
              ? 'text-blue-100'
              : 'text-dark-blue-50'
          } font-semibold font-rubik`}
          onClick={() => updateAttainmentFilter(Attainment.ALL)}
        >
          All
        </Button>

        <Button
          variant="text"
          className={`${
            filter.attainment === Attainment.ONTRACK
              ? 'text-blue-100'
              : 'text-dark-blue-50'
          } font-semibold font-rubik`}
          onClick={() => updateAttainmentFilter(Attainment.ONTRACK)}
        >
          ON Track
        </Button>

        <Button
          variant="text"
          className={`${
            filter.attainment === Attainment.OFFTRACK
              ? 'text-blue-100'
              : 'text-dark-blue-50'
          } font-semibold font-rubik`}
          onClick={() => updateAttainmentFilter(Attainment.OFFTRACK)}
        >
          OFF Track
        </Button>
      </div>
    </div>
  )
}

export default InterventionFilter
