import React, { useRef, useEffect, useState } from 'react'
import parse from 'html-react-parser'
import {
  Check,
  Paperclip,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'react-feather'
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
  OptionsContainer,
  OptionsTitle,
  OptionsContent,
  OptionsContentText,
  StickyTop,
  ChatContainer,
  Relative,
  Title,
  MessagesContainer,
  MessagesWrapper,
} from './message-chat.styles'
import TopBar from '../../topbar/topbar.component'
import { useMember } from '../../../../context/member.context'
import { GET_MEMBER_CHATS } from '../../../../gql/sms'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import Modal from '../../../../components/utils/modals/modal.component'
import { useFcm } from '../../../../context/fcm/fcm.context'
import {
  checkDate,
  isSameDay,
  numDaysBetween,
  onCurrentWeek,
} from '../../../../components/utils/date-helpers/date-helpers'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

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

const MessageChat = ({ memberSpecific }: { memberSpecific?: boolean }) => {
  const [modalOpen, setmodalOpen] = useState<boolean>(false)
  const [modalContent, setmodalContent] = useState<Element | null>(null)
  const [allPreviousMemberMessages, setAllPreviousMemberMessages] = useState<
    Message[]
  >([])
  const [isTodayMessages, setIsTodayMessages] = useState<Message[]>([])
  const [isYesterdayMessages, setIsYesterdayMessages] = useState<Message[]>([])
  const [filterQuery, setFilterQuery] = useState('All')
  const [isLastWeekMessages, setIsLastWeekMessages] = useState<Message[]>([])
  const [isLastMonthMessages, setIsLastMonthMessages] = useState<Message[]>([])
  const [showTimeOptions, setShowTimeOptions] = useState(false)
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
    // @ts-ignore
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
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
    const uncleanedData: { node: Message }[] = data?.memberMessages?.edges
    const refinedChats = uncleanedData?.map((dat) => dat.node)
    if (refinedChats) {
      setFilterLoad(true)
      const todayMessages = refinedChats.filter((chat) =>
        isSameDay(new Date(), new Date(chat.updatedAt))
      )
      const yesterdayMessages = refinedChats.filter((chat) =>
        checkDate(chat.updatedAt).includes('Yesterday')
      )
      const lastWeekMessages = refinedChats.filter((chat) =>
        onCurrentWeek(new Date(chat.updatedAt))
      )
      const lastMonthMessages = refinedChats.filter(
        (chat) => numDaysBetween(new Date(), new Date(chat.updatedAt)) <= 30
      )
      const previousMessages = refinedChats.filter(
        (chat) =>
          !isSameDay(new Date(), new Date(chat.updatedAt)) &&
          !checkDate(chat.updatedAt).includes('Yesterday')
      )
      setFilterLoad(false)
      setAllPreviousMemberMessages(previousMessages)
      setIsTodayMessages(todayMessages)
      setIsYesterdayMessages(yesterdayMessages)
      setIsLastMonthMessages(lastMonthMessages)
      setIsLastWeekMessages(lastWeekMessages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (allPreviousMemberMessages?.length) {
      scrollToBottom()
    }
  }, [allPreviousMemberMessages])

  useEffect(() => {
    scrollToBottom()
  }, [filterQuery])

  const separator = (time: string, isMainFilter = false) => (
    <TimeDevider>
      <BorderLine />
      <Selector
        onClick={() => {
          isMainFilter && setShowTimeOptions(!showTimeOptions)
        }}
      >
        <Title>{time}</Title>
        {isMainFilter &&
          (showTimeOptions ? (
            <ChevronUp width={15} />
          ) : (
            <ChevronDown width={15} />
          ))}
      </Selector>
      <BorderLine />
    </TimeDevider>
  )

  const timeOptions = () => {
    const period = ['All', 'Today', 'Yesterday', 'Last Week', 'Last Month']
    return (
      <OptionsContainer>
        <OptionsTitle>Jump to…</OptionsTitle>
        {period.map((timeDuration) => (
          <OptionsContent
            key={timeDuration}
            onClick={() => {
              setFilterQuery(timeDuration)
              setShowTimeOptions(false)
            }}
          >
            <OptionsContentText>{timeDuration}</OptionsContentText>
          </OptionsContent>
        ))}
      </OptionsContainer>
    )
  }

  const fileType = (url: string): string | undefined => url.split('.').pop()
  const checkIsVideo = (ext: string): boolean =>
    ['ogg', 'mp4', 'webm'].includes(ext)

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
            <span id="intercom-image">{parse(msg.message)}</span>
          </div>
        )
      }
    }
    if (msg.attachments && msg.attachments.length > 0) {
      return (
        <Attachment key={index}>
          <span>
            <Paperclip width="16" height="16" />
          </span>
          <div>
            {msg.attachments.map((att) => {
              const { url, name } = att
              const fileExt = fileType(url)
              const isVedio = fileExt && checkIsVideo(fileExt)
              attachmentUrl.current = url

              let showView = <div />
              if (fileExt === 'pdf') {
                const pdf_component = (
                  <>
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
                  </>
                )
                showView = (
                  <button
                    onClick={() => {
                      setmodalOpen(!modalOpen)
                      setmodalContent(pdf_component as unknown as Element)
                    }}
                    key={index}
                    className="btn-icon"
                  >
                    <span id="intercom-image">{parse(name)}</span>
                  </button>
                )
              }
              if (isVedio) {
                const attch_video = `<video src={url} controls width='100%' height= '100%'>
          Your browser does not support the video tag.
         </video>`
                showView = (
                  <button
                    onClick={() => {
                      setmodalOpen(!modalOpen)
                      setmodalContent(parse(attch_video) as unknown as Element)
                    }}
                    key={index}
                    className="btn-icon"
                  >
                    <span id="intercom-image">{parse(name)}</span>
                  </button>
                )
              }
              return showView
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
              <div className="chat-delivery">
                {checkDate(message.updatedAt)}
              </div>
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
                <div className="chat-delivery">
                  {checkDate(message.createdAt)}
                </div>
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
  const messagesToRender = (messages: Message[]) => {
    return messages.map((message: Message, index: number) =>
      messagesContainer(message, index)
    )
  }
  return member ? (
    <div>
      <Modal
        open={modalOpen}
        setModalOpen={setmodalOpen}
        heading={null}
        attachmentUrl={attachmentUrl.current}
      >
        <span id="modal-image">{modalContent}</span>
      </Modal>
      <StickyTop>
        <TopBar
          title={`SMS Text ${member['Full Name']}`}
          goBack={!memberSpecific ? '/sms' : null}
        />
        <Relative>
          {showTimeOptions && timeOptions()}
          {separator(`${filterQuery} Messages`, true)}
        </Relative>
      </StickyTop>

      <ChatContainer data-testid="thread">
        {(loading || filterLoad) && (
          <MessageLoader>
            <LoadingIcon />
          </MessageLoader>
        )}
        {filterQuery === 'All' && (
          <>
            {messagesToRender(allPreviousMemberMessages)}
            {isYesterdayMessages.length > 0 && separator('Yesterday')}
            {messagesToRender(isYesterdayMessages)}
            {isTodayMessages.length > 0 && separator('Today')}
            {messagesToRender(isTodayMessages)}
          </>
        )}
        {filterQuery === 'Yesterday' && messagesToRender(isYesterdayMessages)}
        {filterQuery === 'Today' && messagesToRender(isTodayMessages)}
        {filterQuery === 'Last Week' && messagesToRender(isLastWeekMessages)}
        {filterQuery === 'Last Month' && messagesToRender(isLastMonthMessages)}

        <div ref={messagesEndRef} />
        <MessageInput
          messages={allPreviousMemberMessages}
          setMessages={setAllPreviousMemberMessages}
        />
      </ChatContainer>
    </div>
  ) : null
}

export default MessageChat
