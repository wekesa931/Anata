import React from 'react'
import MessageChat from '../sms/message-chat/message-chat.component'

type CallProps = {
  memberSpecific?: boolean
  fcmState: {
    notification: {
      title: string
      body: string
    }
  }
}

const Comms = ({ memberSpecific, fcmState }: CallProps) => {
  return (
    <>
      <div style={{ height: '100%', overflowY: 'scroll' }}>
        <MessageChat memberSpecific={memberSpecific} fcmState={fcmState} />
      </div>
    </>
  )
}

export default Comms
