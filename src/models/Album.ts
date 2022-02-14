import { Schema, model, Types } from 'mongoose';

export interface AlbumInterface {
  owner: any;
  title: string;
  _id?: string;
}

const albumSchema = new Schema<AlbumInterface>(
  {
    title: {
      type: String,
      default: 'Album',
    },
    owner: {
      type: Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { timestamps: true }
);

export const Album = model<AlbumInterface>('Album', albumSchema);
