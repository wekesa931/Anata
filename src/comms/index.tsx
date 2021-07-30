import React from 'react'
import { Member } from '../context/member.context'
import GlobalStyles from './components/styles/global.styles'
import Comms from './components/comms/comms.component'

type CommsUIPropsType = {
  member?: Member
  memberSpecific?: boolean
}

const CommsUI = ({ memberSpecific }: CommsUIPropsType) => {
  return (
    <>
      <GlobalStyles />
      <Comms memberSpecific={memberSpecific} />
    </>
  )
}

export default CommsUI
