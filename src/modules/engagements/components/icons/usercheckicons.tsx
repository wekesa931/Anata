import React from 'react'
import HowToRegIcon from '@mui/icons-material/HowToReg'

export function UserIconWithCheck() {
  return (
    <div className="relative inline-block">
      <HowToRegIcon style={{ fontSize: 24 }} className="text-green-100" />
    </div>
  )
}

export function UserIconWithoutCheck() {
  return (
    <div className="relative inline-block">
      <HowToRegIcon style={{ fontSize: 24 }} className="text-gray-100" />
    </div>
  )
}
