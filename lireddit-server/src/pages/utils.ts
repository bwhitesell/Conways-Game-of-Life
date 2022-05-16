import { Request, Response } from 'express'
import { Model } from 'sequelize/types';
import { User } from '../entities/user'

const MIN_USERNAME_LENGTH = 6;
const MIN_PASSWORD_LENGTH = 5;


interface statusMessage{
  error: boolean;
  message: string;
}


async function validateUsername(username: string): Promise<statusMessage> {
  // does username use space characters?
  if (username.includes(' ')) {
    return {
      error: true,
      message: "Username can't contain any spaces."
    }
  }

  // does username meet length requirement?
  if (username.length < MIN_USERNAME_LENGTH) {
    return {
      error: true,
      message: `Username must be of length ${MIN_USERNAME_LENGTH}`
    }
  }
  
  // is username already taken?
  const usersWithMatchingNames = await User.findAll({"where": {"username": username}})
  if (usersWithMatchingNames.length > 0) {
    return {
      error: true,
      message: "That username is already taken."
    }
  }

  return {
    error: false,
    message: "Username is valid."
  }
}

function validatePassword(password: string): statusMessage {
  // does password contain spaces?
  if (password.includes(' ')) {
    return {
      error: true,
      message: "Password can't contain any spaces."
    }
  }


  // does password meet length requirement?
  if (password.length < MIN_USERNAME_LENGTH) {
    return {
      error: true,
      message: `Password must be of length ${MIN_PASSWORD_LENGTH}`
    }
  }
  
  return {
    error: false,
    message: "Password is valid."
  }
}



function sendJsonResponse<M> (obj: statusMessage | M, res: Response) {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(obj))
}

export { validateUsername, validatePassword, sendJsonResponse, statusMessage }