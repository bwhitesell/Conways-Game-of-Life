import { User } from '../entities/user'
import { Request, Response } from 'express'
import { PAGE_NOT_FOUND_MSG } from '../constants'

export default async (req: Request, res: Response) => {

  const userId: number = Number(req.params.uid)
  const requestedUser = await User.findOne({where: {id: userId}})

  // check the results and respond appropriately
  if (requestedUser) {
    return res.send(JSON.stringify(requestedUser))
  } else {
    return res.status(404).send(PAGE_NOT_FOUND_MSG)
  }
}