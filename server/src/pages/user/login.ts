import { User } from "../../entities/user";
import { Request, Response } from "express";
import { sendJsonResponse } from "../utils";
import { RequestWithSession } from "../index";
import * as argon2 from "argon2";

export default async (req: RequestWithSession, res: Response) => {
  const reqBody = req.body;
  const reqBodyFields = Object.keys(reqBody);

  // validate body structure
  if (
    reqBodyFields.includes("username") &&
    reqBodyFields.includes("password") &&
    reqBodyFields.length === 2
  ) {
    const reqUsername = reqBody.username;
    const reqPassword = reqBody.password;

    // validate username
    const reqUser = await User.findOne({ where: { username: reqUsername } });

    if (reqUser) {
      console.log(reqUser.password);
      // validate password
      if (await argon2.verify(reqUser.password, reqPassword)) {
        // login successful. Associate userid with session.
        req.session.userId = reqUser.id;
        return sendJsonResponse(
          { error: false, message: "User logged in successfully" },
          res
        );
      }
    }
    res.status(400);
    return sendJsonResponse(
      {
        error: true,
        message: "Unable to login. Invalid username/password combo.",
      },
      res
    );
  }

  res.status(400);
  return sendJsonResponse(
    { error: true, message: "Invalid request body." },
    res
  );
};
