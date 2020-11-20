import React, { useState } from 'react'
import CommsUI from '@antarahealth/comms-ui'
import { useUser } from '../../../../context/user-context'
import { useComms } from '../../../../context/comms-context'
import styles from './communication.component.css'
import Icon from '../../../utils/icon/icon.component'
import { useMember } from '../../../../context/member.context'

const Communication = () => {
  const [communicationBlock, setCommunicationBlock] = useState<boolean>(true)
  const user = useUser()
  const { setCommsStatus } = useComms()
  const { member } = useMember()
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
    <div className="margin-top-32">
      <h4>
        Communication
        <button className={styles.toggler} onClick={showCommunicationBlock}>
          {communicationBlock ? (
            <Icon name="chevron-top" fill="white" width={16} height={16} />
          ) : (
            <Icon name="chevron-bottom" fill="white" width={16} height={16} />
          )}
        </button>
      </h4>

      {user && member && (
        <>
          {communicationBlock ? (
            <div className={styles.communicationBlock}>
              <div>
                <CommsUI
                  user={{ email: user.email }}
                  member={{
                    fullName: member['Full Name'],
                    phoneNumber: member['Phone 1'],
                    antara_id: member['Antara ID'],
                    airtable_rec_id: member.recID,
                  }}
                  onCall={onCall}
                  memberSpecific
                />
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

export default Communication
