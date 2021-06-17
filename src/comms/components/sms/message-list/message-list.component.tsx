/*eslint-disable */
import React from 'react'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import {
  Button,
  MessageTitle,
  MessageText,
  MessageDate,
} from './messages-list.styles'
import { fetchDistinctSMS } from '../../../resources/sms.resource'
import TopBar from '../../topbar/topbar.component'
// eslint-disable-next-line no-unused-vars
import { useMember, Member } from '../../../context/member.context'
import analytics from '../../../analytics/segment'
import { useCurrentUser } from '../../../context/user.context'

const Message = (props: any) => {
  const { setCurrentMember } = useMember()
  const { user } = useCurrentUser()
  const {
    member_phone,
    sent_received,
    message,
    antara_id,
    member_name,
    airtable_rec_id,
  } = props.message
  const dateCreated = dayjs(sent_received)
  const formattedDateCreated = dateCreated.isSame(dayjs(), 'day')
    ? dateCreated.format('hh:mm A')
    : dateCreated.format('MMM DD')

  const navigateToChat = (member: Member) => {
    setCurrentMember(member)
  }

  React.useEffect(() => {
    analytics.track('Messages List Loaded', {
      hn: user.name || user.email,
    })
  }, [user.name, user.email])

  return (
    <Button
      onClick={() =>
        navigateToChat({
          phoneNumber: member_phone,
          antara_id,
          fullName: member_name || member_phone,
          airtable_rec_id,
        })
      }
    >
      <div style={{ width: '100%' }}>
        <MessageTitle>{member_name || member_phone}</MessageTitle>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <MessageText>{message}</MessageText>
          <MessageDate>{formattedDateCreated}</MessageDate>
        </div>
      </div>
    </Button>
  )
}

const MessagesList = () => {
  const history = useHistory()
  const [messages, setMessages] = React.useState([])
  React.useEffect(() => {
    fetchDistinctSMS().then(({ details }) => {
      setMessages(details)
    })
  }, [])

  const { member } = useMember()

  if (member) {
    history.push(`/comms/${member.phoneNumber}`)
  }

  return (
    <>
      <TopBar title="Messages" />
      <div data-testid="message-list">
        {messages &&
          messages.map((message: any) => (
            <Message key={message.id} message={message} />
          ))}
      </div>
    </>
  )
}

export default MessagesList
/*eslint-disable */
