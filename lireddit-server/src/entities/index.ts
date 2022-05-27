import { User } from './user'
import { Simulation } from './simulation'
import { ENV } from '../constants'
import sequelize from '../sequelizeClient'
import * as argon2 from 'argon2'

const dbConnectedModels = [
  User,
  Simulation,
]

function defineModelRelationships() {
  Simulation.belongsTo(User, {foreignKey: "id_user"})
  User.hasMany(Simulation, {foreignKey: "id_user"})
}

async function createDevData() {
  const user = await User.create({"id": 0, "username": 'm4ster_g4mer', "password": await argon2.hash('password')})
  const simulation = await Simulation.create({name: 'eternal garden', description: "a repeating garden", data: 'hi'});
  simulation.setUser(user);
}

async function syncDBConnectedModels() {
  defineModelRelationships();
  if (ENV === "development") {
    console.log("Environment detected as development. Syncing sequelize models...")
    await sequelize.sync({force: true})
    console.log('Creating dev data...')
    await createDevData()
  } else {
    console.log("Environment not detected as development. Sequelize models not being auto-syncd.")
  }
}


export default syncDBConnectedModels