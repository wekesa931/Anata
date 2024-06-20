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
import EmptyDataIcon from 'src/assets/img/icons/empty-data.svg'
import dayjs from 'dayjs'

function BillingSectionItem({
  memberCohortItem,
}: {
  memberCohortItem: MemberCohortType
}) {
  const [expanded, setExpanded] = useState<boolean>(false)
  const memberConsent =
    memberCohortItem?.isOptInRequired === 'Yes' ? 'Agree' : 'Not required'

  return (
    <div>
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
              <div className="flex items-center justify-between gap-1">
                <p className="text-dark-blue-100"> Billing method </p>
                <ItemChild
                  child={memberCohortItem?.billingMethod}
                  className="text-dark-blue-50"
                />
              </div>
            </GridItems>
            <GridItems single>
              <div className="flex items-center justify-between gap-1">
                <p className="text-dark-blue-100">Amount </p>
                <ItemChild
                  child={`KES ${memberCohortItem?.skuRate}`}
                  className="text-dark-blue-50"
                />
              </div>
            </GridItems>
            <GridItems single>
              <div className="flex items-center justify-between gap-1">
                <p className="text-dark-blue-100"> Frequency</p>
                <ItemChild
                  child={memberCohortItem?.billingFrequency}
                  className="text-dark-blue-50"
                />
              </div>
            </GridItems>
            <GridItems single>
              <div className="flex items-center justify-between gap-1">
                <p className="text-dark-blue-100"> Status</p>
                <ItemChild
                  child={memberCohortItem?.subscriptionStatus}
                  className="text-dark-blue-50"
                />
              </div>
            </GridItems>
            {memberCohortItem?.subscriptionStatus !== 'Active' && (
              <GridItems single>
                <div className="flex justify-between items-start">
                  <p className="text-dark-blue-100 shrink"> Reason</p>
                  <div className="text-dark-blue-50 ml-20 text-base font-rubik flex justify-end">
                    {memberCohortItem?.remarks ?? '-'}
                  </div>
                </div>
              </GridItems>
            )}
            <GridItems single>
              <div className="flex items-center justify-between gap-1">
                <p className="text-dark-blue-100"> Member Consent</p>
                <ItemChild
                  child={memberConsent}
                  className="text-dark-blue-50"
                />
              </div>
            </GridItems>
            {memberConsent === 'Agree' && (
              <GridItems single>
                <div className="flex items-center justify-between gap-1">
                  <p className="text-dark-blue-100"> Opted in at </p>
                  <ItemChild
                    child={dayjs(memberCohortItem?.optedInAt).format(
                      'DD MMMM YYYY'
                    )}
                    className="text-dark-blue-50"
                  />
                </div>
              </GridItems>
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
  const memberStatus = member?.status
  const memberCohortDetails: MemberCohortType[] = member?.membercohortSet || []

  const cohortsWithRemarks = memberCohortDetails.filter(
    (cohort) => cohort.remarks
  )
  const remarks = Array.from(
    new Set(cohortsWithRemarks.map((cohort) => cohort.remarks))
  )

  const billingEligibility = () => {
    const activeCohorts = memberCohortDetails.filter(
      (cohort) => cohort.subscriptionStatus === 'ACTIVE'
    )
    if (activeCohorts.length > 0 && memberStatus === 'Active') {
      return 'Eligible'
    }

    return 'Not eligible'
  }

  return member ? (
    <div id="billing-section">
      <SectionItem>
        <div className="mb-4">
          <ItemTitle title="Billing and Service" />
        </div>
        <GridItems single>
          <div className="flex items-center justify-between gap-1">
            <p className="text-dark-blue-100">Antara service eligibility:</p>
            <div className="flex items-center gap-2">
              <ItemChild
                child={verification}
                className="ml-2 text-dark-blue-50"
              />
              <Tooltip>
                {verification === 'Eligible' ? (
                  <DoneIcon className="text-[#ebfbed] bg-[#34c759] w-4 h-4 rounded-2xl" />
                ) : (
                  <GridCloseIcon className="text-[#ebfbed] bg-rose-500 w-4 h-4 rounded-2xl" />
                )}
              </Tooltip>
            </div>
          </div>
        </GridItems>

        <GridItems single>
          <div className="flex items-center justify-between gap-1 mb-2">
            <p className="text-dark-blue-100">Billing Eligibility:</p>
            <div className="flex items-center gap-2">
              <ItemChild
                child={billingEligibility()}
                className="ml-2 text-dark-blue-50"
              />
              <Tooltip>
                {billingEligibility() === 'Eligible' ? (
                  <DoneIcon className="text-[#ebfbed] bg-[#34c759] w-4 h-4 rounded-2xl" />
                ) : (
                  <GridCloseIcon className="text-[#ebfbed] bg-rose-500 w-4 h-4 rounded-2xl" />
                )}
              </Tooltip>
            </div>
          </div>
        </GridItems>

        {billingEligibility() === 'Not eligible' &&
          cohortsWithRemarks.length > 0 && (
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <ItemTitle title="Reason(s)" />
              </div>
              {remarks.map((remark, index) => (
                <p key={index}>{remark}</p>
              ))}
            </div>
          )}

        <div className="mb-4 mt-5">
          <ItemTitle title="Cohorts" />
        </div>

        {memberCohortDetails.length === 0 ? (
          <div className="flex flex-col justify-center items-center font-rubik my-2">
            <EmptyDataIcon />
            <p className="text-base font-medium text-center">Missing cohort</p>
            <div className="text-sm text-dark-blue-100 text-center">
              <p>
                It seems like this member does not belong to a billing cohort
              </p>
              <p>Please resolve that and check back</p>
            </div>
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
