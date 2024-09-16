import React from 'react'
import { Filters } from 'src/modules/conditions/types'
import { FilterButton, AddConditionButton } from './buttons'

type FilterSectionProps = {
  activeFilter: Filters
  setActiveFilter: (filter: Filters) => void
  refetch?: () => void
}

export function FiltersSection({
  activeFilter,
  setActiveFilter,
  refetch,
}: FilterSectionProps) {
  return (
    <div className="flex justify-between items-center flex-wrap">
      <div className="flex justify-start items-center gap-2 mb-2">
        <FilterButton
          active={activeFilter === Filters.ALL}
          onClick={() => setActiveFilter(Filters.ALL)}
        >
          All
        </FilterButton>
        <FilterButton
          active={activeFilter === Filters.ACTIVE}
          onClick={() => setActiveFilter(Filters.ACTIVE)}
        >
          Active
        </FilterButton>
        <FilterButton
          active={activeFilter === Filters.ACUTE}
          onClick={() => setActiveFilter(Filters.ACUTE)}
        >
          Acute
        </FilterButton>
        <FilterButton
          active={activeFilter === Filters.CHRONIC}
          onClick={() => setActiveFilter(Filters.CHRONIC)}
        >
          Chronic
        </FilterButton>
      </div>
      <AddConditionButton refetch={refetch} />
    </div>
  )
}
