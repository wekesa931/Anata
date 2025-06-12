import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import { formatCurrency } from 'src/modules/member/utils'
import ManualVerification from './manual-verification.component'

type IProps = {
  selectedService: any
  cancelSmartBilling: () => void
  hideCancelBtn?: boolean
  showPrice?: boolean
  otpContext?: any
  closeModal?: any
  appointment?: any
  showAppointments?: boolean
  handleVisitIdVerified?: any
}

function SmartServiceCharge({
  selectedService,
  cancelSmartBilling,
  hideCancelBtn,
  showPrice = false,
  otpContext,
  closeModal,
  appointment,
  showAppointments,
  handleVisitIdVerified,
}: IProps) {
  return (
    <>
      {/* show title only when booking appointment */}
      {!otpContext?.modalOpen && selectedService && (
        <p className="font-semibold font-rubik text-base text-[#205284] mb-1">
          {selectedService?.service?.name}
        </p>
      )}
      {/* end of show only when booking appointment */}
      <p className="font-semibold font-rubik text-xs mb-1">
        {showPrice && !showAppointments && (
          <>
            Service Fee:
            <span className="font-normal text-sm ml-1">
              {formatCurrency(selectedService?.price, 'Kes')}
            </span>
          </>
        )}
      </p>
      <Accordion className="border border-dark-blue-10 shadow-none rounded-md">
        <AccordionDetails>
          <div className="mb-1">
            <ManualVerification
              hideCancelBtn={hideCancelBtn}
              selectedService={selectedService}
              cancelSmartBilling={cancelSmartBilling}
              otpContext={otpContext}
              closeModal={closeModal}
              appointment={appointment}
              handleVisitIdVerified={handleVisitIdVerified}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default SmartServiceCharge
