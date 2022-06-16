import { Request, Response } from "express";
import { sendJsonResponse, validateUsername } from "../utils";

export default async (req: Request, res: Response) => {
  const reqBody = req.body;
  const reqBodyProps = Object.keys(reqBody);

  if (!reqBodyProps.includes("username") || reqBodyProps.length !== 1) {
    return res.status(400).send("Invalid request body.");
  }

  const usernameValidityMessage = await validateUsername(reqBody.username);
  sendJsonResponse(usernameValidityMessage, res);
};
