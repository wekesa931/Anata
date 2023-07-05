import React from 'react'
import { DbValueTypes } from 'src/modules/member/types'
import {
  SectionItem,
  Item,
  GridItems,
  ItemTitle,
  ItemChild,
} from 'src/modules/member/components/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import { Box, Divider } from '@mui/material'
import { formatCurreny } from 'src/modules/member/utils'
import { PortalForm } from 'src/modules/member/components/update-forms'
import { InsuranceForm } from 'src/modules/member/components/forms/insurance-form'
import { useNotifications } from 'src/context/notifications'
import type { Member } from 'src/modules/member/db/models'

function InsuranceSectionItem({
  insuranceItem,
}: {
  insuranceItem: DbValueTypes.InsuranceType
}) {
  const benefits = insuranceItem?.benefits || []
  return (
    <div>
      <div className="flex justify-between items-center">
        <Box
          className="h-8 w-25"
          component="img"
          src={insuranceItem?.insuranceCompanyLogo || ''}
          alt={insuranceItem?.insuranceCompany || ''}
        />
        <div className="flex gap-3 justify-start items-center">
          <p className="text-base text-dark-blue-100 text-center font-medium">
            {insuranceItem?.insuranceId}
          </p>
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
        </div>
      </div>
      <GridItems single>
        <Item
          title="Health policy"
          child={insuranceItem?.healthPolicy || '-'}
        />
      </GridItems>
      <GridItems>
        <ItemTitle title="Benefit" />
        <ItemTitle title="Balance" />
      </GridItems>
      {benefits.length === 0 ? (
        <GridItems>
          <ItemChild child="-" />
          <ItemChild child="-" />
        </GridItems>
      ) : (
        <>
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

  return member ? (
    <div>
      {showEditForm && (
        <PortalForm
          modalTitle="Edit Insurance & Employer"
          handleClose={() => setShowEditForm(false)}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
          handleOpen={() => setShowEditForm(true)}
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
        handleEdit={() => setShowEditForm(true)}
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
