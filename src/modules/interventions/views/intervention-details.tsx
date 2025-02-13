import React, { useEffect, useState } from 'react'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import { useMember } from 'src/context/member'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Tooltip,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Attainment,
  Filter,
  InterventionStatus,
} from 'src/modules/interventions/types'
import { Intervention } from 'src/modules/interventions/db/models'
import useInterventionData from 'src/modules/interventions/hooks/intervention.data'
import InterventionFilter from 'src/modules/interventions/components/intervention-filter'
import { Item, ItemTitle } from 'src/components/layouts/display-items.component'
import { useLocation } from 'react-router-dom'
import { useModuleAnalytics } from 'src/modules/analytics'

const StatusIs = (status: string) => {
  return {
    green: status === InterventionStatus.ACTIVE,
    red: status === InterventionStatus.INACTIVE,
  }
}
const AttainmentIs = (intervention: string) => {
  return {
    blue: intervention === 'ON TRACK',
    red: intervention === 'OFF TRACK',
  }
}

type InterventionCardProps = {
  intervention: Intervention
  activeId?: string
}

function InterventionCard({ intervention, activeId }: InterventionCardProps) {
  const [expanded, setExpanded] = useState<boolean>(false)
  const status = intervention.interventionStatus
  const statusIs = StatusIs(status || '')
  const attainment = intervention.attainment?.toUpperCase()
  const attainmentIs = AttainmentIs(attainment || '')
  const currentMeasurement = intervention?.currentMeasurement || []

  const { trackInterventionsDetailsOpened: interventionsDetailsOpened } =
    useModuleAnalytics()

  useEffect(() => {
    setExpanded(intervention.id === activeId)
  }, [intervention, activeId])

  return (
    <Accordion
      className="block border rounded-xl border-solid border-dark-blue-10 my-1 mb-4 p-1 shadow-none"
      sx={{
        '&:before': {
          display: 'none',
        },
      }}
      expanded={expanded}
      onChange={() => {
        if (!expanded) {
          // eslint-disable-next-line no-underscore-dangle
          interventionsDetailsOpened(intervention._raw)
        }
        setExpanded(!expanded)
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <div>
          <div className="flex justify-start self-stretch gap-6 items-start">
            <p className="text-dark-blue-100 font-medium font-rubik text-lg">
              {intervention.interventionType}
            </p>

            <div
              className={`
            rounded-lg text-sm font-rubik font-medium uppercase my-1 p-1
            ${
              statusIs.green
                ? 'bg-green-10 text-green-100'
                : 'bg-red-10 text-red-100'
            }
          `}
            >
              {status?.toUpperCase()}
            </div>
            <div
              className={`rounded-lg text-sm font-medium uppercase my-1 p-1
          ${
            attainmentIs.blue
              ? 'bg-blue-10 text-blue-100'
              : 'bg-red-10 text-red-100'
          }
        `}
            >
              {attainment}
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <div className="flex gap-4 basis-1/4 flex-wrap">
            <div className="flex flex-col gap-2">
              <Item
                title="Starting Measurement"
                child={intervention?.startingMeasurement}
              />
              <Item
                title="current Measurement"
                child={currentMeasurement.map(
                  (measurement: string, index: number) => (
                    <Tooltip key={index} title={measurement}>
                      <span className="bg-blue-10 text-center rounded-md text-dark-blue-100 py-1 px-1.5 font-rubik text-sm mx-2">
                        {measurement}
                      </span>
                    </Tooltip>
                  )
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Item
                title="starting level"
                child={intervention?.startingLevel}
              />
              <Item title="current level" child={intervention?.currentLevel} />
            </div>
            <div className="flex flex-col gap-2">
              <Item title="Target" child={intervention?.target} />
              <Item title="Notes" child={intervention?.notes} />
            </div>
            <div className="flex flex-col gap-2">
              <Item title="Result" child={intervention?.result} />
              <Item title="Persona" child={intervention?.persona} />
            </div>
          </div>
          <Divider />
          <div className="mt-4">
            <div>
              <div className="flex justify-start gap-2 items-center mt-4">
                <div className="grow-0">
                  <ItemTitle title="Conditions" />
                </div>
                <div className="grow">
                  {intervention.condition ? (
                    <span className="bg-blue-10 text-center rounded-md text-dark-blue-100 py-1 px-1.5 font-rubik text-sm mx-2  hover:bg-blue-20">
                      {intervention?.condition}
                    </span>
                  ) : (
                    <p className="text-dark-blue-50 font-rubik text-left text-xs ml-2">
                      No condition available{' '}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

function InterventionSection() {
  const { loading, filterBy, interventionsCollection } = useInterventionData()
  const [interventions, setInterventions] = useState<Intervention[]>([])
  const { member } = useMember()
  const [filter, setFilter] = useState<Filter>({
    interventionStatus: InterventionStatus.ALL,
    attainment: Attainment.ALL,
  })

  const { state } = useLocation()
  const { trackInterventionsFiltered: interventionsFiltered } =
    useModuleAnalytics()

  useEffect(() => {
    filterBy(filter).then((intervention) => {
      interventionsFiltered(filter)
      setInterventions(intervention)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, member, interventionsCollection, loading])

  return (
    <>
      <InterventionFilter filter={filter} setFilter={setFilter} />
      {loading ? (
        <BlockSekeleton height={200} />
      ) : (
        <div className="mt-2">
          {interventions?.length > 0 ? (
            <>
              {interventions.map(
                (intervention: Intervention, index: number) => (
                  <InterventionCard
                    intervention={intervention}
                    key={index}
                    activeId={state?.interventionId}
                  />
                )
              )}
            </>
          ) : (
            <p className="font-rubik text-base text-grey-main font-medium">
              No Intervention available
            </p>
          )}
        </div>
      )}
    </>
  )
}

export default InterventionSection
