import React from 'react'
import { InterventionType } from 'src/modules/member/types'
import {
  SectionItem,
  ItemTitle,
} from 'src/modules/member/components/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import useInterventionData from 'src/modules/member/hooks/intervention-data'

const StatusIs = (status: string) => {
  return {
    green: status === 'ON TRACK',
    red: status === 'OFF TRACK',
  }
}

function InterventionItem({
  interventions,
}: {
  interventions: InterventionType
}) {
  const status = interventions.milestoneAttainments?.toUpperCase()
  const statusIs = StatusIs(status || '')

  return (
    <div className="block border rounded-lg border-solid border-dark-blue-10 my-1 p-1">
      <div className="flex justify-between items-center">
        <h4 className="text-dark-blue-100 font-medium font-rubik text-sm">
          {interventions.intervention}
        </h4>

        <div
          className={`
            p-1 rounded-lg text-sm font-rubik font-medium capitalize text-center
            ${
              statusIs.green
                ? 'bg-green-10 text-green-100'
                : 'bg-red-10 text-red-100'
            }
          `}
        >
          {status}
        </div>
      </div>
    </div>
  )
}

function InterventionsSection() {
  const { intervention, loading } = useInterventionData()

  return (
    <SectionItem>
      <>
        {loading ? (
          <BlockSekeleton height={300} />
        ) : (
          <div>
            {intervention.length > 0 ? (
              <>
                <ItemTitle title="Active Interventions" />
                {intervention.map((info, index) => (
                  <>
                    <InterventionItem interventions={info} key={index} />
                  </>
                ))}
              </>
            ) : (
              <p className="font-rubik text-base text-grey-main font-medium">
                No interventions available
              </p>
            )}
          </div>
        )}
      </>
    </SectionItem>
  )
}

export default InterventionsSection
