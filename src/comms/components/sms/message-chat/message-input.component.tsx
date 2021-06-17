import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { ConfirmationDialog } from '@airtable/blocks/ui'
import { InputContainer, Input, SendButton } from './message-input.styles'
// eslint-disable-next-line no-unused-vars
import { sendSMS, AntaraSMS } from '../../../resources/sms.resource'
import { useUser } from '../../../../context/user-context'
// eslint-disable-next-line no-unused-vars
import { Member, useMember } from '../../../../context/member.context'
import Icon from '../../icons/icon.component'
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
  const [sendingSMS, setSendingSMS] = useState<boolean>(false)
  const { addToast } = useToasts()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const user = useUser()

  React.useEffect(() => {
    setMessage(messageTemplate)
  }, [messageTemplate])

  const handleChange = ($event: any) => {
    setMessage($event.target.value)
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
          member_phone: currentMember.phoneNumber,
          receiver_phone: currentMember.phoneNumber,
          full_name: currentMember.fullName,
          airtable_rec_id: currentMember.airtable_rec_id,
        },
      ],
    }
  }

  const sendMessage = () => {
    const sms = message && member ? createAntaraSms(member) : null
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
      <form style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
        <InputContainer>
          <Input
            placeholder="Type something..."
            value={message}
            onChange={handleChange}
            autoFocus
          />
          <SendButton
            onClick={confirmSend}
            disabled={!message || sendingSMS}
            data-testid="sms-send-btn"
          >
            {sendingSMS ? (
              'Sending...'
            ) : (
              <Icon
                name="circle-arrow-top"
                fill={message ? '#FF9800' : '#C6DFEB'}
              />
            )}
          </SendButton>
        </InputContainer>
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
