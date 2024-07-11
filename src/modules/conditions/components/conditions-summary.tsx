import React from 'react'
import SelectField from 'src/components/forms/fields/select-field'
import { useConditionsData } from 'src/modules/conditions/hooks/conditions.data'
import { Condition } from 'src/modules/conditions/types'
import { StatusLabel } from 'src/modules/conditions/components/labels'

type SummaryProps = {
  displayMode?: boolean
  condition: Condition
}

export function ConditionsSummary({ displayMode, condition }: SummaryProps) {
  const { lookups } = useConditionsData()

  return (
    <div>
      <div>
        <div className="flex items-center mb-4 mt-2">
          <h1 className="mr-3 font-medium text-lg">
            {condition.name}{' '}
            {condition?.currentStage?.name
              ? ` - ${condition.currentStage.name}`
              : null}
          </h1>
          <span>|</span>
          <p className="ml-3 text-[#666666]">
            {condition.isChronic ? 'Chronic' : 'Acute'}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 flex-wrap mb-2">
        <SelectField
          label="Clinical Status"
          options={lookups?.conditionClinicalStatuses || []}
          name="clinicalStatus"
          CustomOptionRenderer={StatusLabel}
          displayMode={displayMode}
          xs
          labelPlacement="left"
          required={false}
          displayHelper={false}
          onClick={(e) => {
            e.stopPropagation()
          }}
          autoWidth
        />
        <SelectField
          label="Verification Status"
          options={lookups?.conditionVerificationStatuses || []}
          name="verificationStatus"
          CustomOptionRenderer={StatusLabel}
          xs
          labelPlacement="left"
          required={false}
          displayHelper={false}
          displayMode={displayMode}
          onClick={(e) => {
            e.stopPropagation()
          }}
          autoWidth
        />
        <SelectField
          label="Achievement Status"
          options={lookups?.conditionTargetAchievementStatuses || []}
          name="achievementStatus"
          CustomOptionRenderer={StatusLabel}
          xs
          labelPlacement="left"
          required={false}
          displayHelper={false}
          displayMode
          onClick={(e) => {
            e.stopPropagation()
          }}
          autoWidth
        />
      </div>
    </div>
  )
}

export default ConditionsSummary
