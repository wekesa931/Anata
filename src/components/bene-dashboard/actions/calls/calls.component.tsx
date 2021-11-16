/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useEffect, useState } from 'react'
import Icon from '../../../utils/icon/icon.component'
import ContactList from './contacts.component'
import Notification from '../../../utils/notification/notification.component'
import { useMember } from '../../../../context/member.context'
import { useCall } from '../../../../context/calls-context'
import DropDownComponent from '../../../../helpers/dropdown-helper'

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
  const { callError, setHistoryRecordId } = useCall()

  const checkProperties = (obj: any) => {
    // eslint-disable-next-line
    for (const key in obj) {
      if (obj[key] === null || obj[key] === '') return false
    }
    return true
  }

  const onCallInitiated = () => {
    setIsPhoneChooserOpen(false)
  }

  const handleCallClick = (e: { stopPropagation: () => void }) => {
    if (airtableId) {
      setHistoryRecordId(airtableId)
    }
    setIsPhoneChooserOpen(!isPhoneChooserOpen)
    e.stopPropagation()
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
              <div>
                <Notification title="Error" message={callError ?? ''} />
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
          </div>
        </DropDownComponent>
      )}
    </div>
  )
}

export default CallsCallout
