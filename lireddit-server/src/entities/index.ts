import { User } from './user'
import { Project } from './project'
import { ENV } from '../constants'
import sequelize from '../sequelizeClient'
import * as argon2 from 'argon2'

const dbConnectedModels = [
  User,
  Project
]

async function createDevData() {
    await User.create({"id": 0, "username": 'dave', "password": await argon2.hash('password')})
    await User.create({"id": 1, "username": 'al', "password": await argon2.hash('password')})
}

async function syncDBConnectedModels() {
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