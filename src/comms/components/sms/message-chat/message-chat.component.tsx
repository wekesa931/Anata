/*eslint-disable */
import React, { useRef, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Check } from 'react-feather'
import MessageInput from './message-input.component'
import {
  TextMessage,
  SenderDiv,
  RecipientDiv,
  OrangeText,
  GreyText,
  DeliveredText,
  DeliveredTextRight,
} from './message-chat.styles'
import TopBar from '../../topbar/topbar.component'
import { useMember } from '../../../../context/member.context'
import { useQuery } from '@apollo/client'
import { GET_MEMBER_CHATS } from '../../../../gql/sms'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'

export type Message = {
  message: string
  direction: string
  status: string
  isInbound: boolean
}

const MessageChat = ({ memberSpecific }: { memberSpecific?: boolean }) => {
  const [allMemberMessages, setallMemberMessages] = useState<Message[]>([])
  const messagesEndRef = useRef(null)
  const { member } = useMember()
  const { data, loading } = useQuery(GET_MEMBER_CHATS, {
    variables: { antaraId: member['Antara ID'] },
  })

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const getMemberChats = () => {
      if (data) {
        const uncleanedData: { node: Message }[] = data.memberMessages.edges
        const refinedChats = uncleanedData.map((dat) => {
          const isInbound = dat.node.direction === 'Inbound'
          return {
            ...dat.node,
            isInbound: isInbound,
          }
        })
        setallMemberMessages(refinedChats)
      }
    }
    getMemberChats()
  }, [data])

  useEffect(() => {
    if (allMemberMessages.length) {
      scrollToBottom()
    }
  }, [allMemberMessages])

  const getTime = (date: string | Date) => {
    return dayjs(date).format('hh:mm A')
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
        {loading && <LoadingIcon />}
        {allMemberMessages.map((message: Message, index: number) => (
          <div
            style={{
              display: 'flex',
              margin: '8px',
              flexDirection: 'column',
              marginBottom: '1px',
            }}
            key={index}
          >
            {message.isInbound ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SenderDiv>
                  {message.message}
                  <GreyText>
                    <div className="chat-delivery">{getTime(new Date())}</div>
                    <>
                      <DeliveredText>
                        <Check width="16px" height="16px" />
                      </DeliveredText>
                      <DeliveredTextRight>
                        <Check width="16px" height="16px" />
                      </DeliveredTextRight>
                    </>
                  </GreyText>
                </SenderDiv>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <RecipientDiv>
                  <TextMessage>{message.message}</TextMessage>
                  <OrangeText>
                    <div className="chat-delivery">{getTime(new Date())}</div>
                    <>
                      <DeliveredText>
                        <Check width="16px" height="16px" />
                      </DeliveredText>
                      <DeliveredTextRight>
                        <Check width="16px" height="16px" />
                      </DeliveredTextRight>
                    </>
                  </OrangeText>
                </RecipientDiv>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
        <MessageInput
          messages={allMemberMessages}
          setMessages={setallMemberMessages}
        />
      </div>
    </div>
  ) : null
}

export default MessageChat
/*eslint-disable */
