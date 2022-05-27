import login from './user/login'
import logout from './user/logout'
import me from './user/me'
import listSimulations from './simulations/listSimulations'
import createUser from './registration/createUser'
import validateUsername from './registration/validateUsername'
import validatePassword from './registration/validatePassword'
import { SESSION_CONFIG } from '../config'

import express from 'express'
import { Request } from 'express'
import cors from 'cors'
import session from 'express-session'
import Express from 'express-session'
import getSimulation from './simulations/getSimulation'
import deleteSimulation from './simulations/deleteSimulation'
import createSimulation from './simulations/createSimulation'


function constructExpressApp() {
  // init the app
  const expressApp = express()

  // request body middleware
  expressApp.use(express.json())

  // cors middleware
  expressApp.use(cors({origin: 'http://localhost:3000', credentials: true}))

  // session middleware
  expressApp.use(session(SESSION_CONFIG));

  // DEFINE ROUTES //

  // user routes
  expressApp.get('/me', me)  // read
  expressApp.post('/login', login)
  expressApp.get('/logout', logout)

  //registration routes
  expressApp.post('/createUser', createUser)
  expressApp.post('/validateUsername', validateUsername)
  expressApp.post('/validatePassword', validatePassword)

  // simulation routes
  expressApp.get('/listSimulations', listSimulations) // multiple reads
  expressApp.get('/getSimulation:simId', getSimulation)  // read
  expressApp.post('/createSimulation', createSimulation)  // create
  expressApp.delete('/deleteSimulation:simId', deleteSimulation)  // delete

  console.log('Express app loaded...');
  return expressApp
}

export default constructExpressApp 
export type Session = Express.Session & {userId?: number | undefined}
export type RequestWithSession = Request & {session: Session}