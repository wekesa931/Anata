import React from 'react'
import CommsUI from '@antarahealth/comms-ui'
import { useUser } from '../../../../context/user-context'

const Communication = ({ member }: any) => {
  const user = useUser()

  return (
    user &&
    member && (
      <>
        <h4 className="margin-bottom-8">Communication</h4>
        <div
          style={{
            height: '336px',
            position: 'relative',
            boxShadow: '0px 8px 16px rgba(96, 142, 182, 0.3)',
            borderRadius: '8px',
            border: '1px solid var(--blue-light)',
          }}
        >
          <CommsUI
            user={{ email: user.profileObj.email }}
            member={{
              fullName: member['Full Name'],
              phoneNumber: member['Phone 1'],
              antara_id: member['Antara ID'],
            }}
          />
        </div>
      </>
    )
  )
}

export default Communication
