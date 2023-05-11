import { PhoneMissed, PhoneIncoming, PhoneOutgoing } from 'react-feather'
import React from 'react'

export function CallIcon({ item }: any) {
  const callDirection = item?.callDirection
  const memberAnswered = item?.memberAnswered
  const agentAnswered = item?.agentAnswered

  if (callDirection === 'OUTBOUND' && memberAnswered) {
    return <PhoneOutgoing width={15} height={15} color="var(--green-50)" />
  }
  if (callDirection === 'INBOUND' && agentAnswered) {
    return <PhoneIncoming width={15} height={15} color="var(--blue-50)" />
  }
  if (callDirection === 'INBOUND' && !agentAnswered) {
    return <PhoneMissed width={15} height={15} color="var(--red-50)" />
  }
  if (callDirection === 'OUTBOUND' && !memberAnswered) {
    return <PhoneMissed width={15} height={15} color="var(--red-50)" />
  }
  return null
}
