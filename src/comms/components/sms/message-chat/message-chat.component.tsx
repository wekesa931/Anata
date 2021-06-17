/*eslint-disable */
import React, { useRef, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import MessageInput from './message-input.component'
import Icon from '../../icons/icon.component'
import { SenderDiv, RecipientDiv, GreyText } from './message-chat.styles'
import TopBar from '../../topbar/topbar.component'
import { fetchSMSByPhoneNumber } from '../../../resources/sms.resource'
import { useMember } from '../../../../context/member.context'

export type Message = {
  message: string
  sender_phone: string
  sent_received: string
  msg_type: string
}

const MessageChat = ({
  memberSpecific,
  fcmState,
}: {
  memberSpecific?: boolean
  fcmState?: {
    notification: {
      title: string
      body: string
    }
  }
}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef(null)

  const { member } = useMember()
  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    if (member) {
      fetchSMSByPhoneNumber(encodeURIComponent(member['Phone 1'])).then(
        ({ details }) => {
          setMessages(details)
        }
      )
    }
  }, [member, fcmState])

  useEffect(() => {
    if (messages.length) {
      scrollToBottom()
    }
  }, [messages])

  const getDate = (date: string | Date) => {
    return dayjs(date).format('DD MMM YYYY')
  }

  const getTime = (date: string | Date) => {
    return dayjs(date).format('hh:mm A')
  }

  const fromMember = (phone_number: string) => {
    return member && member['Phone 1'] === phone_number
  }

  const messageType = (msg_type: string) => {
    return msg_type === 'CHAT'
  }

  return member ? (
    <div>
      <TopBar
        title={`SMS Text ${member['Full Name']}`}
        goBack={!memberSpecific ? '/sms' : null}
      />
      <div
        style={{
          height: '256px',
          overflowY: 'scroll',
          clear: 'both',
        }}
        data-testid="thread"
      >
        {messages.map((message: Message, index: number) => (
          <div
            style={{
              display: 'flex',
              margin: '8px',
              flexDirection: 'column',
              marginBottom: '1px',
            }}
            key={index}
          >
            {fromMember(message.sender_phone) ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon name="user" />
                <SenderDiv>{message.message}</SenderDiv>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <RecipientDiv>{message.message}</RecipientDiv>
                {messageType(message.msg_type) ? (
                  <Icon name="user" fill="#FF9800" />
                ) : (
                  <Icon name="lightning" fill="#FF9800" />
                )}
              </div>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: fromMember(message.sender_phone)
                  ? 'flex-start'
                  : 'flex-end',
                margin: '4px 32px',
              }}
            >
              <GreyText>{getDate(message.sent_received)}</GreyText>
              <GreyText>{getTime(message.sent_received)}</GreyText>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        <MessageInput messages={messages} setMessages={setMessages} />
      </div>
    </div>
  ) : null
}

export default MessageChat
/*eslint-disable */
