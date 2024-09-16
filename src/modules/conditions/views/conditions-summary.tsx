import React, { useEffect, useState } from 'react'
import {
  SectionItem,
  ItemTitle,
} from 'src/components/layouts/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import { useConditionsData } from 'src/modules/conditions/hooks/conditions.data'
import { Link } from 'react-router-dom'
import { useModuleAnalytics } from 'src/modules/analytics'
import { Condition, Filters } from 'src/modules/conditions/types'
import { useNotifications } from 'src/context/notifications'

type ConditionItemProps = {
  condition: Condition
}

function ConditionItem({ condition }: ConditionItemProps) {
  const analytics = useModuleAnalytics()

  return (
    <Link
      to="?view=conditions"
      state={{ conditionId: condition.id }}
      onClick={() => {
        // eslint-disable-next-line no-underscore-dangle
        analytics.trackConditionsSummaryOpened(condition)
      }}
    >
      <div className="block border rounded-lg border-solid border-dark-blue-10 my-2 p-3 cursor-pointer">
        <div className="flex justify-between items-center">
          <h4 className="text-dark-blue-100 font-medium font-rubik text-sm">
            {condition?.name}
          </h4>
        </div>
      </div>
    </Link>
  )
}

function ConditionsSummary() {
  const { filterConditions, loadingLookups, allConditions } =
    useConditionsData()

  const [conditions, setConditions] = useState<Condition[]>([])
  const { notify } = useNotifications()

  useEffect(() => {
    if (!loadingLookups) {
      filterConditions(Filters.ACTIVE)
        .then((c) => {
          setConditions(c)
        })
        .catch((error) => {
          notify(error?.message ?? 'Error fetching conditions')
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingLookups, allConditions])

  return (
    <SectionItem>
      <>
        <ItemTitle title="Active Conditions" />
        {loadingLookups ? (
          <BlockSekeleton height={100} />
        ) : (
          <div>
            {conditions?.length > 0 ? (
              <>
                {conditions.map((condition, index) => (
                  <ConditionItem condition={condition} key={index} />
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

export default ConditionsSummary
