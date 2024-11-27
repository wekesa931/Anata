import React from 'react'
import { Button } from '@mui/material'
import PrimaryButton from 'src/components/buttons/primary'
import type { Member } from 'src/modules/member/db/models'

type PricingProps = {
  setPricingModalView: (values: any) => void
  setUnlimitedMembershipMode: (values: any) => void
  member: Member | null
  availableCohorts: any
}

function FFSPricingView({
  setPricingModalView,
  setUnlimitedMembershipMode,
  member,
  availableCohorts,
}: PricingProps) {
  const services = member?.acrreditedFFSServices

  const unlimitedMembership =
    availableCohorts?.filter(
      (item: any) => item.name === 'Unlimited Membership'
    ) || []

  return (
    <>
      <section>
        {services && services.length > 0 ? (
          <div>
            <div className="flex justify-between mb-2 text-[#8B95A5]">
              <h4 className="text-left ">Service</h4>
              <h4 className="text-right ">Price,KES</h4>
            </div>
            {services.map((service, index) => (
              <div key={index} className="flex justify-between py-1">
                <span className="text-left text-md">{service.name}</span>
                <span className="text-right text-md">{service.price}</span>
              </div>
            ))}
            {unlimitedMembership.length > 0 && (
              <div className="mt-2 flex flex-col gap-2">
                <PrimaryButton
                  onClick={() => {
                    setUnlimitedMembershipMode('assign')
                    setPricingModalView('unlimited')
                  }}
                >
                  Switch to Unlimited Membership
                </PrimaryButton>
                <Button
                  className="border "
                  onClick={() => {
                    setUnlimitedMembershipMode('benefits')
                    setPricingModalView('unlimited')
                  }}
                  sx={{
                    backgroundColor: '#ffff',
                    border: '1px #205284 solid',
                    color: '#205284',
                  }}
                >
                  View Unlimited Membership Benefits
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div>No pricing data available for this FFS model</div>
        )}
      </section>
    </>
  )
}

export default FFSPricingView
