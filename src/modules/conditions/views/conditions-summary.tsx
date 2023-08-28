import React from 'react'
import {
  SectionItem,
  ItemTitle,
} from 'src/components/layouts/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import { useConditionData } from 'src/modules/conditions/hooks/condition.data'
import { CurrentClinicalStatus } from 'src/modules/conditions/types'
import { Condition } from 'src/modules/conditions/db/models'
import { Link } from 'react-router-dom'
import { useModuleAnalytics } from 'src/modules/analytics'

const StatusIs = (status: string) => {
  return {
    green: status === CurrentClinicalStatus.CONTROLLED,
    red: status === CurrentClinicalStatus.UNCONTROLLED,
  }
}

type ConditionItemProps = {
  condition: Condition
}

function ConditionItem({ condition }: ConditionItemProps) {
  const status = condition?.currentClinicalStatus
  const statusIs = StatusIs(status || '')
  const analytics = useModuleAnalytics()

  return (
    <Link
      to="?view=conditions"
      state={{ conditionId: condition.id }}
      onClick={() => {
        // eslint-disable-next-line no-underscore-dangle
        analytics.trackConditionsSummaryOpened(condition._raw)
      }}
    >
      <div className="block border rounded-lg border-solid border-dark-blue-10 my-2 p-3 cursor-pointer">
        <div className="flex justify-between items-center">
          <h4 className="text-dark-blue-100 font-medium font-rubik text-sm">
            {condition?.condition}
          </h4>

          {status && (
            <div
              className={`
                p-1 rounded-lg text-sm font-rubik font-medium uppercase ml-auto mr-2
                ${
                  statusIs.green
                    ? 'bg-green-10 text-green-100'
                    : 'bg-red-10 text-red-100'
                }
              `}
            >
              {status}
            </div>
          )}
          {condition?.healthStatus && (
            <p className="block border rounded-lg border-solid border-dark-blue-10 p-1 bg-dark-blue-10 text-center text-dark-blue-50 text-sm font-medium uppercase">
              {condition?.healthStatus}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

function ConditionsSection() {
  const { memberConditions, loading } = useConditionData()

  return (
    <SectionItem>
      <>
        <ItemTitle title="Active Conditions" />
        {loading ? (
          <BlockSekeleton height={100} />
        ) : (
          <div>
            {memberConditions?.length > 0 ? (
              <>
                {memberConditions
                  .filter((info) => info.conditionStatus === 'Active')
                  .map((info, index) => (
                    <ConditionItem condition={info} key={index} />
                  ))}
              </>
            ) : (
              <p className="font-rubik text-base text-grey-main font-medium">
                No conditions available
              </p>
            )}
          </div>
        )}
      </>
    </SectionItem>
  )
}

export default ConditionsSection
