import { Request, Response, NextFunction } from 'express';
import { Md5 } from 'ts-md5/dist/md5';
import { User, UserInterface } from '../models/User';
import { catchAsync } from '../utils/catchAsync';
import { ApiError } from '../errors/ApiError';
import * as EmailValidator from 'email-validator';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, email, password } = req.body;
    const lowerCasedEmail = email.toLowerCase();
    const hash = Md5.hashStr(password);
    const existUser = await User.find({
      $or: [{ email: lowerCasedEmail }, { userName }],
    });
    if (existUser.length) {
      return res
        .status(409)
        .json(
          new ApiError({ message: 'Email or username already in use' }, 409)
        );
    }

    const user: UserInterface = await User.create({
      userName,
      email: lowerCasedEmail,
      password: hash,
    });

    res.status(201).json({ message: 'User created successfully', data: user });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { emailOrUsername, password } = req.body;
    let user: any = null;
    if (EmailValidator.validate(emailOrUsername.toLowerCase())) {
      user = await User.findOne({ email: emailOrUsername.toLowerCase() });
    } else {
      user = await User.findOne({ userName: emailOrUsername });
    }

    if (!user)
      return res
        .status(404)
        .json(new ApiError({ message: 'Wrong username or password' }, 404));

    const passwordIsValid: any = Md5.hashStr(password) === user.password;

    if (!passwordIsValid)
      return res
        .status(404)
        .json(new ApiError({ message: 'Wrong username or password' }, 404));

    if (!process.env.JWT_SECRET) throw new Error();

    const signature: Secret = process.env.JWT_SECRET;
    const payload: JwtPayload = { id: user._id };
    const token = jwt.sign(payload, signature, {
      expiresIn: '36000s',
    });

    res.status(200).json({
      message: 'Successful login',
      token,
    });
  }
);
