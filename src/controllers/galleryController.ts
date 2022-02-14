import { Request, Response, NextFunction } from 'express';
import { Photo } from '../models/Photo';
import { Album, AlbumInterface } from '../models/Album';
import { User, UserInterface } from '../models/User';
import { catchAsync } from '../utils/catchAsync';
import axios, { AxiosResponse } from 'axios';

export const loadPhotos = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const url: URL = new URL('photos', 'http://jsonplaceholder.typicode.com');
    const photos: AxiosResponse = await axios.get<AxiosResponse>(
      url.toString()
    );

    if (photos.data.length)
      res
        .status(200)
        .json({ message: 'Photos is loaded, processing in progress' });
    else res.status(204).json({ message: 'No photos' });

    await createAlbums(photos, user);
    await Photo.create(photos.data);
  }
);

export const getPhotos = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ownerId, maxCount } = req.body;
    type paramObj = {
      owner?: string;
    };
    const params: paramObj = {};
    if (ownerId) {
      let user: UserInterface | null = await User.findById(ownerId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      params.owner = ownerId;
    }
    const photos = await Photo.find(params).limit(Number(maxCount));
    res.status(200).json({ message: 'Photos', data: photos });
  }
);

export const getAlbums = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ownerId, maxCount } = req.body;
    type paramObj = {
      owner?: string;
    };
    const params: paramObj = {};
    if (ownerId) {
      let user: UserInterface | null = await User.findById(ownerId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      params.owner = ownerId;
    }
    const albums = await Album.find(params).limit(Number(maxCount));
    res.status(200).json({ message: 'Albums', data: albums });
  }
);

export const deletePhotos = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { photoId } = req.body;
    await Photo.remove({ _id: { $in: photoId } });
    res.status(200).json({ message: 'Photos deleted succesfuly' });
  }
);

export const deleteAlbum = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { albumId } = req.body;
    const existAlbum: AlbumInterface | null = await Album.findById(albumId);
    if (!existAlbum)
      return res.status(404).json({ message: 'Album not found' });
    await Album.deleteOne({ _id: albumId });
    await Photo.deleteMany({ albumId });
    res.status(200).json({ message: 'Album successfuly deleted' });
  }
);

export const updateAlbumTitle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { albumId, new_album_name } = req.body;
    const existAlbum: any = await Album.findById(albumId);
    if (!existAlbum) res.status(404).json({ message: 'Album not found' });
    existAlbum.title = new_album_name;
    existAlbum.save();
    res.status(200).json({ message: 'Album name successfuly updated' });
  }
);

const createAlbums = async (photos: AxiosResponse, user: any) => {
  try {
    const albums: Array<AlbumInterface> = [];
    let _id: string | undefined;
    for (const photo of photos.data) {
      let existAlbum: AlbumInterface | undefined = albums.find(
        (album) => album.title == photo.albumId && album.owner == user
      );
      if (!existAlbum) {
        let existAlbumInDb: AlbumInterface | null = await Album.findOne({
          title: photo.albumId,
          owner: user,
        });
        if (existAlbumInDb) _id = existAlbumInDb._id;
        else {
          let album: AlbumInterface = await Album.create({
            title: photo.albumId,
            owner: user,
          });
          _id = album._id;
        }
        albums.push({ title: photo.albumId, owner: user, _id });
      } else _id = existAlbum._id;

      photo.albumId = _id;
      photo.owner = user;
      delete photo.id;
    }
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};
