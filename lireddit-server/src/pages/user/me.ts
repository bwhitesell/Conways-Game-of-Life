import { UserModel } from '../../entities/user';
import { Response } from 'express';
import { associateSessionWithUser, sendJsonResponse } from '../utils';
import { RequestWithSession } from '../index';


export default async (req: RequestWithSession, res: Response) => {
  const sessionUser = await associateSessionWithUser(req.session);
  if (sessionUser) {
    sessionUser["password"] = "REDACTED";
  }
  const responseData = sessionUser ? (
    sessionUser
  ) : (
    {error: true, message: 'not signed in'}
  )
  sendJsonResponse<UserModel>(responseData, res)
}