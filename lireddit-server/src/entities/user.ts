import sequelize from '../sequelizeClient'
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional} from 'sequelize'


export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id?: number
  username: string;
  password: string;
}

const User = sequelize.define<UserModel>('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
});

export { User }