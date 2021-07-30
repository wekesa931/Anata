import React from 'react'
import MessageChat from '../sms/message-chat/message-chat.component'

type CallProps = {
  memberSpecific?: boolean
}

const Comms = ({ memberSpecific }: CallProps) => {
  return (
    <>
      <div style={{ height: '100%', overflowY: 'scroll' }}>
        <MessageChat memberSpecific={memberSpecific} />
      </div>
    </>
  )
}

export default Comms
