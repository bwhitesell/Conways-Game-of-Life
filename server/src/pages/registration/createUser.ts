import { Request, Response } from "express";
import * as argon2 from "argon2";
import { User } from "../../entities/user";
import { RequestWithSession } from "../index";
import {
  sendJsonResponse,
  validateUsername,
  validatePassword,
  statusMessage,
} from "../utils";

export default async (req: RequestWithSession, res: Response) => {
  const reqBody = req.body;
  const reqBodyFields = Object.keys(reqBody);

  // validate body structure
  if (
    !reqBodyFields.includes("username") ||
    !reqBodyFields.includes("password") ||
    reqBodyFields.length !== 2
  ) {
    res.status(400);
    return sendJsonResponse(
      { error: true, message: "malformed request body." },
      res
    );
  }

  const reqUsername = reqBody["username"];
  const reqPassword = reqBody["password"];

  // validate username
  const usernameValidityMessage: statusMessage = await validateUsername(
    reqUsername
  );
  if (usernameValidityMessage.error) {
    res.status(400);
    return sendJsonResponse(usernameValidityMessage, res);
  }

  // validate password
  const passwordValidityMessage: statusMessage = validatePassword(reqPassword);
  if (passwordValidityMessage.error) {
    res.status(400);
    return sendJsonResponse(passwordValidityMessage, res);
  }

  const hashedPassword = await argon2.hash(reqPassword);
  const newUser = await User.create({
    username: reqUsername,
    password: hashedPassword,
  });
  // registration successful. Associate userid with session.
  req.session.userId = newUser.id;

  return sendJsonResponse(
    { error: false, message: "User successfully created." },
    res
  );
};
