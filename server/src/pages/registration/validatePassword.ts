import { Request, Response } from 'express'
import { sendJsonResponse, validatePassword } from '../utils'

export default async (req: Request, res: Response) => {

  const reqBody = req.body;
  const reqBodyProps = Object.keys(reqBody);

  if (!reqBodyProps.includes('password') || reqBodyProps.length !== 1) {
    return res.status(400).send('Invalid request body.')
  }

  const passwordValidityMessage = validatePassword(reqBody.password);
  sendJsonResponse(passwordValidityMessage, res)
}