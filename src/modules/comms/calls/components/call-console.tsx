import React, { useEffect, useState } from 'react'
import {
  Repeat,
  AlertTriangle,
  PhoneForwarded,
  Info,
  Phone,
  CheckCircle,
  PhoneOff,
} from 'react-feather'
import { useMutation } from '@apollo/client'
import { Portal } from '@mui/material'
import Draggable from 'react-draggable'
import Icon from 'src/components/icon/svg-icon'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import { useCall } from 'src/context/calls'
import Timer from 'src/components/timer'
import SearchInput from 'src/components/search'
import { UPDATE_PHONES } from 'src/modules/comms/services/gql'
import logError from 'src/utils/logging/logger'
import { useModuleAnalytics } from 'src/modules/analytics'
import CallConsoleForms from './call-console-forms'
import HNAndCSList from './call-console-staff'
import CallbackHistory, { HistoryLogs } from './callback-history'
import SaveContactView from './save-contact'
import ActiveCallParticipants from './active-call-participants'
import AuthenticateMember from './authenticate-member'
import { AuthButton } from './styled-components'
import styles from './call-console.component.css'

function CallFloatingBox() {
  const [isOpen, setisOpen] = React.useState(true)
  const [memberInfo, setmemberInfo] = useState(null)
  const [bioVerified, setBioVerified] = useState(false)
  const [shouldAuthenticate, setShouldAuthenticate] = useState(false)
  const [displayHistory, setdisplayHistory] = useState(false)
  const { activeCall, conferenceParticipants, completeCall, handleEndCall } =
    useCall()
  const [showSaveDialog, setShowSaveDialog] = useState(true)
  const [savedPhone, setSavedPhone] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string | null>(null)
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
  const showActiveParticipants = !isFulfilled && !shouldAuthenticate
  const memberInCall = conferenceParticipants?.find(
    (part) => !part.isStaff && part.isMember
  )

  const [updatePhones, { loading: updatePhonesLoading }] = useMutation(
    UPDATE_PHONES,
    {
      context: {
        clientName: 'v2',
      },
      onCompleted: () => {
        setSavedPhone(true)
      },
      onError: (error) => {
        setSavedPhone(true)
        setSaveError('An error occured saving phone')
        logError(error)
      },
    }
  )

  const showAuthButton =
    !bioVerified &&
    memberInCall &&
    !memberInCall.biodataValidated &&
    !shouldAuthenticate &&
    !isRinging &&
    !participantBusy &&
    !staffBusy &&
    !isTransfered &&
    !participantLeft &&
    !isFulfilled &&
    activeCall?.memberAntaraId

  const isTransferring = activeCall?.forwardTo && !isTransfered
  const isHalfHeight = conferenceParticipants?.length === 3
  const shouldDisplayForms =
    !shouldAuthenticate &&
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
  const displayHistoryLogs =
    isCallBack && subTitle().includes('Calling') && !shouldAuthenticate
  const displayActionButtons =
    !shouldAuthenticate &&
    !activeCall?.forwardTo &&
    !isTransfered &&
    !subTitle().includes('Calling') &&
    !isFulfilled

  const { trackMissedCall } = useModuleAnalytics()

  useEffect(() => {
    if (participantBusy) {
      trackMissedCall(false, activeCall)
    }
    if (staffBusy) {
      trackMissedCall(true, activeCall)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participantBusy, staffBusy])

  const isMemberContact = (phoneNumber: string) => {
    return activeCall?.memberContacts?.find(
      (contact) => contact.phone === phoneNumber
    )
  }

  const shouldDisplaySaveMember =
    activeCall?.dialPadInitiated &&
    showSaveDialog &&
    !isMemberContact(activeCall?.member)

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

  const successfulValidation = () => {
    setShouldAuthenticate(false)
    setBioVerified(true)
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

  const savePhone = () => {
    setSaveError(null)
    const memberContacts = activeCall?.memberContacts || []

    // find the contact with the highest priority and return the value + 1 if available else 0
    const priority = memberContacts.reduce((acc, contact) => {
      if (contact.priority > acc) {
        return contact.priority
      }
      return acc
    }, -1)

    const newContacts = [
      {
        phone: activeCall?.member,
        phoneType: 'Unknown',
        priority: priority + 1,
      },
      ...memberContacts,
    ]

    const variables = {
      input: {
        phones: newContacts,
        antaraId: activeCall?.memberAntaraId,
      },
    }

    updatePhones({
      variables,
    }).catch((err) => {
      setSaveError('An error occured saving phone')
      logError(err)
    })
  }

  const closeDialog = () => {
    setShowSaveDialog(false)
    setSaveError(null)
    setSavedPhone(true)
  }

  return (
    <Portal>
      <Draggable
        bounds="parent"
        enableUserSelectHack
        data-testid="call-console-draggable"
      >
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
            className="call-header d-flex flex-between align-center relative"
          >
            {showTransferList && (
              <HNAndCSList displayList={setshowTransferList} />
            )}
            <div className="d-flex box-header relative">
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
                onKeyDown={completeCall}
                onClick={completeCall}
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
            <div className="d-flex flex-between full-width align-start">
              <div className="d-flex">
                {isActive && <Timer initialTime={activeCall.initialCallTime} />}
                {isFulfilled && !activeCall.dialPadInitiated && (
                  <p className="duration">{activeCall?.duration}</p>
                )}
                <p>{subTitle()}</p>
              </div>
              {showAuthButton && (
                <AuthButton onClick={() => setShouldAuthenticate(true)}>
                  Validate Member
                </AuthButton>
              )}
            </div>
            {isRinging ? (
              <span className={styles.loadingContainer}>
                <LoadingIcon />

                <div>
                  <button
                    className={styles.cancel}
                    onKeyDown={handleEndCall}
                    onClick={handleEndCall}
                  >
                    Cancel
                  </button>
                </div>
              </span>
            ) : null}
          </div>

          {isTransferring && (
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
          {showActiveParticipants && <ActiveCallParticipants />}
          {(participantBusy || staffBusy) && (
            <div className="no-answer">
              <div className="d-flex flex-center align-center phone-off">
                <Icon name="phone-missed" fill="white" width={30} height={30} />
              </div>
              {participantBusy && <p>{activeCall?.memberName}</p>}
              <p style={{ marginTop: '0px' }}>
                {staffBusy && 'You'} didn&#39;t answer
              </p>
              <div className="task-created d-flex align-center">
                <span>
                  <Icon
                    name="check-circle"
                    fill="white"
                    width={15}
                    height={15}
                  />
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
          {shouldAuthenticate && (
            <AuthenticateMember
              sessionId={memberInCall?.sessionId}
              sessionName={memberInCall?.session}
              antaraId={activeCall.memberAntaraId}
              isValidationFailed={setShouldAuthenticate}
              isValidationSuccess={successfulValidation}
            />
          )}
          {shouldDisplayForms && !shouldDisplaySaveMember && (
            <CallConsoleForms
              height={isHalfHeight ? 'task-form-low' : 'task-form'}
            />
          )}

          {shouldDisplayForms && shouldDisplaySaveMember && !savedPhone && (
            <div className={styles.saveContainer}>
              <Phone
                className={styles.phone}
                fill="#fff"
                width={50}
                height={50}
              />
              <p className={styles.saveParagraph}>
                Save {activeCall?.member} as member&apos;s Phone?
              </p>
              <div className={styles.buttons}>
                <button className={styles.savebtn} onClick={savePhone}>
                  {updatePhonesLoading ? 'Saving' : 'Save Phone'}
                </button>
                <button className={styles.skipbtn} onClick={closeDialog}>
                  Skip
                </button>
              </div>
            </div>
          )}
          {savedPhone && showSaveDialog && (
            <>
              {saveError ? (
                <div className={styles.saveContainer}>
                  <p className={styles.errSaving}>{saveError}</p>
                  <div className="d-flex flex-center align-center">
                    <div className={styles.errButtons}>
                      <button className={styles.savebtn} onClick={savePhone}>
                        {updatePhonesLoading ? 'Retrying...' : 'Retry'}
                      </button>
                      <button className={styles.skipbtn} onClick={closeDialog}>
                        Skip
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.savedPhone}>
                  <CheckCircle
                    className={styles.checkCircle}
                    fill="white"
                    width={50}
                    height={50}
                  />
                  <p className={styles.saveParagraph}>
                    {activeCall.member} phone saved
                  </p>

                  <div className="d-flex flex-center align-center">
                    <div className={styles.errButtons}>
                      <button className={styles.savebtn} onClick={closeDialog}>
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {displayActionButtons && (
            <div className="full-width d-flex flex-between transfer-container">
              <button className="d-flex emergency-btn" onClick={handleEndCall}>
                <PhoneOff className="emergency-btn-icon icon-size" />
                <p>End Session</p>
              </button>
              <div className="d-flex flex-end">
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
            </div>
          )}
        </div>
      </Draggable>
    </Portal>
  )
}

export default CallFloatingBox
