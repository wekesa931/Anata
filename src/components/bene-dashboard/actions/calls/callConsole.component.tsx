import React, { useState } from 'react'
import { Repeat, AlertTriangle, PhoneForwarded, Info } from 'react-feather'
import Icon from '../../../utils/icon/icon.component'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import { useCall } from '../../../../context/calls-context'
import { useMember } from '../../../../context/member.context'
import Timer from '../../../../comms/components/calls/CountUp'
import CallConsoleForms from './forms'
import HNAndCSList from './staff.component'
import CallbackHistory, { HistoryLogs } from './callbackHistory.component'
import SearchInput from '../../../search/search.component'
import SaveContactView from './updateBeneContactView'
import ActiveCallParticipants from './ActiveCallParticipants'

const CallFloatingBox = () => {
  const { member } = useMember()
  const [isOpen, setisOpen] = React.useState(true)
  const [memberInfo, setmemberInfo] = useState(null)
  const [displayHistory, setdisplayHistory] = useState(false)
  const { activeCall, completeCall } = useCall()
  const [showTransferList, setshowTransferList] = useState(false)

  const isCallBack = activeCall?.type === 'CALLBACK'
  const isRinging = activeCall?.state === 'RINGING'
  const participantBusy = activeCall?.state === 'MEMBERMISSED'
  const staffBusy = activeCall?.state === 'STAFFMISSED'
  const isActive = activeCall?.state === 'ONGOING'
  const isFulfilled = activeCall?.state === 'FULFILLED'
  const isTransfered = activeCall?.state === 'TRANSFERED'
  const participantLeft = activeCall?.state === 'MEMBERLEFT'
  const isKnownMember = activeCall?.memberName !== 'Unknown Caller'
  const shouldDisplayForms =
    isKnownMember &&
    (isActive ||
      isFulfilled ||
      participantBusy ||
      participantLeft ||
      isTransfered ||
      staffBusy)
  const displayCloseButton =
    isFulfilled || participantBusy || staffBusy || isTransfered
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
  const displayHistoryLogs = isCallBack && subTitle().includes('Calling')
  const displayActionButtons =
    !activeCall?.forwardTo &&
    !isTransfered &&
    !subTitle().includes('Calling') &&
    !isFulfilled

  const callColorCodes = {
    CALLENDED: '#182c4c',
    INBOUND: '#1084ee',
    OUTBOUND: '#1084ee',
    ONGOING: '#ebfbed',
    CALLBACK: '#1084ee',
    MEMBERMISSED: '#ffebea',
    STAFFMISSED: '#ffebea',
    MEMBERLEFT: '#ffebea',
    FULFILLED: '#f9fafc',
    TRANSFERED: '#f9fafc',
    RINGING: '#f9fafc',
  }

  const consoleColor = () => {
    if (
      activeCall?.state === 'FULFILLED' ||
      activeCall?.state === 'STAFFMISSED' ||
      activeCall?.state === 'TRANSFERED'
    ) {
      return '#182c4c'
    }
    if (activeCall) {
      return callColorCodes[activeCall?.type]
    }
    return '#1084ee'
  }
  const backgroundColor = activeCall
    ? callColorCodes[activeCall?.state]
    : '#1084ee'
  if (
    !activeCall ||
    !Object.prototype.hasOwnProperty.call(activeCall, 'title')
  ) {
    return null
  }

  return (
    <div
      style={{
        height: isOpen ? '550px' : '105px',
      }}
      className="call-floating-box p-absolute"
    >
      <div
        style={{
          backgroundColor: activeCall && consoleColor(),
        }}
        className="relative call-header d-flex flex-between align-center"
      >
        {showTransferList && <HNAndCSList displayList={setshowTransferList} />}
        <div className="d-flex relative box-header">
          <p className="call-type-title">
            {activeCall.title ?? 'Inbound Call'}
            <br />
            <span>
              <strong>{activeCall.member} </strong>
              <span>{activeCall.memberName}</span>
            </span>
          </p>
          {isCallBack && (
            <Info
              className="info-icon"
              onClick={() => setdisplayHistory(!displayHistory)}
            />
          )}
          {displayHistory && (
            <CallbackHistory
              isVisible={displayHistory}
              setdisplayHistory={setdisplayHistory}
            />
          )}
        </div>
        {displayCloseButton ? (
          <span
            className="pointer white-text"
            role="button"
            tabIndex={0}
            onKeyDown={() => completeCall()}
            onClick={() => completeCall()}
          >
            <Icon name="x" fill="white" width={20} height={20} />
          </span>
        ) : (
          <span
            className="pointer white-text"
            role="button"
            tabIndex={0}
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
      {activeCall.forwardTo && !isTransfered && (
        <div className="forward-to flex-between">
          <div className="d-flex mt-ten">
            <span>
              <PhoneForwarded className="icon-style" />
            </span>
            <p>Calling {activeCall.forwardTo}</p>
          </div>
          <div className="mt-ten">
            <LoadingIcon />
          </div>
        </div>
      )}
      {!isFulfilled && <ActiveCallParticipants />}
      {(participantBusy || staffBusy) && (
        <div className="no-answer">
          <div className="d-flex flex-center align-center phone-off">
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

      {isTransfered && (
        <div className="no-answer">
          <div className="d-flex flex-center align-center phone-forward">
            <PhoneForwarded className="icon-style-large" />
          </div>
          <p>{activeCall.title}</p>
          <p>transfered</p>
          <div className="task-created d-flex align-center">
            <p>{activeCall.forwardTo}</p>
          </div>
        </div>
      )}
      {displayHistoryLogs && (
        <div className="ml-twenty mt-twenty">
          <HistoryLogs />
        </div>
      )}
      {!isKnownMember &&
        (memberInfo ? (
          <SaveContactView
            callerNum={activeCall.member}
            memberInfo={memberInfo}
          />
        ) : (
          <div className="unknown-member">
            <SearchInput unknownMemberSearch memberInfo={setmemberInfo} />
          </div>
        ))}
      {shouldDisplayForms && <CallConsoleForms />}
      {displayActionButtons && (
        <div className="full-width d-flex flex-end transfer-container">
          <button className="d-flex emergency-btn" onClick={() => null}>
            <AlertTriangle className="emergency-btn-icon icon-size" />
            <p>Emergency</p>
          </button>
          <button
            className="d-flex"
            onClick={() => setshowTransferList(!showTransferList)}
          >
            <Repeat className="icon-size" />
            <p>Transfer to</p>
          </button>
        </div>
      )}
    </div>
  )
}

export default CallFloatingBox
