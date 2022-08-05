import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Box, Button } from '@mui/material'
import { useMember } from '../../../../../context/member.context'
import { GET_CALL_LOGS } from '../../../../../gql/comms'
import DataTable from './data-table.component'
import CallStatsCard from './call-stats-card.component'
import { generateStats, groupingDataCalls, loadingIcon } from './utils'
import Icon from '../../../../utils/icon/icon.component'

type CleanedDataItem = {
  dataDate: string
  data: Array<any>
}

type CallData = {
  logs: Array<CleanedDataItem>
  stats: any
}

const periods = [7, 30]

const CallLog = () => {
  const { member } = useMember()

  const defaultDataItem = { logs: [], stats: {} }

  const [outBoundData, setOutBoundData] =
    React.useState<CallData>(defaultDataItem)
  const [inBoundData, setInBoundData] =
    React.useState<CallData>(defaultDataItem)
  const [inBoundMissedData, setInBoundMissedData] =
    React.useState<CallData>(defaultDataItem)
  const [outBoundMissedData, setOutBoundMissedData] =
    React.useState<CallData>(defaultDataItem)

  const [currentLogs, setCurrentLogs] = React.useState<Array<CleanedDataItem>>(
    []
  )
  const [allDataCalls, setAllData] = React.useState<Array<CleanedDataItem>>([])

  const [title, setTitle] = React.useState<string>('Call Logs')

  React.useEffect(() => {
    if (allDataCalls.length) {
      setCurrentLogs(allDataCalls)
    }
  }, [allDataCalls])

  const { data, loading } = useQuery(GET_CALL_LOGS, {
    variables: { antaraId: member['Antara ID'] },
  })

  const isDataLoading = () =>
    [outBoundData, inBoundData, inBoundMissedData, outBoundMissedData].filter(
      (d) => d === defaultDataItem
    ).length > 0 || loading

  const outBoundCalls = (outData: any) =>
    outData.callDirection === 'OUTBOUND' && outData.memberAnswered

  const missedCallsOut = (missedData: any) =>
    missedData.callDirection === 'OUTBOUND' && !missedData.memberAnswered

  const missedCallsInB = (missInData: any) =>
    missInData.callDirection === 'INBOUND' && !missInData.agentAnswered

  const inBoundDataCalls = (inData: any) =>
    inData.callDirection === 'INBOUND' && inData.agentAnswered

  const parseCallLogs = (logs: Array<any> = []) => {
    const outboundCalls = logs.filter((call: any) => outBoundCalls(call))
    const outboundStats = generateStats(outboundCalls, periods, 'OUTBOUND')
    const inboundCalls = logs.filter((call: any) => inBoundDataCalls(call))
    const inboundStats = generateStats(inboundCalls, periods, 'INBOUND')

    const missedInb = logs.filter((log: any) => missedCallsInB(log))
    const missedInboundStats = generateStats(missedInb, periods, 'MISSED')

    const missedOut = logs.filter((log: any) => missedCallsOut(log))
    const missedOutboundStats = generateStats(
      missedOut,
      periods,
      'MISSED OUTBOUND'
    )

    setOutBoundData({
      logs: groupingDataCalls(outboundCalls),
      stats: outboundStats,
    })
    setInBoundData({
      logs: groupingDataCalls(inboundCalls),
      stats: inboundStats,
    })
    setInBoundMissedData({
      logs: groupingDataCalls(missedInb),
      stats: missedInboundStats,
    })

    setOutBoundMissedData({
      logs: groupingDataCalls(missedOut),
      stats: missedOutboundStats,
    })

    setAllData(groupingDataCalls(logs))
  }

  useEffect(() => {
    let logs = []
    if (data?.conferenceSessions?.edges.length > 0) {
      const rawData = data?.conferenceSessions?.edges
      logs = rawData.map((log: { node: any }) => log.node)
    }
    parseCallLogs(logs)
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  const updateCurrentLogs = (passedData: any, passedTitle: string) => {
    setCurrentLogs(passedData.logs)
    setTitle(passedTitle)
  }

  const callCards = [
    {
      color: '#98eba5',
      cardTitle: 'Outbound',
      subTitle: 'call to member',
      stats: outBoundData.stats,
      type: 'OUTBOUND',
      callback: () => updateCurrentLogs(outBoundData, 'Outbound call to member'),
      icon: <Icon name="icon_feather_phone-outgoing" fill="#ffffff" />,
    },
    {
      color: '#87c1f7',
      cardTitle: 'Inbound',
      subTitle: 'call to Antara',
      stats: inBoundData.stats,
      type: 'INBOUND',
      callback: () => updateCurrentLogs(inBoundData, 'Inbound call to Antara'),
      icon: <Icon name="icon_feather_phone-incoming" fill="#ffffff" />,
    },
    {
      color: '#ff9d97',
      cardTitle: 'Missed',
      subTitle: 'from member',
      stats: inBoundMissedData.stats,
      type: 'MISSED',
      callback: () =>
        updateCurrentLogs(inBoundMissedData, 'Missed from member'),
      icon: <Icon name="icon_feather_phone-missed" fill="#ffffff" />,
    },
    {
      color: '#ff9d97',
      cardTitle: 'Missed',
      subTitle: 'outbound',
      stats: outBoundMissedData.stats,
      type: 'MISSED OUTBOUND',
      callback: () =>
        updateCurrentLogs(outBoundMissedData, 'Missed  OutBound Calls'),
      icon: <Icon name="icon_feather_phone-missed" fill="#ffffff" />,
    },
  ]

  const cardStats = (
    color: string,
    cardTitle: string,
    subTitle: string,
    stats: any,
    type: string,
    callback: () => void,
    icon: any
  ) => {
    return (
      <CallStatsCard
        stats={stats[type]}
        icon={icon}
        title={`${cardTitle}`}
        subTitle={`${subTitle}`}
        color={`${color}`}
        callback={callback}
        size={140}
      />
    )
  }

  return (
    <>
      {isDataLoading() ? (
        loadingIcon('Loading Call Logs')
      ) : (
        <Box display="flex" flexWrap="wrap" m={-1} p={-1}>
          {callCards.map(({ color, cardTitle, subTitle, stats, type, callback, icon }) =>
            cardStats(color, cardTitle, subTitle, stats,  type, callback, icon)
          )}
        </Box>
      )}

      <h4 style={{ marginTop: 30 }}>
        {title}{' '}
        {title !== 'Call Logs' && (
          <Button
            size="small"
            onClick={() =>
              updateCurrentLogs({ logs: allDataCalls }, 'Call Logs')
            }
          >
            Show full log
          </Button>
        )}
      </h4>
      <DataTable data={currentLogs} loading={loading} />
    </>
  )
}

export default CallLog
