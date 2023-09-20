import { Divider, Paper, Popper } from '@mui/material'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { groupBy } from 'lodash'
import { DotProps } from 'recharts'
import { TimeFilters } from '../types'

dayjs.extend(advancedFormat)

type Props = DotProps & {
  children: (m: any) => React.ReactNode // accepts a single measurement to render
  filter: TimeFilters
  isPayloadKeyed?: boolean // check if we need to access currentValue as payload[name]
  isBmi?: boolean // help determine the circle and font sizes
  avgValueKey: string // the key to access the value from the payload
  avgValueFormatter?: (v: any) => string // format the value
  [key: string]: any
}

export function CustomDot(props: Props) {
  const {
    cx,
    cy,
    stroke,
    filter,
    isPayloadKeyed = false,
    isBmi = false,
    avgValueKey,
    avgValueFormatter = (v) => (isNaN(Number(v)) ? v : parseInt(v)),
  } = props
  const payload: any = props?.payload || {}
  const name: string = props?.name || ''
  const currentValue = isPayloadKeyed ? payload[name] : payload
  const [anchorEl, setAnchorEl] = useState(null)
  const [measurements, setMeasurements] = useState<any>({})

  // early exit if the payload is empty
  if (!currentValue) return null

  const color = currentValue?.referenceRange?.backgroundColor || stroke
  const value = currentValue?.measurements?.length || 0
  const textColor = currentValue?.referenceRange?.textColor || 'white'

  const handleMouseEnter = (event: any) => {
    setAnchorEl(event.currentTarget)
    setMeasurements(groupMeasurements(currentValue?.measurements))
  }

  const handleMouseLeave = () => {
    setAnchorEl(null)
    setMeasurements({})
  }

  // group the measurements by time and sort them from earliers
  const groupMeasurements = (m: any[]) => {
    m.sort((a, b) => {
      return dayjs(a.timestamp).valueOf() - dayjs(b.timestamp).valueOf()
    })
    const grouped = groupBy(m, 'day')

    return grouped
  }

  const isOneMonth = filter === TimeFilters.ONE_MONTH
  const getDisplaySize = (): { r: number; fontSize: number } => {
    switch (filter) {
      case TimeFilters.THREE_MONTHS:
        return { r: 12, fontSize: 10 }
      case TimeFilters.TWELVE_MONTHS:
        return { r: isBmi ? 12 : 10, fontSize: isBmi ? 10 : 8 }
      default:
        return { r: 4, fontSize: 2 }
    }
  }

  return (
    <g onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <circle
        cx={cx}
        cy={cy}
        r={getDisplaySize().r}
        fill={color}
        stroke={isOneMonth ? stroke : ''}
      />
      {!isOneMonth && (
        <text
          x={cx}
          y={cy}
          fill={textColor}
          textAnchor="middle"
          dy=".3em"
          style={{ fontSize: getDisplaySize().fontSize }}
        >
          {value}
        </text>
      )}

      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
        <Paper className="p-2 font-rubik text-left text-dark-blue-50 min-w-[250px]">
          <p className="text-sm uppercase ">
            {isOneMonth ? 'Daily readings' : 'Monitoring Period'}
          </p>
          <p className="text-xs font-medium mt-1">
            {isOneMonth ? (
              <span>{dayjs(currentValue?.endDate).format('Do MMM YYYY')}</span>
            ) : (
              <>
                <span>
                  {dayjs(currentValue?.startDate).format('D MMM YYYY')}
                </span>{' '}
                -{' '}
                <span>
                  {dayjs(currentValue?.endDate).format('DD MMM YYYY')}
                </span>
              </>
            )}
          </p>
          <p className="text-xl  mb-1">
            {avgValueKey in currentValue
              ? avgValueFormatter(currentValue[avgValueKey])
              : '-'}
          </p>
          <p className="text-sm uppercase ">Avg</p>
          <Divider />
          <p className="text-base my-2 text-dark-blue-100">Breakdown</p>
          <div className="overflow-scroll max-h-[150px] w-full">
            {Object.keys(measurements).map((key) => {
              const date = dayjs(key).format('DD MMM YYYY')
              return (
                <div className="w-full">
                  <p className="text-sm mb-1">{date}</p>
                  {measurements[key].map((m: any) => {
                    return <>{props.children(m)}</>
                  })}
                  <Divider className="my-2" />
                </div>
              )
            })}
          </div>
        </Paper>
      </Popper>
    </g>
  )
}

export default CustomDot
