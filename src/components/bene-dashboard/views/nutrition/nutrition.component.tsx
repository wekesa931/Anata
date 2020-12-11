import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import filterFields from '../../../../helpers/filter-fields'
import useAirtableFetch from '../../../../hooks/airtable-fetch.hook'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import Table from '../../../utils/table/table.component'

const Nutrition = () => {
  const { recId } = useParams()
  const [consultations, setConsultations] = useState<any[]>([])
  const allowedFields = [
    'Do you have any of the following conditions?',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snacks',
    'How many glasses of water do you take in a day?',
    'High Salt Foods (Packaged salty snacks like crisps, salted nuts, popcorn or salty biscuits/crackers)',
    'High Salt Foods (Cold Cuts or Processed Meats like sausage, bacon, ham, or smokie)',
    'High Salt Foods (Fast food like chips, bhajia, pizza, deep-fried chicken, or cheesy foods)',
    'High Salt Foods (Canned foods like baked beans, maize, corn, peas, or tomatoes)',
    'High Salt Foods (Condiments like tomato sauce, ketchup, chili sauce or mustard)',
    'High Salt Foods (Seasoning like Royco, Maggi cubes, Soy sauce, Tomato Paste)',
    'High Salt Foods (Table Salt)',
    'Is salt added to your food when cooked?',
    'High Potassium Foods (Dark green leafy or traditional/kienyeji vegetables)',
    'High Potassium Foods (Ripe bananas)',
    'High Potassium Foods (Cooked plantains/ green bananas)',
    'High Potassium Foods (Unsalted nuts)',
    'High Potassium Foods (Root vegetables like beetroot, sweet potatoes, arrow roots or yams)',
    'Basal Metabolic Rate',
    'Estimated Caloric Needs',
    'Estimated Daily Caloric Intake',
    'Eggs',
    'Solid Cooking Fats',
    'Deep Fried',
    'Fast Food',
    'Cold Cuts',
    'Daily estimated cholesterol intake',
    'Assessment',
    'Recommendation',
    'Basal Daily Sodium',
    'Basal Daily Potassium',
    'Date of Consultation',
    'Weekly Sodium - Canned Foods',
    'Weekly Sodium - Meats',
    'Weekly Sodium - Snacks',
    'Weekly Sodium - Fast Food',
    'Weekly Sodium - Table Salt',
    'Weekly Sodium - Condiments',
    'Weekly Sodium - Seasonings',
    'Calculated Estimated Daily Sodium',
    'Weekly Potassium - Leafy Greens',
    'Weekly Potassium - Bannanas',
    'Weekly Potassium - Plantains',
    'Weekly Potassium - Nuts',
    'Weekly Potassium - roots',
    'Calculated Daily Potassium',
    'Total Daily Glycemic Load',
    'Nutritional Consultation #',
  ]
  const columns = [
    { name: '#', format: '', key: 'Nutritional Consultation #' },
    { name: 'Date', format: 'dd/mmm/yy', key: 'Date of Consultation' },
    { name: 'BMR', format: '', key: 'Basal Metabolic Rate' },
    {
      name: 'Caloric Intake',
      key: 'Estimated Daily Caloric Intake',
      format: 'kcal',
    },
    {
      name: 'Caloric Needs',
      key: 'Estimated Caloric Needs',
      format: 'kcal',
    },
    {
      name: 'Glycemic load',
      key: 'Total Daily Glycemic Load',
      format: '',
      info: `Level [0]: <100 (Recommended for diabetes)
      Level [1]: 80-180 (Normal)
      Level [2]: >180 (High)`,
    },
    {
      name: 'Sodium Intake',
      key: 'Calculated Estimated Daily Sodium',
      format: 'mg',
      info: `Level [0]: <1500mg (Recommended for hypertensives)
      Level [1]: 1500-2500mg (Normal)
      Level [2]: 2500-3500mg (High)
      Level [3]: 3500-4500mg (Very High)
      Level [4]: >4500mg (Excessively High)`,
    },
    {
      name: 'Potassium Intake',
      key: 'Calculated Daily Potassium',
      format: 'mg',
      info: `Level [0]: >3500mg (Recommended)
      Level [1]: 2500-3500mg (Normal)
      Level [2]: 1500-2500mg (Low)
      Level [3]: <1500mg (Inadequate)`,
    },
    {
      name: 'Chol. Intake',
      key: 'Daily estimated cholesterol intake',
      format: 'mg',
      info: `Level [0]: <200mg (Recommended for those with heart disease)
Level [1]: 200-300mg (Normal)
Level [2]: 300-500mg (High)
Level [3]: >500mg (Very High)`,
    },
    {
      name: 'Recommendation',
      key: 'Recommendation',
      format: '',
    },
  ]
  const { data, isLoading, isError } = useAirtableFetch(
    encodeURI(
      `ncf/list?filterByFormula=FIND("${recId}", {Member Record ID})&sort=[{"field":"Date of Consultation","direction":"desc"}]&${filterFields(
        allowedFields
      )}`
    )
  )
  React.useEffect(() => {
    if (data) {
      const mappedData = Object.keys(data).map((key) => data[key])
      setConsultations(mappedData)
    }
  }, [data])

  return (
    <>
      {isLoading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small">Loading Nutritional Consultations</p>
        </div>
      )}
      {consultations.length > 0 && (
        <Table
          title="Nutritional Consultations"
          columns={columns}
          data={consultations}
          dateColumnKey="Date of Consultation"
        />
      )}
      {isError && (
        <p className="text-danger">
          An error occurred while displaying nutritional consultations, please
          refresh the page, if it persists contact help desk.
        </p>
      )}
    </>
  )
}

export default Nutrition
