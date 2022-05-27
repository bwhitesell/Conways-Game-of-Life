import { Request, Response } from 'express'
import { User } from '../../entities/user'
import { RequestWithSession } from '../index'
import { sendJsonResponse, validateUsername, validatePassword, statusMessage } from '../utils'


export default async (req: RequestWithSession, res: Response) => {

  const reqBody = req.body;
  const reqBodyFields = Object.keys(reqBody);

  // validate body structure
  if (!reqBodyFields.includes("username") || !reqBodyFields.includes("password") || reqBodyFields.length !== 2) {
    res.status(400);
    return sendJsonResponse({error: true, message: "malformed request body."}, res)
  }

  const reqUsername = reqBody["username"];
  const reqPassword = reqBody["password"];

  // validate username
  const usernameValidityMessage: statusMessage = await validateUsername(reqUsername)
  if (usernameValidityMessage.error) {
        res.status(400);
    return sendJsonResponse(usernameValidityMessage, res)
  }

  // validate password
  const passwordValidityMessage: statusMessage = validatePassword(reqPassword)
  if (passwordValidityMessage.error) {
    res.status(400);
    return sendJsonResponse(passwordValidityMessage, res)
  }


  // login successful. Associate userid with session.
  const newUser = await User.create({username: reqUsername, password: reqPassword});
  req.session.userId = newUser.id;

  return sendJsonResponse({error: false, message: "User successfully created."}, res)
}