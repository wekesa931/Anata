import ProductionSchema from './ProdSchema'
import StagingSchema from './StagingSchema'

export default process.env.FORM_SCHEMA === 'prod'
  ? ProductionSchema
  : StagingSchema
