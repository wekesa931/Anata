import React from 'react'

function MemberNotFound() {
  return (
    <div className="flex justify-center flex-col place-items-center h-2/4">
      <div className="border p-3 rounded-md">
        <p>Member not found.</p>
        <p>Search again to try another member.</p>
      </div>
    </div>
  )
}

export default MemberNotFound
