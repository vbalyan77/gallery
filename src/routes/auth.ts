import express, { Router } from 'express';
import * as Schemas from './validationSchemas/authSchemas';
import { checkSchema } from 'express-validator';
import { validate } from '../middlewares/validate';
import * as authController from '../controllers/authControler';

const authRouter: Router = express.Router();

authRouter.post(
  '/register',
  checkSchema(Schemas.registerSchema),
  validate,
  authController.register
);

authRouter.post(
  '/login',
  checkSchema(Schemas.loginSchema),
  validate,
  authController.login
);

export { authRouter };
