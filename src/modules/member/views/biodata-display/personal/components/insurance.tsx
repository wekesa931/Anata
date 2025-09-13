import React, { useState } from 'react'
import { DbValueTypes } from 'src/modules/member/types'
import {
  SectionItem,
  Item,
  GridItems,
  ItemTitle,
  ItemChild,
} from 'src/components/layouts/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Tooltip,
} from '@mui/material'
import { formatCurrency } from 'src/modules/member/utils'
import { PortalForm } from 'src/modules/member/components/update-forms'
import InsuranceForm from 'src/modules/member/components/forms/billing/index'
import MembershipForm from 'src/modules/member/components/forms/billing/components/membership-form'
import { useNotifications } from 'src/context/notifications'
import type { Member } from 'src/modules/member/db/models'
import { ExpandMoreOutlined } from '@mui/icons-material'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'

function InsuranceSectionItem({
  insuranceItem,
  onEdit,
}: {
  insuranceItem: any
  onEdit: () => void
}) {
  const benefits = insuranceItem?.benefits || []
  const [expanded, setExpanded] = useState<boolean>(false)
  return (
    <div>
      <GridItems className="mt-2" single>
        <Item
          title="Insurance Provider"
          child={'Jubilee Insurance'}
        />
      </GridItems>
      <div className="flex gap-3 justify-start items-center">
        <GridItems className="mt-2" single>
          <Item title="Insurance ID" child={'1234567890'} />
        </GridItems>
        <Tooltip
          title={
            true
              ? 'This member insurance ID has been verified'
              : 'We could not find this member insurance ID'
          }
          placement="top"
          arrow
        >
          <span
            className={`
                text-xs font-rubik font-medium text-center rounded-lg p-1 mt-3 uppercase 
                ${
                  true
                    ? 'text-green-100 bg-green-10'
                    : 'text-red-100 bg-red-10'
                }
              `}
          >
            {'Verified'}
          </span>
        </Tooltip>
        <div className="flex items-center justify-end mt-3 ml-auto">
          <Button
            variant="text"
            onClick={onEdit}
            className="text-blue-100 text-sm font-medium normal-case"
          >
            Edit Insurance ID Status
          </Button>
        </div>
      </div>
      <GridItems className="mt-2" single>
        <Item
          title="Health policy"
          child={'Jubilee Health Policy'}
        />
      </GridItems>

      {benefits.length === 0 ? (
        <>
          <GridItems>
            <ItemTitle title="Benefit" />
            <ItemTitle title="Balance" />
          </GridItems>
          <GridItems>
            <ItemChild child="100,000" />
            <ItemChild child="80,000" />
          </GridItems>
        </>
      ) : (
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
            <ItemTitle title="Benefits" />
          </AccordionSummary>
          <AccordionDetails>
            <>
              <GridItems>
                <ItemTitle title="Benefit" />
                <ItemTitle title="Balance" />
              </GridItems>
              {benefits.map((benefit: any, index: number) => (
                <GridItems key={'765'}>
                  <ItemChild child={'Healthcare'} />
                  <ItemChild
                    child={formatCurrency(
                      (100000) -
                        (20000)
                    )}
                  />
                </GridItems>
              ))}
            </>
          </AccordionDetails>
        </Accordion>
      )}
      <GridItems single>
        <Item
          title="Principal member info"
          child={
            true
              ? `Insurance ID: 2321`
              : '-'
          }
        />
      </GridItems>
      {false && (
        <GridItems className="mt-2 bg-red-20 p-2 rounded-md" single>
          <Item
            title="Reason for verification failure"
            child={'Verification failed'}
          />
        </GridItems>
      )}
    </div>
  )
}

type InsuranceSectionProps = {
  member: Member | null
}

function InsuranceSection({ member }: InsuranceSectionProps) {
  const [showEditForm, setShowEditForm] = React.useState(false)
  const [isEdited, setIsEdited] = React.useState(false)
  const [isEditInsuranceDetailsView, setIsEditInsuranceDetailsView] =
    React.useState(false)
  const { notify } = useNotifications()
  const analytics = useMemberAnalytics()

  const toggleEditForm = (open: boolean) => {
    setShowEditForm(open)

    analytics.trackEditProfile(
      `Edit insurance and employer ${open ? 'opened' : 'closed'}`
    )
  }

  const setCompleted = async () => {
    setIsEditInsuranceDetailsView(false)
    toggleEditForm(false)
  }

  return true ? (
    <div>
      {showEditForm && (
        <PortalForm
          modalTitle="Edit Insurance & Employer"
          handleClose={() => toggleEditForm(false)}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
          handleOpen={() => toggleEditForm(true)}
        >
          {() => (
            <>
              {!isEditInsuranceDetailsView ? (
                <InsuranceForm
                  member={member}
                  primaryMember={undefined}
                  setCompleted={() => {
                    notify('Insurance info updated')
                  }}
                  showWizardControls
                  hasOnPrev={false}
                  isRestrictedUser
                  setNextResctrictedPhase={setIsEditInsuranceDetailsView}
                />
              ) : (
                <MembershipForm
                  member={member}
                  primaryMember={undefined}
                  setCompleted={setCompleted}
                />
              )}
            </>
          )}
        </PortalForm>
      )}
      <SectionItem
        title="Insurance & Employer"
        editable
        handleEdit={() => toggleEditForm(true)}
      >
        <GridItems>
          <Item title="Employer" child={'Airtel Limited'} />
          <Item title="Department" child={'Communications'} />
        </GridItems>
        <Divider className="my-4" />
        {[1].length === 0 ? (
          <div className=" h-16 bg-red-20 mx-1 py-2 rounded-lg font-rubik text-dark-blue-100 w-full">
            <h3 className="text-sm text-center">No insurance ID available</h3>
            <p className="text-xs text-center">
              Please collect information from member
            </p>
          </div>
        ) : (
          <>
            {[1].map((insurance, index) => (
              <InsuranceSectionItem
                key={index}
                insuranceItem={insurance}
                onEdit={() => toggleEditForm(true)}
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

export default InsuranceSection
