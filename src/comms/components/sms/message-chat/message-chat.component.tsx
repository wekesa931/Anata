import React, { useRef, useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { groupBy } from 'lodash'
import { Check, Paperclip, AlertTriangle } from 'react-feather'
import { Document, Page, pdfjs } from 'react-pdf'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import MessageInput from './message-input.component'
import {
  SenderDiv,
  RecipientDiv,
  OrangeText,
  GreyText,
  DeliveredText,
  Attachment,
  MessageLoader,
  SenderName,
  DeliveryWrapper,
  SentMessage,
  TimeDevider,
  BorderLine,
  Selector,
  ChatContainer,
  Relative,
  Title,
  MessagesContainer,
  MessagesWrapper,
} from './message-chat.styles'
import { useMember } from '../../../../context/member.context'
import { GET_MEMBER_CHATS } from '../../../../gql/sms'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import Modal from '../../../../components/utils/modals/modal.component'
import { useFcm } from '../../../../context/fcm/fcm.context'
import {
  dateInPastMonth,
  dateInPastWeek,
  dateIsToday,
  dateIsYesterday,
  formattedDate,
} from '../../../../components/utils/date-helpers/date-helpers'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

enum DateCategory {
  YESTERDAY = 'YESTERDAY',
  TODAY = 'TODAY',
  LAST_WEEK = 'LAST WEEK',
  LAST_MONTH = 'LAST MONTH',
  PREVIOUS_MONTHS = 'PREVIOUS MONTHS',
}

export type Message = {
  id: string
  message: string
  direction: string
  status: string
  staffName: string
  createdAt: string
  updatedAt: string
  attachments: { name: string; url: string }[]
}

type MemberMessages = Record<DateCategory, Message[]>

function MessageChat() {
  const [modalOpen, setmodalOpen] = useState<boolean>(false)
  const [modalContent, setmodalContent] = useState<Element | null>(null)
  const [memberMessages, setMemberMessages] = useState<MemberMessages>()
  const [filterLoad, setFilterLoad] = useState(false)
  const [numPages, setNumPages] = useState(null)
  const attachmentUrl = useRef('')
  const messagesEndRef = useRef(null)
  const { member } = useMember()
  const { recId } = useParams()
  const { pushNotification, setPushNotification } = useFcm()

  const { data, loading, refetch } = useQuery(GET_MEMBER_CHATS, {
    variables: { antaraId: member['Antara ID'] },
  })

  const isSent = (status: string) => status.toLocaleLowerCase() === 'sent'
  const isDelivered = (status: string) =>
    status.toLocaleLowerCase() === 'delivered'
  const isFailed = (status: string) =>
    status.toLocaleLowerCase() === 'failed to send' ||
    status.toLocaleLowerCase() === 'failed_to_send'
  const isInbound = (direction: string) => direction === 'INBOUND'
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      // eslint-disable-next-line no-unused-expressions
      messagesEndRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }
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
    pushNotification?.data?.event,
    pushNotification,
    recId,
    refetch,
    setPushNotification,
  ])

  useEffect(() => {
    if (memberMessages) {
      scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberMessages, memberMessages?.TODAY])

  const getRelativeDate = (date: string) => {
    /* eslint no-else-return: ["error", {allowElseIf: true}] */
    if (dateIsToday(date)) {
      return DateCategory.TODAY
    } else if (dateIsYesterday(date)) {
      return DateCategory.YESTERDAY
    } else if (dateInPastWeek(date)) {
      return DateCategory.LAST_WEEK
    } else if (dateInPastMonth(date)) {
      return DateCategory.LAST_MONTH
    }
    return DateCategory.PREVIOUS_MONTHS
  }

  useEffect(() => {
    const uncleanedData: { node: Message }[] = data?.memberMessages?.edges
    if (uncleanedData?.length > 0) {
      setFilterLoad(true)
      const messagesWithGrouping = groupBy(
        uncleanedData.map((chat) => ({
          ...chat.node,
          updatedAt: formattedDate(chat.node.updatedAt),
          relativeDate: getRelativeDate(chat.node.updatedAt),
        })),
        'relativeDate'
      ) as unknown as MemberMessages
      setMemberMessages(messagesWithGrouping)
      setFilterLoad(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const separator = (time: string) => (
    <TimeDevider>
      <BorderLine />
      <Selector>
        <Title>{time}</Title>
      </Selector>
      <BorderLine />
    </TimeDevider>
  )

  const fileType = (url: string): string | undefined => url.split('.').pop()
  const checkIsVideo = (ext: string): boolean =>
    ['ogg', 'mp4', 'webm'].includes(ext)
  const checkIsImage = (ext: string): boolean =>
    ['jpeg', 'jpg', 'gif', 'png'].includes(ext)
  const checkIsDoc = (ext: string): boolean =>
    ['doc', 'docx', 'txt', 'csv', 'pdf'].includes(ext)

  const renderMessage = (msg: Message, index: number) => {
    if (msg.message.includes('</div>') || msg.message.includes('</p>')) {
      if (msg.message.includes('<img')) {
        return (
          <div
            onClick={() => {
              setmodalOpen(!modalOpen)
              setmodalContent(parse(msg.message) as unknown as Element)
            }}
            role="button"
            tabIndex={index}
            onKeyDown={() => {
              setmodalOpen(!modalOpen)
              setmodalContent(parse(msg.message) as unknown as Element)
            }}
          >
            <span className="intercom-image">{parse(msg.message)}</span>
          </div>
        )
      }
    }
    if (msg.attachments && msg.attachments.length > 0) {
      return (
        <Attachment key={index}>
          <div>
            {msg.attachments.map((att) => {
              if (att.name && att.url) {
                const { url, name } = att
                const fileExt = fileType(url)
                const isVedio = fileExt && checkIsVideo(fileExt)
                const isImage = fileExt && checkIsImage(fileExt)
                const isDocument = fileExt && checkIsDoc(fileExt)
                attachmentUrl.current = url

                let showView = <div key={att.url} />
                if (isDocument) {
                  const pdf_component = (
                    <Document
                      file={url}
                      onLoadSuccess={({ numPage }) => setNumPages(numPage)}
                    >
                      {Array(numPages)
                        .fill(null)
                        .map((_, i) => i + 1)
                        .map((page, ind) => (
                          <Page pageNumber={page} key={ind} />
                        ))}
                    </Document>
                  )
                  showView = (
                    <>
                      <span>{parse(msg.message)}</span>
                      <button
                        key={att.url}
                        onClick={() => {
                          setmodalOpen(!modalOpen)
                          setmodalContent(pdf_component as unknown as Element)
                        }}
                        className="btn-icon"
                      >
                        <span className="d-flex">
                          <Paperclip width="12" height="12" />
                          <span className="intercom-image">{parse(name)}</span>
                        </span>
                      </button>
                    </>
                  )
                }
                if (isVedio) {
                  const attch_video = `<video src={url} controls width='100%' height= '100%'>
                Your browser does not support the video tag.
              </video>`
                  showView = (
                    <button
                      key={att.url}
                      onClick={() => {
                        setmodalOpen(!modalOpen)
                        setmodalContent(
                          parse(attch_video) as unknown as Element
                        )
                      }}
                      className="btn-icon"
                    >
                      <span className="intercom-image">{parse(name)}</span>
                    </button>
                  )
                }
                if (isImage) {
                  const imageRender = `<div><img src="${url}" alt="file" />`
                  showView = (
                    <button
                      className="message-image-container"
                      onClick={() => {
                        setmodalOpen(!modalOpen)
                        setmodalContent(
                          parse(imageRender) as unknown as Element
                        )
                      }}
                    >
                      <span>{parse(msg.message)}</span>
                      <img
                        key={att.url}
                        src={url}
                        width={50}
                        height={50}
                        alt="file"
                      />
                    </button>
                  )
                }
                return showView
              }

              return <div key={index} />
            })}
          </div>
        </Attachment>
      )
    }
    return parse(msg.message)
  }

  const messagesContainer = (message: Message, index: number) => (
    <MessagesContainer key={index}>
      {isInbound(message.direction) ? (
        <MessagesWrapper>
          <SenderDiv key={index}>
            {renderMessage(message, index)}
            <GreyText>
              <div className="chat-delivery">{message.updatedAt}</div>
            </GreyText>
          </SenderDiv>
        </MessagesWrapper>
      ) : (
        <MessagesWrapper>
          <RecipientDiv>
            {renderMessage(message, index)}
            <OrangeText>
              <SenderName>{message.staffName}</SenderName>
              <DeliveryWrapper>
                <div className="chat-delivery">{message.updatedAt}</div>
                {isSent(message.status) && (
                  <span>
                    <SentMessage>
                      <Check color="#ffcb80" width="16px" height="16px" />
                    </SentMessage>
                  </span>
                )}
                {isDelivered(message.status) && (
                  <div className="relative">
                    <SentMessage>
                      <Check color="#ffcb80" width="16px" height="16px" />
                    </SentMessage>
                    <DeliveredText>
                      <Check color="#ffcb80" width="16px" height="16px" />
                    </DeliveredText>
                  </div>
                )}
                {isFailed(message.status) && (
                  <span>
                    <SentMessage>
                      <AlertTriangle color="red" width="16px" height="16px" />
                    </SentMessage>
                  </span>
                )}
              </DeliveryWrapper>
            </OrangeText>
          </RecipientDiv>
        </MessagesWrapper>
      )}
    </MessagesContainer>
  )

  const renderMessages = () => {
    if (memberMessages) {
      return Object.keys(memberMessages).map((key, idx: number) => {
        return (
          <div key={idx}>
            <Relative>{separator(`${key}`)}</Relative>
            {memberMessages[key].map((message: Message, index: number) =>
              messagesContainer(message, index)
            )}
          </div>
        )
      })
    }
    return null
  }

  return member ? (
    <div className="full-height">
      <Modal
        open={modalOpen}
        setModalOpen={setmodalOpen}
        heading={null}
        attachmentUrl={attachmentUrl.current}
      >
        <span id="modal-image">{modalContent}</span>
      </Modal>

      <ChatContainer data-testid="thread" className="full-height">
        {(loading || filterLoad) && (
          <MessageLoader>
            <LoadingIcon />
          </MessageLoader>
        )}
        <div
          style={{
            flex: 1,
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {memberMessages && renderMessages()}
          <div ref={messagesEndRef} />
        </div>

        <MessageInput
          messages={memberMessages}
          setMessages={setMemberMessages}
        />
      </ChatContainer>
    </div>
  ) : null
}

export default MessageChat
