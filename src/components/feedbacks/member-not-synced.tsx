import React from 'react'

function MemberNotSyncedToHNOS() {
  return (
    <div className="flex absolute inset-x-0 top-90 h-16 z-10 w-full text-white bg-red-100 items-center justify-center">
      <p>Member not synced to HNOS. Contact support to fix</p>
    </div>
  )
}

export default MemberNotSyncedToHNOS
