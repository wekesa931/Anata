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
import { toTitleCase } from 'src/utils/text-utils'

function BillingSectionItem({
  memberCohortItem,
  expanded,
  handleChange,
}: {
  memberCohortItem: MemberCohortType
  expanded: boolean
  handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void
}) {
  const memberConsent =
    memberCohortItem?.isOptInRequired === 'Yes' ? 'Agree' : 'Not required'
  const activeStatus = memberCohortItem?.subscriptionStatus === 'ACTIVE'

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        className="block border rounded-xl border-solid border-dark-blue-10 my-1 mb-2 shadow-none"
        sx={{
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
          <div className="mb-1">
            <h4 className="text-dark-blue-100 mt-2">
              {memberCohortItem?.name?.toUpperCase().split('KES')[0].trim()}{' '}
            </h4>
            <p className="text-dark-blue-50 text-sm mt-2 mb-2">
              {memberCohortItem?.revenueModelName}
            </p>
            <span
              className={`inline-block px-4 py-1 mt-2 gap-4 text-xs font-medium rounded-full ${
                activeStatus
                  ? 'bg-[#ebfbed] text-[#34c759]'
                  : 'text-red-100 bg-red-10'
              }`}
            >
              {toTitleCase(memberCohortItem?.subscriptionStatus)}
            </span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <>
            <Divider />
            <GridItems single className="mt-2">
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
            <GridItems single>
              <div className="flex items-center justify-between gap-1">
                <p className="text-dark-blue-100"> Status</p>
                <ItemChild
                  child={toTitleCase(memberCohortItem?.subscriptionStatus)}
                  className="text-dark-blue-50"
                />
              </div>
            </GridItems>
            {memberCohortItem?.subscriptionStatus !== 'ACTIVE' && (
              <>
                {memberCohortItem?.remarks?.map((res) => (
                  <GridItems single key={res?.remark}>
                    <div className="flex flex-col gap-2 bg-table-col-grey rounded-xl px-2 py-2">
                      <p className="text-dark-blue-70 font-medium">{`Cohort ${memberCohortItem?.subscriptionStatus?.toLowerCase()} reason(s)`}</p>
                      <div className="text-dark-blue-70 font-rubik text-base font-normal">
                        {res?.remark}
                      </div>
                    </div>
                  </GridItems>
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
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false
  )

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : false)
    }
  const verification =
    member?.verificationStatus === 'VERIFIED' ? 'Eligible' : 'Not eligible'
  const memberStatus = member?.status
  const memberCohortDetails: MemberCohortType[] = member?.membercohortSet || []

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
              <BillingSectionItem
                memberCohortItem={cohort}
                key={index}
                expanded={expandedAccordion === `panel${index}`}
                handleChange={handleAccordionChange(`panel${index}`)}
              />
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
