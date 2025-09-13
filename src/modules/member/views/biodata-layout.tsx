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
import { formatCurrency } from '../utils'

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

  const memberBillingScheme =
    member?.activeBillingPackageEnrollment?.billingSchemeSubscription
      ?.billingScheme

  return true ? (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-white-100 flex justify-start flex-col overflow-y-auto border-l border-2 border-solid border-dark-blue-10 border-b-0">
        <div
          ref={memberDataRef}
          className={`py-2 px-0 items-center justify-between sticky top-0 w-full z-10 bg-[#98EBA5]`}
        >
          {true ? (
            <section>
              <h3 className="font-rubik font-medium text-xl pl-4 text-dark-blue-100 ">
                {`Bill Adams Wekesa 33yrs`}
                {true && (
                  <span className="w-6 h-6 bg-red-50 text-white rounded-[50%] ml-1 py-[2px] px-[6px]">
                    M
                  </span>
                )}
              </h3>
              <div className="flex pl-4 justify-between mt-2 items-center">
                <div className="text-[#5D6B82] ">

                  {false ? (
                    <div>Unknown Membership</div>
                  ) : (
                    <div>
                      <p className="font-medium mb-1">
                        {false
                          ? 'Fee for Service'
                          : 'Unlimited Membership'}
                      </p>
                      <p className="font-normal text-xs">
                        since 08/2024
                      </p>
                      {member?.shouldRenewMembership && (
                        <PrimaryButton
                          className="capitalize mt-2 bg-orange-100"
                          onClick={onMembershipSmartPayment}
                        >
                          Collect Payment <br />
                          {formatCurrency(1000)}
                        </PrimaryButton>
                      )}
                    </div>
                  )}
                </div>
                {true && (
                  <div
                    role="button"
                    className="px-3 py-0 border border-1 border-neural-base bg-white mr-3 cursor-pointer"
                    onClick={handleSubscriptionView}
                    tabIndex={0}
                    onKeyDown={handleSubscriptionView}
                  >
                    <span className="font-normal text-xs text-[#5D6B82] mb-4">
                      {true
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
        {/* <MissingInfoBlock member={member} /> */}

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
