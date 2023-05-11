import React from 'react'
import { useUser } from 'src/context/user'
import { useMember } from 'src/context/member'
import Fonts from '../components/fonts'
import Chat from '../components/chat'

function Communication() {
  const user = useUser()
  const { member } = useMember()

  return (
    <div className="h-full">
      {user && member && (
        <div className="relative h-full">
          <Fonts />
          <div className="h-full overflow-y-scroll">
            <Chat />
          </div>
        </div>
      )}
    </div>
  )
}

export default Communication
