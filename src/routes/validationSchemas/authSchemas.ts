import { Schema } from 'express-validator';

export const registerSchema: Schema = {
  userName: {
    isLength: {
      errorMessage:
        'User name should be at least 2 chars long and maximum 48 chars long',
      options: { min: 2, max: 48 },
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Email must be a valid email',
    },
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 7 chars long',
      options: { min: 7, max: 32 },
    },
  },
};

export const loginSchema: Schema = {
  emailOrUsername: {
    exists: {
      errorMessage: 'Please enter user name or email',
    },
    isLength: {
      errorMessage:
        'User name should be at least 2 chars long and maximum 48 chars long',
      options: { min: 2, max: 48 },
    },
  },
  password: {
    exists: {
      errorMessage: 'Password is a required field',
    },
  },
};
