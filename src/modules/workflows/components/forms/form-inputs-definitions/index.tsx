import prod from './prod'
import staging from './staging'
import viva from './viva'

const forms = process.env.API_URL?.includes("viva") ? viva : process.env.PROD === 'true' ? prod : staging

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
