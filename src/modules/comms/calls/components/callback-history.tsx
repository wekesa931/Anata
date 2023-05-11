import React, { useEffect, useState, Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { ArrowDownRight, ArrowUpRight, PhoneOff } from 'react-feather'

import Notification from 'src/components/notification'
import { formatDateLong } from 'src/utils/date-time/date-formatters'
import DropDownComponent from 'src/components/dropdown'
import { ILogs, useCall } from 'src/context/calls'
import { GET_CALL_LOG } from '../../services/gql'

function Container({ children }: any) {
  return <div className="history-container">{children}</div>
}

export function HistoryLogs() {
  const [taskLog, settaskLog] = useState<any | null>(null)
  const { activeCall } = useCall()
  const { data } = useQuery(GET_CALL_LOG)
  useEffect(() => {
    if (data) {
      const rawLogs = data.conferenceSessions.edges
      const logs: ILogs[] = rawLogs.map((log: { node: ILogs }) => log.node)
      const filteredLog = logs.find(
        (item) => item.callbackTaskId === activeCall?.callbackHistoryId
      )
      if (filteredLog) {
        const mappedLogs = {
          Task: 'Callback',
          Created: formatDateLong(filteredLog.createdAt),
          'Call Type': filteredLog.callDirection.toLocaleLowerCase(),
          'Call Result': 'No Answer',
          'Call Duration': filteredLog.inCallDuration,
        }
        settaskLog(mappedLogs)
      } else {
        const mappedLogs = {
          Task: 'Callback',
          Created: '01-01-2020',
          'Call Type': 'Inbound Call',
          'Call Result': 'No Answer',
          'Call Duration': '0',
        }
        settaskLog(mappedLogs)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  if (!taskLog) {
    return (
      <Notification title="Info" message="Currently no history to display" />
    )
  }
  const taskValue = (value: string) => {
    let taskLogValue = <>{value}</>
    if (value === 'outbound') {
      taskLogValue = (
        <>
          {value} <ArrowUpRight className="icon-style" />
        </>
      )
    } else if (value === 'inbound') {
      taskLogValue = (
        <>
          {value} <ArrowDownRight className="icon-style" />
        </>
      )
    } else if (value === 'No Answer') {
      taskLogValue = (
        <>
          {value} <PhoneOff className="icon-style phone-off" />
        </>
      )
    }
    return taskLogValue
  }
  const renderView = (): JSX.Element[] => {
    const elements: JSX.Element[] = []
    Object.keys(taskLog).forEach((key) => {
      elements.push(
        <Fragment key={key}>
          <Container>
            <p className="callback-history">{key}</p>
            <p className="callback-history history-value">
              {taskValue(taskLog[key])}
            </p>
          </Container>
        </Fragment>
      )
    })
    return elements
  }
  return (
    <div>
      {renderView().map((elem) => {
        return elem
      })}
    </div>
  )
}

function CallbackHistory({
  isVisible,
  setdisplayHistory,
}: {
  isVisible: boolean
  setdisplayHistory: (visible: boolean) => void
}) {
  return (
    <>
      {isVisible && (
        <DropDownComponent
          isVisible={isVisible}
          setvisibility={setdisplayHistory}
        >
          <div className="history-callout">
            <HistoryLogs />
          </div>
        </DropDownComponent>
      )}
    </>
  )
}

export default CallbackHistory
