import prod from './prod'
import staging from './staging'

const forms = process.env.PROD === 'true' ? prod : staging

const nonDeprecated = forms?.filter((form) => !form.deprecated)

export default [
  ...nonDeprecated,
  {
    name: 'Health Metrics',
    formId: 'health-metrics',
    helper: '',
    id: 'health-metrics',
    fields: [],
  },
]
