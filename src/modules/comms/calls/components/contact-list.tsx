import * as React from 'react'
import { useCall } from 'src/context/calls'
import LoadingIcon from 'src/assets/img/icons/loading.svg?react'
import Notification from 'src/components/notification'
import { useMember } from 'src/context/member'
import OutgoingIcon from 'src/assets/img/icons/phone-outgoing.svg?react'

export interface IProps {
  relevantContact: any
  onCallInitiated: () => void
  tasksType?: string
}

function ContactList({ relevantContact, onCallInitiated, tasksType }: IProps) {
  const [isRinging, setisRinging] = React.useState(false)
  const [notificationError, setnotificationError] = React.useState<
    string | null
  >(null)
  const { member } = useMember()
  const { initiateCall } = useCall()
  const numberType = (num: any, isKey: boolean): string => {
    let value = ''
    // eslint-disable-next-line
    for (const key in num) {
      if (isKey) {
        value = key
      } else {
        value = num[key]
      }
    }
    return value
  }
  const formatNum = (num: string) => {
    if (num) {
      const formatted = num.replace(/[^a-zA-Z0-9_-]/g, '').match(/.{1,3}/g)
      if (formatted) {
        return `+${formatted.join(' ')}`
      }
      return num
    }
    return 'No number found for member'
  }
  const [colorScheme, setcolorScheme] = React.useState({
    iconColor: '#d1d5db',
    textColor: '#5d6b82',
  })

  const calloutChange = async (e: any) => {
    e.stopPropagation()
    setisRinging(!isRinging)

    try {
      initiateCall({
        memberDetails: member,
        callContact: relevantContact,
        onCallInitiated,
        type: tasksType,
      })
    } catch (error: any) {
      setnotificationError(error.message)
      setTimeout(() => {
        setnotificationError(null)
      }, 3000)
    } finally {
      setTimeout(() => {
        setisRinging(false)
      }, 4000)
    }
  }
  const displayError = notificationError

  return (
    <>
      <div
        className="contact-callout d-flex flex-between align-center pointer"
        data-testid="call-initiator"
        role="button"
        onMouseEnter={() =>
          setcolorScheme({
            iconColor: '#32d74b',
            textColor: 'black',
          })
        }
        onMouseLeave={() =>
          setcolorScheme({
            iconColor: '#d1d5db',
            textColor: '#5d6b82',
          })
        }
        style={{
          color: colorScheme.iconColor,
        }}
        tabIndex={0}
        onKeyDown={calloutChange}
        onClick={calloutChange}
      >
        <div className="d-flex flex-column align-start">
          <p className="number-type">{numberType(relevantContact, true)}</p>
          <p
            className="member-phone-num"
            style={{
              color: colorScheme.textColor,
            }}
          >
            {formatNum(numberType(relevantContact, false))}
          </p>
        </div>
        {isRinging ? (
          <LoadingIcon />
        ) : (
          <OutgoingIcon className="text-[#d1d5db] w-4 h-4" />
        )}
      </div>
      {displayError && (
        <div>
          <Notification title="Info" message={notificationError ?? ''} />
        </div>
      )}
    </>
  )
}

export default ContactList
