import dayjs from 'dayjs'
import React from 'react'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { CustomDot } from 'src/modules/vitals/components/custom-dot'
import { TimeFilters } from '../types'

dayjs.extend(advancedFormat)

type Props = {
  filter: TimeFilters
}

export function withCustomBpDot({ filter }: Props) {
  return function CustomizedBPDot(props: any) {
    return (
      <CustomDot
        filter={filter}
        isPayloadKeyed
        {...props}
        avgValueKey="readableValue"
      >
        {(m) => {
          const v = `${m.systolic?.value || '-'}/${m.diastolic?.value || '-'}`

          return (
            <div className="grid grid-cols-2 gap-3 w-full">
              <p className="text-sm text-dark-blue-100">{v}</p>
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

export default withCustomBpDot
