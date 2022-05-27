import { RequestWithSession } from '../index'
import { associateSessionWithUser } from '../utils'
import { User } from '../../entities/user'
import { Simulation, SimulationModel } from '../../entities/simulation'
import { sendJsonResponse } from '../utils'
import { Response } from 'express'


const listSimulations = async (req: RequestWithSession, res: Response) => {
  const sessionUser = await associateSessionWithUser(req.session);
  let responseData;
  if (sessionUser) {
    const simulations = sessionUser.getSimulations();
    responseData = simulations;
  } else {
    responseData = {error: true, message: 'not signed in.'}
  }
  sendJsonResponse<SimulationModel[]>(responseData, res);
}

export default listSimulations 