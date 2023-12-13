import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Box, Button } from '@mui/material'
import { GET_CALL_LOGS } from 'src/modules/comms/services/gql'
import DataTable from 'src/modules/comms/calls/components/call-logs/table'
import CallStatsCard from 'src/modules/comms/calls/components/call-logs/stats-card'
import LoadingComponent from 'src/components/loaders/table-loader'
import { useParams } from 'react-router-dom'
import PhoneOutgoing from 'src/assets/img/icons/icon_feather_phone-outgoing.svg'
import PhoneIncoming from 'src/assets/img/icons/icon_feather_phone-incoming.svg'
import PhoneMissed from 'src/assets/img/icons/icon_feather_phone-missed.svg'
import { generateStats, groupingDataCalls } from '../../utils'

type CleanedDataItem = {
  dataDate: string
  data: Array<any>
}

type CallData = {
  logs: Array<CleanedDataItem>
  stats: any
}

const periods = [7, 30]

function CallLog() {
  const { antaraId } = useParams()

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
  }

  const [getCallLogs, { loading }] = useLazyQuery(GET_CALL_LOGS, {
    onCompleted: (data) => {
      let logs = []
      if (data?.conferenceSessions?.edges.length > 0) {
        const rawData = data?.conferenceSessions?.edges
        logs = rawData.map((log: { node: any }) => log.node)
      }
      const groupedData = groupingDataCalls(logs)
      setAllData(groupedData)
      setCurrentLogs(groupedData)

      parseCallLogs(logs)
    },
  })

  useEffect(() => {
    if (antaraId) {
      getCallLogs({
        variables: { antaraId },
      })
    }
  }, [antaraId]) // eslint-disable-line react-hooks/exhaustive-deps

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
      callback: () =>
        updateCurrentLogs(outBoundData, 'Outbound call to member'),
      icon: (
        <PhoneOutgoing
          className="text-white"
          name="icon_feather_phone-outgoing"
          fill="#ffffff"
        />
      ),
    },
    {
      color: '#87c1f7',
      cardTitle: 'Inbound',
      subTitle: 'call to Antara',
      stats: inBoundData.stats,
      type: 'INBOUND',
      callback: () => updateCurrentLogs(inBoundData, 'Inbound call to Antara'),
      icon: <PhoneIncoming className="text-white" />,
    },
    {
      color: '#ff9d97',
      cardTitle: 'Missed',
      subTitle: 'from member',
      stats: inBoundMissedData.stats,
      type: 'MISSED',
      callback: () =>
        updateCurrentLogs(inBoundMissedData, 'Missed from member'),
      icon: <PhoneMissed className="text-white" />,
    },
    {
      color: '#ff9d97',
      cardTitle: 'Missed',
      subTitle: 'outbound',
      stats: outBoundMissedData.stats,
      type: 'MISSED OUTBOUND',
      callback: () =>
        updateCurrentLogs(outBoundMissedData, 'Missed  OutBound Calls'),
      icon: <PhoneMissed className="text-white" />,
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
        <LoadingComponent message="Loading call logs..." />
      ) : (
        <>
          <Box display="flex" flexWrap="wrap" m={-1} p={-1}>
            {callCards.map(
              ({ color, cardTitle, subTitle, stats, type, callback, icon }) =>
                cardStats(
                  color,
                  cardTitle,
                  subTitle,
                  stats,
                  type,
                  callback,
                  icon
                )
            )}
          </Box>
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
          <DataTable data={currentLogs} />
        </>
      )}
    </>
  )
}

export default CallLog
