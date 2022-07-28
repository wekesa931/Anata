import React from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
/* eslint-disable */
const duration = require('dayjs/plugin/duration')
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'
import { PhoneMissed, PhoneIncoming, PhoneOutgoing } from 'react-feather'

dayjs.extend(duration)
dayjs.extend(isBetween)

export const formatDuration = (dur: number) => {
  const cleanedDur = Number(dur).toFixed()
  const d = dayjs.duration(cleanedDur, 's')
  const min = d.minutes()
  const sec = cleanedDur - 60 * min
  return `${min}: ${sec}`
}

/**
 * Generate weekly and monthly stats for a given list of records
 * @param records a list of call logs
 * @param periods a list of days to generate stats for each
 * @param title the title to give to stats (Inbound, Outbound)
 *
 * Usage
 * To generate stats for the last 7 and 30 days:
 *      `generateStats(records, [7, 30], "Inbound")     -> {'7': 12, '30': 15}
 */
export const generateStats = (
  records: Array<any>,
  periods: Array<number>,
  title: string
) => {
  const stats: Array<any> = []
  // for each of the given days, generate stats between today and today - period
  periods.forEach((day) => {
    const endDate = dayjs().subtract(day, 'days')
    const totalRecords = records.filter(({ createdAt }) =>
      dayjs(createdAt).isBetween(dayjs().add(1, 'day'), endDate, 'days')
    ).length

    stats.push({ label: `${day} days`, value: totalRecords })
  })

  return {
    [title]: stats,
  }
}

export const groupingDataCalls = (logs: Array<any>) => {
  const groupingDataDates = logs.reduce((r: any, s: any) => {
    const createdAt =
      s?.createdAt !== undefined
        ? dayjs(s?.createdAt).format('MM/YY')
        : dayjs(s?.createdAt).format('MM/YY')
    r[createdAt] = r[createdAt] ?? []
    r[createdAt].push(s)
    return r
  }, {})
  const cleanedData = Object.keys(groupingDataDates)
    .map((status) => {
      return {
        dataDate: status,
        data: groupingDataDates[status],
      }
    })
    .sort((a, b) => {
      const dateA = a.dataDate.split('/')
      const dateB = b.dataDate.split('/')
      return new Date(dateB[1], dateB[0], 1) - new Date(dateA[1], dateA[0], 1)
    })

  return cleanedData
}

export const loadingIcon = (text: string) => {
  return (
    <div className="d-flex flex-direction-column flex-align-center margin-top-32">
      <LoadingIcon />
      <p className="text-small"> {text} </p>
    </div>
  )
}

export const callIcons = (item: any) => {
  const { callDirection, memberAnswered, agentAnswered } = item

  if (callDirection === 'OUTBOUND' && memberAnswered) {
    return <PhoneOutgoing width={15} height={15} color="var(--green-50)" />
  } else if (callDirection === 'INBOUND' && agentAnswered) {
    return <PhoneIncoming width={15} height={15} color="var(--blue-50)" />
  } else if (callDirection === 'INBOUND' && !agentAnswered) {
    return <PhoneMissed width={15} height={15} color="var(--red-50)" />
  } else if (callDirection === 'OUTBOUND' && !memberAnswered) {
    return <PhoneMissed width={15} height={15} color="var(--red-50)" />
  } else {
    return null
  }
}
