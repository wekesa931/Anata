import React from 'react'
import { Member } from '../context/member.context'
import GlobalStyles from './components/styles/global.styles'
import Comms from './components/comms/comms.component'
import useFCMState from './fcm/fcm.hook'

type CommsUIPropsType = {
  member?: Member
  memberSpecific?: boolean
}

const CommsUI = ({ memberSpecific }: CommsUIPropsType) => {
  const { fcmState } = useFCMState()

  return (
    <>
      <GlobalStyles />
      <Comms memberSpecific={memberSpecific} fcmState={fcmState} />
    </>
  )
}

export default CommsUI
