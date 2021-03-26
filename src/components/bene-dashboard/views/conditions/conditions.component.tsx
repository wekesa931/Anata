import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAirtableFetch from '../../../../hooks/airtable-fetch.hook'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import List from '../../../utils/list/list.component'
import filterFields from '../../../../helpers/filter-fields'
import { useSortFilter } from '../../../../context/sort-filter-views.context'

const Conditions = () => {
  const { recId } = useParams()
  const [conditions, setConditions] = useState<any[]>([])
  const [filteredConditions, setFilteredConditions] = useState<any[]>([])
  const {
    ops: {
      filters: { conditions: filters },
    },
  } = useSortFilter()
  const allowedFields = [
    'Calculated Date of Diagnosis',
    'Calculated Key Goal',
    'Condition',
    'Condition Status',
    'Condition Status @ Baseline',
    'Risk Factor @ Baseline',
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
      setConditions(mappedData)
      setFilteredConditions(mappedData)
    }
  }, [data])

  React.useEffect(() => {
    let filteredCons = conditions
    if (filters) {
      if (filters.status) {
        filteredCons = filteredCons.filter(
          (condition: any) =>
            condition.data['Condition Status'] === filters.status
        )
      }
    }
    setFilteredConditions(filteredCons)
  }, [conditions, filters])

  const getDiagnosisDate = (condition: any) =>
    `Diagnosed ${condition['Date of Diagnosis/Condition']}`

  return (
    <div className="full-width">
      <div className="d-flex flex-align-center">
        <h4 className="margin-left-8">Conditions</h4>
        <span className="badge badge-warning">{filters.status}</span>
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
