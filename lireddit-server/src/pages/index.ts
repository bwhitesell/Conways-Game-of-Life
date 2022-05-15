import getUser from './getUser'
import login from './login'
import me from './me'
import createUser from './createUser'
import validateUsername from './validateUsername'
import validatePassword from './validatePassword'
import { SESSION_CONFIG } from '../config'

import express from 'express'
import { Request } from 'express'
import session from 'express-session'
import Express from 'express-session'


function constructExpressApp() {
  // init the app
  const expressApp = express()

  // request body middleware
  expressApp.use(express.json())

  // session middleware
  expressApp.use(session(SESSION_CONFIG));

  // route paths
  expressApp.get('/user/:uid', getUser)
  expressApp.get('/me', me)
  expressApp.post('/createUser', createUser)
  expressApp.post('/login', login)
  expressApp.post('/validateUsername', validateUsername)
  expressApp.post('/validatePassword', validatePassword)

  console.log('Express app loaded...');
  return expressApp
}

export default constructExpressApp 

export type RequestWithSession = Request & {session: Express.Session & {userId?: number | undefined}}