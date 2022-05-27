import sequelize from '../sequelizeClient'
import { User, UserModel } from './user'
import { DataTypes, Model, InferAttributes, InferCreationAttributes, ModelCtor } from 'sequelize'


export interface SimulationModel extends Model<InferAttributes<SimulationModel>, InferCreationAttributes<SimulationModel>> {
  id?: number;
  name: string;
  description: string;
  data: string;
  setUser: (user: UserModel) => void;
  hasUser: (user: UserModel) => boolean;
}
  
const Simulation = sequelize.define<SimulationModel>('Simulation', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  data: DataTypes.STRING,
});

export { Simulation }