import React, { useState } from 'react'
import useAirtableFetch from 'src/hooks/airtable-fetch'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import List from 'src/components/list'
import { filterFields } from 'src/utils/airtable/field-utils'
import { useMember } from 'src/context/member'

function Conditions() {
  const { member } = useMember()
  const recId = member?.airtableRecordId
  const [filteredConditions, setFilteredConditions] = useState<any[]>([])
  const allowedFields = [
    'Calculated Date of Diagnosis',
    'Condition',
    'Condition Status',
    'Starting clinical status',
    'Risk Factor @ diagnosis',
    'Date of Diagnosis/Condition',
    'Diagnosis Stage',
    'Engagement Level',
    'Starting Stage',
    'Summary',
    'Blood Sugar Monitoring frequency',
    'BP Monitoring frequency',
    'Cholesterol monitoring frequency',
    'HgBA1c monitoring frequency',
    'Salt Reduction Milestone',
    'Activity Milestone',
    'Caloric Reduction Milestone',
    'Diabetes Control Milestone',
    'Asthma Action Plan Milestone',
    'Asthma Key Goal',
    'Name (from Conditions master list)',
  ]

  const { data, isLoading, isError } = useAirtableFetch(
    `conditions/list?filterByFormula=FIND("${recId}", {Member Record ID})&sort=[{"field":"Date of Diagnosis/Condition","direction":"desc"}]&${filterFields(
      allowedFields
    )}`
  )

  React.useEffect(() => {
    if (data) {
      const mappedData = Object.keys(data).map((key) => ({
        data: data[key],
        name: data[key].Summary,
      }))
      setFilteredConditions(mappedData)
    }
  }, [data])

  const getDiagnosisDate = (condition: any) =>
    `Diagnosed ${condition['Date of Diagnosis/Condition']}`

  return (
    <div className="full-width">
      <div className="d-flex flex-align-center">
        <h4 className="margin-left-8">Conditions</h4>
      </div>
      {isLoading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small">Loading Conditions</p>
        </div>
      )}

      {filteredConditions.length > 0 && (
        <List
          list={filteredConditions}
          getTopLeftText={getDiagnosisDate}
          emptyListText="No conditions recorded."
          modalTitle="Condition"
          dateColumnKey="Date of Diagnosis/Condition"
          defaultNoElements={6}
          elementIncrement={6}
          paginate
          conditionComponent
        />
      )}
      {isError && (
        <p className="text-danger">
          An error occurred while displaying nutritional consultations, please
          refresh the page, if it persists contact help desk.
        </p>
      )}
    </div>
  )
}

export default Conditions
