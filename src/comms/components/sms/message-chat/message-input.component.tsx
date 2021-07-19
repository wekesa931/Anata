import React, { useState, useRef } from 'react'
import { useToasts } from 'react-toast-notifications'
import { ConfirmationDialog } from '@airtable/blocks/ui'
import {
  Input,
  SendButton,
  InputArea,
  InputSpan,
  InputOption,
} from './message-input.styles'
// eslint-disable-next-line no-unused-vars
import { sendSMS, AntaraSMS } from '../../../resources/sms.resource'
import { useUser } from '../../../../context/user-context'
// eslint-disable-next-line no-unused-vars
import { Member, useMember } from '../../../../context/member.context'
import analytics from '../../../../helpers/segment'

type MessageInputProps = {
  messages: any[]
  setMessages: any
}

const ANTARA_SHORTCODE = process.env.ANTARA_SHORTCODE as string

const MessageInput = ({ messages, setMessages }: MessageInputProps) => {
  const { member } = useMember()
  const messageTemplate = (member && member.messageTemplate) || ''
  const [message, setMessage] = useState<string>(messageTemplate)
  const [charCount, setCharCount] = useState<number>(0)
  const [channel, setChannel] = useState<string>('')
  const [sendingSMS, setSendingSMS] = useState<boolean>(false)
  const { addToast } = useToasts()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const user = useUser()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    const { scrollHeight } = textAreaRef?.current
    if (scrollHeight > 20 && scrollHeight < 200) {
      textAreaRef.current.style.height = `${scrollHeight}px`
    }
    if (textAreaRef?.current?.innerHTML === '') {
      textAreaRef.current.style.height = `20px`
    }
  }, [message])

  React.useEffect(() => {
    setMessage(messageTemplate)
  }, [messageTemplate])

  const handleChange = ($event: any) => {
    setMessage($event.target.value)
    setCharCount($event.target.value.length)
  }

  const handleSelectedChannel = (event: any) => {
    setChannel(event.target.value)
  }

  const getAntaraId = (currentMember: Member) => {
    if (!currentMember.antara_id) {
      return 'no_antara_id'
    }
    return currentMember.antara_id
  }

  const createAntaraSms = (currentMember: Member): AntaraSMS => {
    return {
      message,
      antara_email: user ? user.email : '',
      msg_type: 'CHAT',
      sender_phone: ANTARA_SHORTCODE,
      member_details: [
        {
          antara_id: getAntaraId(currentMember),
          member_phone: currentMember['Phone 1'],
          receiver_phone: currentMember['Phone 1'],
          full_name: currentMember['Full Name'],
          airtable_rec_id: currentMember.recID,
        },
      ],
    }
  }

  const sendMessage = () => {
    const sms = message && member ? createAntaraSms(member) : null
    if (!member['Phone 1']) {
      addToast('No phone number', {
        appearance: 'error',
        autoDismiss: true,
      })
      setCharCount(0)
      setSendingSMS(false)
      setMessage('')
    }
    if (sms && member) {
      sendSMS(sms).then(({ code }) => {
        if (code === 200) {
          setMessages([...messages, sms])
          setMessage('')
          addToast('Message Sent', {
            appearance: 'success',
            autoDismiss: true,
          })
          member.messageTemplate = ''
          // setCurrentMember(member)
          analytics.track('SMS sent', {
            hn: user ? user.email : '',
            bene_id: member.airtable_rec_id,
            phone_number: member.phoneNumber,
            sms,
          })
        }
        setSendingSMS(false)
      })
    }
  }

  const confirmSend = ($event: any) => {
    $event.preventDefault()
    setSendingSMS(true)
    setIsDialogOpen(true)
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
              <option value="app">App</option>
              <option value="sms">Sms</option>
            </select>
          </InputOption>

          <Input
            ref={textAreaRef}
            placeholder="Text"
            value={message}
            onChange={handleChange}
            autoFocus
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
            style={{ backgroundColor: message ? '#58a9f3' : '#87c1f7' }}
          >
            {sendingSMS ? 'Sending...' : 'Send'}
          </SendButton>
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
