import React from 'react'
import { DbValueTypes } from 'src/modules/member/types'
import {
  SectionItem,
  Item,
  GridItems,
  ItemTitle,
  ItemChild,
} from 'src/modules/member/components/display-items.component'
import { useMember } from 'src/context/member'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import { Box } from '@mui/material'
import { formatCurreny } from 'src/modules/member/utils'
import EmptyBlock from 'src/modules/member/components/empty-block'

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

function InsuranceSection() {
  const { member } = useMember()
  return member ? (
    <SectionItem>
      {member?.insuranceDetails?.length === 0 ? (
        <EmptyBlock>
          <h3 className="text-sm text-center">No insurance ID available</h3>
          <p className="text-xs text-center">
            Please collect information from member
          </p>
        </EmptyBlock>
      ) : (
        <>
          {member?.insuranceDetails?.map((insurance, index) => (
            <InsuranceSectionItem key={index} insuranceItem={insurance} />
          ))}
        </>
      )}
    </SectionItem>
  ) : (
    <BlockSekeleton />
  )
}

export default InsuranceSection
