import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Get the env variables
dotenv.config();

const checkIfUserIsBusiness = async (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req?.headers?.authorization?.split(' ')[1];
    const decodedToken: any = jwt.decode(token as string);

    if (decodedToken?.role === 'business') {
      next();
    }
    else{
        return res.status(401).json({ message: 'Unauthorized, not business user' });
    }
}

export default checkIfUserIsBusiness;