import { Request, Response } from "express";
import { RequestWithSession, Session } from "./index";
import { User, UserModel } from "../entities/user";

const MIN_USERNAME_LENGTH = 6;
const MIN_PASSWORD_LENGTH = 5;

interface statusMessage {
  error: boolean;
  message: string;
}

async function validateUsername(username: string): Promise<statusMessage> {
  // does username use space characters?
  if (username.includes(" ")) {
    return {
      error: true,
      message: "Username can't contain any spaces.",
    };
  }

  // does username meet length requirement?
  if (username.length < MIN_USERNAME_LENGTH) {
    return {
      error: true,
      message: `Username must be of length ${MIN_USERNAME_LENGTH} or longer.`,
    };
  }

  // is username already taken?
  const usersWithMatchingNames = await User.findAll({
    where: { username: username },
  });
  if (usersWithMatchingNames.length > 0) {
    return {
      error: true,
      message: "That username is already taken.",
    };
  }

  return {
    error: false,
    message: "Username is valid.",
  };
}

function validatePassword(password: string): statusMessage {
  // does password contain spaces?
  if (password.includes(" ")) {
    return {
      error: true,
      message: "Password can't contain any spaces.",
    };
  }

  // does password meet length requirement?
  if (password.length < MIN_USERNAME_LENGTH) {
    return {
      error: true,
      message: `Password must be of length ${MIN_PASSWORD_LENGTH}`,
    };
  }

  return {
    error: false,
    message: "Password is valid.",
  };
}

function wrapPageRenderInTryCatch(fn: Function) {
  return async (req: Request | RequestWithSession, res: Response) => {
    try {
      return await fn(req, res);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  };
}

async function associateSessionWithUser(
  session: Session
): Promise<UserModel | undefined> {
  /*
    Returns a promise of a user or undefined. If undefined session is not associated with a
    user. Can also throw an exception if an invalid user is associated with the session.
  */

  const userId = session.userId;

  if (userId !== undefined) {
    const requestedUser = await User.findOne({ where: { id: userId } });
    if (requestedUser) {
      return requestedUser;
    } else {
      throw "Invalid user / session state";
    }
  } else {
    return undefined;
  }
}

function sendJsonResponse<M>(obj: statusMessage | M, res: Response) {
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(obj));
}

export {
  validateUsername,
  validatePassword,
  sendJsonResponse,
  statusMessage,
  associateSessionWithUser,
  wrapPageRenderInTryCatch,
};
