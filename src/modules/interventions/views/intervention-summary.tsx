import React from 'react'
import {
  SectionItem,
  ItemTitle,
} from 'src/components/layouts/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import useInterventionData from 'src/modules/interventions/hooks/intervention.data'
import { Link } from 'react-router-dom'
import { Intervention } from '../db/models'

const StatusIs = (status: string) => {
  return {
    green: status === 'ON TRACK',
    red: status === 'OFF TRACK',
  }
}
type InterventionItemProps = {
  intervention: Intervention
}

function InterventionItem({ intervention }: InterventionItemProps) {
  const status = intervention.attainment?.toUpperCase()
  const statusIs = StatusIs(status || '')

  return (
    <Link to="?view=interventions" state={{ interventionId: intervention.id }}>
      <div className="block border rounded-lg border-solid border-dark-blue-10 my-2 p-3">
        <div className="flex justify-between items-center">
          <h4 className="text-dark-blue-100 font-medium font-rubik text-sm">
            {intervention.interventionType}
          </h4>

          {status && (
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
          )}
        </div>
      </div>
    </Link>
  )
}

function InterventionsSection() {
  const { memberInterventions, loading } = useInterventionData()

  return (
    <SectionItem>
      <>
        <ItemTitle title="Active Interventions" />
        {loading ? (
          <BlockSekeleton height={100} />
        ) : (
          <div>
            {memberInterventions.length > 0 ? (
              <>
                {memberInterventions.map((info, index) => (
                  <InterventionItem intervention={info} key={index} />
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
