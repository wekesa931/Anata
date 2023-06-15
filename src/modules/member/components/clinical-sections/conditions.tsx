import React from 'react'
import { ConditionType } from 'src/modules/member/types'
import {
  SectionItem,
  ItemTitle,
} from 'src/modules/member/components/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import useConditionData from 'src/modules/member/hooks/condition-data'

const StatusIs = (status: string) => {
  return {
    green: status === 'CONTROLLED',
    red: status === 'UNCONTROLLED',
  }
}

function ConditionItem({ conditions }: { conditions: ConditionType }) {
  const status = conditions.startingClinicalStatus?.toUpperCase()
  const statusIs = StatusIs(status || '')

  return (
    <div className="block border rounded-lg border-solid border-dark-blue-10 my-1 p-1">
      <div className="flex justify-between items-center">
        <h4 className="text-dark-blue-100 font-medium font-rubik text-sm">
          {conditions.condition}
        </h4>

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
        <p className="block border rounded-lg border-solid border-dark-blue-10 my-1 p-1 bg-dark-blue-10 text-center text-dark-blue-50 text-sm font-medium uppercase">
          {conditions.healthStatus}
        </p>
      </div>
    </div>
  )
}

function ConditionsSection() {
  const { condition, loading } = useConditionData()

  return (
    <SectionItem>
      <>
        {loading ? (
          <BlockSekeleton height={300} />
        ) : (
          <div>
            {condition?.length > 0 ? (
              <>
                <ItemTitle title="Active Conditions" />
                {condition.map((info, index) => (
                  <>
                    <ConditionItem conditions={info} key={index} />
                  </>
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
