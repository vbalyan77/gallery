import { Schema, model, Types } from 'mongoose';

export interface PhotoInterface {
  albumId: any;
  title: string;
  url: string;
  thumbnailUrl: string;
  owner: any;
  _id?: string;
}

const photoSchema = new Schema<PhotoInterface>(
  {
    albumId: {
      type: Types.ObjectId,
      default: null,
      ref: 'album',
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { timestamps: true }
);

export const Photo = model<PhotoInterface>('Photo', photoSchema);
