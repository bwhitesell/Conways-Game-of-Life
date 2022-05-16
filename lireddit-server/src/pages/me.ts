import { User, UserModel } from '../entities/user'
import { Request, Response } from 'express'
import { PAGE_NOT_FOUND_MSG } from '../constants'
import { sendJsonResponse } from './utils'
import { RequestWithSession } from './index'

export default async (req: RequestWithSession, res: Response) => {

  const userId = req.session.userId

  if (userId !== undefined) {
    const requestedUser = await User.findOne({where: {id: userId}})
    if (requestedUser) {
      sendJsonResponse<UserModel>(requestedUser, res)
    } else {
      res.status(500).send('Internal Server Error.')
    }
  } else {
    return res.status(404).send(PAGE_NOT_FOUND_MSG)
  }
}