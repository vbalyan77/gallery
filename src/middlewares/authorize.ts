import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { AuthorizationError } from '../errors/AuthorizationError';
import 'dotenv/config';

export const authorize =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.authorization) {
        throw new Error('JWT Error');
      }

      const token = req.headers.authorization.split('Bearer ')[1];

      if (!token) {
        throw new Error('JWT Error');
      }

      if (!process.env.JWT_SECRET) throw new Error();

      const signature: Secret = process.env.JWT_SECRET;
      const decoded: any = jwt.verify(token, signature);
      const user = await User.findOne({
        _id: decoded.id,
      });

      if (!user) {
        throw new Error("User is not found or haven't permission");
      }

      req.user = decoded.id;

      next();
    } catch (exception) {
      console.log({ exception });
      res.status(403).json(new AuthorizationError(exception, 403));
    }
  };
