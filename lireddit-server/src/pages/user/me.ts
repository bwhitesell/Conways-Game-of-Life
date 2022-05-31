import { User, UserModel } from '../../entities/user';
import { Request, Response } from 'express';
import { PAGE_NOT_FOUND_MSG } from '../../constants';
import { associateSessionWithUser, sendJsonResponse } from '../utils';
import { RequestWithSession } from '../index';


export default async (req: RequestWithSession, res: Response) => {
  const sessionUser = await associateSessionWithUser(req.session)
  if (sessionUser){
    sessionUser["password"] = "REDACTED";
  }
  const responseData = sessionUser ? (
    sessionUser
  ) : (
    {error: true, message: 'not signed in'}
  )
  sendJsonResponse<UserModel>(responseData, res)
}