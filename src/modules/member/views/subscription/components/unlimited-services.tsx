import React from 'react'
import PrimaryButton from 'src/components/buttons/primary'
import AssignMembershipView from './assign-membership'

type PricingProps = {
  availableCohorts: any
  setUnlimitedMembershipMode: (values: any) => void
  unlimitedMembershipMode: 'benefits' | 'assign'
}

function UnlimitedServicesView({
  availableCohorts,
  setUnlimitedMembershipMode,
  unlimitedMembershipMode,
}: PricingProps) {
  const services = [
    { name: 'Virtual consultation (VC)' },
    { name: 'Mental Health Consultation (MHC)' },
    { name: 'Nutritional Consultation (NC)' },
    { name: 'Personalized fitness plans' },
    { name: 'Medication deliveries' },
    { name: 'Medical equipment deliveries' },
  ]

  const ffsMembership =
    availableCohorts?.filter((item: any) => item.billingPackage.isFfs) || []

  return (
    <div>
      {unlimitedMembershipMode === 'benefits' ? (
        <>
          <div className="mb-2 text-[#5D6B82] font-medium">
            <h4>Unlimited Membership Benefits </h4>
          </div>
          {services.map((service, index) => (
            <div key={index} className="flex justify-between py-1">
              <span className="text-left text-md">{service.name}</span>
            </div>
          ))}
          {ffsMembership.length > 0 && (
            <div className="mt-2 flex flex-col gap-2">
              <PrimaryButton
                onClick={() => {
                  setUnlimitedMembershipMode('assign')
                }}
              >
                Switch to pay as you go
              </PrimaryButton>
            </div>
          )}
        </>
      ) : (
        <AssignMembershipView
          setUnlimitedMembershipMode={setUnlimitedMembershipMode}
          type="unlimited"
        />
      )}
    </div>
  )
}

export default UnlimitedServicesView
