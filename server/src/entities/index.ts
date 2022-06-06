import * as argon2 from 'argon2'
import Redis from 'ioredis'
import sequelize from '../sequelizeClient'
import { User } from './user'
import { Simulation } from './simulation'
import { ENV } from '../constants'


function defineModelRelationships() {
  Simulation.belongsTo(User, {foreignKey: "id_user"});
  User.hasMany(Simulation, {foreignKey: "id_user"});
}

async function createDevData() {
  const user = await User.create({"id": 0, "username": 'm4ster_g4mer', "password": await argon2.hash('password')});
  const simulation1 = await Simulation.create({name: 'First Test Board', description: "This is my first test at making a board.", data: '[[false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]'});

  simulation1.setUser(user);
}

async function syncDBConnectedModels() {
  defineModelRelationships();

  if (ENV === "development") {
    console.log("Environment detected as development. Syncing sequelize models...");
    // clear out redis if running in dev
    new Redis('redis://localhost:6379').flushall('ASYNC', () => console.log('Redis flushed.'));
    await sequelize.sync({force: true});
    console.log('Creating dev data...')
    await createDevData();
  } else {
    console.log("Environment not detected as development. Sequelize models not being auto-syncd.");
  }
}


export default syncDBConnectedModels