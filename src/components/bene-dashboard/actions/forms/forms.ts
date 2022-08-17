import dayjs from 'dayjs'
import FORM_PAYLOAD from '../workflows/Forms/form-fields-complete'

const updatedForms = () => {
  const payload: any[] = []
  FORM_PAYLOAD.forEach((fm) => {
    payload.push({
      name: fm.name,
      airtableId: null,
      completed: false,
      createdAt: dayjs().format(),
      currentModules: [fm.name],
      id: '1',
      moduleData: {},
      modules: [{ id: '1', name: fm.name }],
      template: { id: '2', name: fm.name },
      updatedAt: dayjs().format(),
      workflowId: null,
    })
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
