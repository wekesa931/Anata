import React from 'react'
import { V2MemberType, MemberStatuses } from 'src/modules/member/types'
import {
  SectionItem,
  ItemTitle,
} from 'src/modules/member/components/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import { calcAge } from 'src/utils/date-time/date-formatters'
import type { Member } from 'src/modules/member/db/models'

const StatusIs = (status: string) => {
  return {
    green: status === MemberStatuses.ACTIVE,
    blue: status === MemberStatuses.PROVISIONED,
    red:
      status === MemberStatuses.DECEASED || status === MemberStatuses.UNKNOWN,
  }
}

function DependentItem({
  dependent,
  isPrimary = false,
}: {
  dependent: V2MemberType
  isPrimary: boolean
}) {
  const status = dependent?.status?.toUpperCase()
  const statusIs = StatusIs(status || '')

  return (
    <a
      href={`/member/${dependent?.antaraId}`}
      className={`block border rounded-lg border-solid border-dark-blue-10 my-1 p-1 ${
        isPrimary ? 'bg-dark-blue-10' : 'bg-white-100'
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-dark-blue-100 text-center font-rubik text-sm">
            {dependent?.fullName}, {calcAge(dependent?.birthDate)}
          </h4>
          <p className="text-xs text-dark-blue-50 ">
            {isPrimary ? 'Primary member' : dependent?.relationshipToPrimary}
          </p>
        </div>
        <div
          className={`
            p-1 rounded-lg text-sm font-rubik font-medium uppercase text-center
            ${
              statusIs.green
                ? 'bg-green-10 text-green-100'
                : statusIs.blue
                ? 'bg-blue-10 text-blue-100'
                : statusIs.red
                ? 'bg-red-10 text-red-100'
                : 'bg-dark-blue-20 text-dark-blue-100'
            }
          `}
        >
          {status}
        </div>
      </div>
    </a>
  )
}

type DependentsSectionProps = {
  member: Member | null
}

function DependentsSection({ member }: DependentsSectionProps) {
  const allDependents: V2MemberType[] = [
    ...(member?.dependents || []),
    ...(member?.otherDependents || []),
  ]
  const primaryDependent: V2MemberType | null = member?.primary || null

  return member ? (
    <SectionItem>
      <div className="mb-4">
        <ItemTitle title="Household" />
      </div>
      <>
        {!primaryDependent && !allDependents.length && (
          <div className="justify-center items-center flex w-full p-2">
            <p className="text-dark-blue-50 font-rubik text-center text-xs">
              No other household member available
            </p>
          </div>
        )}
      </>
      {!!primaryDependent && (
        <DependentItem dependent={primaryDependent} isPrimary />
      )}
      {!!allDependents.length && (
        <>
          {allDependents.map((dependent, index) => (
            <DependentItem
              dependent={dependent}
              key={index}
              isPrimary={false}
            />
          ))}
        </>
      )}
    </SectionItem>
  ) : (
    <BlockSekeleton />
  )
}

export default DependentsSection
