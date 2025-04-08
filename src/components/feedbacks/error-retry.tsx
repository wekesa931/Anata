import { Button } from '@mui/material'
import React from 'react'
import ErrorIcon from 'src/assets/img/icons/error.svg'

type Props = {
  retry: () => void
  retryText?: string
  showErroIcon?: boolean
  hideDefaultMessage?: boolean
  customMessageSubTitle?: string
  customMessageDescription?: string
}

function Error({
  retry,
  retryText,
  showErroIcon = true,
  hideDefaultMessage = false,
  customMessageSubTitle,
  customMessageDescription,
}: Props) {
  return (
    <div className="flex flex-col justify-start items-center font-rubik my-2 gap-2">
      {showErroIcon && <ErrorIcon />}
      {!hideDefaultMessage && <p className="text-base font-medium">Ooops!</p>}
      <p className="text-sm text-dark-blue-100">
        {' '}
        {hideDefaultMessage
          ? customMessageSubTitle
          : ' Something unexpected happened.'}
      </p>
      {hideDefaultMessage ? (
        <p className="text-sm p-1 tracking-widest" style={{}}>
          {customMessageDescription}
        </p>
      ) : (
        <p>
          Don&apos;t worry, it&apos;s not you, it&apos;s us. Please refresh the
          page to resolve.
        </p>
      )}

      <Button
        variant="contained"
        color="primary"
        className="bg-orange-100 text-white hover:bg-orange-100 mt-2"
        onClick={retry}
      >
        {retryText || 'Retry'}
      </Button>
    </div>
  )
}

export default Error
