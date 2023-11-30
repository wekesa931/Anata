import React from 'react'
import { CircularProgress } from '@mui/material'
import LoadingIcon from 'src/assets/img/icons/loading.svg?react'

type LoaderProps = {
  message: string
}

function Loader({ message = 'Loading...' }: LoaderProps) {
  return (
    <div className="flex h-3/4 flex-col items-center">
      <LoadingIcon />
      <p className="font-rubik text-xs">{message}</p>
    </div>
  )
}

export function CircularLoader() {
  return (
    <div className="fixed top-[60px] left-0 z-[1200] flex h-[80%] w-full items-center justify-center bg-white opacity-60">
      <span className="flex flex-col">
        <CircularProgress color="inherit" />
      </span>
    </div>
  )
}

export default Loader
