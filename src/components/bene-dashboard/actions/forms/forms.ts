import FORM_PAYLOAD from '../workflows/Forms/form-fields-complete'

const updatedForms = () => {
  const payload: any[] = []
  FORM_PAYLOAD.forEach((fm) => {
    payload.push({ name: fm.name })
  })
  return payload
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
