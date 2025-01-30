import React from 'react'
import Accordion from '@mui/material/Accordion'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Box } from '@mui/material'
import ManualVerification from './manual-verification.component'

type IProps = {
  selectedService: any
  cancelSmartBilling: () => void
}

function CustomExpandIcon() {
  return (
    <Box
      sx={{
        '.Mui-expanded & > .collapsIconWrapper': {
          display: 'none',
        },
        '.expandIconWrapper': {
          display: 'none',
        },
        '.Mui-expanded & > .expandIconWrapper': {
          display: 'block',
        },
      }}
    >
      <div className="expandIconWrapper text-blue-100">
        <RadioButtonCheckedIcon className="text-base" />
      </div>
      <div className="collapsIconWrapper text-dark-blue-50">
        <RadioButtonUncheckedIcon className="text-base" />
      </div>
    </Box>
  )
}

function SmartServiceCharge({ selectedService, cancelSmartBilling }: IProps) {
  return (
    <>
      <p className="font-medium font-rubik text-base">
        {selectedService?.service?.name}
      </p>
      <p className="mt-2 mb-3 text-sm font-rubik text-sm text-dark-blue-70">
        How do you want to collect the member’s consent for the service?
      </p>
      <Accordion className="border border-dark-blue-10 shadow-none rounded-md">
        <AccordionSummary
          expandIcon={<CustomExpandIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div>
            <p className="font-medium font-rubik text-sm">Manually</p>
            <p className="font-normal font-rubik text-xs text-dark-blue-70">
              Get the visit code and enter it manually in Scribe
            </p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="border" />
          <ManualVerification
            selectedService={selectedService}
            cancelSmartBilling={cancelSmartBilling}
          />
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default SmartServiceCharge
