import { User } from '../entities/user'
import { Request, Response } from 'express'
import { PAGE_NOT_FOUND_MSG } from '../constants'
import { sendJsonResponse } from './utils'
import { UserModel } from '../entities/user'

export default async (req: Request, res: Response) => {

  const userId: number = Number(req.params.uid)
  const requestedUser = await User.findOne({where: {id: userId}})

  // check the results and respond appropriately
  if (requestedUser) {
    sendJsonResponse<UserModel>(requestedUser, res)
  } else {
    return res.status(404).send(PAGE_NOT_FOUND_MSG)
  }
}