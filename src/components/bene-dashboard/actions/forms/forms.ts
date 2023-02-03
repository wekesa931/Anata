import FORM_PAYLOAD from '../workflows/Forms/FormSchema/form-fields-complete'

export type TForm = {
  name: string
  type?: string
  url?: string
}

const updatedForms = (): TForm[] => {
  const payload: TForm[] = []
  FORM_PAYLOAD.forEach((fm) => {
    payload.push({ name: fm.name })
  })

  // add the Health Check Form
  const healthCheckForm: TForm = {
    name: 'Minor Health Check',
    type: 'airtableForm',
    url: 'https://airtable.com/embed/shrJfVFD95csPXYZF?viewControls=on',
  }

  // add Minor HIF v2
  const minorHIFv2: TForm = {
    name: 'Minor HIF v2',
    type: 'airtableForm',
    url: 'https://airtable.com/embed/shrn9dg2D3AL0tzWT',
  }

  return [...payload, healthCheckForm, minorHIFv2]
}

const sorted = updatedForms().sort((a, b) => {
  if (a.name > b.name) {
    return 1
  }
  if (b.name > a.name) {
    return -1
  }
  return 0
})
export default sorted
