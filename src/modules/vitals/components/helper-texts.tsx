import React, { useEffect } from 'react'
import { useTablesData } from 'src/modules/vitals/hooks/tables.data.hook'
import Loading from 'src/components/loaders/centered'
import { Divider, Paper } from '@mui/material'
import { useMember } from 'src/context/member'
import { groupBy } from 'lodash'

function Range({ range }: { range: any }) {
  const unit = range?.healthMetric?.measurementUnit?.name || ''
  const rangeValue = `${range?.minimumValue} - ${range?.maximumValue} ${unit}`
  return (
    <div className="grid grid-cols-2 gap-2">
      <p className="text-right">{rangeValue}:</p>
      <p className="text-left max-w-[10rem]">{range?.name}</p>
    </div>
  )
}

export function ValueHelperText({
  value,
  metric,
}: {
  value: any
  metric: string
}) {
  let referenceRange = null
  if (metric === 'bp') {
    // get the systolic and diastolic
    const systolic = value?.systolic?.reference_range
    const diastolic = value?.diastolic?.reference_range

    referenceRange =
      systolic && diastolic
        ? {
            minimumValue: `${systolic?.minimum_value}/${diastolic?.minimum_value}`,
            maximumValue: `${systolic?.maximum_value}/${diastolic?.maximum_value}`,
            textColor: systolic?.text_color || diastolic?.text_color,
            name: systolic?.name || diastolic?.name,
          }
        : null
  } else {
    const currentValue = value?.[metric]
    referenceRange = currentValue?.reference_range
      ? {
          minimumValue: currentValue?.reference_range?.minimum_value,
          maximumValue: currentValue?.reference_range?.maximum_value,
          textColor: currentValue?.reference_range?.text_color,
          name: currentValue?.reference_range?.name,
        }
      : null
  }

  return referenceRange ? (
    <Paper elevation={1} className="font-rubik p-3">
      <Range range={referenceRange} />
    </Paper>
  ) : null
}

export function TableHeadHelpertext({ metric }: { metric: string }) {
  const { loadingRanges, getRanges } = useTablesData()
  const [referenceRanges, setReferenceRanges] = React.useState<any[]>([])
  const { member } = useMember()

  const setReferenceRange = async (currentMember: any, metricName: string) => {
    const ranges: any = await getRanges(currentMember)
    if (metricName === 'bp') {
      // parse both systolic and diastolic ranges
      const systolic = ranges?.systolic || []
      const diastolic = ranges?.diastolic || []

      // group by the name of the range
      const groups = groupBy([...systolic, ...diastolic], 'name')
      const bpRanges = Object.keys(groups).map((key) => {
        const currRanges = groups[key]
        // find the systolic and diastolic ranges
        const systolicRange = currRanges.find(
          (range) => range?.healthMetric?.name === 'Systolic'
        )
        const diastolicRange = currRanges.find(
          (range) => range?.healthMetric?.name === 'Diastolic'
        )

        return {
          name: key,
          healthMetric:
            systolicRange?.healthMetric || diastolicRange?.healthMetric,
          minimumValue: `${systolicRange?.minimumValue}/${diastolicRange?.minimumValue}`,
          maximumValue: `${systolicRange?.maximumValue}/${diastolicRange?.maximumValue}`,
          textColor: systolicRange?.textColor || diastolicRange?.textColor,
        }
      })

      setReferenceRanges(bpRanges)
    } else {
      setReferenceRanges(ranges?.[metricName] || [])
    }
  }

  useEffect(() => {
    if (member) {
      setReferenceRange(member, metric)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member, metric])

  return (
    <Paper elevation={1} className="font-rubik p-3">
      <p className="text-blue-100 text-sm font-medium text-center">
        Range guidelines
      </p>
      <Divider />
      {loadingRanges ? (
        <Loading message="Loading ranges" />
      ) : (
        <div className="p-2 flex flex-col gap-2 items-start">
          {referenceRanges.length ? (
            referenceRanges?.map((range: any) => (
              <Range key={range?.id} range={range} />
            ))
          ) : (
            <p>Range information unavailable for {metric}</p>
          )}
        </div>
      )}
    </Paper>
  )
}
