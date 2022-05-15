import getUser from './getUser'
import login from './login'
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
  expressApp.post('/login', login)
  console.log('Express app loaded...');
  return expressApp
}

export default constructExpressApp 

export type RequestWithSession = Request & {session: Express.Session & {uid?: number | undefined}}