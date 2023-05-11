import dayjs from 'dayjs'

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
    // eslint-disable-next-line no-param-reassign
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
