/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useEffect, useState } from 'react'
import { ChevronRight, Phone, X } from 'react-feather'
import { Input, InputAdornment } from '@mui/material'
import Icon from '../../../utils/icon/icon.component'
import ContactList from './contacts.component'
import Notification from '../../../utils/notification/notification.component'
import { useMember } from '../../../../context/member.context'
import { useCall } from '../../../../context/calls-context'
import DropDownComponent from '../../../../helpers/dropdown-helper'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import styles from './calls.component.css'

const nameSplitter = (name: string) => {
  const parts = name.split(' ', 2)
  return parts[0]
}

export interface IProps {
  showPrompt: boolean
}

const Contacts = [
  { 'Phone 1': null },
  { 'Phone 2': null },
  { 'Emergency 1': null },
  { 'Emergency 2': null },
]

const CallsCallout = ({
  tasksType,
  airtableId,
}: {
  tasksType?: string
  airtableId?: string
}) => {
  const [memberContacts, setmemberContacts] = React.useState(Contacts)
  const { memberContact: loadedContacts } = useMember()
  const [isPhoneChooserOpen, setIsPhoneChooserOpen] = useState<boolean>(false)
  const { callError, setHistoryRecordId, setcallError } = useCall()
  const [open, setOpen] = useState<boolean>(false)
  const [isRinging, setisRinging] = React.useState(false)
  const { initiateCall } = useCall()
  const { member } = useMember()
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [phoneError, setPhoneError] = useState<string | null>('')
  const [colorScheme, setcolorScheme] = React.useState({
    iconColor: '#d1d5db',
    textColor: '#5d6b82',
  })

  const checkProperties = (obj: any) => {
    // eslint-disable-next-line
    for (const key in obj) {
      if (obj[key] === null || obj[key] === '') return false
    }
    return true
  }

  const onCallInitiated = () => {
    setIsPhoneChooserOpen(false)
    setOpen(false)
  }

  const handleCallClick = (e: { stopPropagation: () => void }) => {
    if (airtableId) {
      setHistoryRecordId(airtableId)
    }
    setIsPhoneChooserOpen(!isPhoneChooserOpen)
    e.stopPropagation()
  }
  const handleNewCalls = () => {
    setOpen(!open)
    setIsPhoneChooserOpen(false)
    setcallError(null)
    setPhoneError(null)
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
        initiateCall(
          {
            phoneNumber: `+254${phoneNumber
              .replace(/\s/g, '')
              .replace(/^(0|\+?254)/gi, '')}`,
          },
          onCallInitiated,
          member
        )
      } finally {
        setTimeout(() => {
          setisRinging(false)
        }, 1000)
      }
    }
  }

  useEffect(() => {
    if (loadedContacts) {
      const allContacts: any[] = [
        { 'Phone 1': loadedContacts.contactPhone1 },
        { 'Phone 2': loadedContacts.contactPhone2 },
        { 'Emergency 1': loadedContacts.emergencyContactPhone1 },
        { 'Emergency 2': loadedContacts.emergencyContactPhone2 },
      ]

      // eslint-disable-next-line no-unused-expressions
      loadedContacts?.dependents?.forEach((dep, i) => {
        allContacts.push({
          [`Dependant ${i + 1} Phone 1 (${nameSplitter(dep.fullName)})`]:
            dep.contactPhone1,
        })
        allContacts.push({
          [`Dependant ${i + 2} Phone 2 (${nameSplitter(dep.fullName)})`]:
            dep.contactPhone2,
        })
      })
      const cleanedContacts = allContacts.filter((con) => checkProperties(con))

      setmemberContacts(cleanedContacts)
    }
  }, [loadedContacts])
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

  return (
    <div className="relative">
      <a
        role="button"
        tabIndex={0}
        className="btn relative call-btn"
        data-testid="initiate-call-button"
        style={{
          color: isPhoneChooserOpen ? '#32d74b' : '#af9090',
          backgroundColor: isPhoneChooserOpen ? '#d6f7db' : '#e8eaed',
        }}
        onKeyDown={handleCallClick}
        onClick={handleCallClick}
      >
        <Icon name="phone" fill="#efefef" width={16} height={16} />
      </a>
      {isPhoneChooserOpen && (
        <DropDownComponent
          isVisible={isPhoneChooserOpen}
          setvisibility={setIsPhoneChooserOpen}
        >
          <div data-testid="phone-list" className="phone-number-callout">
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
            {memberContacts.length > 0 ? (
              memberContacts.map((con, i) => (
                <div className="mb-ten" key={i}>
                  <ContactList
                    tasksType={tasksType}
                    relevantContact={con}
                    onCallInitiated={onCallInitiated}
                  />
                </div>
              ))
            ) : (
              <div>
                <Notification
                  title="Error"
                  message="No contact found for member"
                />
              </div>
            )}

            <button
              onClick={() => handleNewCalls()}
              className={styles.btncallotherphone}
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
                color: colorScheme.textColor,
              }}
            >
              Call other phone
              <ChevronRight
                width="18px"
                height="18px"
                style={{
                  color: colorScheme.iconColor,
                }}
              />
            </button>
          </div>
        </DropDownComponent>
      )}

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
