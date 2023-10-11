import dayjs from 'dayjs'
import React from 'react'
import { CustomDot } from 'src/modules/vitals/components/custom-dot'
import { TimeFilters } from '../types'

type Props = {
  filter: TimeFilters
}

export function withCustomBmiDot({ filter }: Props) {
  return function CustomizedBmiDot(props: any) {
    return (
      <CustomDot filter={filter} isBmi {...props} avgValueKey="mean">
        {(m) => {
          return (
            <div className="grid grid-cols-2 gap-3 w-full">
              <p className="text-sm text-dark-blue-100">
                {parseFloat(m?.value || 0)}
              </p>
              <p className="text-xs mt-2">
                {dayjs(m.timestamp).format('hh:mm A')}
              </p>
            </div>
          )
        }}
      </CustomDot>
    )
  }
}

export default withCustomBmiDot
