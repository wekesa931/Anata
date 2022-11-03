import React from 'react'
import AirtableIframe from '../../../utils/airtableIframe/airtableIframe.component'

function Longitudinal() {
  const interventionUrl =
    'https://airtable.com/embed/shrd2dt2jbJcFfuv4?backgroundColor=green&viewControls=on'

  const conditionsUrl =
    'https://airtable.com/embed/shrdpe392PwXMryCR?backgroundColor=green&viewControls=on'

  return (
    <>
      <h3>Conditions</h3>
      <AirtableIframe src={conditionsUrl} />
      <h3>Interventions</h3>
      <AirtableIframe src={interventionUrl} />
    </>
  )
}
export default Longitudinal
