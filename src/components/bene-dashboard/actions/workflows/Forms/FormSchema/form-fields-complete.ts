import ProductionSchema from './ProdSchema'
import StagingSchema from './StagingSchema'

export default process.env.PROD === 'true' ? ProductionSchema : StagingSchema
