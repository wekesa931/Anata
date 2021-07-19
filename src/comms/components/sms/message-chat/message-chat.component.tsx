/*eslint-disable */
import React, { useRef, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Check } from "react-feather";
import MessageInput from './message-input.component'
import { SenderDiv, RecipientDiv, OrangeText, GreyText, DeliveredText, DeliveredTextRight } from './message-chat.styles'
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

  const getTime = (date: string | Date) => {
    return dayjs(date).format('hh:mm A')
  }

  const fromMember = (phone_number: string) => {
    return member && member['Phone 1'] === phone_number
  }

  return member ? (
    <div>
      <TopBar
        title={`SMS Text ${member['Full Name']}`}
        goBack={!memberSpecific ? '/sms' : null}
      />
      <div
        style={{
          overflowY: 'scroll',
          clear: 'both',
          paddingBottom:'250px'
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
                <SenderDiv>{message.message}
                   <GreyText>
                <div className="transform-icon">{getTime(message.sent_received)}</div>
               {message?.sent_received &&
               <>
                  <DeliveredText>
                        <Check width='16px' height='16px' />
                  </DeliveredText>
                  <DeliveredTextRight>
                      <Check width='16px' height='16px' />
                  </DeliveredTextRight>
               </>
            
               }
                </GreyText>
                   
                </SenderDiv>             
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <RecipientDiv>{message.message}
                <OrangeText>
                <div className="transform-icon">{getTime(message.sent_received)}</div>
               {message?.delivery_time &&
               <>
                  <DeliveredText>
                        <Check width='16px' height='16px' />
                  </DeliveredText>
                  <DeliveredTextRight>
                      <Check width='16px' height='16px' />
                  </DeliveredTextRight>
               </>
               }
                </OrangeText>
                </RecipientDiv>
              </div>
            )}
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
