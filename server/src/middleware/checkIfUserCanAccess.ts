import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Get the env variables
dotenv.config();

const checkIfUserCanAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req?.headers?.authorization?.split(' ')[1];
    console.log(`received token: ${token}`)
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (e) {
    console.log(e)
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Unauthorized, token expired' });
    }
    return res.status(500).json({ message: 'An error occured' });
  }
}

export default checkIfUserCanAccess;