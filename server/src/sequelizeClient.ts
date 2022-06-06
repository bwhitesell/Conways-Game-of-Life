import { Sequelize } from 'sequelize'
import { SEQUELIZE_CONN_URI } from './constants'

const sequelize = new Sequelize(SEQUELIZE_CONN_URI)

export default sequelize