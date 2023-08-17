import React from 'react'
import { AlertCircle } from 'react-feather'

function MemberNotSyncedToHNOS() {
  return (
    <div className="flex font-rubik text-base gap-2 absolute inset-x-0 bottom-0 h-12 z-10 w-full text-white bg-red-100 items-center justify-center">
      <AlertCircle />
      <p>Member not synced to HNOS. Contact support to fix</p>
    </div>
  )
}

export default MemberNotSyncedToHNOS
