import React, { useState } from 'react'
import CommsUI from '@antarahealth/comms-ui'
import { useUser } from '../../../../context/user-context'
import { useComms } from '../../../../context/comms-context'
import styles from './communication.component.css'
import Icon from '../../../utils/icon/icon.component'

const Communication = ({ member }: any) => {
  
  const [communicationBlock, setCommunicationBlock] = useState<boolean>(true)
  const user = useUser()
  const { setCommsStatus } = useComms()
  const [client, setClient] = useState<any>()

  const showCommunicationBlock = () =>
    communicationBlock
      ? setCommunicationBlock(false)
      : setCommunicationBlock(true)

  const onCall = (callClient: any) => {
    setClient(callClient)
  }

  React.useEffect(() => {
    if (client) {
      client.on(
        'callaccepted',
        () => {
          setCommsStatus({ callInProgress: true })
        },
        false
      )

      client.on(
        'hangup',
        () => {
          setCommsStatus({ callInProgress: false })
        },
        false
      )
    }
  }, [client, setCommsStatus])

  return (
    user &&
    member && (
      <>
        <div style={{ marginBottom: '28px' }}>
          <h4>
            Communication
            <button className={styles.toggler} onClick={showCommunicationBlock}>
              {communicationBlock ? (
                <Icon name="chevron-top" fill="white" width={16} height={16} />
              ) : (
                <Icon
                  name="chevron-bottom"
                  fill="white"
                  width={16}
                  height={16}
                />
              )}
            </button>
          </h4>
        </div>
        {communicationBlock ? (
          <div
            style={{
              position: 'relative',
              boxShadow: '0px 8px 16px rgba(56, 94, 126, 0.2)',
              borderRadius: '12px',
              border: '1px solid var(--blue-light)',
              borderLeft: '3px solid var(--orange-base)',
            }}
          >
            <div>
              <CommsUI
                user={{ email: user.profileObj.email }}
                member={{
                  fullName: member['Full Name'],
                  phoneNumber: member['Phone 1'],
                  antara_id: member['Antara ID'],
                  airtable_rec_id: member['recID']
                }}
                onCall={onCall}
                memberSpecific
              />
            </div>
          </div>
        ) : null}
      </>
    )
  )
}

export default Communication
