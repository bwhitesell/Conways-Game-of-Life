import sequelize from '../sequelizeClient'
import { SimulationModel } from './simulation'
import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'


export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id?: number
  username: string;
  password: string;
  getSimulations: () => Promise<SimulationModel[] | {}>;
}

const User = sequelize.define<UserModel>('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
});

export { User }