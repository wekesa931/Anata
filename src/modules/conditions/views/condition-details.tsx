import React, { useEffect, useState } from 'react'
import { Item, ItemTitle } from 'src/components/layouts/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import useConditionData from 'src/modules/conditions/hooks/condition.data'
import ConditionFilter from 'src/modules/conditions/components/condition-filter'
import type { Condition } from 'src/modules/conditions/db/models'
import {
  AcuteVsChronic,
  ConditionStatus,
  Filter,
} from 'src/modules/conditions/types'
import { useMember } from 'src/context/member'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Tooltip,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link, useLocation } from 'react-router-dom'
import { useModuleAnalytics } from 'src/modules/analytics'
import VitalsDisplay from 'src/modules/vitals/views/displays'

const StatusIs = (status: string) => {
  return {
    green: status === ConditionStatus.ACTIVE,
    red: status === ConditionStatus.INACTIVE,
  }
}
const ConditionIs = (condition: string) => {
  return {
    blue: condition === 'CHRONIC',
    red: condition === 'ACUTE',
  }
}

type ConditionCardProps = {
  condition: Condition
  activeCondition?: string
}

function ConditionCard({ condition, activeCondition }: ConditionCardProps) {
  const status = condition.conditionStatus
  const statusIs = StatusIs(status || '')
  const diagnosis_date = condition.dateOfDiagnosis?.toString()
  const acute_vs_chronic = condition.acuteVsChronic?.toUpperCase()
  const conditionIs = ConditionIs(acute_vs_chronic || '')
  const medication = condition?.medication || []
  const [interventions, setInterventions] = useState<any[]>([])
  const [expanded, setExpanded] = useState<boolean>(false)
  const { trackConditionsDetailsOpened } = useModuleAnalytics()

  useEffect(() => {
    setExpanded(activeCondition === condition.id)
  }, [activeCondition, condition])

  useEffect(() => {
    condition.interventions.then((i) => {
      setInterventions(i)
    })
  }, [condition])
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
          trackConditionsDetailsOpened(condition._raw)
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
              {condition.condition} - {condition.icd10Code}
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
            conditionIs.blue
              ? 'bg-blue-10 text-blue-100'
              : 'bg-red-10 text-red-100'
          }
        `}
            >
              {acute_vs_chronic}
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <div className="flex gap-4 basis-1/4 flex-wrap">
            <div className="flex flex-col gap-2">
              <Item title="Starting Stage" child={condition?.startingStage} />
              <Item title="current stage" child={condition?.currentStage} />
            </div>
            <div className="flex flex-col gap-2">
              <Item
                title="starting clinical status"
                child={condition?.startingClinicalStatus}
              />
              <Item
                title="current clinical status"
                child={condition?.currentClinicalStatus}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Item title="Key Goal" child={condition?.keyGoal} />
              <Item
                title="engagment level"
                child={condition?.engagementLevel}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Item title="Diagnosis stage" child={condition?.diagnosisStage} />
              <Item title="Diagnosis date" child={diagnosis_date} />
            </div>
            {condition?.asthmaStartingScore ? (
              <div className="flex flex-col gap-2">
                <Item
                  title="Asthma Starting Score"
                  child={condition?.asthmaStartingScore}
                />
              </div>
            ) : null}

            {condition?.osteoarthritisStartingScore ? (
              <div className="flex flex-col gap-2">
                <Item
                  title="Osteoarthritis Starting Score"
                  child={condition?.osteoarthritisStartingScore}
                />
              </div>
            ) : null}

            {condition?.lowerBackPainStartingScore ? (
              <div className="flex flex-col gap-2">
                <Item
                  title="Lower back pain starting score"
                  child={condition?.lowerBackPainStartingScore}
                />
              </div>
            ) : null}
            {condition?.lowerBackPainScore ? (
              <div className="flex flex-col gap-2">
                <Item
                  title="Lower back pain score"
                  child={condition?.lowerBackPainScore}
                />
              </div>
            ) : null}
          </div>
          <Divider />
          <div className="mt-4">
            <div className="flex justify-start gap-2 items-center mt-4">
              <div className="grow-0">
                <ItemTitle title="Medication" />
              </div>
              <div className="grow">
                <div>
                  {medication?.length > 0 ? (
                    medication?.map((med: string, index: number) => (
                      <Tooltip key={index} title={med}>
                        <span className="bg-blue-10 text-center rounded-md text-dark-blue-100 py-1 px-1.5 font-rubik text-sm mx-2">
                          {med}
                        </span>
                      </Tooltip>
                    ))
                  ) : (
                    <p className="text-dark-blue-50 font-rubik text-left text-xs ml-2">
                      No Medication available
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-start gap-2 items-center mt-4">
                <div className="grow-0">
                  <ItemTitle title="Interventions" />
                </div>
                <div className="grow">
                  <div>
                    {interventions.length > 0 ? (
                      interventions.map((int: any, index: number) => (
                        <Link
                          key={index}
                          to="?view=interventions"
                          state={{ interventionId: int?.id }}
                        >
                          <span className="bg-blue-10 text-center rounded-md text-dark-blue-100 py-1 px-1.5 font-rubik text-sm mx-2  hover:bg-blue-20">
                            {int?.interventionType}
                          </span>
                        </Link>
                      ))
                    ) : (
                      <p className="text-dark-blue-50 font-rubik text-left text-xs ml-2">
                        No interventions available
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <VitalsDisplay />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

function ConditionsSection() {
  const { loading, filterBy, conditionsCollection } = useConditionData()
  const [conditions, setConditions] = useState<Condition[]>([])
  const { member } = useMember()
  const [filter, setFilter] = useState<Filter>({
    acuteVsChronic: AcuteVsChronic.ALL,
    conditionStatus: ConditionStatus.ALL,
  })

  const { state } = useLocation()
  const { trackConditionsFiltered } = useModuleAnalytics()

  useEffect(() => {
    filterBy(filter).then((condition) => {
      trackConditionsFiltered(JSON.stringify(filter))
      setConditions(condition)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, member, conditionsCollection, loading])

  return (
    <>
      <ConditionFilter filter={filter} setFilter={setFilter} />
      {loading ? (
        <BlockSekeleton height={300} />
      ) : (
        <div className="mt-2">
          {conditions?.length > 0 ? (
            <>
              {conditions.map((condition: Condition, index: number) => (
                <ConditionCard
                  condition={condition}
                  key={index}
                  activeCondition={state?.conditionId}
                />
              ))}
            </>
          ) : (
            <p className="font-rubik text-base text-grey-main font-medium">
              No condition available
            </p>
          )}
        </div>
      )}
    </>
  )
}

export default ConditionsSection
