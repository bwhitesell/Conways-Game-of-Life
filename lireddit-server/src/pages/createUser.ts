import { User } from '../entities/user'
import { Request, Response } from 'express'
import { sendJsonResponse, validateUsername, validatePassword, statusMessage } from './utils'


export default async (req: Request, res: Response) => {

  const reqBody = req.body
  const reqBodyFields = Object.keys(reqBody)

  // validate body structure
  if (!reqBodyFields.includes("username") || !reqBodyFields.includes("password") || reqBodyFields.length !== 2) {
    res.status(400)
    return sendJsonResponse({error: true, message: "malformed request body."}, res)
  }

  const reqUsername = reqBody["username"]
  const reqPassword = reqBody["password"]

  // validate username
  const usernameValidityMessage: statusMessage = await validateUsername(reqUsername)
  if (usernameValidityMessage.error) {
        res.status(400)
    return sendJsonResponse(usernameValidityMessage, res)
  }

  // validate password
  const passwordValidityMessage: statusMessage = validatePassword(reqPassword)
  if (passwordValidityMessage.error) {
    res.status(400)
    return sendJsonResponse(passwordValidityMessage, res)
  }

  await User.create({username: reqUsername, password: reqPassword})

  return sendJsonResponse({error: false, message: "User successfully created."}, res)
}