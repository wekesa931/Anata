import { CircularProgress } from '@mui/material'
import React from 'react'

type VerificationLoaderProps = {
  message: string
}

function VerificationLoader({ message }: VerificationLoaderProps) {
  return (
    <div className="flex flex-col justify-evenly items-center gap-4 p-2 bg-purple mb-4 rounded-lg ">
      <CircularProgress />
      <p className="text-dark-blue-100 text-base font-rubik font-normal text-center">
        {message}
      </p>
    </div>
  )
}

export default VerificationLoader
