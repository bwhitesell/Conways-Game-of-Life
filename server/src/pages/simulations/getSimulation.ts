import { Response } from 'express'
import { Simulation, SimulationModel } from '../../entities/simulation';
import { RequestWithSession } from '../index'
import { associateSessionWithUser, sendJsonResponse } from '../utils'
import { PAGE_NOT_FOUND_MSG } from '../../constants'

interface deserializedSimulationModel {
  name: string;
  description: string;
  data: boolean[][];
}

const getSimulation = async (req: RequestWithSession, res: Response) => {
  const sessionUser = await associateSessionWithUser(req.session);

  if (sessionUser) {

    const simulationId = Number(req.params.simId);
    const requestedSimulation = await Simulation.findOne({where: {id: simulationId}});

    if (!requestedSimulation) {
      return res.status(404).send(PAGE_NOT_FOUND_MSG)
    }

    const requestedSimulationUser = await requestedSimulation.getUser();

    if (requestedSimulationUser.id === sessionUser.id) {

      const deserializedRequestedSimulation: deserializedSimulationModel = {
        name: requestedSimulation.name,
        description: requestedSimulation.description,
        data: JSON.parse(requestedSimulation.data),
      };

      sendJsonResponse<deserializedSimulationModel>(
        deserializedRequestedSimulation,
        res,
      );

    } else {

      res.status(403);
      sendJsonResponse({error: true, message: "permission denied"}, res);
    }

  } else {
    sendJsonResponse({error: true, message: 'not signed in'}, res);
  }

}

export default getSimulation