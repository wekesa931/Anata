import React, { useRef, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import parse from 'html-react-parser'
import { Check, Paperclip } from 'react-feather'
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
  DeliveredTextRight,
  Attachment,
} from './message-chat.styles'
import TopBar from '../../topbar/topbar.component'
import { useMember } from '../../../../context/member.context'
import { GET_MEMBER_CHATS } from '../../../../gql/sms'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import Modal from '../../../../components/utils/modals/modal.component'
import { useFcm } from '../../../../context/fcm/fcm.context'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export type Message = {
  message: string
  direction: string
  status: string
  isInbound: boolean
  attachments: { name: string; url: string }[]
}

const MessageChat = ({ memberSpecific }: { memberSpecific?: boolean }) => {
  const [modalOpen, setmodalOpen] = useState<boolean>(false)
  const [modalContent, setmodalContent] = useState<Element | null>(null)
  const [allMemberMessages, setallMemberMessages] = useState<Message[]>([])
  const [numPages, setNumPages] = useState(null)
  const attachmentUrl = useRef('')
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
                <SenderDiv key={index}>
                  {renderMessage(message, index)}
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
                  {renderMessage(message, index)}
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
