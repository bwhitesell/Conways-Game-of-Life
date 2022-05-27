import { RequestWithSession } from '../index'
import { associateSessionWithUser, sendJsonResponse } from '../utils'
import { Simulation } from '../../entities/simulation'

import { Response } from 'express'


const createSimulation = async (req: RequestWithSession, res: Response) => {

  const sessionUser = await associateSessionWithUser(req.session);

  const reqBody = req.body;
  const reqBodyFields = Object.keys(reqBody)

  // validate request body structure
  if (
    !reqBodyFields.includes("name") ||
    !reqBodyFields.includes("description") ||
    !reqBodyFields.includes("data")
  ) {
    res.status(400);
    sendJsonResponse({error: true, message: "malformed body request."}, res)
  }

  if (sessionUser) {
    const simulation = await Simulation.create(reqBody);
    simulation.setUser(sessionUser);
    sendJsonResponse({error: false, message: "simulation successfully created"}, res);
  } else {
    sendJsonResponse({error: true, message: "not signed in."}, res)
  }
}

export default createSimulation