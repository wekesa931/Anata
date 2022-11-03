import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import parse from 'html-react-parser'
import { CheckCircle, ChevronDown, ChevronUp, Phone } from 'react-feather'

import { useCall } from '../../../../context/calls-context'
import Notification from '../../../utils/notification/notification.component'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import { UPDATE_CONTACT } from '../../../../gql/comms'
import airtableFetch from '../../../../resources/airtable-fetch'
import logError from '../../../utils/Bugsnag/Bugsnag'
import Toasts from '../../../../helpers/toast'
import Modal from '../../../utils/modals/modal.component'

interface IProps {
  callerNum: string
  memberInfo: {
    id: string
  }
}

function SaveContactView({ callerNum, memberInfo }: IProps) {
  const [numType, setNumType] = useState('Phone 1')
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState(false)
  const [bene, setBene] = useState(null)
  const [loading, setLoading] = useState(false)
  const [contactSaved, setContactSaved] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [updateContact] = useMutation(UPDATE_CONTACT)
  const selectContactType = (type: string) => {
    setNumType(type)
    setIsVisible(false)
  }
  const { setCallerName } = useCall()

  useEffect(() => {
    const getMemberDetails = async () => {
      const callingMember = await airtableFetch(`members/${memberInfo.id}`)
      setBene(callingMember)
    }
    getMemberDetails()
  }, [memberInfo.id])

  const saveContact = async () => {
    setModalOpen(false)
    try {
      setLoading(true)
      if (!bene) {
        throw new Error('Member not found')
      }
      const contactType = {
        'Phone 1': {
          antaraId: bene['Antara ID'],
          contactPhone1: callerNum,
        },
        'Phone 2': {
          antaraId: bene['Antara ID'],
          contactPhone2: callerNum,
        },
      }
      const response = await updateContact({
        variables: {
          input: contactType[numType],
        },
      })
      if (response?.data?.updateBeneficiaryContacts?.status === 200) {
        setContactSaved(true)
        setTimeout(() => {
          setCallerName(bene['Full Name'])
        }, 4000)
      }
    } catch (e: any) {
      Toasts.showErrorNotification(e?.message)
      logError(e)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const confirmMessage = () => {
    if (bene) {
      return `Are you sure you want to overwrite <strong>${numType}</strong> from <strong>${bene[numType]}</strong> to <strong>${callerNum}</strong>?`
    }
    return ''
  }

  const shouldSaveContact = () => {
    if (bene && bene[numType]) {
      setModalOpen(true)
    } else {
      saveContact()
    }
  }

  if (error) {
    return (
      <span className="mt-ten navigation-info">
        <Notification title="Error" message="Contact not saved successfully" />
      </span>
    )
  }
  if (contactSaved) {
    return (
      <div className="new-contact-view">
        <div className="d-flex flex-center flex-column align-center">
          <CheckCircle className="phone-saved" />
          <div className="d-flex align-center new-contact flex-column">
            <p>{callerNum}</p>
            <p>
              saved as <strong>{numType}</strong>
            </p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="new-contact-view">
      <Modal
        open={modalOpen}
        setModalOpen={setModalOpen}
        heading={null}
        height="140px"
      >
        {parse(confirmMessage())}
        <div className="d-flex align-center flex-center mt-ten">
          <button className="confirm-btn agree" onClick={saveContact}>
            Yes
          </button>
          <button
            className="confirm-btn abort"
            onClick={() => setModalOpen(false)}
          >
            No
          </button>
        </div>
      </Modal>
      <div className="d-flex flex-center flex-column align-center">
        <Phone className="new-contact-phone" />
        <div className="d-flex align-center new-contact flex-column">
          <p>Save {callerNum}</p>
          <p>
            as member&apos;s <strong>{numType}</strong>
          </p>
        </div>
      </div>
      <div className="d-flex flex-between relative">
        <button className="d-flex flex-between contact-options pointer">
          <div
            className="save-contact-btn"
            aria-hidden="true"
            onClick={shouldSaveContact}
            onKeyDown={shouldSaveContact}
          >
            Save as {numType}
          </div>
          <span
            aria-hidden="true"
            onClick={() => setIsVisible(!isVisible)}
            onKeyDown={() => setIsVisible(!isVisible)}
          >
            {!isVisible ? (
              <ChevronDown width={20} height={20} />
            ) : (
              <ChevronUp width={20} height={20} />
            )}
          </span>
        </button>
        <button
          className="save-contact-skip"
          onClick={() => setIsVisible(!isVisible)}
        >
          Skip
        </button>
        {isVisible && (
          <div className="contact-options-list">
            <div className="d-flex flex-column contact-options-btn">
              <button
                onClick={() => {
                  selectContactType('Phone 1')
                }}
              >
                Phone 1
              </button>
              <button
                onClick={() => {
                  selectContactType('Phone 2')
                }}
              >
                Phone 2
              </button>
            </div>
          </div>
        )}
      </div>
      {loading && (
        <div className="saving-contact">
          <LoadingIcon />
          Saving Contact
        </div>
      )}
    </div>
  )
}

export default SaveContactView
