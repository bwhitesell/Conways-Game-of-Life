import sequelize from '../sequelizeClient'
import { DataTypes } from 'sequelize'


const Project = sequelize.define('Project', {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

export { Project }