import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import filterFields from '../../../../helpers/filter-fields'
import useAirtableFetch from '../../../../hooks/airtable-fetch.hook'
import List from '../../../utils/list/list.component'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'

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
  ]
  const { data, isLoading, isError } = useAirtableFetch(
    `ncf/list/0?filterByFormula=FIND("${recId}", {Member Record ID})&sort=[{"field":"Date of Consultation","direction":"desc"}]&${filterFields(
      allowedFields
    )}`
  )
  React.useEffect(() => {
    if (data) {
      const mappedData = Object.keys(data)
        .map((key) => ({ consultation: data[key], id: key }))
        .map(({ consultation, id }) => ({
          data: consultation,
          name: consultation.Assessment,
          id,
        }))
      setConsultations(mappedData)
    }
  }, [data])
  const getTopLeftText = (consultation: any) =>
    dayjs(consultation['Date of Consultation']).format('DD MMM YYYY')

  return (
    <>
      <h4>Nutritional Consultations</h4>
      {isLoading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small">Loading Nutritional Consultations</p>
        </div>
      )}
      {consultations.length > 0 && (
        <List
          list={consultations}
          getTopLeftText={getTopLeftText}
          modalTitle="Nutritional Consultation"
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
