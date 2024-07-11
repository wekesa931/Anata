import React from 'react'
import dayjs from 'dayjs'
import SelectField from 'src/components/forms/fields/select-field'
import DateField from 'src/components/forms/fields/date-field'
import TextField from 'src/components/forms/fields/text'
import SwitchFields from 'src/components/forms/fields/switch-field'
import { Condition } from 'src/modules/conditions/types'
import { useConditionsData } from 'src/modules/conditions/hooks/conditions.data'
import { StatusLabel, Label } from 'src/modules/conditions/components/labels'
import { ExpandableText } from 'src/components/tooltip/expandable-text'
import relativeTime from 'dayjs/plugin/relativeTime'
import { dedupOptions } from '../utils'

dayjs.extend(relativeTime)

type DetailsProps = {
  condition: Condition
  editMode: boolean
}

export function ConditionsDetails({ condition, editMode }: DetailsProps) {
  const { lookups } = useConditionsData()

  const getLastModifiedDateString = (date: string) => {
    const now = dayjs().format('YYYY-MM-DD HH:mm')
    return dayjs(date).from(now)
  }

  return (
    <>
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex-1 min-w-[250px] border rounded-md border-solid border-[#B2B2B2] my-1 mb-4 shadow-none text-[#666666]">
          <div className="p-2 bg-[#FFF5E7] rounded-tr-md rounded-tl-md h-[6rem] text-sm">
            <h1 className="font-medium">Antara Initial Stage at Diagnosis</h1>
            <div className="flex items-center mb-2">
              <h1 className="mr-1 text-sm mt-3">Diagnosis date:</h1>
              <div className="flex-grow flex items-center">
                <DateField
                  name="diagnosisDate"
                  openToYear={false}
                  maxDate={new Date()}
                  displayMode={editMode}
                  required={false}
                  displayHelper={false}
                />
              </div>
            </div>
          </div>
          <section className="p-2 text-sm w-full overflow-y-hidden">
            <div className="mb-2 font-medium flex items-center">
              <p className="font-medium">
                {condition.initialStage.name || 'Stage: Pending'}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-xs text-grey-main text-left font-medium">
                Observations:
              </p>
              <ExpandableText
                title="Observations"
                value={
                  condition.initialStage?.observations.join(' ') ||
                  'Not available'
                }
                extended={false}
              />
            </div>
          </section>
        </div>
        <div className="flex-1 min-w-[250px] border rounded-md border-solid border-[#B2B2B2] my-1 mb-4 shadow-none text-[#666666]">
          <div className="p-2 bg-[#FFF5E7] rounded-tr-md rounded-tl-md h-[6rem]">
            <h1 className="font-medium">Current Situation</h1>
            <div className="flex items-center mb-2">
              <h1 className="mr-1 text-sm mt-3">Last Modified:</h1>
              <div className="flex-grow flex items-center">
                {condition.lastModified !== 'Invalid Date' && (
                  <div className="mt-2 border cursor-pointer mr-1 !bg-[#E7F3FD] rounded-lg text-xs w-full p-1 text-center text-[#007AFF]">
                    {getLastModifiedDateString(condition.lastModified)}
                  </div>
                )}
                <DateField
                  name="lastModified"
                  openToYear={false}
                  maxDate={new Date()}
                  displayMode
                  required={false}
                  displayHelper={false}
                />
              </div>
            </div>
          </div>
          <section className="p-2 text-sm w-full overflow-y-hidden">
            <div className={!editMode ? 'mb-2 font-medium' : 'mb-3'}>
              {editMode ? (
                <p className="font-medium ">
                  {condition.currentStage.name || 'Stage: Pending'}
                </p>
              ) : (
                <SelectField
                  name="currentStage"
                  options={dedupOptions(condition.possibleStages || [])}
                  displayMode={editMode}
                  required={false}
                  displayHelper={false}
                  xs
                  labelPlacement="left"
                  CustomOptionRenderer={Label}
                  label="Stage"
                  placeholder="-- Select --"
                />
              )}
            </div>
            <div className="flex items-center mb-1">
              <SelectField
                name="currentTarget"
                label="Target"
                options={dedupOptions(condition.possibleTargets || [])}
                displayMode={editMode}
                required={false}
                displayHelper={false}
                xs
                labelPlacement="left"
                CustomOptionRenderer={Label}
                placeholder="-- Select --"
              />
            </div>
            <div className="flex items-center">
              <p className="text-xs text-grey-main text-left font-medium">
                Observations:
              </p>
              <ExpandableText
                title="Observations"
                value={
                  condition.currentStage?.observations.join(' ') ||
                  'Not available'
                }
                extended={false}
              />
            </div>
            <div className="flex items-center">
              <SelectField
                name="achievementStatus"
                options={lookups.conditionTargetAchievementStatuses || []}
                displayMode
                required={false}
                displayHelper={false}
                xs
                labelPlacement="left"
                CustomOptionRenderer={StatusLabel}
                label="Achievement"
                placeholder="-- Select --"
              />
            </div>
          </section>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex-1 min-w-[250px] my-1 mb-4 shadow-none text-[#666666]">
          <section className="p-2">
            <div className="flex items-center mb-2">
              <h1 className="mr-3 text-[#000000] font-medium text-sm mt-3">
                Creation date:
              </h1>
              <div className="flex-grow">
                <DateField
                  name="creationDate"
                  openToYear={false}
                  maxDate={new Date()}
                  displayMode
                  required={false}
                  displayHelper={false}
                />
              </div>
            </div>
            <div className="flex items-center mb-2">
              <h1 className="mr-3 text-[#000000] font-medium text-sm mt-3">
                Created by:
              </h1>
              <div className="flex-grow">
                <TextField
                  name="createdBy"
                  textarea
                  rows={1}
                  bottomPadding={false}
                  displayMode
                  required={false}
                />
              </div>
            </div>
            <div className="flex items-center mb-2">
              <h1 className="mr-3 text-[#000000] font-medium text-sm mt-3">
                Newly diagnosed:
              </h1>
              <div className="flex-grow">
                <SelectField
                  name="isNewlyDiagnosed"
                  options={[
                    { label: 'Yes', value: 'yes' },
                    { label: 'No', value: 'no' },
                  ]}
                  displayMode={editMode}
                  required={false}
                  displayHelper={false}
                  placeholder="-- Select --"
                />
              </div>
            </div>
            <div className="flex items-center mb-2">
              <h1 className="mr-3 text-[#000000] font-medium text-sm mt-3">
                ICD11 Code:
              </h1>
              <div className="flex-grow">
                <TextField
                  name="icd11Code"
                  textarea
                  rows={1}
                  bottomPadding={false}
                  displayMode={editMode}
                  required={false}
                />
              </div>
            </div>
            <div className="flex items-center mb-2">
              <h1 className="mr-3 text-[#000000] font-medium text-sm mt-1">
                At risk from:
              </h1>
              <span className="flex-grow">
                {condition.atRiskFrom.length > 0
                  ? condition.atRiskFrom.join(' | ')
                  : 'Not available'}
              </span>
            </div>
          </section>
        </div>

        <div className="flex-1 min-w-[250px] my-1 mb-4 shadow-none text-[#666666]">
          <section className="p-2">
            <div className="flex items-center mb-2">
              <h1 className="mr-3 text-[#000000] font-medium text-sm mt-3">
                System auto-update:
              </h1>
              <div className="flex-grow">
                <SwitchFields
                  name="shouldSystemAutoUpdate"
                  required={false}
                  disabled={editMode}
                />
              </div>
            </div>
            <div className="flex items-center mb-2">
              <h1 className="mr-3 text-[#000000] font-medium text-sm mt-1">
                Modified by:
              </h1>
              <span className="flex-grow">
                <ExpandableText
                  title="Modified by"
                  value={condition.modifiedBy || 'Not available'}
                  extended={false}
                />
              </span>
            </div>
            <div className="flex items-center mb-2">
              <h1 className="mr-3 text-[#000000] font-medium text-sm mt-3">
                Onset:
              </h1>
              <div className="flex-grow">
                <DateField
                  name="onsetDate"
                  openToYear={false}
                  maxDate={new Date()}
                  displayMode={editMode}
                  required={false}
                  displayHelper={false}
                />
              </div>
            </div>
            <div className="flex items-center mb-2">
              <h1 className="mr-3 text-[#000000] font-medium text-sm mt-3">
                Notes:
              </h1>
              <div className="flex-grow">
                <TextField
                  name="notes"
                  textarea
                  rows={4}
                  bottomPadding={false}
                  placeholder="Write condition notes ..."
                  displayMode={editMode}
                  required={false}
                  displayHtml
                />
              </div>
            </div>
            <div className="flex items-center">
              <h1 className="text-[#000000] font-medium text-sm mt-3">
                Reason for status change:
              </h1>
              <ExpandableText
                title="Reason for clinical status change"
                value={
                  condition.reasonForClinicalStatusChange || 'Not available'
                }
                extended={false}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default ConditionsDetails
