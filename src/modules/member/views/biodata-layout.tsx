import React, { useEffect, useRef, useState } from 'react'
import { Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import PersonalSection from 'src/modules/member/views/biodata-display/personal'
import ClinicalSection from 'src/modules/member/views/biodata-display/clinical'
import {
  BiodataSkeleton,
  TitleSkeleton,
} from 'src/modules/member/components/skeleton-loaders'
import { getAgeFull } from 'src/utils/date-time/helpers'
import MissingInfoBlock from 'src/modules/member/views/missing-info'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import type { Member } from 'src/modules/member/db/models'
import dayjs from 'dayjs'
import PrimaryButton from 'src/components/buttons/primary'
import SmartServiceCharge from 'src/modules/appointments/smart-verification/smart-service-booking-flow'
import { SubscriptionServiceLayout } from './subscription/index'

type MemberBiodataProps = {
  member: Member | null
}

function MemberBiodataLayout({ member }: MemberBiodataProps) {
  const [value, setValue] = React.useState<string>('personal')
  const [memberDataHeight, setMemberDataHeight] = useState<number>(0)
  const memberDataRef = useRef<HTMLDivElement>(null)
  const analytics = useMemberAnalytics()
  const [startSmartPayment, setStartSmartPayment] = useState<boolean>(false)
  const [viewSubscriptionDetails, setViewSubscriptionDetails] =
    useState<boolean>(false)

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0].contentRect.height !== memberDataHeight) {
        setMemberDataHeight(entries[0].contentRect.height)
      }
    })

    if (memberDataRef.current) {
      observer.observe(memberDataRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [memberDataHeight])

  const onMembershipSmartPayment = () => {
    setStartSmartPayment(true)
  }

  const getSubscriptionDate = () => {
    const activeCohorts = member?.membercohortSet?.filter(
      (cohort) => cohort.subscriptionStatus === 'ACTIVE'
    )

    if (activeCohorts && activeCohorts.length > 0) {
      return (
        dayjs(activeCohorts[0].billingStartedAt).format('Do MMMM YYYY') ||
        'Unknown Date'
      )
    }

    return 'Unknown Date'
  }
  const handleSubscriptionView = () => {
    setViewSubscriptionDetails(!viewSubscriptionDetails)
  }

  const unknownMembership =
    typeof member?.activeBillingPackageEnrollment !== 'object'

  const membershipService = {
    service: { name: '' },
    servicePricingId: member?.membershipServicePricingId,
  }

  return member ? (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-white-100 flex justify-start flex-col overflow-y-auto border-l border-2 border-solid border-dark-blue-10 border-b-0">
        <div
          ref={memberDataRef}
          className={`py-2 px-0 items-center justify-between sticky top-0 w-full z-10 ${
            unknownMembership
              ? 'bg-red-10'
              : member?.isFfsEligible
              ? 'bg-[#FFEACC]'
              : 'bg-[#98EBA5]'
          }`}
        >
          {member ? (
            <section>
              <h3 className="font-rubik font-medium text-xl pl-4 text-dark-blue-100 ">
                {`${member.fullName} ${getAgeFull(member?.birthDate)}`}
                {member?.sex && (
                  <span className="w-6 h-6 bg-red-50 text-white rounded-[50%] ml-1 py-[2px] px-[6px]">
                    {member?.sex.charAt(0) || ''}
                  </span>
                )}
              </h3>
              <div className="flex pl-4 justify-between mt-2 items-center">
                <div className="text-[#5D6B82] ">
                  {member.pendingBillingPackageEnrollment && (
                    <p className="font-normal text-xs mb-2">
                      {member.pendingBillingPackageEnrollment
                        ?.isUnlimitedMembership
                        ? 'Unlimited Membership'
                        : 'Fee for Service'}
                      <span className="ml-2">( pending consent )</span>
                    </p>
                  )}

                  {unknownMembership ? (
                    <div>Unknown Membership</div>
                  ) : (
                    <div>
                      <p className="font-medium mb-1">
                        {member?.isFfsEligible
                          ? 'Fee for Service'
                          : 'Unlimited Membership'}
                      </p>
                      <p className="font-normal text-xs">
                        since {getSubscriptionDate()}
                      </p>
                      {member?.shouldRenewMembership && (
                        <PrimaryButton
                          className="capitalize mt-2 bg-orange-100"
                          onClick={onMembershipSmartPayment}
                        >
                          Collect Payment
                        </PrimaryButton>
                      )}
                    </div>
                  )}
                </div>
                {!unknownMembership && (
                  <div
                    role="button"
                    className="px-3 py-0 border border-1 border-neural-base bg-white mr-3 cursor-pointer"
                    onClick={handleSubscriptionView}
                    tabIndex={0}
                    onKeyDown={handleSubscriptionView}
                  >
                    <span className="font-normal text-xs text-[#5D6B82] mb-4">
                      {member.activeBillingPackageEnrollment?.billingPackage
                        ?.isFfs
                        ? 'View Pricing'
                        : 'Benefits'}
                    </span>
                    <KeyboardArrowDownIcon />
                  </div>
                )}
              </div>
            </section>
          ) : (
            <TitleSkeleton />
          )}
        </div>
        {viewSubscriptionDetails && (
          <div
            className="absolute left-0 right-0 px-0 bg-[#FFFFFF] w-1/4 z-20 shadow-lg"
            style={{ top: memberDataHeight + 18 }}
          >
            <SubscriptionServiceLayout member={member} />
          </div>
        )}
        <MissingInfoBlock member={member} />

        <div className="flex flex-col h-full">
          {startSmartPayment ? (
            <div className="p-2">
              <SmartServiceCharge
                selectedService={membershipService}
                cancelSmartBilling={() => setStartSmartPayment(false)}
              />
            </div>
          ) : (
            <TabContext value={value}>
              <div className="flex justify-between items-center font-rubik font-medium">
                <TabList onChange={handleChange}>
                  <Tab
                    label="personal"
                    className="uppercase"
                    value="personal"
                    onClick={analytics.trackPersonalSectionAccessed}
                  />
                  <Tab
                    label="clinical"
                    className="uppercase"
                    value="clinical"
                    onClick={analytics.trackClinicalSectionAccessed}
                  />
                </TabList>
              </div>
              <div>
                <TabPanel value="personal" className="p-0">
                  <PersonalSection member={member} />
                </TabPanel>
              </div>
              <div>
                <TabPanel value="clinical" className="p-0">
                  <ClinicalSection />
                </TabPanel>
              </div>
            </TabContext>
          )}
        </div>
      </div>
    </div>
  ) : (
    <BiodataSkeleton />
  )
}

export default MemberBiodataLayout
