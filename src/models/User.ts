import { Schema, model } from 'mongoose';

export interface UserInterface {
  userName: string;
  email: string;
  password: string;
  _id?: string;
}

const userSchema = new Schema<UserInterface>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //     lastLogin: {
    //       type: Number,
    //       default: null,
    //       required: false,
    //     },
  },
  { timestamps: true }
);

export const User = model<UserInterface>('User', userSchema);
