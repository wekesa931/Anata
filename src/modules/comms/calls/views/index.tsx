/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useState } from 'react'
import { Phone, X } from 'react-feather'
import { Input, InputAdornment } from '@mui/material'
import Notification from 'src/components/notification'
import { useMember } from 'src/context/member'
import { useCall } from 'src/context/calls'
import DropDownComponent from 'src/components/dropdown'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import { useModuleAnalytics } from 'src/modules/analytics'
import PhoneIcon from 'src/assets/img/icons/phone.svg'
import ContactList from '../components/contact-list'
import styles from './calls.module.css'

export interface IProps {
  showPrompt: boolean
}

function CallsCallout({
  tasksType,
  airtableId,
}: {
  tasksType?: string
  airtableId?: string
}) {
  const { member } = useMember()
  const [isPhoneChooserOpen, setIsPhoneChooserOpen] = useState<boolean>(false)
  const { callError, setHistoryRecordId, setcallError } = useCall()
  const [open, setOpen] = useState<boolean>(false)
  const [isRinging, setisRinging] = React.useState(false)
  const { initiateCall } = useCall()
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [phoneError, setPhoneError] = useState<string | null>('')

  const { trackOutboundCall } = useModuleAnalytics()

  const onCallInitiated = (outboundCallDetails: any) => {
    setIsPhoneChooserOpen(false)
    setOpen(false)
    trackOutboundCall(outboundCallDetails)
  }

  const handleNewCalls = () => {
    setOpen(!open)
    setIsPhoneChooserOpen(false)
    setcallError(null)
    setPhoneError(null)
  }

  const closeWindow = () => {
    setContactListAnchorEl(null)
    setIsPhoneChooserOpen(false)
  }

  const calloutChange = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setisRinging(!isRinging)
    setOpen(true)
    setcallError(null)
    const re = /^\d{9}$/
    if (!re.test(phoneNumber)) {
      setcallError('Invalid number, the phone number should be 9 digits')
      setisRinging(false)
    } else {
      try {
        initiateCall({
          callContact: `+254${phoneNumber
            .replace(/\s/g, '')
            .replace(/^(0|\+?254)/gi, '')}`,
          onCallInitiated,
          memberDetails: member,
          type: 'OUTBOUND',
          dialPadInitiated: true,
          memberContacts: member?.phones || member?.primary?.phones || [],
        })
      } finally {
        closeWindow()
        setTimeout(() => {
          setisRinging(false)
        }, 1000)
      }
    }
  }

  const setPhonevalidation = (phone: string) => {
    setPhoneNumber(phone)
    if (phone) {
      const re = /^\d{9}$/
      if (!re.test(phone)) {
        setPhoneError('The phone number should be 9 digits long')
      } else {
        setPhoneError('')
      }
    }
  }

  const [contactListAnchorEl, setContactListAnchorEl] = React.useState(null)
  const handleCallClick = (e: any) => {
    if (airtableId) {
      setHistoryRecordId(airtableId)
    }
    setIsPhoneChooserOpen(!isPhoneChooserOpen)
    e.stopPropagation()
    setContactListAnchorEl(contactListAnchorEl ? null : e.currentTarget)
  }

  return (
    <div className="relative">
      <button
        tabIndex={0}
        className="btn call-btn relative"
        data-testid="initiate-call-button"
        style={{
          color: isPhoneChooserOpen ? '#32d74b' : '#af9090',
          backgroundColor: isPhoneChooserOpen ? '#d6f7db' : '#e8eaed',
        }}
        onClick={handleCallClick}
      >
        <PhoneIcon className="w-4 h-4" fill="#efefef" />
      </button>
      <ContactList
        phoneNumbers={member?.allPhones || []}
        error={callError}
        setError={setcallError}
        handleNewCalls={handleNewCalls}
        tasksType={tasksType}
        onCallInitiated={onCallInitiated}
        anchorEl={contactListAnchorEl}
        closeWindow={closeWindow}
      />

      {!isPhoneChooserOpen && open && (
        <DropDownComponent isVisible={open} setvisibility={setOpen}>
          <div className="phone-number-callout">
            {callError && (
              <div className="p-relative">
                <X
                  className="calls-error"
                  color="var(--red-100)"
                  width={18}
                  height={18}
                  onClick={() => setcallError(null)}
                />
                <Notification
                  title="Error"
                  message={callError ?? ''}
                  buttonMargin="0"
                  buttonPadding="15px 8px"
                />
              </div>
            )}
            <div className={styles.inputs}>
              <Phone
                fill="#fff"
                style={{
                  color: phoneNumber ? '#32d74b' : 'var(--dark-blue-50)',
                }}
              />
              <Input
                onChange={(e) => setPhonevalidation(e.target.value)}
                style={{
                  color: 'var(--blue-100))',
                  height: '20px',
                  width: '150px',
                  paddingLeft: '10px',
                }}
                startAdornment={
                  <InputAdornment position="start">+254</InputAdornment>
                }
              />
              <span className={styles.inputError}>
                <small>{phoneError}</small>
              </span>
            </div>
            <div className={styles.buttons}>
              <button className={styles.cancel} onClick={handleNewCalls}>
                Cancel
              </button>

              {isRinging ? (
                <button className={styles.calls}>
                  {' '}
                  <LoadingIcon />{' '}
                </button>
              ) : (
                <button onClick={calloutChange} className={styles.calls}>
                  Call
                </button>
              )}
            </div>
          </div>
        </DropDownComponent>
      )}
    </div>
  )
}

export default CallsCallout
