import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import { ValidatorError } from '../errors/ValidatorError';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const validations: any = validationResult(req);
  if (validations && !!validations.errors.length) {
    return res.status(406).json(new ValidatorError(validations.errors, 406));
  }
  next();
};
