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

  return [...payload, healthCheckForm]
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
