import { Request } from 'express';
import jwt from 'jsonwebtoken';
import userController from '../controllers/userController';
import { UserI } from '../models/userModel';

declare let process: {
  env: {
    SECRET: string;
  };
};

interface TokenInterface {
  username: string;
  id: string;
}

const getTokenFrom = (req: Request): string | null => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

export const getUser = async (req: Request): Promise<UserI | null> => {
  const token = getTokenFrom(req);
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (decodedToken) {
        const user = await userController.readUser({
          userId: (decodedToken as TokenInterface).id,
        });
        if (user) {
          return user;
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return null;
};
