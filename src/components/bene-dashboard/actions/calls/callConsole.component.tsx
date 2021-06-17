import * as React from 'react'
import Icon from '../../../utils/icon/icon.component'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import { useCall } from '../../../../context/calls-context'
import { useMember } from '../../../../context/member.context'
import Timer from '../../../../comms/components/calls/CountUp'
import CallConsoleForms from './forms'

const CallFloatingBox = () => {
  const { member } = useMember()
  const [isOpen, setisOpen] = React.useState(true)
  const { activeCall, completeCall } = useCall()

  const isRinging = activeCall?.state === 'RINGING'
  const participantBusy = activeCall?.state === 'MEMBERMISSED'
  const staffBusy = activeCall?.state === 'STAFFMISSED'
  const isActive = activeCall?.state === 'ONGOING'
  const isFulfilled = activeCall?.state === 'FULFILLED'
  const participantLeft = activeCall?.state === 'MEMBERLEFT'

  const subTitle = () => {
    let subtitle = `Calling  ${activeCall?.member}...`
    if (participantBusy) {
      subtitle = 'Member Busy'
    } else if (isActive) {
      subtitle = 'Call Ongoing'
    } else if (isFulfilled || staffBusy) {
      subtitle = 'Call Ended'
    } else if (participantLeft) {
      subtitle = 'Member Left'
    }
    return subtitle
  }

  const callColorCodes = {
    CALLENDED: '#182c4c',
    INBOUND: '#70e381',
    OUTBOUND: '#1084ee',
    ONGOING: '#ebfbed',
    MEMBERMISSED: '#ffebea',
    STAFFMISSED: '#ffebea',
    MEMBERLEFT: '#ffebea',
    FULFILLED: '#f9fafc',
    RINGING: '#f9fafc',
  }

  const consoleColor = () => {
    if (
      activeCall?.state === 'FULFILLED' ||
      activeCall?.state === 'STAFFMISSED'
    ) {
      return '#182c4c'
    }
    return callColorCodes[activeCall?.type]
  }

  const backgroundColor = activeCall && callColorCodes[activeCall?.state]
  if (!activeCall || Object.keys(activeCall).length === 0) {
    return null
  }

  return (
    <div
      style={{
        display: 'block',
        height: isOpen ? '550px' : '105px',
      }}
      className="call-floating-box p-absolute"
    >
      <div
        style={{
          backgroundColor: activeCall && consoleColor(),
        }}
        className="call-header d-flex flex-between align-center"
      >
        <div style={{ width: '40%' }}>
          <p className="call-type-title">
            {activeCall.title ?? 'Inbound Call'}
          </p>
          {activeCall?.date && (
            <p className="call-floating-date">{new Date().toDateString()}</p>
          )}
        </div>
        {isFulfilled || participantBusy || staffBusy ? (
          <span
            className="pointer"
            role="button"
            tabIndex={0}
            style={{ color: 'white' }}
            onKeyDown={() => completeCall()}
            onClick={() => completeCall()}
          >
            <Icon name="x" fill="white" width={20} height={20} />
          </span>
        ) : (
          <span
            className="pointer"
            role="button"
            tabIndex={0}
            style={{ color: 'white' }}
            onKeyDown={() => setisOpen(!isOpen)}
            onClick={() => setisOpen(!isOpen)}
          >
            {isOpen && (
              <Icon name="minimize" fill="white" width={20} height={20} />
            )}
            {!isOpen && (
              <Icon name="maximize-2" fill="white" width={20} height={20} />
            )}
          </span>
        )}
      </div>
      <div
        style={{ backgroundColor }}
        className="connecting-text d-flex flex-between"
      >
        <div className="d-flex">
          {isActive && <Timer initialTime={activeCall.initialCallTime} />}
          <p>{subTitle()}</p>
          {isFulfilled && <p className="duration">{activeCall?.duration}</p>}
        </div>
        {isRinging && (
          <span>
            <LoadingIcon />
          </span>
        )}
      </div>
      {(participantBusy || staffBusy) && (
        <div className="no-answer">
          <div
            className="d-flex flex-center align-center"
            style={{ color: '#ff9d97' }}
          >
            <Icon name="phone-missed" fill="white" width={30} height={30} />
          </div>
          {participantBusy && <p>{member['Full Name']}</p>}
          <p style={{ marginTop: '0px' }}>
            {staffBusy && 'You'} didn&#39;t answer
          </p>
          <div className="task-created d-flex align-center">
            <span>
              <Icon name="check-circle" fill="white" width={15} height={15} />
            </span>
            <p>Callback task created</p>
          </div>
        </div>
      )}
      {(isActive ||
        isFulfilled ||
        participantBusy ||
        participantLeft ||
        staffBusy) && <CallConsoleForms />}
    </div>
  )
}

export default CallFloatingBox
