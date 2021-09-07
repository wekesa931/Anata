import React, { useState, useRef, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications'
import { ConfirmationDialog } from '@airtable/blocks/ui'
import { useMutation } from '@apollo/client'
import { SEND_SMS } from '../../../../gql/sms'
import {
  Input,
  SendButton,
  InputArea,
  InputSpan,
  InputOption,
  IntercomButton,
  Intercomdiv,
} from './message-input.styles'
import { useUser } from '../../../../context/user-context'
import { useMember } from '../../../../context/member.context'
import analytics from '../../../../helpers/segment'
import logError from '../../../../components/utils/Bugsnag/Bugsnag'

type MessageInputProps = {
  messages: any[]
  setMessages: any
}

const MessageInput = ({ messages, setMessages }: MessageInputProps) => {
  const { member } = useMember()
  const messageTemplate = (member && member.messageTemplate) || ''
  const [message, setMessage] = useState<string>(messageTemplate)
  const [charCount, setCharCount] = useState<number>(0)
  const [channel, setChannel] = useState<string>('sms')
  const [sendingSMS, setSendingSMS] = useState<boolean>(false)
  const { addToast } = useToasts()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const user = useUser()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [sendSms] = useMutation(SEND_SMS)

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      const { scrollHeight } = textAreaRef?.current
      if (scrollHeight > 20 && scrollHeight < 200) {
        textAreaRef.current.style.height = `${scrollHeight}px`
      }
      if (textAreaRef?.current?.innerHTML === '') {
        textAreaRef.current.style.height = `20px`
      }
    }
  }, [message, textAreaRef])

  useEffect(() => {
    setMessage(messageTemplate)
  }, [messageTemplate])

  const handleChange = ($event: any) => {
    setMessage($event.target.value)
    setCharCount($event.target.value.length)
  }

  const handleSelectedChannel = (event: any) => {
    setChannel(event.target.value)
  }

  const sendMessage = () => {
    const sms = {
      id: (Math.random() + Math.random()).toString(),
      message,
      direction: 'OUTBOUND',
      createdAt: new Date().toDateString(),
    }
    if (sms && member) {
      sendSms({
        variables: {
          message: sms.message,
          antaraId: member['Antara ID'],
        },
      })
        .then((res) => {
          if (res?.data.sendSms.status === 404) {
            addToast(res?.data.sendSms.message, {
              appearance: 'error',
              autoDismiss: true,
            })
            setCharCount(0)
            setSendingSMS(false)
            setMessage('')
          }
          if (res?.data.sendSms.status === 200) {
            addToast(res?.data.sendSms.message, {
              appearance: 'success',
              autoDismiss: true,
            })
            setMessages([...messages, { ...sms, status: 'sent' }])
            setCharCount(0)
            setSendingSMS(false)
            setMessage('')
          }
        })
        .catch((error) => {
          addToast(error.message, {
            appearance: 'error',
            autoDismiss: true,
          })
          setCharCount(0)
          setSendingSMS(false)
          setMessage('')
          logError(error.message)
        })
      setSendingSMS(false)
    }
  }

  const confirmSend = ($event: any) => {
    $event.preventDefault()
    setSendingSMS(true)
    setIsDialogOpen(true)
  }

  const redirectToIntercom = (event: any) => {
    event.preventDefault()
    const link = member['Intercom URL']
    window.open(link, 'blank_intercom')
  }

  return (
    <>
      <form style={{ position: 'fixed', bottom: 0, width: '339px' }}>
        <InputArea>
          <InputOption>
            <InputSpan>Send</InputSpan>
            <select
              name="message-types"
              id="msg-types"
              className="message-input"
              onChange={(e) => handleSelectedChannel(e)}
            >
              <option value="sms">Sms</option>
              <option value="app">App</option>
            </select>
          </InputOption>
          {channel === 'app' ? (
            <Intercomdiv>
              <IntercomButton
                onClick={(e) => redirectToIntercom(e)}
                data-testid="intercom-link"
              >
                Go to intercom
              </IntercomButton>
            </Intercomdiv>
          ) : (
            <>
              <Input
                ref={textAreaRef}
                placeholder="Text"
                value={message}
                onChange={handleChange}
                autoFocus
                style={{ display: channel === 'app' ? 'none' : 'flex' }}
              />
              <span>
                {charCount > 150 &&
                  channel === 'sms' &&
                  `This sms will overflow to two separate SMSes`}
              </span>
              <SendButton
                onClick={confirmSend}
                disabled={!message || sendingSMS}
                data-testid="sms-send-btn"
                style={{
                  backgroundColor: message ? '#58a9f3' : '#87c1f7',
                  display: 'flex',
                }}
              >
                {sendingSMS ? 'Sending...' : 'Send'}
              </SendButton>
            </>
          )}
        </InputArea>
      </form>

      {isDialogOpen && (
        <ConfirmationDialog
          title="Are you sure?"
          body="This action can’t be undone. Click Send to send SMS."
          onConfirm={() => {
            setIsDialogOpen(false)
            sendMessage()
          }}
          onCancel={() => {
            setIsDialogOpen(false)
            setSendingSMS(false)
            if (member) {
              analytics.track('SMS Sending Cancelled', {
                bene_id: member.airtable_rec_id,
                hn: user ? user.email : '',
                phone_number: member.phoneNumber,
              })
            }
          }}
          confirmButtonText="Send"
        />
      )}
    </>
  )
}

export default MessageInput
