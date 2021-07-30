import React, { useRef, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import parse from 'html-react-parser'
import { Check } from 'react-feather'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import MessageInput from './message-input.component'
import {
  SenderDiv,
  RecipientDiv,
  OrangeText,
  GreyText,
  DeliveredText,
  DeliveredTextRight,
} from './message-chat.styles'
import TopBar from '../../topbar/topbar.component'
import { useMember } from '../../../../context/member.context'
import { GET_MEMBER_CHATS } from '../../../../gql/sms'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import Modal from '../../../../components/utils/modals/modal.component'
import { useFcm } from '../../../../context/fcm/fcm.context'

export type Message = {
  message: string
  direction: string
  status: string
  isInbound: boolean
}

const MessageChat = ({ memberSpecific }: { memberSpecific?: boolean }) => {
  const [modalOpen, setmodalOpen] = useState<boolean>(false)
  const [modalContent, setmodalContent] = useState<Element | null>(null)
  const [allMemberMessages, setallMemberMessages] = useState<Message[]>([])
  const messagesEndRef = useRef(null)
  const { member } = useMember()
  const { recId } = useParams()
  const { pushNotification, setPushNotification } = useFcm()

  const { data, loading, refetch } = useQuery(GET_MEMBER_CHATS, {
    variables: { antaraId: member['Antara ID'] },
  })

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const openImage = (msg: string) => {
    setmodalOpen(!modalOpen)
    setmodalContent(parse(msg) as unknown as Element)
  }

  useEffect(() => {
    const memberAtIdfromPush =
      pushNotification?.data?.member_airtable_id ||
      pushNotification?.data?.airtable_id
    const isEligible =
      recId &&
      recId === memberAtIdfromPush &&
      pushNotification?.data?.event?.toLowerCase().includes('message')

    if (isEligible) {
      refetch()
      setPushNotification(null)
    }
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    pushNotification?.notification.body,
    pushNotification,
    recId,
    refetch,
    setPushNotification,
  ])

  useEffect(() => {
    const uncleanedData: { node: Message }[] = data?.memberMessages?.edges
    const refinedChats = uncleanedData?.map((dat) => {
      const isInbound = dat.node.direction === 'Inbound'
      return {
        ...dat.node,
        isInbound,
      }
    })
    setallMemberMessages(refinedChats)
  }, [data])

  useEffect(() => {
    if (allMemberMessages?.length) {
      scrollToBottom()
    }
  }, [allMemberMessages])

  const getTime = (date: string | Date) => {
    return dayjs(date).format('hh:mm')
  }

  const renderMessage = (msg: string) => {
    if (msg.includes('</div>') || msg.includes('</p>')) {
      if (msg.includes('<img')) {
        return (
          <button onClick={() => openImage(msg)}>
            <span id="intercom-image">{parse(msg)}</span>
          </button>
        )
      }
      return parse(msg)
    }
    return parse(msg)
  }

  return member ? (
    <div>
      <Modal open={modalOpen} setModalOpen={setmodalOpen} heading={null}>
        <span id="modal-image">{modalContent}</span>
      </Modal>
      <TopBar
        title={`SMS Text ${member['Full Name']}`}
        goBack={!memberSpecific ? '/sms' : null}
      />
      <div
        style={{
          overflowY: 'scroll',
          clear: 'both',
          paddingBottom: '250px',
        }}
        data-testid="thread"
      >
        {loading && <LoadingIcon />}
        {allMemberMessages?.map((message: Message, index: number) => (
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
                  {renderMessage(message.message)}
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
                  {renderMessage(message.message)}
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
