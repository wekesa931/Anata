import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  ReferenceArea,
} from 'recharts'

type ReferenceAreaProps = {
  minimum: number
  maximum: number
  color: string
  [key: string]: any
}

type Props<T> = {
  data: T[]
  xAxisDataKey: {
    key: keyof T
    formatter: (key: string) => string
  }
  yAxisDataKeys: {
    key: keyof T | string
    name: string
    color: string
    dataIndex?: string
  }[]
  height?: number
  width?: number
  CustomDot: React.FC<any>
  xAxisDomain: [number, number] // [start, end] as unix timestamp
  referenceRanges?: ReferenceAreaProps[]
  isPadded?: boolean
  yAxisDomain?: [number, number]
  xTicks: number
}

const tickStyles = {
  fontSize: 10,
  color: '#8b95a5',
  fontFamily: 'Rubik',
  fontWeight: 500,
}

export default function LineSeriesChat<T>({
  data,
  xAxisDataKey,
  yAxisDataKeys,
  height = 300,
  width = 500,
  CustomDot,
  xAxisDomain,
  referenceRanges = [],
  isPadded = true,
  yAxisDomain,
  xTicks,
}: Props<T>) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={width}
          height={height}
          data={data}
          margin={{
            top: 20,
            left: 0,
            bottom: 0,
            right: 20,
          }}
        >
          <CartesianGrid vertical={false} strokeOpacity={0.2} />
          <XAxis
            dataKey={xAxisDataKey.key as string}
            tickFormatter={xAxisDataKey.formatter}
            tick={{ ...tickStyles, fontSize: 8 }}
            axisLine={false}
            tickLine={false}
            padding={isPadded ? { left: 30, right: 20 } : undefined}
            domain={xAxisDomain}
            type="number"
            tickCount={xTicks}
            interval={0}
            angle={-30}
          />
          <YAxis
            tick={tickStyles}
            axisLine={false}
            type="number"
            domain={yAxisDomain}
          />
          <Legend iconType="plainline" />
          {referenceRanges.map(({ minimum, maximum, color }, index) => (
            <ReferenceArea
              key={index}
              y1={minimum}
              y2={maximum}
              fill={color}
              fillOpacity={1}
            />
          ))}
          {yAxisDataKeys.map(({ key, name, color }, index) => (
            <Line
              type="linear"
              dataKey={key as string}
              stroke={color || '#ff3b30'}
              name={name}
              strokeDasharray={index === 0 ? undefined : '5 3'}
              dot={<CustomDot />}
              isAnimationActive={false}
              key={index}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
