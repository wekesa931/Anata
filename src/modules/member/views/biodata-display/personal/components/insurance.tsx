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
  Divider,
  Tooltip,
} from '@mui/material'
import { formatCurreny } from 'src/modules/member/utils'
import { PortalForm } from 'src/modules/member/components/update-forms'
import { InsuranceForm } from 'src/modules/member/components/forms/insurance-form'
import { useNotifications } from 'src/context/notifications'
import type { Member } from 'src/modules/member/db/models'
import { ExpandMoreOutlined } from '@mui/icons-material'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'

function InsuranceSectionItem({
  insuranceItem,
}: {
  insuranceItem: DbValueTypes.InsuranceType
}) {
  const benefits = insuranceItem?.benefits || []
  const [expanded, setExpanded] = useState<boolean>(false)
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-base text-dark-blue-100 text-center font-medium">
          {' '}
          {insuranceItem?.insuranceCompany || 'Unknown'}
        </p>
        <div className="flex gap-3 justify-start items-center">
          <p className="text-base text-dark-blue-100 text-center font-medium">
            {insuranceItem?.insuranceId}
          </p>
          <Tooltip
            title={
              insuranceItem?.verificationStatus === 'VERIFIED'
                ? 'This member insurance ID has been verified'
                : 'We could not find this member insurance ID'
            }
            placement="top"
            arrow
          >
            <span
              className={`
                text-xs font-rubik font-medium text-center rounded-lg p-1 uppercase
                ${
                  insuranceItem?.verificationStatus === 'VERIFIED'
                    ? 'text-green-100 bg-green-10'
                    : 'text-red-100 bg-red-10'
                }
              `}
            >
              {insuranceItem?.verificationStatus}
            </span>
          </Tooltip>
        </div>
      </div>
      <GridItems className="mt-2" single>
        <Item
          title="Health policy"
          child={insuranceItem?.healthPolicy || '-'}
        />
      </GridItems>

      {benefits.length === 0 ? (
        <>
          <GridItems>
            <ItemTitle title="Benefit" />
            <ItemTitle title="Balance" />
          </GridItems>
          <GridItems>
            <ItemChild child="-" />
            <ItemChild child="-" />
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
              {benefits.map((benefit, index) => (
                <GridItems key={benefit?.id || index}>
                  <ItemChild child={benefit?.benefit?.name || '-'} />
                  <ItemChild
                    child={formatCurreny(
                      (benefit?.benefit?.limit || 0) -
                        (benefit?.utilizedPortion || 0)
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
            insuranceItem?.principalMemberInsuranceId
              ? `Insurance ID: ${insuranceItem?.principalMemberInsuranceId} - ${insuranceItem?.relationshipToPrincipalMember}`
              : '-'
          }
        />
      </GridItems>
    </div>
  )
}

type InsuranceSectionProps = {
  member: Member | null
}

function InsuranceSection({ member }: InsuranceSectionProps) {
  const [showEditForm, setShowEditForm] = React.useState(false)
  const [isEdited, setIsEdited] = React.useState(false)
  const { notify } = useNotifications()
  const analytics = useMemberAnalytics()

  const toggleEditForm = (open: boolean) => {
    setShowEditForm(open)

    analytics.trackEditProfile(
      `Edit insurance and employer ${open ? 'opened' : 'closed'}`
    )
  }

  return member ? (
    <div>
      {showEditForm && (
        <PortalForm
          modalTitle="Edit Insurance & Employer"
          handleClose={() => toggleEditForm(false)}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
          handleOpen={() => toggleEditForm(true)}
        >
          {({ handleClose }) => (
            <InsuranceForm
              member={member}
              setCompleted={() => {
                notify('Insurance info updated')
                handleClose()
              }}
              primaryMember={undefined}
              showWizardContols={false}
            />
          )}
        </PortalForm>
      )}
      <SectionItem
        title="Insurance & Employer"
        editable
        handleEdit={() => toggleEditForm(true)}
      >
        <GridItems>
          <Item title="Employer" child={member?.employer?.name} />
          <Item title="Department" child={member?.employer?.department?.name} />
        </GridItems>
        <Divider className="my-4" />
        {member?.insuranceDetails?.length === 0 ? (
          <div className=" h-16 bg-red-20 mx-1 py-2 rounded-lg font-rubik text-dark-blue-100 w-full">
            <h3 className="text-sm text-center">No insurance ID available</h3>
            <p className="text-xs text-center">
              Please collect information from member
            </p>
          </div>
        ) : (
          <>
            {member?.insuranceDetails?.map((insurance, index) => (
              <InsuranceSectionItem key={index} insuranceItem={insurance} />
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
