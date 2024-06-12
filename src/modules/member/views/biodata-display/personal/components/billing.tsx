import React, { useState } from 'react'
import { MemberCohortType } from 'src/modules/member/types'
import {
  SectionItem,
  GridItems,
  ItemTitle,
  ItemChild,
} from 'src/components/layouts/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from '@mui/material'
import type { Member } from 'src/modules/member/db/models'
import { ExpandMoreOutlined } from '@mui/icons-material'
import DoneIcon from '@mui/icons-material/Done'
import Tooltip from 'src/components/tooltip'
import { GridCloseIcon } from '@mui/x-data-grid'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import EmptyDataIcon from 'src/assets/img/icons/empty-data.svg'

function formatDate(dateString: any) {
  return format(new Date(dateString), 'MMMM yyyy')
}

function BillingSectionItem({
  memberCohortItem,
}: {
  memberCohortItem: MemberCohortType
}) {
  const [expanded, setExpanded] = useState<boolean>(false)
  const memberConsent =
    memberCohortItem?.isOptInRequired === 'Yes' && !!memberCohortItem?.optedInAt
  const billingStatus =
    memberCohortItem?.subscriptionStatus === 'ACTIVE'
      ? 'Eligible'
      : 'Not eligible'
  return (
    <div>
      {billingStatus === 'Not eligible' && (
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <ItemTitle title="Reason(s)" />
          </div>
          {memberCohortItem?.remarks}
        </div>
      )}

      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        className="block border rounded-xl border-solid border-dark-blue-10 my-1 mb-4 shadow-none"
        sx={{
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
          <div>
            <h4 className="text-dark-blue-100 mt-2">
              {memberCohortItem?.name?.toUpperCase().split('KES')[0].trim()}{' '}
            </h4>
            <p className="text-dark-blue-50 mt-1 mb-2 text-sm">
              {memberCohortItem?.revenueModelName}
            </p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <>
            <Divider />
            <GridItems single className="mt-5">
              <div className="flex items-center justify-between gap-1 mb-4">
                <p className="text-dark-blue-100"> Billing method </p>
                <ItemChild
                  child={memberCohortItem?.billingMethod}
                  className="text-dark-blue-50"
                />
              </div>
            </GridItems>
            <GridItems single>
              <div className="flex items-center justify-between gap-1 mb-4">
                <p className="text-dark-blue-100">Amount </p>
                <ItemChild
                  child={`KES ${memberCohortItem?.skuRate}`}
                  className="text-dark-blue-50"
                />
              </div>
            </GridItems>
            <GridItems single>
              <div className="flex items-center justify-between gap-1 mb-4">
                <p className="text-dark-blue-100"> Frequency</p>
                <ItemChild
                  child={memberCohortItem?.billingFrequency}
                  className="text-dark-blue-50"
                />
              </div>
            </GridItems>
            <GridItems single>
              <div className="flex items-center justify-between gap-1 mb-4">
                <p className="text-dark-blue-100"> Status</p>
                <ItemChild
                  child={memberCohortItem?.subscriptionStatus}
                  className="text-dark-blue-50"
                />
              </div>
            </GridItems>
            <GridItems single>
              <div className="flex items-center justify-between gap-1 mb-4">
                <p className="text-dark-blue-100"> Member Consent</p>
                <ItemChild
                  child={memberConsent ? 'Agree' : '-'}
                  className="text-dark-blue-50"
                />
              </div>
            </GridItems>
            <div>
              <h1 className="text-dark-blue-100 font-semibold">
                Recent Bills:{' '}
              </h1>
            </div>

            {memberCohortItem?.billingEvents?.length === 0 ? (
              <div className="justify-center items-center flex w-full p-2">
                <p className="text-dark-blue-50 font-rubik text-center text-xs">
                  This member does not have any recent bills
                </p>
              </div>
            ) : (
              <>
                {memberCohortItem?.billingEvents?.map((events) => (
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-dark-blue-100 text-center font-rubik text-sm flex justify-start">
                        {dayjs(events?.createdAt).format('DD MMMM YYYY')}
                      </h4>
                      <p className="text-xs text-dark-blue-50 ">
                        Subscription{' '}
                        {formatDate(events?.billingPeriodStartDate)} to{' '}
                        {formatDate(events?.billingPeriodEndDate)}
                      </p>
                    </div>
                    <ItemChild
                      child={events?.amount}
                      className="text-dark-blue-50"
                    />
                  </div>
                ))}
              </>
            )}
          </>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

type BillingSectionProps = {
  member: Member | null
}

function BillingSection({ member }: BillingSectionProps) {
  const verification =
    member?.verificationStatus === 'VERIFIED' ? 'Eligible' : 'Not eligible'
  const memberCohortDetails: MemberCohortType[] = member?.membercohortSet || []

  return member ? (
    <div id="billing-section">
      <SectionItem>
        <div className="mb-4">
          <ItemTitle title="Billing and Service" />
        </div>
        <GridItems single>
          <div className="flex items-center justify-between gap-1 mb-4">
            <p className="text-dark-blue-100">Antara service eligibility:</p>
            <div className="flex items-center gap-2">
              <ItemChild
                child={verification}
                className="ml-2 text-dark-blue-50"
              />
              <Tooltip>
                {verification === 'Eligible' ? (
                  <DoneIcon className="text-[#ebfbed] bg-[#34c759] w-6 h-6 rounded-2xl" />
                ) : (
                  <GridCloseIcon className="text-[#ebfbed] bg-rose-500 w-6 h-6 rounded-2xl" />
                )}
              </Tooltip>
            </div>
          </div>
        </GridItems>
        <GridItems single>
          <div className="flex items-center justify-between gap-1 mb-4">
            <p className="text-dark-blue-100">Billing Eligibility:</p>
            {memberCohortDetails.length === 0 ? (
              <div className="flex items-center gap-2">
                <ItemChild
                  child="Not eligible"
                  className="ml-2 text-dark-blue-50"
                />
                <GridCloseIcon className="text-[#ebfbed] bg-rose-500 w-6 h-6 rounded-2xl" />
              </div>
            ) : (
              <>
                {memberCohortDetails.map((cohort) => {
                  const billingStatus =
                    cohort?.subscriptionStatus === 'ACTIVE'
                      ? 'Eligible'
                      : 'Not eligible'
                  return (
                    <div className="flex items-center gap-2">
                      <ItemChild
                        child={billingStatus}
                        className="ml-2 text-dark-blue-50"
                      />
                      <Tooltip>
                        {billingStatus === 'Not eligible' ? (
                          <GridCloseIcon className="text-[#ebfbed] bg-rose-500 w-6 h-6 rounded-2xl" />
                        ) : (
                          <DoneIcon className="text-[#ebfbed] bg-[#34c759] w-6 h-6 rounded-2xl" />
                        )}
                      </Tooltip>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </GridItems>

        <div className="mb-4 mt-5">
          <ItemTitle title="Cohorts" />
        </div>

        {memberCohortDetails.length === 0 ? (
          <div className="flex flex-col justify-start items-center font-rubik my-2">
            <EmptyDataIcon />
            <p className="text-base font-medium">Missing cohort</p>
            <p className="text-sm text-dark-blue-100">
              {' '}
              It seems like this member does not belong to a billing cohort
            </p>
            <p className="text-sm text-dark-blue-100">
              Please resolve that and check back
            </p>
          </div>
        ) : (
          <>
            {memberCohortDetails.map((cohort, index) => (
              <BillingSectionItem memberCohortItem={cohort} key={index} />
            ))}
          </>
        )}
      </SectionItem>
    </div>
  ) : (
    <BlockSekeleton />
  )
}

export default BillingSection
