import { CircularProgress } from '@mui/material'
import React from 'react'

type VerificationLoaderProps = {
  message: string
  fullwidth?: boolean
}

function VerificationLoader({
  message,
  fullwidth = false,
}: VerificationLoaderProps) {
  return (
    <div
      className={`flex flex-col justify-evenly items-center gap-4 p-2 bg-purple mb-4 rounded-lg ${
        fullwidth ? 'w-[200%]' : 'w-full'
      }`}
    >
      <CircularProgress />
      <p className="text-dark-blue-100 text-base font-rubik font-normal text-center">
        {message}
      </p>
    </div>
  )
}

export default VerificationLoader
