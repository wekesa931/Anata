import React from 'react'
import CommsUI from '../../../../comms'
import { useUser } from '../../../../context/user-context'
import styles from './communication.component.css'

import { useMember } from '../../../../context/member.context'

const Communication = () => {
  const user = useUser()
  const { member } = useMember()

  return (
    <div className="margin-top-32">
      {user && member && (
        <>
          <div className={styles.communicationBlock}>
            <div>
              <CommsUI
                member={{
                  fullName: member['Full Name'],
                  phoneNumber: member['Phone 1'],
                  antara_id: member['Antara ID'],
                  airtable_rec_id: member.recID,
                }}
                memberSpecific
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Communication
