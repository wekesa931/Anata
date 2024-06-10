import { ReportProblem } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

function BillingMessage() {
  return (
    <div className="justify-between h-16 bg-red-10 mx-3 rounded-lg flex items-center font-rubik text-dark-blue-100">
      <div className="ml-2 text-md text-left">
        <ReportProblem className="text-rose-500 mr-1" />
        <span>Member is not eligible for billing! </span>
      </div>
      <Button
        onClick={() => {
          const element = document.getElementById('billing-section')
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        className="underline cursor-pointer mr-2"
      >
        See why
      </Button>
    </div>
  )
}

export default BillingMessage
