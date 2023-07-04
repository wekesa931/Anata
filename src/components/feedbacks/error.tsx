import React from 'react'
import { X } from 'react-feather'

type ErrorFeedbackProps = {
  message: string
  fullWidth?: boolean
}

function ErrorFeedback({ message, fullWidth }: ErrorFeedbackProps) {
  return (
    <div className={`mb-4 ${fullWidth ? ' w-[200%]' : 'w-full'}`}>
      <div className="p-2 bg-red-10 flex justify-start items-center rounded-lg mb-4 gap-4">
        <X className="w-[20px] text-red-100" />
        <div className="text-dark-blue-100 text-base font-rubik">
          <h3 className=" font-medium">Oops!</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorFeedback
