import React from 'react'
import {
  V2MemberType,
  MemberStatuses,
  RosterMemberType,
} from 'src/modules/member/types'
import {
  SectionItem,
  ItemTitle,
} from 'src/components/layouts/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import { calcAge } from 'src/utils/date-time/date-formatters'
import { Member } from 'src/modules/member/db/models'
import PrimaryButton from 'src/components/buttons/primary'
import { useRegistrationForm } from 'src/context/member-registration'

const StatusIs = (status: string) => {
  return {
    green: status === MemberStatuses.ACTIVE,
    blue: status === MemberStatuses.PROVISIONED,
    red:
      status === MemberStatuses.DECEASED || status === MemberStatuses.UNKNOWN,
  }
}

export enum DependentSource {
  V2SCHEMA,
  ROSTER,
}

type DependentItemProps = {
  dependent: V2MemberType | RosterMemberType
  isPrimary: boolean
  dependentSource?: DependentSource
}

type V2DependentItemProps = {
  dependent: V2MemberType
  isPrimary: boolean
}

type RosterDependentItemProps = {
  dependent: RosterMemberType
}
function RosterDependentItem({ dependent }: RosterDependentItemProps) {
  const { openFormWithParams } = useRegistrationForm()
  const relationshipToPrinciple =
    dependent?.relationshipToPrinciple === 'CHILD' ? 'child' : 'dependent'

  return (
    <div
      className={`block border rounded-lg border-solid border-dark-blue-10 my-1 p-1 'bg-white-100'`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-dark-blue-100 text-center font-rubik text-sm">
            {dependent?.fullName}, {calcAge(dependent?.birthDate)}
          </h4>
          <p className="text-xs text-dark-blue-50 ">-</p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <p className="text-xs text-dark-blue-50 ">(Roster)</p>
          <PrimaryButton
            variant="text"
            onClick={() =>
              openFormWithParams(true, {
                member: dependent,
                registrationForm: relationshipToPrinciple,
              })
            }
          >
            Register
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
function V2DependentItem({
  dependent,
  isPrimary = false,
}: V2DependentItemProps) {
  const status = dependent?.status?.toUpperCase()
  const statusIs = StatusIs(status || '')

  return (
    <a
      target="_blank"
      href={`/member/${dependent?.antaraId}`}
      className={`block border rounded-lg border-solid border-dark-blue-10 my-1 p-1 ${
        isPrimary ? 'bg-dark-blue-10' : 'bg-white-100'
      }`}
      rel="noreferrer"
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
export function DependentItem({
  dependent,
  isPrimary,
  dependentSource = DependentSource.V2SCHEMA,
}: DependentItemProps) {
  if (dependentSource === DependentSource.ROSTER) {
    return <RosterDependentItem dependent={dependent as RosterMemberType} />
  }
  return (
    <V2DependentItem
      dependent={dependent as V2MemberType}
      isPrimary={isPrimary}
    />
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
  const roster: RosterMemberType | null = member?.rosterMember || null
  const filteredDependents = roster?.dependents?.filter(
    (dependent) => !dependent?.v2Member
  )

  return true ? (
    <SectionItem>
      <div className="mb-4">
        <ItemTitle title="Household" />
      </div>
      <>
        {!primaryDependent &&
          !allDependents.length &&
          !roster?.dependents?.length && (
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
      {!!filteredDependents && (
        <>
          {filteredDependents.map((dependent, index) => (
            <DependentItem
              dependent={dependent}
              isPrimary={false}
              key={index}
              dependentSource={DependentSource.ROSTER}
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
